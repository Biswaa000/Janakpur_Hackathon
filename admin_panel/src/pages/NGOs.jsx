import React, { useState } from 'react';
import NGOList from '../components/Dashboard/NGOList';
import NGODetails from '../components/Dashboard/NGODetails';
import { colors } from '../utils/colors';

const NGOs = () => {
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSelectNGO = (ngo) => {
    setSelectedNGO(ngo);
    setViewMode('details');
  };

  const handleBackToList = () => {
    setSelectedNGO(null);
    setViewMode('list');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <span className="text-blue-600 text-2xl">🏢</span>
          </div>
          <div>
            <h1 className={`text-3xl font-bold text-${colors.text.primary}`}>
              NGO Profile Management
            </h1>
            <p className={`text-${colors.text.secondary} mt-1`}>
              Verify NGO profiles and manage their access to the reporting system
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Total NGOs</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">42</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-blue-600">🏢</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-sky-100 rounded-xl border border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">8</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-sky-600">⏳</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Verified</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">28</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-rose-100 rounded-xl border border-red-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Rejected</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">6</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-red-600">❌</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl border border-blue-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>List View</span>
                </span>
              </button>
              <button
                onClick={() => setViewMode('details')}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'details'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                }`}
                disabled={!selectedNGO && viewMode === 'list'}
              >
                <span className="flex items-center space-x-2">
                  <span>🔍</span>
                  <span>Details View</span>
                </span>
              </button>
            </div>
            
            <div className="hidden md:block h-6 w-px bg-blue-200"></div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium text-${colors.text.secondary}`}>
                Filter by:
              </span>
              <select 
                className="px-3 py-2 border border-blue-200 rounded-lg text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={activeFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">All NGOs</option>
                <option value="pending">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2.5 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center space-x-2">
              <span>📥</span>
              <span>Export Data</span>
            </button>
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
              <span>➕</span>
              <span>Add New NGO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${viewMode === 'details' ? 'fade-in-up' : ''}`}>
        {viewMode === 'list' ? (
          <NGOList onSelectNGO={handleSelectNGO} />
        ) : (
          selectedNGO ? (
            <NGODetails ngo={selectedNGO} onBack={handleBackToList} />
          ) : (
            <div className="bg-white rounded-xl border-2 border-dashed border-blue-200 p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <span className="text-blue-600 text-3xl">🏢</span>
              </div>
              <h3 className={`text-2xl font-bold text-${colors.text.primary} mb-3`}>
                No NGO Profile Selected
              </h3>
              <p className={`text-${colors.text.secondary} mb-8 max-w-md mx-auto`}>
                Select an NGO from the list to view detailed profile information, verify documents, and manage their access
              </p>
              <button
                onClick={() => setViewMode('list')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                ← Back to NGO List
              </button>
            </div>
          )
        )}
      </div>

      {/* Verification Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className={`text-xl font-bold text-${colors.text.primary} mb-2`}>
              ⚖️ NGO Verification Guidelines
            </h3>
            <p className={`text-${colors.text.secondary}`}>
              Follow these guidelines when verifying NGO profiles
            </p>
          </div>
          <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-white transition-colors text-sm font-medium">
            Download Checklist →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
              <span className="text-blue-600 text-xl">📄</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Document Verification</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Valid registration certificate</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Tax exemption documents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Board resolution for partnership</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Verification Criteria</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Minimum 2 years operational</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Relevant to report categories</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Clean track record</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
              <span className="text-amber-600 text-xl">⚠️</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">Rejection Reasons</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Invalid documents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fake registration</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Incomplete information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-blue-200 p-6">
          <h4 className={`text-lg font-semibold text-${colors.text.primary} mb-4`}>
            📈 Verification Trends
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-700">This Month</span>
                <span className="font-semibold text-blue-900">12 NGOs</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-700">Verified</span>
                <span className="font-semibold text-blue-900">28 NGOs</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '66%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-700">Rejection Rate</span>
                <span className="font-semibold text-blue-900">14%</span>
              </div>
              <div className="w-full bg-red-100 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className={`text-lg font-semibold text-${colors.text.primary}`}>
              ⏱️ Recent Verifications
            </h4>
            <span className="text-sm text-blue-600">Last 7 days</span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Green Earth Foundation', time: '2 hours ago', status: 'verified' },
              { name: 'Animal Rescue Network', time: '1 day ago', status: 'verified' },
              { name: 'Public Safety Org', time: '2 days ago', status: 'rejected' },
              { name: 'Health Initiative', time: '3 days ago', status: 'verified' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.status === 'verified' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={item.status === 'verified' ? 'text-green-600' : 'text-red-600'}>
                      {item.status === 'verified' ? '✅' : '❌'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{item.name}</p>
                    <p className="text-sm text-blue-600">{item.time}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  item.status === 'verified' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOs;