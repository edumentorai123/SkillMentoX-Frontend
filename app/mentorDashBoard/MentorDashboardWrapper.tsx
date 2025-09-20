"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

interface MentorDashboardWrapperProps {
  children: React.ReactNode;
}

const MentorDashboardWrapper: React.FC<MentorDashboardWrapperProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        
      />
    </div>
  );
};

export default MentorDashboardWrapper;
