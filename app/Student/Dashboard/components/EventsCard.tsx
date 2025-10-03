import React from "react";
import { Calendar } from "lucide-react";

interface Event {
    title: string;
    subtitle: string;
    time: string;
    color: string;
    icon: React.ElementType;
    urgent: boolean;
}

interface EventsCardProps {
    events: Event[];
}

const EventsCard: React.FC<EventsCardProps> = ({ events }) => {
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-up delay-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#1887A1]" />
                    Upcoming Events
                </h3>
                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold animate-pulse">
                    {events.filter((ev) => {
                        const timeLower = ev.time.toLowerCase();
                        return timeLower.includes("today") || !isNaN(Date.parse(ev.time));
                    }).length} Today
                </span>
            </div>
            <div className="space-y-3">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-l-4 border-transparent hover:border-[#1887A1] group cursor-pointer transform hover:scale-102 ${event.urgent ? "animate-pulse" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg group-hover:scale-110 transition-all duration-300`}>
                                        <event.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="font-semibold text-gray-800 text-sm block truncate">{event.title}</span>
                                        <div className="text-xs text-gray-600 truncate">{event.subtitle}</div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${event.color} text-white whitespace-nowrap`}>
                                    {event.time}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-sm">No upcoming events. Check back later!</p>
                )}
            </div>
        </div>
    );
};

export default EventsCard;