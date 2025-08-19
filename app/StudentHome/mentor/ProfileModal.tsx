import { X, MapPin, Star, DollarSign, Award, Clock, Calendar } from 'lucide-react';
import { Mentor } from './types';
import Image from 'next/image';


interface ProfileModalProps {
    mentor: Mentor | null;
    isOpen: boolean;
    onClose: () => void;
    onBookSession: (mentor: Mentor) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ mentor, isOpen, onClose, onBookSession }) => {
    if (!isOpen || !mentor) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-t-2xl"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-white cursor-pointer" />
                    </button>
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
                            <Image
                                src={mentor.image}
                                alt={mentor.name}
                                fill
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{mentor.name}</h2>
                                <p className="text-xl text-[#1887A1] font-semibold mb-2">{mentor.expertise}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {mentor.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {mentor.rating} ({mentor.students} students)
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        ${mentor.hourlyRate}/hour
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => onBookSession(mentor)}
                                className="px-6 py-3 bg-[#1887A1] text-white rounded-lg hover:bg-[#0D4C5B] transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
                            >
                                <Calendar className="w-4 h-4" />
                                Book Session
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-6 pb-6 space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-700 leading-relaxed">{mentor.fullBio}</p>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                            {mentor.specialties.map((specialty) => (
                                <span
                                    key={specialty}
                                    className="px-3 py-1 bg-[#1887A1]/10 text-[#1887A1] rounded-full text-sm font-medium"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {mentor.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-[#1887A1]" />
                                    <span className="text-gray-700">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Availability</h3>
                        <div className="space-y-2">
                            {mentor.availability.map((time, timeIndex) => (
                                <div key={timeIndex} className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#1887A1]" />
                                    <span className="text-gray-700">{time}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {mentor.languages.map((language) => (
                                <span
                                    key={language}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                    {language}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;