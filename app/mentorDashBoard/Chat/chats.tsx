"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  Mic,
  Send,
  Smile,
  X,
  Upload,
  FileText,
  Users,
  User,
  Video,
  Phone,
  ImageIcon,
} from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface Chat {
  id: number;
  title: string;
  subtitle: string;
  avatar: string;
  status: "online" | "away" | "offline" | "group";
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

type ChatTab = "Ask AI" | "Groups" | "Mentor";

interface ChatData {
  "Ask AI": Chat[];
  Groups: Chat[];
  Mentor: Chat[];
}

const MentorChat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ChatTab>("Ask AI");
  const [message, setMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showAttachments, setShowAttachments] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isAITyping, setIsAITyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, how can I assist you?", sender: "ai" },
    { id: 2, text: "Please explain eventloop in Node.js", sender: "user" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatData: ChatData = {
    "Ask AI": [
      {
        id: 1,
        title: "AI Assistant",
        subtitle: "Your friendly AI helper",
        avatar: "AI",
        status: "online",
      },
      {
        id: 2,
        title: "Code Helper",
        subtitle: "Get coding assistance",
        avatar: "CH",
        status: "online",
      },
    ],
    Groups: [
      {
        id: 3,
        title: "JavaScript Study Group",
        subtitle: "5 members • Last active 2h ago",
        avatar: "JS",
        status: "group",
      },
      {
        id: 4,
        title: "React Developers",
        subtitle: "12 members • Sarah is typing...",
        avatar: "RD",
        status: "group",
      },
      {
        id: 5,
        title: "Machine Learning Club",
        subtitle: "8 members • Last active 1d ago",
        avatar: "ML",
        status: "group",
      },
    ],
    Mentor: [
      {
        id: 6,
        title: "Dr. Sarah Johnson",
        subtitle: "Computer Science Professor",
        avatar: "SJ",
        status: "online",
      },
      {
        id: 7,
        title: "Mark Thompson",
        subtitle: "Senior Software Engineer",
        avatar: "MT",
        status: "away",
      },
      {
        id: 8,
        title: "Lisa Chen",
        subtitle: "Data Science Mentor",
        avatar: "LC",
        status: "offline",
      },
    ],
  };

  // Set initial selectedChat to the first chat in the active tab
  useEffect(() => {
    if (!selectedChat && chatData[activeTab].length > 0) {
      setSelectedChat(chatData[activeTab][0].id);
    }
  }, [activeTab, selectedChat]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAITyping]);

  const currentChatList: Chat[] = chatData[activeTab] || [];

  const filteredChats: Chat[] = currentChatList.filter(
    (chat: Chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setIsAITyping(true);

      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: getAIResponse(message),
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsAITyping(false);
      }, 1000);
    }
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("eventloop") || lowerMessage.includes("node.js")) {
      return "The Node.js event loop is a core part of its asynchronous architecture. It processes events from the event queue, handling tasks like I/O operations, timers, and callbacks. Would you like a detailed explanation?";
    } else if (lowerMessage.includes("react") || lowerMessage.includes("jsx")) {
      return "React is a JavaScript library for building user interfaces, and JSX is a syntax extension that allows you to write HTML-like code in JavaScript. Want me to explain a specific React concept?";
    } else if (lowerMessage.includes("javascript")) {
      return "JavaScript is a versatile programming language used for web development. Ask me about any specific JavaScript topic, like closures or promises!";
    } else {
      return "That's an interesting question! Can you provide more details or ask about a specific topic, like JavaScript, React, or Node.js?";
    }
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (type: "Document" | "Image" | "File") => {
    setShowAttachments(false);
    console.log(`Uploading ${type}...`);
    alert(`${type} upload feature would be implemented here`);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log("Starting voice recording...");
      setTimeout(() => {
        setIsRecording(false);
        console.log("Voice recording stopped");
      }, 3000);
    }
  };

  const getStatusColor = (
    status: "online" | "away" | "offline" | "group"
  ): string => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      case "group":
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  const getCurrentChat = (): Chat => {
    const allChats: Chat[] = [
      ...chatData["Ask AI"],
      ...chatData.Groups,
      ...chatData.Mentor,
    ];
    return (
      allChats.find((chat: Chat) => chat.id === selectedChat) || {
        id: 0,
        title: "No Chat Selected",
        subtitle: "Select a chat to start messaging",
        avatar: "N/A",
        status: "offline",
      }
    );
  };

  const currentChat: Chat = getCurrentChat();

  return (
    <div className="h-screen w-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-1 hover:bg-gray-200 rounded"
                aria-label="Toggle search"
                role="button"
              >
                <Search
                  size={20}
                  className="text-gray-500 hover:text-gray-700"
                  aria-hidden="true"
                />
              </button>
              <button
                className="p-1 hover:bg-gray-200 rounded"
                aria-label="More options"
                role="button"
              >
                <MoreVertical
                  size={20}
                  className="text-gray-500 hover:text-gray-700"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="mb-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1887A1]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Clear search"
                    role="button"
                  >
                    <X
                      size={16}
                      className="text-gray-400 hover:text-gray-600"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex bg-gray-200 rounded-lg p-1">
            {(["Ask AI", "Groups", "Mentor"] as ChatTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#1887A1] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat: Chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-100 transition-colors ${
                  selectedChat === chat.id
                    ? "bg-blue-50 border-r-2 border-r-[#1887A1]"
                    : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && setSelectedChat(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {chat.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                        chat.status
                      )} rounded-full border-2 border-white`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.subtitle}
                    </p>
                  </div>
                  {activeTab === "Groups" && (
                    <Users
                      size={16}
                      className="text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                  {activeTab === "Mentor" && (
                    <User
                      size={16}
                      className="text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No chats found</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#1887A1] rounded-full flex items-center justify-center text-white font-semibold">
                {currentChat.avatar}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                  currentChat.status
                )} rounded-full border-2 border-white`}
              ></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {currentChat.title}
              </h3>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600">
                  {currentChat.status === "online"
                    ? "online"
                    : currentChat.status === "away"
                    ? "away"
                    : currentChat.status === "group"
                    ? currentChat.subtitle
                    : "last seen recently"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === "Mentor" && (
              <>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Start phone call"
                  role="button"
                >
                  <Phone
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                    aria-hidden="true"
                  />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Start video call"
                  role="button"
                >
                  <Video
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                    aria-hidden="true"
                  />
                </button>
              </>
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Toggle search"
              role="button"
            >
              <Search
                size={20}
                className="text-gray-500 hover:text-gray-700"
                aria-hidden="true"
              />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="More options"
              role="button"
            >
              <MoreVertical
                size={20}
                className="text-gray-500 hover:text-gray-700"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
            >
              {msg.sender === "ai" && (
                <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1">
                  {currentChat.avatar}
                </div>
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === "ai"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "bg-[#1887A1] text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isAITyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-[#1887A1] rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1">
                {currentChat.avatar}
              </div>
              <div className="bg-white text-gray-800 shadow-sm px-4 py-2 rounded-2xl">
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="relative">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                  aria-label="Toggle emoji picker"
                  role="button"
                >
                  <Smile
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                    aria-hidden="true"
                  />
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-10">
                    <EmojiPicker
                      onEmojiClick={handleEmojiSelect}
                      theme={Theme.LIGHT}
                      skinTonesDisabled
                      previewConfig={{ showPreview: false }}
                      searchDisabled
                      width={320}
                      height={400}
                    />
                  </div>
                )}
              </div>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowAttachments(!showAttachments)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                    aria-label="Toggle attachments"
                    role="button"
                  >
                    <Plus
                      size={20}
                      className="text-gray-500 hover:text-gray-700"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Attachment Menu */}
                  {showAttachments && (
                    <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
                      <button
                        onClick={() => handleFileUpload("Document")}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <FileText
                          size={16}
                          className="text-blue-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm">Document</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload("Image")}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <ImageIcon
                          size={16}
                          className="text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm">Photo</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload("File")}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <Upload
                          size={16}
                          className="text-purple-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm">Upload File</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleVoiceRecord}
                  className={`p-1 hover:bg-gray-200 rounded-full ${
                    isRecording ? "animate-pulse" : ""
                  }`}
                  aria-label={isRecording ? "Stop recording" : "Start recording"}
                  role="button"
                >
                  <Mic
                    size={20}
                    className={`${
                      isRecording
                        ? "text-red-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`p-2 rounded-full transition-colors ${
                    message.trim()
                      ? "bg-[#1887A1] hover:bg-[#0D4C5B] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                  role="button"
                >
                  <Send size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
