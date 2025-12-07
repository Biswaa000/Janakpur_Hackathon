import React from 'react';
import Card from '../components/UI/Card';
import { colors } from '../utils/colors';

const Dashboard = () => {
  const stats = [
    { title: 'Total Reports', value: '157', change: '+12%', icon: '📋', color: 'blue', trend: 'up' },
    { title: 'Pending Review', value: '23', change: '-5%', icon: '⏳', color: 'amber', trend: 'down' },
    { title: 'Genuine Reports', value: '89', change: '+8%', icon: '✅', color: 'green', trend: 'up' },
    { title: 'NGOs Registered', value: '42', change: '+15%', icon: '🏢', color: 'indigo', trend: 'up' },
  ];

  const recentActivities = [
    { id: 1, action: 'Report marked as genuine', target: 'Illegal Dumping Case', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'NGO profile verified', target: 'Green Earth Foundation', time: '4 hours ago', type: 'success' },
    { id: 3, action: 'Fake report deleted', target: 'Anonymous report #789', time: '1 day ago', type: 'danger' },
    { id: 4, action: 'Report forwarded to NGO', target: 'Workplace Harassment Case', time: '2 days ago', type: 'info' },
  ];

  const quickActions = [
    { id: 1, title: 'Review urgent reports', description: '3 reports require immediate attention', icon: '🚨', color: 'red' },
    { id: 2, title: 'Verify pending NGOs', description: '8 NGOs awaiting verification', icon: '✅', color: 'green' },
    { id: 3, title: 'View analytics', description: 'Generate weekly report', icon: '📊', color: 'blue' },
    { id: 4, title: 'System audit', description: 'Check system logs', icon: '🔍', color: 'indigo' },
  ];

  const systemMetrics = [
    { label: 'Report Processing', value: 85, color: 'green', icon: '⚡' },
    { label: 'Database Storage', value: 64, color: 'blue', icon: '💾' },
    { label: 'System Uptime', value: 99, color: 'emerald', icon: '🟢' },
    { label: 'API Response Time', value: 92, color: 'violet', icon: '⚙️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-blue-600 text-2xl">📊</span>
            </div>
            <div>
              <h1 className={`text-3xl font-bold text-${colors.text.primary}`}>
                Admin Dashboard
              </h1>
              <p className={`text-${colors.text.secondary} mt-1`}>
                Welcome back! Here's what's happening with your reports today.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            📥 Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            variant="elevated"
            className="hover-lift transition-all duration-300 hover:border-blue-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold text-${colors.text.secondary} uppercase tracking-wider`}>
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold text-${colors.text.primary} mt-2`}>
                  {stat.value}
                </p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-blue-600 ml-2">from last week</span>
                </div>
              </div>
              <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-50`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold text-${colors.text.primary}`}>
              ⚡ Quick Actions
            </h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Click to execute
            </span>
          </div>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button 
                key={action.id}
                className="w-full text-left p-4 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-${action.color}-100 flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}>
                    <span className={`text-${action.color}-600`}>{action.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">{action.title}</p>
                    <p className="text-sm text-blue-600">{action.description}</p>
                  </div>
                  <span className="text-blue-400 group-hover:text-blue-600 transition-colors">→</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card variant="elevated" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold text-${colors.text.primary}`}>
              📝 Recent Activity
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100' :
                    activity.type === 'danger' ? 'bg-red-100' :
                    activity.type === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <span className={
                      activity.type === 'success' ? 'text-green-600' :
                      activity.type === 'danger' ? 'text-red-600' :
                      activity.type === 'info' ? 'text-blue-600' : 'text-gray-600'
                    }>
                      {activity.type === 'success' ? '✅' :
                       activity.type === 'danger' ? '❌' :
                       activity.type === 'info' ? '📤' : '📝'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{activity.action}</p>
                    <p className="text-sm text-blue-600">{activity.target}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-blue-600">{activity.time}</span>
                  <span className="text-blue-400 group-hover:text-blue-600 transition-colors">↗</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* System Status & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card variant="elevated">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold text-${colors.text.primary}`}>
              📈 System Performance
            </h3>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-green-600 font-medium">All systems operational</span>
            </div>
          </div>
          <div className="space-y-6">
            {systemMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">{metric.icon}</span>
                    <span className="text-sm font-medium text-blue-900">{metric.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-900">{metric.value}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-blue-600 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card variant="elevated">
          <div className="mb-6">
            <h3 className={`text-lg font-semibold text-${colors.text.primary} mb-2`}>
              🏥 System Health
            </h3>
            <p className="text-sm text-blue-600">
              Real-time monitoring of critical systems
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600">🔐</span>
                <span className="text-sm font-medium text-blue-900">Security</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">Secure</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600">⚡</span>
                <span className="text-sm font-medium text-blue-900">Performance</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">Optimal</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600">🛡️</span>
                <span className="text-sm font-medium text-blue-900">Backup</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">Active</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600">🔔</span>
                <span className="text-sm font-medium text-blue-900">Alerts</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">None</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="pt-6 border-t border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-blue-900">Quick Stats</h4>
              <span className="text-xs text-blue-600">Today</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">24</p>
                <p className="text-xs text-blue-600">Reports Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">3</p>
                <p className="text-xs text-blue-600">NGOs Verified</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">98%</p>
                <p className="text-xs text-blue-600">Accuracy</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className={`text-lg font-semibold text-${colors.text.primary} mb-2`}>
              💡 Tip of the Day
            </h4>
            <p className="text-blue-700">
              Use the bulk verification feature to process multiple NGO applications simultaneously. 
              This can save up to 70% of manual verification time.
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;