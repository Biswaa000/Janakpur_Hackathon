import { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Filter, 
  Search, 
  Shield, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Phone, 
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import reportService from '../services/reportService';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import Button from '../components/Button';

const NGODashboard = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    urgent: 0
  });

  useEffect(() => {
  const fetchReports = async () => {
    try {
      setLoading(true);

      const data = await reportService.getReports();

      // Backend returns { success, reports: [...] }
      const reportList = Array.isArray(data?.reports) ? data.reports : [];

      // Save reports
      setReports(reportList);
      setFilteredReports(reportList);

      // Calculate statistics safely
      const total = reportList.length;
      const pending = reportList.filter(r => r.status === "pending").length;
      const reviewed = reportList.filter(r => r.status === "reviewed").length;
      const urgent = reportList.filter(r => r.urgencyLevel === "high").length;

      setStats({ total, pending, reviewed, urgent });

    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchReports();
}, []);


  useEffect(() => {
  // Ensure reports is always an array
  if (!Array.isArray(reports)) {
    setFilteredReports([]);
    return;
  }

  let filtered = [...reports];

  // Apply search filter
  if (searchTerm.trim() !== "") {
    const lower = searchTerm.toLowerCase();

    filtered = filtered.filter(report => 
      (report.incidentTitle || "").toLowerCase().includes(lower) ||
      (report.description || "").toLowerCase().includes(lower) ||
      (report.location || "").toLowerCase().includes(lower)
    );
  }

  // Apply status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter(report => report.status === statusFilter);
  }

  setFilteredReports(filtered);
}, [searchTerm, statusFilter, reports]);


  const handleViewReport = (report) => setSelectedReport(report);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                NGO <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-400 mt-2">Monitor and manage anonymous incident reports</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" icon={Download}>
                Export Reports
              </Button>
              <Button icon={BarChart3}>
                Analytics
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Reports</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% this month</span>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-400">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${stats.total ? (stats.pending / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Reviewed</p>
                  <p className="text-3xl font-bold text-green-400">{stats.reviewed}</p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${stats.total ? (stats.reviewed / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Urgent Priority</p>
                  <p className="text-3xl font-bold text-red-400">{stats.urgent}</p>
                </div>
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-gray-400">Requires immediate attention</span>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports by title, description, or location..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </div>
                <Button variant="ghost" onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Incident Reports ({filteredReports.length})</h2>
            <div className="text-sm text-gray-400">
              Showing {filteredReports.length} of {reports.length} reports
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No reports found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredReports.map(report => (
                <ReportCard key={report.reportId} report={report} onView={handleViewReport} />
              ))}
            </div>
          )}
        </div>

        {/* Security Footer */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-white">All reports are encrypted and anonymized</p>
                <p className="text-xs text-gray-400">Access is logged for security purposes</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-400">Last sync: Just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedReport.priority === 'high' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></div>
                  <h3 className="text-2xl font-bold text-white">{selectedReport.incidentTitle}</h3>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              {/* Report ID */}
              <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Report ID</p>
                    <p className="font-mono font-bold text-white">{selectedReport.reportId}</p>
                  </div>
                  <div className="text-sm">
                    <span className={`px-3 py-1 rounded-full ${selectedReport.status === 'pending' ? 'bg-amber-900/30 text-amber-400' : 'bg-green-900/30 text-green-400'}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium text-gray-300">Date & Time</span>
                    </div>
                    <p className="text-white">{new Date(selectedReport.dateTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-5 w-5 text-red-400" />
                      <span className="font-medium text-gray-300">Location</span>
                    </div>
                    <p className="text-white">{selectedReport.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {selectedReport.victimPhoneNumber && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-5 w-5 text-green-400" />
                        <span className="font-medium text-gray-300">Contact Number</span>
                      </div>
                      <p className="text-white">{selectedReport.victimPhoneNumber}</p>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span className="font-medium text-gray-300">Consent Status</span>
                    </div>
                    <p className={`font-medium ${selectedReport.consentToShareWithNGO ? 'text-green-400' : 'text-amber-400'}`}>
                      {selectedReport.consentToShareWithNGO ? 'Shared with NGOs ✓' : 'Anonymous only'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-3">Incident Description</h4>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-300 whitespace-pre-line">{selectedReport.description}</p>
                </div>
              </div>

              {/* Evidence */}
              {selectedReport.evidence && selectedReport.evidence.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-3">Evidence Files</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedReport.evidence.map((file, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700 hover:border-blue-500/50 transition-colors">
                        <FileText className="h-8 w-8 text-blue-400 mb-2" />
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
                <Button variant="ghost" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
                <Button variant="secondary" icon={Eye}>
                  Mark as Reviewed
                </Button>
                <Button>
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGODashboard;