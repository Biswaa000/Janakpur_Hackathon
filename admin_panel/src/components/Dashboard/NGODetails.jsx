import React from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { colors } from '../../utils/colors';

const NGODetails = ({ ngo, onBack }) => {
  if (!ngo) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-2xl">🏢</span>
          </div>
          <p className="text-blue-600">Select an NGO to view details</p>
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
          badgeText: 'Pending Verification'
        };
      case 'verified':
        return { 
          bg: 'bg-green-100', 
          text: 'text-green-800',
          icon: '✅',
          badgeText: 'Verified'
        };
      case 'rejected':
        return { 
          bg: 'bg-red-100', 
          text: 'text-red-800',
          icon: '❌',
          badgeText: 'Rejected'
        };
      default:
        return { 
          bg: 'bg-blue-100', 
          text: 'text-blue-800',
          icon: '🏢',
          badgeText: 'Pending'
        };
    }
  };

  const statusConfig = getStatusConfig(ngo.status);

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
          <h2 className="text-2xl font-bold text-blue-900">NGO Profile Details</h2>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center">
            <span className="text-blue-600 text-2xl">🏢</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{ngo.name}</h1>
            <p className="text-blue-600">{ngo.email}</p>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Organization Name</p>
                <p className="text-lg font-semibold text-blue-900">{ngo.name}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Email Address</p>
                <p className="text-blue-900">{ngo.email}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Contact Number</p>
                <p className="text-blue-900 font-medium">{ngo.contact}</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Registration Number</p>
                <p className="font-mono text-blue-900">{ngo.registrationNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-4">Additional Details</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Physical Address</p>
                <p className="text-blue-900">
                  123 NGO Street, Service City, SC 12345
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Area of Focus</p>
                <p className="text-blue-900 font-medium">
                  {ngo.name.includes('Green') ? 'Environmental Conservation' :
                   ngo.name.includes('Human') ? 'Human Rights Protection' :
                   ngo.name.includes('Animal') ? 'Animal Welfare' :
                   ngo.name.includes('Safety') ? 'Public Safety' : 'Community Health'}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Year Established</p>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-900 font-bold">2018</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    6 years in operation
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-medium text-blue-600 mb-1">Legal Status</p>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-blue-900">Registered Non-Profit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Section */}
      <div className="mt-10 pt-8 border-t border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-blue-900">Verification Documents</h3>
            <p className="text-blue-600">Review attached documents for verification</p>
          </div>
          <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
            Download All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-blue-600 text-xl">📄</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Registration Certificate</p>
                <p className="text-xs text-blue-600 mb-2">Official registration document</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-500">PDF • 2.4 MB</span>
                  <button className="text-blue-400 hover:text-blue-600">Download</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Tax Exemption Proof</p>
                <p className="text-xs text-blue-600 mb-2">Tax exemption certificate</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-500">PDF • 1.8 MB</span>
                  <button className="text-blue-400 hover:text-blue-600">Download</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <span className="text-amber-600 text-xl">📊</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Annual Report 2023</p>
                <p className="text-xs text-blue-600 mb-2">Last year's activity report</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-500">PDF • 3.1 MB</span>
                  <button className="text-blue-400 hover:text-blue-600">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Documents */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-900">Board Resolution</p>
            <p className="text-xs text-blue-600">Approval for partnership</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-900">Bank Statement</p>
            <p className="text-xs text-blue-600">Financial verification</p>
          </div>
        </div>
      </div>

      {/* Verification Timeline */}
      <div className="mt-10 pt-8 border-t border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-6">Verification Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          {[
            { step: 'Profile Created', date: 'Jan 15, 2024', status: 'completed' },
            { step: 'Documents Uploaded', date: 'Jan 18, 2024', status: 'completed' },
            { step: 'Under Review', date: 'Current', status: 'current' },
            { step: 'Verification Decision', date: 'Pending', status: 'pending' },
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
                <p className="text-sm text-blue-600">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 pt-8 border-t border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-blue-600">
            <p className="font-medium">NGO Profile ID: <span className="font-mono">NGO-{ngo.id.toString().padStart(4, '0')}</span></p>
            <p className="text-sm">Last updated: 2 days ago</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Edit Profile
            </button>
            
            {ngo.status === 'pending' && (
              <>
                <Button 
                  variant="danger"
                  className="px-6 py-2"
                >
                  Reject Application
                </Button>
                <Button 
                  variant="success"
                  className="px-6 py-2"
                >
                  Verify NGO
                </Button>
              </>
            )}
            
            {(ngo.status === 'verified' || ngo.status === 'rejected') && (
              <Button 
                variant="danger"
                className="px-6 py-2"
              >
                Delete Profile
              </Button>
            )}
            
            <Button 
              variant="primary"
              className="px-6 py-2"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div>
            <p className="font-medium text-blue-900">Verification Guidelines</p>
            <p className="text-sm text-blue-600 mt-1">
              Ensure all documents are valid and match the information provided. 
              Contact the NGO if any discrepancies are found before making a final decision.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NGODetails;