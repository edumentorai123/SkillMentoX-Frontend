
'use client'
import { useState } from "react";
import DashboardSection from "./DashboardSection";
import MyStudentsSection from "./MyStudentsSection";
import PerformanceSection from "./Chat";
import ProfileSection from "./ProfileSection";
import SessionsSection from "./SessionsSection";
import StudentDoubtsSection from "./StudentDoubtsSection";
import { mentorStats, myStudents, performanceData, pieChartData, revenueBreakdown, sessionData, studentDoubts } from "./DashboardData";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function StudentMentorDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return <DashboardSection mentorStats={mentorStats} studentDoubts={studentDoubts} revenueBreakdown={revenueBreakdown} />;
    }
    if (activeSection === 'student-doubts') {
      return <StudentDoubtsSection studentDoubts={studentDoubts} />;
    }
    if (activeSection === 'my-students') {
      return <MyStudentsSection myStudents={myStudents} />;
    }
    if (activeSection === 'sessions') {
      return <SessionsSection sessionData={sessionData} />;
    }
    if (activeSection === 'performance') {
     
    }
    if (activeSection === 'profile') {
      return <ProfileSection />;
    }
    return (
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
        </h2>
        <p className="text-gray-600">This section is under development...</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
      <Sidebar
  sidebarCollapsed={sidebarCollapsed}
  setSidebarCollapsed={setSidebarCollapsed}
  mobileMenuOpen={mobileMenuOpen}
  setMobileMenuOpen={setMobileMenuOpen}
/>
        <div className="flex-1 min-h-screen">
          <Header setMobileMenuOpen={setMobileMenuOpen} />
          <main className="p-4 lg:p-6 bg-gray-50 min-h-screen">
            {/* Navigation Buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'dashboard'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveSection('student-doubts')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'student-doubts'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                Student Doubts
              </button>
              <button
                onClick={() => setActiveSection('my-students')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'my-students'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                My Students
              </button>
              <button
                onClick={() => setActiveSection('sessions')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'sessions'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                Sessions
              </button>
              <button
                onClick={() => setActiveSection('performance')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'performance'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveSection('profile')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'profile'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveSection('reports')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === 'reports'
                    ? 'bg-blue-50 text-[#1887A1] border-[#1887A1]'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-gray-900'
                }`}
              >
                Reports
              </button>
            </div>
            {/* Rendered Content */}
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

