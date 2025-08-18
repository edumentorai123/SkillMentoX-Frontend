"use client"

import { useState } from 'react';
import { Calendar, X, Video, Phone } from 'lucide-react';
import { Mentor, BookingData } from './types';
// import img from 'next/img';

interface BookingModalProps {
    mentor: Mentor | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (bookingData: BookingData) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ mentor, isOpen, onClose, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [sessionType, setSessionType] = useState('video');
    const [duration, setDuration] = useState('60');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bookingData: BookingData = {
            mentorId: mentor?.id,
            date: selectedDate,
            time: selectedTime,
            sessionType,
            duration: parseInt(duration),
            message,
            totalCost: mentor ? (mentor.hourlyRate * (parseInt(duration) / 60)) : 0
        };
        onConfirm(bookingData);
    };

    if (!isOpen || !mentor) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Book a Session</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 cursor-pointer" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <img
                            src={mentor.img}
                            alt={mentor.name}
                            // fill
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-semibold">{mentor.name}</h3>
                            <p className="text-[#1887A1] font-medium">{mentor.expertise}</p>
                            <p className="text-sm text-gray-600">${mentor.hourlyRate}/hour</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Date
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1887A1] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Time
                            </label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1887A1] focus:border-transparent"
                            >
                                <option value="">Choose time</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Session Type
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sessionType"
                                        value="video"
                                        checked={sessionType === 'video'}
                                        onChange={(e) => setSessionType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <Video className="w-4 h-4 mr-2" />
                                    Video Call
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sessionType"
                                        value="phone"
                                        checked={sessionType === 'phone'}
                                        onChange={(e) => setSessionType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <Phone className="w-4 h-4 mr-2" />
                                    Phone Call
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration
                            </label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1887A1] focus:border-transparent"
                            >
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message for mentor (optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            placeholder="Tell your mentor what you'd like to discuss..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1887A1] focus:border-transparent resize-none"
                        />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total Cost:</span>
                            <span className="text-[#1887A1]">
                                ₹ {mentor.hourlyRate * (parseInt(duration) / 60)}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-[#1887A1] cursor-pointer text-white rounded-lg hover:bg-[#0D4C5B] transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            Book Session
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;