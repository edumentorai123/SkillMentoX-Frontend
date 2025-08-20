import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import StatsCard from './StatsCard';
import DoubtCard from './DoubtCard';


interface DashboardSectionProps {
    mentorStats: Array<{ name: string; value: string | number; change: string; color: string; bgColor: string }>;
    studentDoubts: Array<{ id: number; student: string; subject: string; time: string; priority: string; message: string }>;
    revenueBreakdown: Array<{ month: string; individual: number; group: number; workshops: number }>;
}

export default function DashboardSection({ mentorStats, studentDoubts, revenueBreakdown }: DashboardSectionProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {mentorStats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Doubts</h3>
                    <div className="space-y-3">
                        {studentDoubts.slice(0, 4).map((doubt) => (
                            <DoubtCard key={doubt.id} {...doubt} />
                        ))}
                    </div>
                    <button className="w-full mt-4 text-blue-700 hover:text-blue-800 font-medium text-sm hover:bg-blue-50 py-2 rounded-lg transition-colors">
                        View All Doubts
                    </button>
                </div>

                <div className="xl:col-span-2 bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueBreakdown}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="individual" fill="#1887A1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="group" fill="#0D4C5B" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="workshops" fill="#4A90A4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 mt-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#1887A1' }}></div>
                            <span className="text-sm text-gray-600">Individual Sessions</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#0D4C5B' }}></div>
                            <span className="text-sm text-gray-600">Group Sessions</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#4A90A4' }}></div>
                            <span className="text-sm text-gray-600">Workshops</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105">
                        Schedule New
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[
                        { student: 'Alex Johnson', subject: 'React Advanced', time: 'Today 2:00 PM', duration: '1 hour' },
                        { student: 'Sarah Wilson', subject: 'JavaScript Concepts', time: 'Tomorrow 10:00 AM', duration: '45 mins' },
                        { student: 'Mike Chen', subject: 'CSS Workshop', time: 'Dec 22, 3:00 PM', duration: '2 hours' }
                    ].map((session, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-105">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{session.student}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{session.duration}</span>
                            </div>
                            <p className="text-sm font-medium mb-1" style={{ color: '#1887A1' }}>{session.subject}</p>
                            <p className="text-xs text-gray-500">{session.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}