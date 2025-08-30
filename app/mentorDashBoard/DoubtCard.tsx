import React from 'react';

interface DoubtCardProps {
    student: string;
    subject: string;
    time: string;
    priority: string;
}

export default function DoubtCard({ student, subject, time, priority }: DoubtCardProps) {
    return (
        <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{student}</span>
                <span className={`text-xs px-2 py-1 rounded-full transition-colors ${priority === 'high' ? 'bg-red-100 text-red-600 hover:bg-red-200' :
                        priority === 'medium' ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' :
                            'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}>
                    {priority}
                </span>
            </div>
            <p className="text-sm text-gray-600 truncate">{subject}</p>
            <p className="text-xs text-gray-500 mt-1">{time}</p>
        </div>
    );
}