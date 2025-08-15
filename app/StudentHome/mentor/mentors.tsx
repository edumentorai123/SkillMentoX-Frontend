'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Star, BookOpen } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MentorCard from './MentorCard';

// Mentor data interface
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

// Hardcoded mentors data
const mentorsData: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/mentors/sarah-johnson.jpg",
    expertise: "Full Stack Developer",
    bio: "10+ years building scalable web applications with React, Node.js, and cloud technologies. Passionate about mentoring junior developers.",
    rating: 4.9,
    students: 156,
    specialties: ["React", "Node.js", "AWS", "TypeScript"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    image: "/mentors/michael-chen.jpg",
    expertise: "AI/ML Specialist",
    bio: "PhD in Computer Science with expertise in machine learning, deep learning, and AI ethics. Former Google AI researcher.",
    rating: 4.8,
    students: 203,
    specialties: ["Python", "TensorFlow", "PyTorch", "Data Science"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: "/mentors/emily-rodriguez.jpg",
    expertise: "UX/UI Designer",
    bio: "Award-winning designer with 8 years creating user-centered experiences for Fortune 500 companies and innovative startups.",
    rating: 4.9,
    students: 127,
    specialties: ["Figma", "Design Systems", "User Research", "Prototyping"]
  },
  {
    id: 4,
    name: "James Wilson",
    image: "/mentors/james-wilson.jpg",
    expertise: "DevOps Engineer",
    bio: "Cloud infrastructure expert specializing in Kubernetes, Docker, and CI/CD pipelines. Helped scale systems to millions of users.",
    rating: 4.7,
    students: 89,
    specialties: ["Kubernetes", "Docker", "AWS", "Terraform"]
  },
  {
    id: 5,
    name: "Priya Sharma",
    image: "/mentors/priya-sharma.jpg",
    expertise: "Mobile App Developer",
    bio: "React Native and Flutter specialist with 50+ published apps. Expert in cross-platform development and app store optimization.",
    rating: 4.8,
    students: 174,
    specialties: ["React Native", "Flutter", "iOS", "Android"]
  },
  {
    id: 6,
    name: "David Kim",
    image: "/mentors/david-kim.jpg",
    expertise: "Cybersecurity Expert",
    bio: "Ethical hacker and security consultant with CISSP certification. Specializes in penetration testing and security architecture.",
    rating: 4.9,
    students: 98,
    specialties: ["Penetration Testing", "Security Auditing", "Compliance", "Risk Assessment"]
  },
  {
    id: 7,
    name: "Lisa Thompson",
    image: "/mentors/lisa-thompson.jpg",
    expertise: "Product Manager",
    bio: "Strategic product leader with experience launching products that generated $100M+ revenue. Expert in agile methodologies and user analytics.",
    rating: 4.8,
    students: 142,
    specialties: ["Product Strategy", "Agile", "Analytics", "User Research"]
  },
  {
    id: 8,
    name: "Ahmed Hassan",
    image: "/mentors/ahmed-hassan.jpg",
    expertise: "Blockchain Developer",
    bio: "Blockchain architect with deep expertise in Ethereum, Solidity, and DeFi protocols. Built multiple successful dApps and smart contracts.",
    rating: 4.7,
    students: 76,
    specialties: ["Solidity", "Web3", "Smart Contracts", "DeFi"]
  }
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMentors, setFilteredMentors] = useState(mentorsData);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter mentors based on search term
  useEffect(() => {
    const filtered = mentorsData.filter(mentor =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredMentors(filtered);
  }, [searchTerm]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#1887A1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0D4C5B] font-medium">Loading amazing mentors...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="inline-block p-4 bg-white/10 rounded-full mb-6"
            >
              <Users className="w-12 h-12" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Meet Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Expert Mentors
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Learn from industry professionals who have walked the path you want to take. 
              Get personalized guidance and accelerate your career growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>4.8+ Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span>1000+ Students Mentored</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-300" />
                <span>25+ Expertise Areas</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, expertise, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#1887A1] focus:outline-none transition-colors duration-300 text-lg font-medium placeholder-gray-400"
              />
            </div>
            
            {searchTerm && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-4 text-gray-600"
              >
                Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                <MentorCard mentor={mentor} />
              </motion.div>
            ))}
          </motion.div>

          {filteredMentors.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No mentors found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or browse all our amazing mentors.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-3 bg-[#1887A1] text-white rounded-lg font-medium hover:bg-[#0D4C5B] transition-colors duration-300"
              >
                Show All Mentors
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with personalized mentorship from industry experts.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1887A1] rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}