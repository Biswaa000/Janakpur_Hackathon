import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Dashboard/HeroSection';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import NGOs from './pages/NGOs';

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Fixed Navbar - Top */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16">
          <Navbar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex pt-16 pb-20 overflow-hidden">
          {/* HeroSection with proper spacing */}
          <HeroSection>
            <div className="h-full w-full overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/ngos" element={<NGOs />} />
              </Routes>
            </div>
          </HeroSection>
        </div>
        
        {/* Fixed Footer - Bottom */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-blue-900 z-40">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;