import React, { useState } from 'react';
import ReportsList from '../components/Dashboard/ReportsList';
import ReportDetails from '../components/Dashboard/ReportDetails';
import { colors } from '../utils/colors';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setViewMode('details');
  };

  const handleBackToList = () => {
    setSelectedReport(null);
    setViewMode('list');
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-lg">📋</span>
          </div>
          <div>
            <h1 className={`text-3xl font-bold text-${colors.text.primary}`}>
              Incident Reports Management
            </h1>
            <p className={`text-${colors.text.secondary} mt-1`}>
              Review user-submitted reports, verify authenticity, and take appropriate actions
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-500 font-medium">TOTAL REPORTS</p>
            <p className="text-lg font-bold text-blue-700">157</p>
          </div>
          <div className="px-4 py-2 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-xs text-amber-500 font-medium">PENDING REVIEW</p>
            <p className="text-lg font-bold text-amber-700">23</p>
          </div>
          <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-100">
            <p className="text-xs text-green-500 font-medium">GENUINE REPORTS</p>
            <p className="text-lg font-bold text-green-700">89</p>
          </div>
          <div className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-xs text-indigo-500 font-medium">FORWARDED TO NGO</p>
            <p className="text-lg font-bold text-indigo-700">45</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setViewMode('details')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'details'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
            disabled={!selectedReport && viewMode === 'list'}
          >
            🔍 Details View
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            📥 Export Reports
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${viewMode === 'details' ? 'fade-in-up' : ''}`}>
        {viewMode === 'list' ? (
          <ReportsList onSelectReport={handleSelectReport} />
        ) : (
          selectedReport ? (
            <ReportDetails report={selectedReport} onBack={handleBackToList} />
          ) : (
            <div className="bg-white rounded-xl border border-blue-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">📄</span>
              </div>
              <h3 className={`text-xl font-semibold text-${colors.text.primary} mb-2`}>
                No Report Selected
              </h3>
              <p className={`text-${colors.text.secondary} mb-6 max-w-md mx-auto`}>
                Select a report from the list to view detailed information and take action
              </p>
              <button
                onClick={() => setViewMode('list')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                ← Back to Report List
              </button>
            </div>
          )
        )}
      </div>

      {/* Quick Actions Panel */}
      {viewMode === 'list' && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className={`text-lg font-semibold text-${colors.text.primary} mb-4`}>
            ⚡ Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white border border-blue-200 p-4 rounded-lg hover:shadow-md transition-all text-left group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600">🚨</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Review Urgent Reports</p>
                  <p className="text-sm text-blue-600">Priority cases requiring attention</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white border border-blue-200 p-4 rounded-lg hover:shadow-md transition-all text-left group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <span className="text-green-600">✅</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Bulk Verify</p>
                  <p className="text-sm text-blue-600">Mark multiple reports as genuine</p>
                </div>
              </div>
            </button>
            
            <button className="bg-white border border-blue-200 p-4 rounded-lg hover:shadow-md transition-all text-left group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <span className="text-amber-600">📊</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">Generate Report</p>
                  <p className="text-sm text-blue-600">Create summary for this period</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-white rounded-xl border border-blue-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className={`text-lg font-semibold text-${colors.text.primary} mb-2`}>
              ℹ️ Report Verification Guidelines
            </h4>
            <ul className={`text-${colors.text.secondary} space-y-2`}>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Check for supporting evidence in attached files</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Verify location and timestamp consistency</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Forward genuine reports to relevant NGO categories</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Mark as fake only if clear evidence of fabrication exists</span>
              </li>
            </ul>
          </div>
          <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
            View Full Guidelines →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;