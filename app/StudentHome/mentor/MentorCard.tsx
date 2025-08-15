'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Users, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Mentor {
  id: number;
  name: string;
  image: string;
  expertise: string;
  bio: string;
  rating: number;
  students: number;
  specialties: string[];
}

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#1887A1]/5 to-[#0D4C5B]/5 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Image section */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={imageError ? '/mentors/placeholder-mentor.jpg' : mentor.image}
            alt={mentor.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Rating badge */}
        <motion.div
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{mentor.rating}</span>
        </motion.div>

        {/* Online indicator */}
        <motion.div
          className="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Name and expertise */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#1887A1] transition-colors duration-300">
            {mentor.name}
          </h3>
          <p className="text-[#1887A1] font-semibold text-lg mb-3">
            {mentor.expertise}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {mentor.bio}
        </motion.p>

        {/* Specialties */}
        <motion.div
          className="mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {mentor.specialties.slice(0, 3).map((specialty, index) => (
              <motion.span
                key={specialty}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-[#1887A1] hover:text-white transition-colors duration-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                {specialty}
              </motion.span>
            ))}
            {mentor.specialties.length > 3 && (
              <span className="px-3 py-1 bg-[#1887A1] text-white text-xs rounded-full font-medium">
                +{mentor.specialties.length - 3}
              </span>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-between mb-6 text-sm text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{mentor.students} students</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>Available</span>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="w-full bg-[#1887A1] text-white py-3 rounded-xl font-semibold hover:bg-[#0D4C5B] transition-all duration-300 flex items-center justify-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Book a Session</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          
          <motion.button
            className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:border-[#1887A1] hover:text-[#1887A1] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Profile
          </motion.button>
        </motion.div>
      </div>

      {/* Hover effect border */}
      <motion.div
        className="absolute inset-0 border-2 border-[#1887A1] rounded-2xl opacity-0 pointer-events-none"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating action on hover */}
      <motion.div
        className="absolute -top-2 -right-2 w-10 h-10 bg-[#1887A1] text-white rounded-full flex items-center justify-center shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: isHovered ? 1 : 0,
          rotate: isHovered ? 0 : -180
        }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}