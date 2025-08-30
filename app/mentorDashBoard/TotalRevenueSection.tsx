import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface TotalRevenueSectionProps {
    revenueBreakdown: Array<{ month: string; individual: number; group: number; workshops: number }>;
    pieChartData: Array<{ name: string; value: number; color: string }>;
}

export default function TotalRevenueSection({ revenueBreakdown, pieChartData }: TotalRevenueSectionProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[
                    { title: 'Total Revenue', amount: '$3,420', change: '+$240 this week', color: '#10B981' },
                    { title: 'Individual Sessions', amount: '$2,200', change: '64% of total', color: '#1887A1' },
                    { title: 'Group Sessions', amount: '$1,300', change: '38% of total', color: '#0D4C5B' },
                    { title: 'Workshops', amount: '$720', change: '21% of total', color: '#4A90A4' }
                ].map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
                        <p className="text-xl lg:text-2xl font-bold mt-2" style={{ color: item.color }}>{item.amount}</p>
                        <p className="text-xs mt-1" style={{ color: item.color }}>{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue Trends</h2>
                <div className="h-80 lg:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="individual" stroke="#1887A1" strokeWidth={3} dot={{ fill: '#1887A1' }} />
                            <Line type="monotone" dataKey="group" stroke="#0D4C5B" strokeWidth={3} dot={{ fill: '#0D4C5B' }} />
                            <Line type="monotone" dataKey="workshops" stroke="#4A90A4" strokeWidth={3} dot={{ fill: '#4A90A4' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
                <div className="h-64 lg:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-4">
                    {pieChartData.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}