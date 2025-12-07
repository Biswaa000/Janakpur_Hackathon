import React from 'react';
import { colors } from '../../utils/colors';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-blue-100 w-full h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col md:flex-row justify-between items-center h-full">
          <div className="mb-2 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">🛡️</span>
              </div>
              <p className="text-sm font-medium">
                © {new Date().getFullYear()} Incident Reporting System
              </p>
            </div>
            <p className="text-xs mt-1 opacity-75">
              Secure anonymous reporting platform
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-white transition-colors opacity-75 hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors opacity-75 hover:opacity-100">
              Terms
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors opacity-75 hover:opacity-100">
              Support
            </a>
          </div>
        </div>
        
        <div className="text-center pt-2 border-t border-blue-800">
          <p className="text-xs opacity-75">
            Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;