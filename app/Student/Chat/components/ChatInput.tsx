import React, { useState } from "react";
import { Plus, Mic, Send, Smile, FileText,  Upload, Image } from "lucide-react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
    const [message, setMessage] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showAttachments, setShowAttachments] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);

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

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage("");
            setShowEmojiPicker(false);
            setShowAttachments(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="relative">
                <div className="flex items-end gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setShowEmojiPicker(!showEmojiPicker);
                                setShowAttachments(false);
                            }}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            aria-label="Toggle emoji picker"
                        >
                            <Smile
                                size={20}
                                className="text-gray-500 hover:text-gray-700"
                                aria-hidden="true"
                            />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowAttachments(!showAttachments);
                                    setShowEmojiPicker(false);
                                }}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                aria-label="Toggle attachments"
                            >
                                <Plus
                                    size={20}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-hidden="true"
                                />
                            </button>
                            {showAttachments && (
                                <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
                                    <button
                                        onClick={() => handleFileUpload("Document")}
                                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <FileText size={16} className="text-blue-500" aria-hidden="true" />
                                        <span className="text-sm">Document</span>
                                    </button>
                                    <button
                                        onClick={() => handleFileUpload("Image")}
                                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Image size={16} className="text-green-500" aria-hidden="true" />
                                        <span className="text-sm">Photo</span>
                                    </button>
                                    <button
                                        onClick={() => handleFileUpload("File")}
                                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Upload size={16} className="text-purple-500" aria-hidden="true" />
                                        <span className="text-sm">Upload File</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 resize-none min-h-[20px] max-h-32"
                        rows={1}
                        style={{
                            height: 'auto',
                            overflowY: message.split('\n').length > 3 ? 'scroll' : 'hidden'
                        }}
                        disabled={disabled}
                    />

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleVoiceRecord}
                            className={`p-1 hover:bg-gray-200 rounded-full transition-colors ${
                                isRecording ? "animate-pulse" : ""
                            }`}
                            aria-label={isRecording ? "Stop recording" : "Start recording"}
                        >
                            <Mic
                                size={20}
                                className={`${
                                    isRecording ? "text-red-500" : "text-gray-500 hover:text-gray-700"
                                }`}
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || disabled}
                            className={`p-2 rounded-full transition-all duration-200 ${
                                message.trim() && !disabled
                                    ? "bg-[#1887A1] hover:bg-[#0D4C5B] text-white shadow-md hover:shadow-lg"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            aria-label="Send message"
                        >
                            <Send size={16} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;