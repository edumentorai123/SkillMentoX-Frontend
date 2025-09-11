import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';

interface Message {
    id: string;
    sender: 'user' | 'mentor';
    content: string;
    timestamp: Date;
    type: 'text' | 'file' | 'image';
}

interface ChatSectionProps {
    chatId?: string;
    recipientName?: string;
    recipientAvatar?: string;
}

export default function ChatSection({ 
    chatId = 'default',
    recipientName = 'John Mentor',
    recipientAvatar = 'JM'
}: ChatSectionProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'mentor',
            content: 'Hello! I\'m here to help you with your learning. What would you like to work on today?',
            timestamp: new Date(Date.now() - 3600000),
            type: 'text'
        },
        {
            id: '2',
            sender: 'user',
            content: 'Hi! I\'m struggling with React hooks, especially useState and useEffect.',
            timestamp: new Date(Date.now() - 3000000),
            type: 'text'
        },
        {
            id: '3',
            sender: 'mentor',
            content: 'Great question! Let\'s start with useState. It\'s a Hook that lets you add React state to function components. Would you like me to show you some examples?',
            timestamp: new Date(Date.now() - 2700000),
            type: 'text'
        },
        {
            id: '4',
            sender: 'user',
            content: 'Yes, that would be really helpful!',
            timestamp: new Date(Date.now() - 2400000),
            type: 'text'
        },
        {
            id: '5',
            sender: 'mentor',
            content: 'Perfect! Here\'s a simple example:\n\n```javascript\nimport React, { useState } from \'react\';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nThe useState hook returns an array with two elements: the current state value and a function to update it.',
            timestamp: new Date(Date.now() - 1800000),
            type: 'text'
        }
    ]);
    
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: Date.now().toString(),
            sender: 'user',
            content: newMessage,
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, message]);
        setNewMessage('');

        // Simulate mentor typing
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const mentorResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'mentor',
                content: 'Thanks for your message! Let me help you with that.',
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, mentorResponse]);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatMessageContent = (content: string) => {
        if (content.includes('```')) {
            const parts = content.split('```');
            return parts.map((part, index) => {
                if (index % 2 === 1) {
                    // This is a code block
                    return (
                        <pre key={index} className="bg-gray-100 p-3 rounded-md mt-2 mb-2 overflow-x-auto">
                            <code className="text-sm text-gray-800">{part}</code>
                        </pre>
                    );
                } else {
                    // Regular text
                    return part.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                            {line}
                            {lineIndex < part.split('\n').length - 1 && <br />}
                        </span>
                    ));
                }
            });
        }
        
        // Handle regular line breaks
        return content.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                {index < content.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {recipientAvatar}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{recipientName}</h3>
                        <p className="text-sm text-green-600">Online</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Phone size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Video size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreVertical size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'user' 
                                ? 'bg-[#1887A1] text-white' 
                                : 'bg-gray-100 text-gray-900'
                        }`}>
                            <div className="text-sm">
                                {formatMessageContent(message.content)}
                            </div>
                            <div className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                                {formatTime(message.timestamp)}
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-end space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Paperclip size={20} className="text-gray-600" />
                    </button>
                    
                    <div className="flex-1">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:border-transparent"
                            rows={1}
                            style={{ minHeight: '40px', maxHeight: '120px' }}
                        />
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Smile size={20} className="text-gray-600" />
                    </button>
                    
                    <button 
                        onClick={handleSendMessage}
                        disabled={newMessage.trim() === ''}
                        className="p-2 bg-[#1887A1] hover:bg-[#0D4C5B] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}