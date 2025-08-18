"use client";
import React, { useState, useRef } from "react";
import {
  Search,
  MoreVertical,
  Plus,
  Mic,
  Send,
  Smile,
  Code,
  X,
  Upload,
  Image,
  FileText,
  Users,
  User,
  MessageCircle,
  Video,
  Phone,
} from "lucide-react";
import Page from "./page";

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

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<ChatTab>("Ask AI");
  const [message, setMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showAttachments, setShowAttachments] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi how can i assist with you", sender: "user" },
    { id: 2, text: "please Explain eventloop node.js", sender: "ai" },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const chatData: ChatData = {
    "Ask AI": [
      {
        id: 0,
        title: "AI Assistant",
        subtitle: "How can I help you today?",
        avatar: "AI",
        status: "online",
      },
      {
        id: 1,
        title: "Code Helper",
        subtitle: "Ready to debug your code",
        avatar: "CH",
        status: "online",
      },
      {
        id: 2,
        title: "Writing Assistant",
        subtitle: "Let me help you write better",
        avatar: "WA",
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

  const currentChatList: Chat[] = chatData[activeTab] || [];

  const filteredChats: Chat[] = currentChatList.filter(
    (chat: Chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emojis: string[] = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "🥲",
    "😋",
    "😛",
    "😜",
    "🤪",
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: getAIResponse(message),
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const responses: string[] = [
      "That's an interesting question! Let me help you with that.",
      "I understand what you're asking. Here's my response...",
      "Great question! Let me break this down for you.",
      "I'm here to help! Here's what I think about that:",
      "Thanks for asking! Here's my detailed response...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (type: "Document" | "Image" | "File") => {
    setShowAttachments(false);
    console.log(`Uploading ${type}...`);
    // Simulate file upload
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
      allChats.find((chat: Chat) => chat.id === selectedChat) || allChats[0]
    );
  };

  const currentChat: Chat = getCurrentChat();

  return (
    <div className="h-screen w-screen bg-gray-100 flex">
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
              >
                <Search
                  size={20}
                  className="text-gray-500 hover:text-gray-700"
                />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <MoreVertical
                  size={20}
                  className="text-gray-500 hover:text-gray-700"
                />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X
                      size={16}
                      className="text-gray-400 hover:text-gray-600"
                    />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex bg-gray-200 rounded-lg p-1">
            {Object.keys(chatData).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as ChatTab);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
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
                    ? "bg-blue-50 border-r-2 border-r-teal-600"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
                    <Users size={16} className="text-gray-400" />
                  )}
                  {activeTab === "Mentor" && (
                    <User size={16} className="text-gray-400" />
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
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Phone
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Video
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </button>
              </>
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search size={20} className="text-gray-500 hover:text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical
                size={20}
                className="text-gray-500 hover:text-gray-700"
              />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1">
                  {currentChat.avatar}
                </div>
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === "ai"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "bg-teal-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="relative">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <Smile
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-5 gap-2 z-10">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="p-2 hover:bg-gray-100 rounded text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
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
                  >
                    <Plus
                      size={20}
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </button>

                  {/* Attachment Menu */}
                  {showAttachments && (
                    <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
                      <button
                        onClick={() => handleFileUpload("Document")}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                      >
                        <FileText size={16} className="text-blue-500" />
                        <span className="text-sm">Document</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload("Image")}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                      >
                        <Image size={16} className="text-green-500" />
                        <span className="text-sm">Photo</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload("File")}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
                      >
                        <Upload size={16} className="text-purple-500" />
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
                >
                  <Mic
                    size={20}
                    className={`${
                      isRecording
                        ? "text-red-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  />
                </button>

                <button
                  onClick={handleSendMessage}
                  className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
