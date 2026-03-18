"use client";
import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import axios from "axios";

export interface Chat {
  id: number | string;
  title: string;
  subtitle: string;
  avatar: string;
  status: "online" | "away" | "offline" | "group";
}

export interface Message {
  id: string | number;
  text: string;
  sender: "user" | "ai" | "mentor";
  timestamp: number;
}

type ChatTab = "Ask AI" | "Mentor";

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ChatTab>("Ask AI");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [mentor, setMentor] = useState<Chat | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const aiFriend: Chat = {
    id: "ai_friend",
    title: "Your Friend",
    subtitle: "Always here for you",
    avatar: "YF",
    status: "online",
  };

  // Load messages from localStorage
  const loadStoredMessages = useCallback((tab: ChatTab) => {
    const key = tab === "Ask AI" ? "chat_history_ai" : "chat_history_mentor";
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    const key = activeTab === "Ask AI" ? "chat_history_ai" : "chat_history_mentor";
    if (messages.length > 0) {
      localStorage.setItem(key, JSON.stringify(messages));
    }
  }, [messages, activeTab]);

  // Fetch Mentor Data
  useEffect(() => {
    const fetchMentor = async () => {
      const token = localStorage.getItem("token");
      const authData = JSON.parse(localStorage.getItem("auth") || "{}");
      const userId = authData.user?.id;
      
      if (!userId || !token) return;

      try {
        const res = await axios.get(`${API_URL}/api/students/getprofile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const profileData = res.data.data;
        if (profileData?.assignedMentor) {
          const m = profileData.assignedMentor;
          setMentor({
            id: m._id,
            title: m.fullName || `${m.firstName || ""} ${m.lastName || ""}`.trim() || "Mentor",
            subtitle: "Assigned Mentor",
            avatar: (m.firstName?.[0] || m.fullName?.[0] || "M").toUpperCase(),
            status: "online",
          });
        }
      } catch (err) {
        console.error("Failed to fetch mentor:", err);
      }
    };
    fetchMentor();
  }, [API_URL]);

  // Initial Load
  useEffect(() => {
    loadStoredMessages(activeTab);
  }, [activeTab, loadStoredMessages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    if (activeTab === "Ask AI") {
      setIsTyping(true);
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/chat/ai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            messages: messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          }),
        });

        const data = await response.json();
        const aiMsg: Message = {
          id: Date.now() + 1,
          text: data.reply || "I'm not sure how to respond to that, my friend.",
          sender: "ai",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        setError("AI is currently unavailable.");
      } finally {
        setIsTyping(false);
        setIsLoading(false);
      }
    } else {
        // Mentor chat logic would go here (e.g., Socket.io or direct DB write)
        // For now, it stays as stored local messages
    }
  };

  const clearMessages = () => {
    const key = activeTab === "Ask AI" ? "chat_history_ai" : "chat_history_mentor";
    localStorage.removeItem(key);
    setMessages([]);
  };

  const currentChat = activeTab === "Ask AI" ? aiFriend : mentor;

  return (
    <div className="h-screen w-full bg-white flex overflow-hidden relative">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`${sidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'} transition-all duration-300 lg:static fixed z-30 h-full bg-white border-r overflow-hidden shadow-2xl lg:shadow-none`}>
        <Sidebar
          chats={mentor ? [aiFriend, mentor] : [aiFriend]}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (window.innerWidth < 1024) setSidebarOpen(false);
          }}
          selectedChat={currentChat?.id || null}
          setSelectedChat={() => {}} // Not strictly needed with tab-based system
          error={error}
          isLoading={false}
          onToggle={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {currentChat ? (
          <>
            <ChatHeader 
              chat={currentChat} 
              activeTab={activeTab} 
              onClearChat={clearMessages}
              onToggleSidebar={() => setSidebarOpen(true)}
            />
            <div className="flex-1 overflow-hidden flex flex-col">
              <ChatMessages 
                messages={messages} 
                chat={currentChat}
                isTyping={isTyping}
              />
            </div>
            <ChatInput 
              onSendMessage={handleSendMessage} 
              disabled={isLoading}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50 p-6 text-center">
            <div>
              <div className="text-6xl mb-4 animate-bounce">🤝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Mentor Connection</h2>
              <p className="max-w-md mx-auto">
                No mentor is assigned to you yet. You can chat with <strong>Your Friend</strong> (AI) in the "Ask AI" tab to get started!
              </p>
              <button 
                onClick={() => setActiveTab("Ask AI")}
                className="mt-6 px-6 py-3 bg-[#1887A1] text-white rounded-xl hover:shadow-lg transition-all"
              >
                Chat with Your Friend
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;