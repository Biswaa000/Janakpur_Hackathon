import React, { useState } from 'react';
import Sidebar from '../Layout/Sidebar';

const HeroSection = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
      >
        {sidebarCollapsed ? '→' : '←'}
      </button>

      {/* Sidebar */}
      <div className={`
        ${sidebarCollapsed ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-40
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(false)}
        />
      )}

      {/* Main Content Area - Scrollable with footer protection */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 bg-white shadow-sm border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-blue-900">Admin Dashboard</h1>
              <p className="text-sm text-blue-600">Manage reports and organizations</p>
            </div>
            <button 
              onClick={() => setSidebarCollapsed(true)}
              className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"
            >
              ≡
            </button>
          </div>
        </div>

        {/* Scrollable Content with Bottom Padding for Footer */}
        <div className="flex-1 overflow-y-auto">
          {/* Content Container with Footer Protection */}
          <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="p-4 lg:p-6">
              {children}
              
              {/* FOOTER PROTECTION SPACER */}
              <div className="h-24 lg:h-20"></div>
            </div>
          </div>
        </div>

        {/* Quick Access Bar for Mobile - Positioned above footer */}
        <div className="lg:hidden fixed bottom-28 right-6 z-20">
          <div className="flex flex-col items-end space-y-3">
            <button className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
              <span className="text-xl">⚡</span>
            </button>
            
            <div className="flex flex-col items-end space-y-2">
              <button className="w-10 h-10 rounded-full bg-white border border-blue-200 text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors">
                <span className="text-lg">📋</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-blue-200 text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors">
                <span className="text-lg">🏢</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-blue-200 text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors">
                <span className="text-lg">🔔</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;