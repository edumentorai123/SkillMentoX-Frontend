export interface Mentor {
    id: number;
    name: string;
    image: string;
    expertise: string;
    bio: string;
    rating: number;
    students: number;
    specialties: string[];
    experience: string;
    location: string;
    hourlyRate: number;
    languages: string[];
    availability: string[];
    achievements: string[];
    fullBio: string;
}

export interface BookingData {
    mentorId: number | undefined;
    date: string;
    time: string;
    sessionType: string;
    duration: number;
    message: string;
    totalCost: number;
}