'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
    BookOpen,
    Users,
    Target,
    Award,
    Heart,
    Star,
    TrendingUp,
    Lightbulb,
    GraduationCap,
    ArrowRight,
    CheckCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const AboutPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut' as const // Explicitly type as Easing
            }
        }
    }

    const features = [
        {
            icon: BookOpen,
            title: "Personalized Learning",
            description: "AI-powered learning paths tailored to your unique goals and learning style.",
            color: "bg-blue-500"
        },
        {
            icon: Users,
            title: "Expert Mentors",
            description: "Connect with industry professionals and experienced educators.",
            color: "bg-green-500"
        },
        {
            icon: Target,
            title: "Goal-Oriented",
            description: "Clear roadmaps and milestones to track your progress effectively.",
            color: "bg-purple-500"
        },
        {
            icon: Award,
            title: "Proven Success",
            description: "95% of our students achieve their academic and career objectives.",
            color: "bg-orange-500"
        }
    ]

    const values = [
        {
            title: "Excellence",
            description: "We strive for the highest quality in education and mentorship.",
            icon: Star
        },
        {
            title: "Innovation",
            description: "Leveraging cutting-edge AI technology for personalized learning.",
            icon: Lightbulb
        },
        {
            title: "Community",
            description: "Building a supportive network of learners and mentors.",
            icon: Heart
        },
        {
            title: "Growth",
            description: "Fostering continuous development and skill enhancement.",
            icon: TrendingUp
        }
    ]

    const mentors = [
        {
            name: "Dr. Sarah Chen",
            role: "AI Research Scientist",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format",
            expertise: "Machine Learning & Data Science"
        },
        {
            name: "Prof. Michael Rodriguez",
            role: "Software Engineering Lead",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format",
            expertise: "Full-Stack Development"
        },
        {
            name: "Dr. Emily Johnson",
            role: "Product Management Expert",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format",
            expertise: "Product Strategy & Leadership"
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#1887A1] to-[#0D4C5B] text-white">
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Background Decorations */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full"></div>

                <motion.div
                    className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants} className="text-center lg:text-left">
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                                variants={itemVariants}
                            >
                                About{' '}
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    SkillMentorX
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-xl lg:text-2xl text-blue-100 mb-6"
                                variants={itemVariants}
                            >
                                Empowering Students Through AI-Powered Mentorship
                            </motion.p>

                            <motion.p
                                className="text-lg text-blue-200 mb-8 leading-relaxed max-w-2xl"
                                variants={itemVariants}
                            >
                                We combine cutting-edge artificial intelligence with human expertise to provide
                                personalized mentorship that transforms students into industry-ready professionals.
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                variants={itemVariants}
                            >
                                <Link href="/SetupProfile">
                                <button
                                    className="bg-white text-[#1887A1] px-8 cursor-pointer py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2 group"
                                    aria-label="Get started with SkillMentorX"
                                >
                                    Get Started Today
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                </Link>
                                <button
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#1887A1] transition-colors duration-300"
                                    aria-label="Learn more about SkillMentorX"
                                >
                                    Learn More
                                </button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex justify-center lg:justify-end"
                            variants={itemVariants}
                        >
                            <div className="relative">
                                <div className="w-80 h-80 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <div className="w-60 h-60 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                        <GraduationCap className="w-24 h-24 text-[#1887A1]" />
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Our Mission & Vision
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Transforming education through personalized mentorship and innovative technology
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-8 border border-[#1887A1]/10"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="w-16 h-16 bg-[#1887A1]/10 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-[#1887A1]" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To democratize quality mentorship by making personalized guidance accessible
                                to every student, regardless of their background or location. We believe that
                                with the right support, every student can achieve their full potential.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-8 border border-[#0D4C5B]/10"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="w-16 h-16 bg-[#0D4C5B]/10 rounded-2xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-8 h-8 text-[#0D4C5B]" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To become the global leader in AI-powered educational mentorship, creating
                                a world where every student has access to personalized guidance that
                                accelerates their learning journey and career success.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Why Choose SkillMentorX?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the perfect blend of AI technology and human expertise
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 lg:px-8 bg-[#0D4C5B]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
                                data-aos="zoom-in"
                                data-aos-delay={index * 150}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div className="w-12 h-12 bg-[#1887A1]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-6 h-6 text-[#1887A1]" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Mentors Section */}
            <section className="py-20 px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Meet Our Expert Mentors
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Learn from industry leaders and experienced professionals
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {mentors.map((mentor, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div className="h-64 overflow-hidden">
                                    <Image
                                        src={mentor.image}
                                        alt={mentor.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-[#1887A1] font-medium mb-3">
                                        {mentor.role}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {mentor.expertise}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-4 gap-8 mt-16" data-aos="fade-up">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#1887A1] mb-2">10,000+</div>
                            <div className="text-gray-600">Students Mentored</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#0D4C5B] mb-2">500+</div>
                            <div className="text-gray-600">Expert Mentors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                            <div className="text-gray-600">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                            <div className="text-gray-600">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-[#1887A1] to-[#0D4C5B]">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Future?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Join thousands of students who have accelerated their careers with SkillMentorX.
                        Start your personalized mentorship journey today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <div className="flex items-center text-white">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                            <span>Free 7-day trial</span>
                        </div>
                        <div className="flex items-center text-white">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center text-white">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/SetupProfile">
                        <button
                            className="bg-white text-[#1887A1] px-10 py-4 cursor-pointer rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2 group"
                            aria-label="Start your mentorship journey with SkillMentorX"
                        >
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        </Link>
                        <button
                            className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#1887A1] transition-colors duration-300"
                            aria-label="Schedule a demo with SkillMentorX"
                        >
                            Schedule Demo
                        </button>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}

export default AboutPage