import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PerformanceSectionProps {
    performanceData: Array<{ month: string; sessionCount: number; rating: number; earnings: number }>;
}

export default function PerformanceSection({ performanceData }: PerformanceSectionProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Rating</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold" style={{ color: '#1887A1' }}>4.8</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < 4.8 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">+0.2 from last month</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Sessions</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold" style={{ color: '#0D4C5B' }}>240</span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">+15 from last month</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold" style={{ color: '#4A90A4' }}>96%</span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">+2% from last month</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="sessionCount" stroke="#1887A1" strokeWidth={3} dot={{ fill: '#1887A1' }} />
                            <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#0D4C5B" strokeWidth={3} dot={{ fill: '#0D4C5B' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#1887A1' }}></div>
                        <span className="text-sm text-gray-600">Session Count</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#0D4C5B' }}></div>
                        <span className="text-sm text-gray-600">Average Rating</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Student Feedback</h3>
                <div className="space-y-4">
                    {[
                        { student: 'Alex Johnson', rating: 5, comment: 'Excellent explanation of React concepts. Very patient and knowledgeable.', date: '2 days ago' },
                        { student: 'Sarah Wilson', rating: 4, comment: 'Good session on JavaScript. Would like more practical examples.', date: '3 days ago' },
                        { student: 'Mike Chen', rating: 5, comment: 'Amazing CSS workshop! Finally understood flexbox and grid.', date: '1 week ago' }
                    ].map((feedback, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                        {feedback.student.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="font-medium text-gray-900">{feedback.student}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`text-sm ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{feedback.date}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">{feedback.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}