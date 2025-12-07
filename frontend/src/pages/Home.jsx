import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Lock, Upload, ArrowRight, Users } from 'lucide-react';
import ServiceContentTable from '../components/ServiceContentTable';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 text-white">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-cyan-900/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-300">Secure & Anonymous Reporting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Anonymous Incident
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Reporting & Evidence Vault
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl">
              A secure platform for reporting incidents anonymously while preserving crucial evidence. 
              Your identity remains protected while your report makes a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/report" className="group">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/20">
                  <Upload className="h-5 w-5" />
                  <span>Submit Anonymous Report</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to="/login">
                <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-600">
                  <Users className="h-5 w-5" />
                  <span>NGO Portal Access</span>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Content - Feature Cards */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Anonymous</h3>
              <p className="text-gray-300">Your identity is protected through advanced encryption and zero-knowledge architecture.</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Vault</h3>
              <p className="text-gray-300">Evidence is stored in military-grade encrypted vaults with multi-layer security protocols.</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Timely Reporting</h3>
              <p className="text-gray-300">Critical incidents are immediately flagged and forwarded to relevant authorities.</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">NGO Collaboration</h3>
              <p className="text-gray-300">Trusted NGOs can access reports to provide support and initiate investigations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Stats Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">10K+</div>
            <div className="text-gray-300 mt-2">Reports Filed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">100%</div>
            <div className="text-gray-300 mt-2">Anonymity Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">50+</div>
            <div className="text-gray-300 mt-2">Partner NGOs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">24/7</div>
            <div className="text-gray-300 mt-2">Monitoring</div>
          </div>
        </div>
      </div>
    </div>
    
    {/* ServiceContentTable Section */}
    <ServiceContentTable />
    
    {/* CTA Section */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-2xl p-12 border border-gray-700">
        <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Your anonymous report could be the key to justice. Every piece of evidence matters.
        </p>
        <Link to="/report">
          <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30">
            <Upload className="h-6 w-6" />
            <span>Report An Incident Now</span>
          </button>
        </Link>
        <p className="text-gray-400 text-sm mt-4">
          Completely anonymous • Encrypted end-to-end • No tracking
        </p>
      </div>
    </div>
    
    {/* Footer Note */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-gray-800">
      <p className="text-gray-400">
        <span className="text-blue-400">AIRE Vault</span> — Protecting voices, preserving evidence, promoting justice
      </p>
    </div>
  </div>
);

export default Home;