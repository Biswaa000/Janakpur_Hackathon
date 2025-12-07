import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { colors } from '../../utils/colors';
import { reportStatus } from '../../utils/constants';

// Mock data - will be replaced with API calls
const mockReports = [
  { id: 1, title: 'Illegal Dumping', reporter: 'Anonymous', date: '2024-01-15', status: 'pending', location: 'City Park', category: 'Environmental', priority: 'high' },
  { id: 2, title: 'Workplace Harassment', reporter: 'User123', date: '2024-01-14', status: 'pending', location: 'Office Building', category: 'Workplace', priority: 'medium' },
  { id: 3, title: 'Corruption Allegation', reporter: 'Anonymous', date: '2024-01-13', status: 'genuine', location: 'Government Office', category: 'Corruption', priority: 'high' },
  { id: 4, title: 'Animal Cruelty', reporter: 'AnimalLover', date: '2024-01-12', status: 'fake', location: 'Residential Area', category: 'Animal Rights', priority: 'medium' },
  { id: 5, title: 'Public Safety Hazard', reporter: 'Anonymous', date: '2024-01-11', status: 'forwarded', location: 'Main Street', category: 'Public Safety', priority: 'high' },
  { id: 6, title: 'Environmental Pollution', reporter: 'EcoWarrior', date: '2024-01-10', status: 'pending', location: 'River Side', category: 'Environmental', priority: 'medium' },
  { id: 7, title: 'Financial Fraud', reporter: 'Anonymous', date: '2024-01-09', status: 'genuine', location: 'Bank District', category: 'Corruption', priority: 'high' },
  { id: 8, title: 'Child Labor Case', reporter: 'RightsActivist', date: '2024-01-08', status: 'forwarded', location: 'Industrial Area', category: 'Human Rights', priority: 'high' },
];

const ReportsList = ({ onSelectReport }) => {
  const [reports, setReports] = useState(mockReports);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
    switch(sortBy) {
      case 'title': return a.title.localeCompare(b.title);
      case 'date': return new Date(b.date) - new Date(a.date);
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      }
      default: return 0;
    }
  });

  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setReports(reports.filter(report => report.id !== id));
      alert('Report deleted successfully!');
    }
  };

  const handleMarkAsGenuine = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'genuine' } : report
    ));
    alert('Report marked as genuine and forwarded to NGO dashboard!');
  };

  const handleForwardToNGO = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'forwarded' } : report
    ));
    alert('Report forwarded to relevant NGO!');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '⏳', label: 'Pending' },
      genuine: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅', label: 'Genuine' },
      fake: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌', label: 'Fake' },
      forwarded: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: '📤', label: 'Forwarded' },
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
      'Workplace': 'bg-amber-100 text-amber-800',
      'Corruption': 'bg-red-100 text-red-800',
      'Animal Rights': 'bg-orange-100 text-orange-800',
      'Public Safety': 'bg-sky-100 text-sky-800',
      'Human Rights': 'bg-violet-100 text-violet-800',
    };
    
    const colorClass = categoryColors[category] || 'bg-blue-100 text-blue-800';
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
        {category}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800', icon: '🔴' },
      medium: { color: 'bg-amber-100 text-amber-800', icon: '🟡' },
      low: { color: 'bg-green-100 text-green-800', icon: '🟢' },
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${config.color}`}>
        <span>{config.icon}</span>
        <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
      </span>
    );
  };

  const getFilterStats = () => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const genuine = reports.filter(r => r.status === 'genuine').length;
    const fake = reports.filter(r => r.status === 'fake').length;
    const forwarded = reports.filter(r => r.status === 'forwarded').length;
    
    return { total, pending, genuine, fake, forwarded };
  };

  const stats = getFilterStats();

  return (
    <Card variant="elevated" className="p-0 overflow-hidden">
      {/* Header */}
      <div className="p-6  bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Incident Reports</h2>
            <p className="text-blue-600 mt-1">Review and manage user-submitted reports</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              📥 Export Data
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports by title, category, or location..."
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
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="priority">Sort by Priority</option>
            </select>
            
            <div className="text-sm text-blue-600">
              Showing <span className="font-bold">{filteredReports.length}</span> of <span className="font-bold">{reports.length}</span> reports
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
            onClick={() => setFilter('genuine')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'genuine'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
            }`}
          >
            ✅ Genuine <span className="ml-1 bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">{stats.genuine}</span>
          </button>
          <button
            onClick={() => setFilter('fake')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'fake'
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
            }`}
          >
            ❌ Fake <span className="ml-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{stats.fake}</span>
          </button>
          <button
            onClick={() => setFilter('forwarded')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'forwarded'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            📤 Forwarded <span className="ml-1 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">{stats.forwarded}</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>📋</span>
                  <span>Report Details</span>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Reporter
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Date
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
            {sortedReports.map((report) => (
              <tr 
                key={report.id} 
                className="hover:bg-blue-50 cursor-pointer transition-colors group"
                onClick={() => onSelectReport(report)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${
                      report.category === 'Environmental' ? 'bg-emerald-100' :
                      report.category === 'Workplace' ? 'bg-amber-100' :
                      report.category === 'Corruption' ? 'bg-red-100' :
                      report.category === 'Public Safety' ? 'bg-sky-100' :
                      'bg-blue-100'
                    } flex items-center justify-center`}>
                      <span className={
                        report.category === 'Environmental' ? 'text-emerald-600' :
                        report.category === 'Workplace' ? 'text-amber-600' :
                        report.category === 'Corruption' ? 'text-red-600' :
                        report.category === 'Public Safety' ? 'text-sky-600' :
                        'text-blue-600'
                      }>
                        {report.category === 'Environmental' ? '🌿' :
                         report.category === 'Workplace' ? '🏢' :
                         report.category === 'Corruption' ? '💰' :
                         report.category === 'Public Safety' ? '🛡️' : '📋'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 group-hover:text-blue-700">{report.title}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        {getCategoryBadge(report.category)}
                        <span className="text-sm text-blue-600">• {report.location}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <div>
                      <div className="text-blue-900 font-medium">{report.reporter}</div>
                      <div className="text-xs text-blue-600">
                        {report.reporter === 'Anonymous' ? 'Anonymous' : 'Registered'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getPriorityBadge(report.priority)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-blue-900 font-medium">{report.date}</div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(report.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
                    {report.status === 'pending' && (
                      <>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleMarkAsGenuine(report.id)}
                          className="px-4 py-1.5"
                        >
                          <span className="flex items-center space-x-1">
                            <span>✅</span>
                            <span>Genuine</span>
                          </span>
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDeleteReport(report.id)}
                          className="px-4 py-1.5"
                        >
                          <span className="flex items-center space-x-1">
                            <span>❌</span>
                            <span>Delete</span>
                          </span>
                        </Button>
                      </>
                    )}
                    {report.status === 'genuine' && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleForwardToNGO(report.id)}
                        className="px-4 py-1.5"
                      >
                        <span className="flex items-center space-x-1">
                          <span>📤</span>
                          <span>Forward</span>
                        </span>
                      </Button>
                    )}
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => onSelectReport(report)}
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
      {filteredReports.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-2xl">📋</span>
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">No Reports Found</h3>
          <p className="text-blue-600 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? `No reports match your search "${searchTerm}"`
              : `No reports found with the selected filter. Try a different filter.`
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
              Show All Reports
            </button>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {filteredReports.length > 0 && (
        <div className="px-6 py-4  bg-blue-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-blue-600">
              Showing <span className="font-bold">{filteredReports.length}</span> reports • 
              <span className="mx-2">•</span>
              <span className="text-green-600 font-medium">{stats.genuine} genuine</span>
              <span className="mx-2">•</span>
              <span className="text-blue-600 font-medium">{stats.pending} pending</span>
              <span className="mx-2">•</span>
              <span className="text-red-600 font-medium">{stats.fake} fake</span>
              <span className="mx-2">•</span>
              <span className="text-indigo-600 font-medium">{stats.forwarded} forwarded</span>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <div className="text-xs text-blue-600">Total Reports</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <div className="text-xs text-blue-600">Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.genuine}</div>
            <div className="text-xs text-blue-600">Genuine</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.fake}</div>
            <div className="text-xs text-blue-600">Fake</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.forwarded}</div>
            <div className="text-xs text-blue-600">Forwarded</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportsList;