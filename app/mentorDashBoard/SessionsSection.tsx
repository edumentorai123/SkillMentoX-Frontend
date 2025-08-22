import React from 'react';

interface SessionsSectionProps {
    sessionData: Array<{
        id: number;
        student: string;
        subject: string;
        date: string;
        time: string;
        duration: string;
        status: string;
        rating: number | null;
    }>;
}

export default function SessionsSection({ sessionData }: SessionsSectionProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">Sessions</h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                        Schedule New Session
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
                                <th className="text-left py-3 px-4 font-medium text i-gray-600">Subject</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessionData.map((session) => (
                                <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                                {session.student.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-gray-900">{session.student}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{session.subject}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                        <div>{session.date}</div>
                                        <div className="text-sm text-gray-500">{session.time}</div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{session.duration}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${session.status === 'Completed'
                                                    ? 'bg-green-100 text-green-600'
                                                    : session.status === 'Scheduled'
                                                        ? 'bg-blue-100 text-blue-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {session.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {session.rating != null ? (
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-sm ${i < (session.rating as number) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span className="ml-1 text-sm text-gray-600">({session.rating})</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Not rated</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            {session.status === 'Completed' ? 'View Details' : 'Edit'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}