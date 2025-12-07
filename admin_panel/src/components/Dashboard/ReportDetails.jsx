import React from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { colors } from '../../utils/colors';

const ReportDetails = ({ report, onBack }) => {
  if (!report) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-2xl">📋</span>
          </div>
          <p className="text-blue-600">Select a report to view details</p>
        </div>
      </Card>
    );
  }

  const getStatusConfig = (status) => {
    switch(status) {
      case 'pending':
        return { 
          bg: 'bg-blue-100', 
          text: 'text-blue-800',
          icon: '⏳',
          badgeText: 'Pending Review'
        };
      case 'genuine':
        return { 
          bg: 'bg-green-100', 
          text: 'text-green-800',
          icon: '✅',
          badgeText: 'Genuine'
        };
      case 'fake':
        return { 
          bg: 'bg-red-100', 
          text: 'text-red-800',
          icon: '❌',
          badgeText: 'Fake'
        };
      case 'forwarded':
        return { 
          bg: 'bg-indigo-100', 
          text: 'text-indigo-800',
          icon: '📤',
          badgeText: 'Forwarded to NGO'
        };
      default:
        return { 
          bg: 'bg-blue-100', 
          text: 'text-blue-800',
          icon: '📋',
          badgeText: 'Pending'
        };
    }
  };

  const statusConfig = getStatusConfig(report.status);

  return (
    <Card variant="elevated" className="fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <button 
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 transition-colors"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back to list</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-lg ${statusConfig.bg} ${statusConfig.text} font-semibold flex items-center space-x-2`}>
            <span>{statusConfig.icon}</span>
            <span>{statusConfig.badgeText}</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-900">Report Details</h2>
        </div>
      </div>

      {/* Report Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-xl ${
            report.category === 'Environmental' ? 'bg-emerald-100 border-emerald-200' :
            report.category === 'Workplace' ? 'bg-amber-100 border-amber-200' :
            report.category === 'Corruption' ? 'bg-red-100 border-red-200' :
            report.category === 'Public Safety' ? 'bg-sky-100 border-sky-200' :
            'bg-blue-100 border-blue-200'
          } border-2 flex items-center justify-center`}>
            <span className={
              report.category === 'Environmental' ? 'text-emerald-600 text-2xl' :
              report.category === 'Workplace' ? 'text-amber-600 text-2xl' :
              report.category === 'Corruption' ? 'text-red-600 text-2xl' :
              report.category === 'Public Safety' ? 'text-sky-600 text-2xl' :
              'text-blue-600 text-2xl'
            }>
              {report.category === 'Environmental' ? '🌿' :
               report.category === 'Workplace' ? '🏢' :
               report.category === 'Corruption' ? '💰' :
               report.category === 'Public Safety' ? '🛡️' : '📋'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{report.title}</h1>
            <p className="text-blue-600">
              Reported by <span className="font-semibold">{report.reporter}</span> • {report.date}
            </p>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">Incident Details</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Report Title</p>
                <p className="text-lg font-semibold text-blue-900">{report.title}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Category</p>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-900 font-medium">{report.category}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    {report.category === 'Environmental' ? 'Environmental' :
                     report.category === 'Workplace' ? 'Workplace' :
                     report.category === 'Corruption' ? 'Financial' :
                     report.category === 'Public Safety' ? 'Safety' : 'General'}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Location</p>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">📍</span>
                  <span className="text-blue-900 font-medium">{report.location}</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Reporter</p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">👤</span>
                  </div>
                  <div>
                    <p className="text-blue-900 font-medium">{report.reporter}</p>
                    <p className="text-xs text-blue-600">
                      {report.reporter === 'Anonymous' ? 'Anonymous Submission' : 'Registered User'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">Report Information</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Date & Time Submitted</p>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">📅</span>
                  <span className="text-blue-900 font-medium">{report.date}</span>
                  <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                    14:30
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Severity Level</p>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    report.category === 'Corruption' ? 'bg-red-500' :
                    report.category === 'Public Safety' ? 'bg-amber-500' :
                    'bg-green-500'
                  }`}></span>
                  <span className="text-blue-900 font-medium">
                    {report.category === 'Corruption' ? 'High Priority' :
                     report.category === 'Public Safety' ? 'Medium Priority' :
                     'Standard Priority'}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Report Description</p>
                <div className="mt-2 p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-blue-900 leading-relaxed">
                    This incident was reported at {report.location} involving {report.category.toLowerCase()} concerns. 
                    The reporter indicated that immediate attention may be required due to the nature of the incident.
                    Additional details include witness accounts and specific location coordinates that have been verified.
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Report ID</p>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-blue-900">REPORT-{report.id.toString().padStart(4, '0')}</span>
                  <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                    Unique Identifier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Section */}
      <div className="mt-10 pt-8 border-t border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-blue-900">Evidence Attached</h3>
            <p className="text-blue-600">Review attached evidence for verification</p>
          </div>
          <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
            Download All Evidence →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 hover:shadow-sm transition-all group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-blue-600 text-2xl">📷</span>
            </div>
            <p className="font-medium text-blue-900 mb-1">Image Evidence</p>
            <p className="text-sm text-blue-600 mb-3">3 images attached</p>
            <button className="text-blue-400 hover:text-blue-600 text-sm font-medium">
              View Images →
            </button>
          </div>
          
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 hover:shadow-sm transition-all group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <span className="text-green-600 text-2xl">📄</span>
            </div>
            <p className="font-medium text-blue-900 mb-1">Document Evidence</p>
            <p className="text-sm text-blue-600 mb-3">2 documents attached</p>
            <button className="text-blue-400 hover:text-blue-600 text-sm font-medium">
              View Documents →
            </button>
          </div>
          
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 hover:shadow-sm transition-all group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <span className="text-amber-600 text-2xl">🎥</span>
            </div>
            <p className="font-medium text-blue-900 mb-1">Video Evidence</p>
            <p className="text-sm text-blue-600 mb-3">1 video attached</p>
            <button className="text-blue-400 hover:text-blue-600 text-sm font-medium">
              View Video →
            </button>
          </div>
        </div>
        
        {/* Evidence Details */}
        <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-3">Evidence Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-900">image1.jpg</p>
              <p className="text-xs text-blue-600">2.4 MB • Uploaded: {report.date}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-900">document.pdf</p>
              <p className="text-xs text-blue-600">1.8 MB • Uploaded: {report.date}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-900">video.mp4</p>
              <p className="text-xs text-blue-600">15.2 MB • Uploaded: {report.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-10 pt-8 border-t border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-6">Report Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          {[
            { step: 'Report Submitted', date: report.date, time: '14:30', status: 'completed' },
            { step: 'Initial Review', date: report.date, time: '15:45', status: 'completed' },
            { step: 'Evidence Verification', date: 'Current', time: 'In Progress', status: 'current' },
            { step: 'Final Decision', date: 'Pending', time: 'Awaiting', status: 'pending' },
            { step: 'Forward to NGO', date: 'Pending', time: 'Awaiting', status: 'pending' },
          ].map((item, index) => (
            <div key={index} className="flex items-start mb-8 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                item.status === 'completed' ? 'bg-green-100' :
                item.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <span className={
                  item.status === 'completed' ? 'text-green-600' :
                  item.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                }>
                  {item.status === 'completed' ? '✓' : index + 1}
                </span>
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-blue-900">{item.step}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-600">{item.date}</span>
                  <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 pt-8 border-t border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-blue-600">
            <p className="font-medium">Report ID: <span className="font-mono">REPORT-{report.id.toString().padStart(4, '0')}</span></p>
            <p className="text-sm">Last reviewed: 1 hour ago</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Request More Info
            </button>
            
            {report.status === 'pending' && (
              <>
                <Button 
                  variant="danger"
                  className="px-6 py-2"
                >
                  <span className="flex items-center space-x-1">
                    <span>❌</span>
                    <span>Mark as Fake</span>
                  </span>
                </Button>
                <Button 
                  variant="success"
                  className="px-6 py-2"
                >
                  <span className="flex items-center space-x-1">
                    <span>✅</span>
                    <span>Mark as Genuine</span>
                  </span>
                </Button>
              </>
            )}
            
            {(report.status === 'genuine' || report.status === 'forwarded') && (
              <Button 
                variant="primary"
                className="px-6 py-2"
              >
                <span className="flex items-center space-x-1">
                  <span>📤</span>
                  <span>Forward to NGO</span>
                </span>
              </Button>
            )}
            
            <Button 
              variant="secondary"
              className="px-6 py-2"
            >
              <span className="flex items-center space-x-1">
                <span>📝</span>
                <span>Add Note</span>
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Verification Guidelines */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div>
            <p className="font-medium text-blue-900">Verification Guidelines</p>
            <p className="text-sm text-blue-600 mt-1">
              Review all evidence carefully before marking as genuine. Check for consistency in dates, 
              locations, and descriptions. Forward only verified reports to relevant NGOs.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportDetails;