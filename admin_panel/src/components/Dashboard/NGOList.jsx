import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { colors } from '../../utils/colors';

// Mock data
const mockNGOs = [
  { id: 1, name: 'Green Earth Foundation', email: 'contact@greenearth.org', status: 'pending', registrationNo: 'REG12345', contact: '+1234567890', category: 'Environmental' },
  { id: 2, name: 'Human Rights Watch Local', email: 'hrw@example.com', status: 'verified', registrationNo: 'REG67890', contact: '+0987654321', category: 'Human Rights' },
  { id: 3, name: 'Animal Rescue Network', email: 'rescue@animals.org', status: 'pending', registrationNo: 'REG54321', contact: '+1122334455', category: 'Animal Welfare' },
  { id: 4, name: 'Public Safety Org', email: 'safety@public.org', status: 'rejected', registrationNo: 'REG98765', contact: '+5566778899', category: 'Public Safety' },
  { id: 5, name: 'Community Health Initiative', email: 'health@community.org', status: 'verified', registrationNo: 'REG13579', contact: '+9988776655', category: 'Health' },
  { id: 6, name: 'Education for All', email: 'edu@forall.org', status: 'verified', registrationNo: 'REG24680', contact: '+1122334455', category: 'Education' },
  { id: 7, name: 'Wildlife Conservation', email: 'wildlife@conserve.org', status: 'pending', registrationNo: 'REG13579', contact: '+9988776655', category: 'Environmental' },
  { id: 8, name: 'Women Empowerment Network', email: 'women@empower.org', status: 'verified', registrationNo: 'REG86420', contact: '+6677889900', category: 'Human Rights' },
];

const NGOList = ({ onSelectNGO }) => {
  const [ngos, setNGOs] = useState(mockNGOs);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredNGOs = ngos.filter(ngo => {
    const matchesFilter = filter === 'all' || ngo.status === filter;
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedNGOs = [...filteredNGOs].sort((a, b) => {
    switch(sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'date': return b.id - a.id; // Using ID as proxy for date
      case 'status': return a.status.localeCompare(b.status);
      default: return 0;
    }
  });

  const handleVerifyNGO = (id) => {
    setNGOs(ngos.map(ngo => 
      ngo.id === id ? { ...ngo, status: 'verified' } : ngo
    ));
    alert('NGO profile verified and saved to database!');
  };

  const handleRejectNGO = (id) => {
    if (window.confirm('Are you sure you want to reject this NGO profile?')) {
      setNGOs(ngos.map(ngo => 
        ngo.id === id ? { ...ngo, status: 'rejected' } : ngo
      ));
      alert('NGO profile rejected!');
    }
  };

  const handleDeleteNGO = (id) => {
    if (window.confirm('Are you sure you want to delete this NGO profile? This action cannot be undone.')) {
      setNGOs(ngos.filter(ngo => ngo.id !== id));
      alert('NGO profile deleted successfully!');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '⏳', label: 'Pending' },
      verified: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅', label: 'Verified' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌', label: 'Rejected' },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center space-x-1 ${config.bg} ${config.text}`}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      'Environmental': 'bg-emerald-100 text-emerald-800',
      'Human Rights': 'bg-indigo-100 text-indigo-800',
      'Animal Welfare': 'bg-amber-100 text-amber-800',
      'Public Safety': 'bg-red-100 text-red-800',
      'Health': 'bg-sky-100 text-sky-800',
      'Education': 'bg-violet-100 text-violet-800',
    };
    
    const colorClass = categoryColors[category] || 'bg-blue-100 text-blue-800';
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
        {category}
      </span>
    );
  };

  const getFilterStats = () => {
    const total = ngos.length;
    const pending = ngos.filter(n => n.status === 'pending').length;
    const verified = ngos.filter(n => n.status === 'verified').length;
    const rejected = ngos.filter(n => n.status === 'rejected').length;
    
    return { total, pending, verified, rejected };
  };

  const stats = getFilterStats();

  return (
    <Card variant="elevated" className="p-0 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">NGO Profiles</h2>
            <p className="text-blue-600 mt-1">Verify and manage NGO profiles for the reporting system</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              📥 Export Data
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              + Add NGO
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NGOs by name, email, or category..."
                className="w-full px-4 py-2.5 pl-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-3 text-blue-400">🔍</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              className="px-3 py-2.5 border border-blue-200 rounded-lg text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
            
            <div className="text-sm text-blue-600">
              Showing <span className="font-bold">{filteredNGOs.length}</span> of <span className="font-bold">{ngos.length}</span> NGOs
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            All <span className="ml-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">{stats.total}</span>
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            ⏳ Pending <span className="ml-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">{stats.pending}</span>
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'verified'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
            }`}
          >
            ✅ Verified <span className="ml-1 bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">{stats.verified}</span>
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
            }`}
          >
            ❌ Rejected <span className="ml-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{stats.rejected}</span>
          </button>
        </div>
      </div>

      {/* NGO Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>🏢</span>
                  <span>NGO Details</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Registration No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {sortedNGOs.map((ngo) => (
              <tr 
                key={ngo.id} 
                className="hover:bg-blue-50 cursor-pointer transition-colors group"
                onClick={() => onSelectNGO(ngo)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">🏢</span>
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 group-hover:text-blue-700">{ngo.name}</div>
                      <div className="text-sm text-blue-600">{ngo.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getCategoryBadge(ngo.category)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-blue-900 font-medium">{ngo.contact}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-blue-900 font-mono text-sm">{ngo.registrationNo}</div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(ngo.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
                    {ngo.status === 'pending' && (
                      <>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleVerifyNGO(ngo.id)}
                          className="px-4 py-1.5"
                        >
                          <span className="flex items-center space-x-1">
                            <span>✅</span>
                            <span>Verify</span>
                          </span>
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleRejectNGO(ngo.id)}
                          className="px-4 py-1.5"
                        >
                          <span className="flex items-center space-x-1">
                            <span>❌</span>
                            <span>Reject</span>
                          </span>
                        </Button>
                      </>
                    )}
                    {(ngo.status === 'verified' || ngo.status === 'rejected') && (
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteNGO(ngo.id)}
                        className="px-4 py-1.5"
                      >
                        <span className="flex items-center space-x-1">
                          <span>🗑️</span>
                          <span>Delete</span>
                        </span>
                      </Button>
                    )}
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => onSelectNGO(ngo)}
                      className="px-4 py-1.5"
                    >
                      <span className="flex items-center space-x-1">
                        <span>👁️</span>
                        <span>View</span>
                      </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredNGOs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-2xl">🏢</span>
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">No NGOs Found</h3>
          <p className="text-blue-600 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? `No NGOs match your search "${searchTerm}"`
              : `No NGOs found with the selected filter. Try a different filter or add new NGOs.`
            }
          </p>
          <div className="flex justify-center space-x-3">
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Clear Search
            </button>
            <button 
              onClick={() => setFilter('all')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All NGOs
            </button>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {filteredNGOs.length > 0 && (
        <div className="px-6 py-4 border-t border-blue-200 bg-blue-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-blue-600">
              Showing <span className="font-bold">{filteredNGOs.length}</span> NGOs • 
              <span className="mx-2">•</span>
              <span className="text-green-600 font-medium">{stats.verified} verified</span>
              <span className="mx-2">•</span>
              <span className="text-blue-600 font-medium">{stats.pending} pending</span>
              <span className="mx-2">•</span>
              <span className="text-red-600 font-medium">{stats.rejected} rejected</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                ⬅ Previous
              </button>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      page === 1 
                        ? 'bg-blue-600 text-white' 
                        : 'text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Next ➡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Summary */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <div className="text-xs text-blue-600">Total NGOs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <div className="text-xs text-blue-600">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <div className="text-xs text-blue-600">Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-xs text-blue-600">Rejected</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NGOList;