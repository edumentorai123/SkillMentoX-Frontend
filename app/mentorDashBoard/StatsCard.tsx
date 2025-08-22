import React from 'react';

interface StatsCardProps {
    name: string;
    value: string | number;
    change: string;
    color: string;
    bgColor: string;
}

export default function StatsCard({ name, value, change, color, bgColor }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{name}</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`text-xs font-medium ${color} ${bgColor} px-3 py-1 rounded-full transition-colors`}>
                    {change}
                </div>
            </div>
        </div>
    );
}