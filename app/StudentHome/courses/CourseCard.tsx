import React, { useEffect, useState, useCallback } from 'react';
import { ChevronRight, Star, Users, Code, Clock, LucideIcon } from 'lucide-react';
import { CourseCategory } from './courseCategoriesData';
import Link from 'next/link';

interface CourseCardProps {
    category: CourseCategory;
    index: number;
    hoveredCard: number | null;
    setHoveredCard: (index: number | null) => void;
}

interface StatBadgeProps {
    icon: LucideIcon;
    value: string;
    label: string;
}

const useAdvancedScrollAnimation = (index: number): void => {
    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-slide-up');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                    }, index * 150);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll(`.scroll-animate-${index}`);
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [index]);
};

const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, value, label }) => (
    <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span className="text-xs font-medium truncate">{value}</span>
        {label && <span className="text-xs opacity-80 hidden sm:inline">{label}</span>}
    </div>
);

const CourseCard: React.FC<CourseCardProps> = ({ category, index, hoveredCard, setHoveredCard }) => {
    useAdvancedScrollAnimation(index);
    const IconComponent = category.icon;
    const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});
    const [isHovered, setIsHovered] = useState(false);

    // Memoize the unique key creation to prevent unnecessary re-renders
    const createUniqueKey = useCallback((subTitle: string) => {
        return `${category.title}-${subTitle}`;
    }, [category.title]);

    const toggleSubcategory = useCallback((subTitle: string) => {
        const uniqueKey = createUniqueKey(subTitle);
        console.log(`Toggling key: ${uniqueKey}`);
        
        setExpandedSubcategories((prev) => {
            const newState = {
                ...prev,
                [uniqueKey]: !prev[uniqueKey]
            };
            console.log(`New expanded state for ${uniqueKey}:`, newState[uniqueKey]);
            return newState;
        });
    }, [createUniqueKey]);

    const handleCardClick = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
        const target = e.target as HTMLElement;
        
        // Check if click is on any interactive element or their children
        if (target.closest('button') || 
            target.closest('a') || 
            target.closest('[data-toggle="true"]') || 
            target.closest('[data-course-item="true"]') ||
            target.closest('[data-no-navigation="true"]')) {
            console.log('Click on interactive element, skipping card navigation');
            e.stopPropagation();
            return;
        }
        
        // Only navigate if clicked on the card background/empty areas
        console.log(`Navigating to ${category.title} courses`);
        // Example: router.push(`/courses/${category.title.toLowerCase().replace(/\s+/g, '-')}`);
    }, [category.title]);

    const handleCourseClick = useCallback((e: React.MouseEvent | React.KeyboardEvent, course: string) => {
        e.stopPropagation();
        console.log(`Clicked on course: ${course}`);
        // Example: router.push(`/course/${course.toLowerCase().replace(/\s+/g, '-')}`);
    }, []);

    const handleStartLearning = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        console.log(`Start learning ${category.title}`);
        // Example: router.push(`/courses/${category.title.toLowerCase().replace(/\s+/g, '-')}/start`);
    }, [category.title]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        setHoveredCard(index);
    }, [index, setHoveredCard]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setHoveredCard(null);
    }, [setHoveredCard]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            action();
        }
    }, []);

    // Handle toggle button click - Enhanced version
    const handleToggleClick = useCallback((e: React.MouseEvent, subTitle: string) => {
        console.log(`🔘 Toggle button clicked for "${subTitle}"`);
        console.log(`🔘 Event target:`, e.target);
        console.log(`🔘 Current expanded state:`, expandedSubcategories);
        
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        
        toggleSubcategory(subTitle);
    }, [toggleSubcategory, expandedSubcategories]);

    // Handle toggle button keyboard interaction
    const handleToggleKeyDown = useCallback((e: React.KeyboardEvent, subTitle: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            console.log(`⌨️ Keyboard toggle for "${subTitle}"`);
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            toggleSubcategory(subTitle);
        }
    }, [toggleSubcategory]);

    return (
        <div
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`scroll-animate-${index} opacity-0 translate-y-12 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 group cursor-pointer relative transform hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98]`}
            style={{
                animationDelay: `${index * 100}ms`
            }}
            role="button"
            tabIndex={0}
            aria-label={`${category.title} course category`}
            onKeyDown={(e) => handleKeyDown(e, () => handleCardClick(e))}
        >
            {/* Hover overlay */}
            <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-5' : ''}`}
                style={{
                    background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`
                }}
            />

            {/* Header section */}
            <div
                className="px-4 sm:px-6 py-4 sm:py-6 text-white relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`
                }}
            >
                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <div
                            className={`p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0 transition-transform duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`}
                        >
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-lg sm:text-xl font-bold leading-tight truncate">{category.title}</h2>
                            <div className="flex items-center space-x-1 mt-1">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current flex-shrink-0" />
                                <span className="text-xs sm:text-sm font-medium">{category.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
                    <StatBadge icon={Users} value={category.students} label="students" />
                    <StatBadge icon={Code} value={category.courses} label="courses" />
                    <StatBadge icon={Clock} value={category.duration} label="" />
                </div>

                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 opacity-20">
                    <div
                        className={`w-full h-full rounded-full border border-white/30 transition-all duration-1000 ease-in-out ${hoveredCard === index ? 'animate-spin scale-110' : ''}`}
                    />
                </div>
            </div>

            {/* Content section */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6" data-no-navigation="true">
                {Object.entries(category.sub).map(([subTitle, courses]) => {
                    const uniqueKey = createUniqueKey(subTitle);
                    const isExpanded = expandedSubcategories[uniqueKey] || false;
                    const displayedCourses = isExpanded ? courses : courses.slice(0, 4);
                    
                    return (
                        <div key={uniqueKey} data-no-navigation="true">
                            <h3 className="text-base sm:text-lg font-semibold text-[#0D4C5B] mb-2 sm:mb-3 flex items-center">
                                <span
                                    className={`w-2 h-2 rounded-full mr-2 sm:mr-3 flex-shrink-0 transition-all duration-500 ${hoveredCard === index ? 'scale-125 animate-pulse' : ''}`}
                                    style={{ backgroundColor: category.color }}
                                />
                                <span className="truncate">{subTitle}</span>
                            </h3>
                            <div className="grid gap-1.5 sm:gap-2" data-no-navigation="true">
                                {displayedCourses.map((course: string, courseIndex: number) => (
                                    <div
                                        key={`${uniqueKey}-course-${courseIndex}`}
                                        data-course-item="true"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCourseClick(e, course);
                                        }}
                                        className="text-gray-700 hover:text-[#1887A1] cursor-pointer transition-all duration-300 flex items-center group/item p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 hover:translate-x-1 transform opacity-0 animate-fade-in"
                                        style={{
                                            animationDelay: `${courseIndex * 100}ms`,
                                            animationFillMode: 'forwards'
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => handleKeyDown(e, () => handleCourseClick(e, course))}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-[#1887A1] transition-colors duration-300 mr-2 sm:mr-3 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1 truncate">
                                            {course}
                                        </span>
                                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0 group-hover/item:translate-x-1" />
                                    </div>
                                ))}
                                
                                {/* Toggle button for showing more/fewer courses - ENHANCED FIX */}
                                {courses.length > 4 && (
                                    <div className="pt-1 sm:pt-2" data-no-navigation="true">
                                        <div 
                                            className="relative"
                                            onClick={(e) => {
                                                handleToggleClick(e, subTitle);
                                            }}
                                        >
                                            <button
                                                type="button"
                                                data-toggle="true"
                                                onClick={(e) => {
                                                    handleToggleClick(e, subTitle);
                                                }}
                                                onKeyDown={(e) => handleToggleKeyDown(e, subTitle)}
                                                className="text-xs sm:text-sm text-gray-500 font-medium hover:text-[#1887A1] transition-colors duration-300 text-left transform hover:scale-105 active:scale-95 focus:outline-none focus:text-[#1887A1] cursor-pointer bg-transparent border-none p-3 rounded hover:bg-gray-100 w-full relative z-10"
                                                aria-label={isExpanded ? `Collapse ${subTitle} courses` : `Show ${courses.length - 4} more ${subTitle} courses`}
                                                tabIndex={0}
                                                style={{ 
                                                    minHeight: '44px',
                                                    display: 'block',
                                                    position: 'relative',
                                                    zIndex: 10
                                                }}
                                            >
                                                <span className="block">
                                                    {isExpanded ? ' Show fewer courses' : ` ${courses.length - 4} more courses`}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Start Learning button */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6" data-no-navigation="true">
                <Link href="/SetudentProfile">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleStartLearning(e);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, () => handleStartLearning(e))}
                        className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-[#0D4C5B] bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#1887A1] hover:to-[#0D4C5B] hover:text-white transition-all duration-300 ease-out shadow-md hover:shadow-lg border border-gray-200 hover:border-transparent flex items-center justify-center space-x-2 group text-sm sm:text-base transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1887A1] focus:ring-offset-2"
                        aria-label={`Start learning ${category.title} courses`}
                        type="button"
                    >
                        <span>Start Learning</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </Link>
            </div>

            {/* Hover overlay effect */}
            <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CourseCard;