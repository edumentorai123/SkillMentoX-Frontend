import React from 'react';
import { Filter } from 'lucide-react';

interface StudentDoubtsSectionProps {
    studentDoubts: Array<{ id: number; student: string; subject: string; time: string; priority: string; message: string }>;
}

export default function StudentDoubtsSection({ studentDoubts }: StudentDoubtsSectionProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">Student Doubts</h2>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                            Mark All Read
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <span className="ml-2 sm:hidden">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {studentDoubts.map((doubt) => (
                        <div key={doubt.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                            {doubt.student.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{doubt.student}</h4>
                                            <p className="text-sm text-gray-500">{doubt.time}</p>
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-gray-900 mb-1">{doubt.subject}</h3>
                                    <p className="text-gray-600 text-sm">{doubt.message}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xs px-3 py-1 rounded-full ${doubt.priority === 'high' ? 'bg-red-100 text-red-600' :
                                            doubt.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-green-100 text-green-600'
                                        }`}>
                                        {doubt.priority}
                                    </span>
                                    <button className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}