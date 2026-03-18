import React, { useState, useRef, useEffect } from "react";
import { Plus, Mic, Send, Smile, FileText, Upload, Image } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
    const [message, setMessage] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showAttachments, setShowAttachments] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [pickerWidth, setPickerWidth] = useState<number>(350);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            setPickerWidth(window.innerWidth < 450 ? 280 : 350);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    const handleFileUpload = (type: "Document" | "Image" | "File") => {
        setShowAttachments(false);
        console.log(`Uploading ${type}...`);
        alert(`${type} upload feature would be implemented here`);
    };

    const handleVoiceRecord = () => {
        setIsRecording(!isRecording);
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
        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0 relative">
            {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-full left-4 mb-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="shadow-2xl rounded-2xl overflow-hidden border border-gray-100 backdrop-blur-sm">
                        <EmojiPicker 
                            onEmojiClick={onEmojiClick} 
                            autoFocusSearch={false}
                            theme={Theme.LIGHT}
                            width={pickerWidth}
                            height={380}
                            searchPlaceHolder="Search emojis..."
                            skinTonesDisabled
                            previewConfig={{ showPreview: false }}
                        />
                    </div>
                </div>
            )}

            <div className="relative max-w-7xl mx-auto">
                <div className="flex items-end gap-2 sm:gap-3 bg-gray-50/80 hover:bg-gray-50 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 border border-gray-100 transition-all focus-within:ring-4 focus-within:ring-[#1887A1]/10 focus-within:border-[#1887A1]/30 focus-within:bg-white shadow-xs">
                    <div className="flex items-center gap-1 sm:gap-2 self-center sm:self-end mb-0 sm:mb-1">
                        <button
                            onClick={() => {
                                setShowEmojiPicker(!showEmojiPicker);
                                setShowAttachments(false);
                            }}
                            className={`p-2 rounded-full transition-all duration-200 ${showEmojiPicker ? "bg-[#1887A1] text-white shadow-md" : "hover:bg-white hover:shadow-sm text-gray-500"}`}
                            aria-label="Toggle emoji picker"
                        >
                            <Smile size={20} className={showEmojiPicker ? "scale-110" : ""} />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setShowAttachments(!showAttachments);
                                    setShowEmojiPicker(false);
                                }}
                                className={`p-2 rounded-full transition-all duration-200 ${showAttachments ? "bg-[#1887A1] text-white shadow-md rotate-45" : "hover:bg-white hover:shadow-sm text-gray-500"}`}
                                aria-label="Toggle attachments"
                            >
                                <Plus size={20} />
                            </button>
                            {showAttachments && (
                                <div className="absolute bottom-14 left-0 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-10 min-w-[200px] animate-in fade-in slide-in-from-bottom-3 duration-200">
                                    <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Upload</div>
                                    <button
                                        onClick={() => handleFileUpload("Document")}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                            <FileText size={18} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">Document</span>
                                    </button>
                                    <button
                                        onClick={() => handleFileUpload("Image")}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                            <Image size={18} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">Photo/Video</span>
                                    </button>
                                    <button
                                        onClick={() => handleFileUpload("File")}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-[#1887A1]/5 flex items-center justify-center text-[#1887A1] group-hover:scale-110 transition-transform">
                                            <Upload size={18} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">Generic File</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={`Message Your Friend...`}
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 resize-none min-h-[28px] max-h-40 py-1 sm:py-2 leading-relaxed text-sm sm:text-base selection:bg-[#1887A1]/20"
                        rows={1}
                        style={{ height: 'auto' }}
                        disabled={disabled}
                    />

                    <div className="flex items-center gap-1 sm:gap-2 self-center sm:self-end mb-0 sm:mb-1">
                        <button
                            onClick={handleVoiceRecord}
                            className={`p-2 rounded-full transition-all duration-200 ${
                                isRecording ? "bg-red-500 text-white shadow-lg animate-pulse scale-110" : "hover:bg-white hover:shadow-sm text-gray-400 hover:text-red-500"
                            }`}
                            aria-label={isRecording ? "Stop recording" : "Start recording"}
                        >
                            <Mic size={20} />
                        </button>

                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || disabled}
                            className={`p-2.5 rounded-xl transition-all duration-300 ${
                                message.trim() && !disabled
                                    ? "bg-linear-to-br from-[#1887A1] to-[#0D4C5B] text-white shadow-xl hover:shadow-[#1887A1]/40 transform active:scale-95 translate-y-[-2px]"
                                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                            }`}
                            aria-label="Send message"
                        >
                            <Send size={20} className={message.trim() ? "translate-x-0.5 translate-y-[-0.5px]" : ""} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;