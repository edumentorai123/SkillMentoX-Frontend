"use client"

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Code, 
  Brain, 
  Shield, 
  Smartphone, 
  Cloud, 
  Database,
  ChevronRight,
  Star,
  Clock,
  Users,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';

// Define proper TypeScript interfaces
interface CourseCategory {
  title: string;
  color: string;
  icon: LucideIcon;
  students: string;
  courses: string;
  duration: string;
  rating: number;
  sub: Record<string, string[]>;
}

interface StatBadgeProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

const courseCategories: CourseCategory[] = [
  {
    title: "Web Development",
    color: "#1887A1",
    icon: Code,
    students: "15,420",
    courses: "24",
    duration: "3-6 months",
    rating: 4.8,
    sub: {
      "Frontend": [
        "HTML & CSS Fundamentals", 
        "JavaScript ES6+", 
        "React.js & Hooks", 
        "Next.js 14", 
        "Vue.js 3", 
        "Angular 16", 
        "Tailwind CSS"
      ],
      "Backend": [
        "Node.js & Express", 
        "NestJS Framework", 
        "Django & REST APIs", 
        "Spring Boot"
      ],
      "Full Stack": [
        "MERN Stack Complete", 
        "MEAN Stack", 
        "Next.js + Prisma + PostgreSQL"
      ]
    }
  },
  {
    title: "AI / Machine Learning",
    color: "#8B5CF6",
    icon: Brain,
    students: "12,890",
    courses: "18",
    duration: "4-8 months",
    rating: 4.9,
    sub: {
      "Machine Learning": [
        "Python for AI/ML",
        "NumPy, Pandas & Matplotlib",
        "Scikit-learn Mastery",
        "TensorFlow & Keras",
        "PyTorch Deep Learning"
      ],
      "Deep Learning": [
        "Neural Networks",
        "CNNs & Computer Vision",
        "RNNs & NLP",
        "Transformers & BERT"
      ],
      "Generative AI": [
        "LangChain Development",
        "OpenAI API Integration",
        "Custom AI Applications"
      ]
    }
  },
  {
    title: "Cybersecurity",
    color: "#EF4444",
    icon: Shield,
    students: "8,750",
    courses: "16",
    duration: "3-5 months",
    rating: 4.7,
    sub: {
      "Security Fundamentals": [
        "Cybersecurity Basics",
        "Network Security",
        "Cryptography",
        "Security Frameworks"
      ],
      "Ethical Hacking": [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Web App Security",
        "Mobile Security"
      ],
      "Cloud Security": [
        "AWS Security",
        "Azure Security",
        "Incident Response"
      ]
    }
  },
  {
    title: "Mobile Development",
    color: "#10B981",
    icon: Smartphone,
    students: "11,200",
    courses: "14",
    duration: "2-4 months",
    rating: 4.6,
    sub: {
      "Cross-Platform": [
        "Flutter Development",
        "React Native",
        "Dart Programming"
      ],
      "Native iOS": [
        "Swift Programming",
        "UIKit & SwiftUI",
        "Core Data"
      ],
      "Native Android": [
        "Kotlin Development",
        "Android Jetpack",
        "Room Database"
      ]
    }
  },
  {
    title: "Cloud & DevOps",
    color: "#F59E0B",
    icon: Cloud,
    students: "9,650",
    courses: "20",
    duration: "4-6 months",
    rating: 4.8,
    sub: {
      "Cloud Platforms": [
        "AWS Fundamentals",
        "Azure Essentials",
        "Google Cloud Platform"
      ],
      "DevOps Tools": [
        "Docker & Containers",
        "Kubernetes",
        "CI/CD Pipelines",
        "Jenkins & GitLab"
      ],
      "Infrastructure": [
        "Terraform",
        "Ansible",
        "Monitoring & Logging"
      ]
    }
  },
  {
    title: "Data Engineering",
    color: "#6366F1",
    icon: Database,
    students: "7,420",
    courses: "12",
    duration: "3-5 months",
    rating: 4.7,
    sub: {
      "Databases": [
        "SQL Mastery",
        "NoSQL Databases",
        "Database Design"
      ],
      "Big Data": [
        "Apache Hadoop",
        "Apache Spark",
        "Data Warehousing"
      ],
      "Data Pipelines": [
        "Apache Airflow",
        "Apache Kafka",
        "ETL Processes"
      ]
    }
  }
];

// Enhanced scroll animation hook
const useAdvancedScrollAnimation = (): void => {
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }, index * 150);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const CourseCategories: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  useAdvancedScrollAnimation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, value, label }) => (
    <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
      <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      <span className="text-xs font-medium truncate">{value}</span>
      {label && <span className="text-xs opacity-80 hidden sm:inline">{label}</span>}
    </div>
  );

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-20 px-3 sm:px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              ✨ 50,000+ Students Enrolled
            </span>
          </motion.div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#0D4C5B] mb-4 sm:mb-6 leading-tight px-2">
            Master <span className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] bg-clip-text text-transparent">In-Demand</span> Skills
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Choose from our expertly curated courses designed by industry professionals. 
            Build real projects, earn certificates, and advance your career with hands-on learning.
          </p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {courseCategories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="scroll-animate opacity-0 translate-y-12 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 group cursor-pointer relative"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Animated background gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)` 
                  }}
                />

                {/* Card Header */}
                <div 
                  className="px-4 sm:px-6 py-4 sm:py-6 text-white relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` 
                  }}
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0"
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg sm:text-xl font-bold leading-tight truncate">{category.title}</h2>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">{category.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
                    <StatBadge icon={Users} value={category.students} label="students" />
                    <StatBadge icon={Code} value={category.courses} label="courses" />
                    <StatBadge icon={Clock} value={category.duration} label="" />
                  </div>

                  {/* Animated particles */}
                  <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 opacity-20">
                    <motion.div
                      animate={{
                        rotate: hoveredCard === index ? 360 : 0,
                        scale: hoveredCard === index ? 1.1 : 1
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border border-white/30"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {Object.entries(category.sub).map(([subTitle, courses]) => (
                    <div key={subTitle}>
                      <h3 className="text-base sm:text-lg font-semibold text-[#0D4C5B] mb-2 sm:mb-3 flex items-center">
                        <motion.span 
                          className="w-2 h-2 rounded-full mr-2 sm:mr-3 flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                          animate={{ scale: hoveredCard === index ? [1, 1.3, 1] : 1 }}
                          transition={{ duration: 0.5, repeat: hoveredCard === index ? Infinity : 0 }}
                        />
                        <span className="truncate">{subTitle}</span>
                      </h3>
                      <div className="grid gap-1.5 sm:gap-2">
                        {courses.slice(0, 4).map((course: string, courseIndex: number) => (
                          <motion.div
                            key={courseIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: courseIndex * 0.1 }}
                            whileHover={{ x: 4, scale: 1.02 }}
                            className="text-gray-700 hover:text-[#1887A1] cursor-pointer transition-all duration-300 flex items-center group/item p-1.5 sm:p-2 rounded-lg hover:bg-gray-50"
                          >
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-[#1887A1] transition-colors duration-300 mr-2 sm:mr-3 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1 truncate">
                              {course}
                            </span>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                          </motion.div>
                        ))}
                        {courses.length > 4 && (
                          <div className="text-xs sm:text-sm text-gray-500 font-medium pt-1 sm:pt-2">
                            +{courses.length - 4} more courses
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Card Footer */}
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-[#0D4C5B] bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#1887A1] hover:to-[#0D4C5B] hover:text-white transition-all duration-300 ease-out shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent flex items-center justify-center space-x-2 group text-sm sm:text-base"
                  >
                    <span>Start Learning</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 cursor-pointer" />
                  </motion.button>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12 sm:mt-20"
        >
          <div className="bg-gradient-to-r from-[#1887A1] to-[#0D4C5B] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-white rounded-full -translate-x-10 sm:-translate-x-20 -translate-y-10 sm:-translate-y-20" />
              <div className="absolute bottom-0 right-0 w-30 sm:w-60 h-30 sm:h-60 bg-white rounded-full translate-x-15 sm:translate-x-30 translate-y-15 sm:translate-y-30" />
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                Ready to Transform Your Career?
              </motion.h3>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                Join over 50,000 students who have already started their journey to success
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
              >
                <Link href="/SetupProfile">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 sm:space-x-3 cursor-pointer px-6 sm:px-8 md:px-12 py-3 sm:py-4 bg-white text-[#1887A1] font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                  >
                    <span>Start Your Journey</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.25, 0.25, 0, 1) forwards;
        }
        
        .scroll-animate {
          transition: all 0.8s cubic-bezier(0.25, 0.25, 0, 1);
        }

        /* Enhanced hover effects */
        .group:hover .absolute {
          transform: scale(1.1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #1887A1;
          border-radius: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .grid {
            gap: 1rem;
          }
          
          /* Prevent horizontal scroll */
          body {
            overflow-x: hidden;
          }
          
          /* Better touch targets */
          button, a {
            min-height: 44px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-cols-2 > * {
            min-height: 500px;
          }
        }
      `}</style>
    </section>
  );
};

export default CourseCategories;