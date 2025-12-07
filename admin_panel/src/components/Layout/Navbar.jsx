import React from 'react';
import { colors } from '../../utils/colors';

const Navbar = () => {
  return (
    <nav className={`bg-${colors.bg.dark} text-${colors.text.light} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🛡️</span>
                </div>
                <h1 className="text-xl font-bold">
                  Incident Reporting Admin
                </h1>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <span className={`text-sm text-${colors.text.onDark}`}>
                Secure Admin Dashboard
              </span>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none hover:bg-blue-800 px-3 py-1.5 rounded-lg transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">A</span>
                  </div>
                  <span>Admin</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;