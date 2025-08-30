'use client'

import { useState } from "react";
import DashboardSection from "./DashboardSection";
import MyStudentsSection from "./MyStudentsSection";
import PerformanceSection from "./PerformanceSection";
import ProfileSection from "./ProfileSection";
import SessionsSection from "./SessionsSection";
import SettingsSection from "./SettingsSection";
import StudentDoubtsSection from "./StudentDoubtsSection";
import TotalRevenueSection from "./TotalRevenueSection";
import { mentorStats, myStudents, performanceData, pieChartData, revenueBreakdown, sessionData, studentDoubts } from "./DashboardData";
import Header from "./Header";
import Sidebar from "./Sidebar";


export default function StudentMentorDashboard() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardSection mentorStats={mentorStats} studentDoubts={studentDoubts} revenueBreakdown={revenueBreakdown} />;
            case 'student-doubts':
                return <StudentDoubtsSection studentDoubts={studentDoubts} />;
            case 'total-revenue':
                return <TotalRevenueSection revenueBreakdown={revenueBreakdown} pieChartData={pieChartData} />;
            case 'my-students':
                return <MyStudentsSection myStudents={myStudents} />;
            case 'sessions':
                return <SessionsSection sessionData={sessionData} />;
            case 'performance':
                return <PerformanceSection performanceData={performanceData} />;
            case 'profile':
                return <ProfileSection />;
            case 'settings':
                return <SettingsSection />;
            default:
                return (
                    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}</h2>
                        <p className="text-gray-600">This section is under development...</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex">
                <Sidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    sidebarCollapsed={sidebarCollapsed}
                    setSidebarCollapsed={setSidebarCollapsed}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                <div className="flex-1 min-h-screen">
                    <Header setMobileMenuOpen={setMobileMenuOpen} />
                    <main className="p-4 lg:p-6 bg-gray-50 min-h-screen">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
}