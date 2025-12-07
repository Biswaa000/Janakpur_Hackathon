import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../utils/colors';
import { navLinks } from '../../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className={`w-64 bg-${colors.bg.sidebar} text-${colors.text.onDark} h-full overflow-y-auto`}>
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Navigation</h2>
          <p className="text-sm opacity-75">Manage reports and organizations</p>
        </div>
        
        <nav>
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? `bg-white text-${colors.primary[600]} shadow-md` 
                        : `hover:bg-${colors.primary[800]} text-${colors.text.onDark}`
                      }
                    `}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="mt-8 pt-6 border-t border-blue-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-75">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 hover:bg-blue-800 rounded-lg transition-colors">
              <span className="text-sm">Pending Reports</span>
              <span className="px-2 py-1 text-xs rounded-full bg-white text-blue-600 font-bold">12</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-blue-800 rounded-lg transition-colors">
              <span className="text-sm">NGOs to Verify</span>
              <span className="px-2 py-1 text-xs rounded-full bg-white text-blue-600 font-bold">5</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-blue-800 rounded-lg transition-colors">
              <span className="text-sm">Genuine Today</span>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white font-bold">8</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-blue-800">
          <div className="bg-blue-900 rounded-lg p-4">
            <p className="text-sm font-medium mb-2 text-white">System Status</p>
            <div className="w-full bg-blue-800 rounded-full h-2 mb-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs opacity-75 text-white">All systems operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;