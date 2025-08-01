import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  UserCheck,
  UserX,
  Download,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegistrationAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'checkin', label: 'Check-In/Out', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: Download }
  ];

  const stats = [
    { label: 'Total Participants', value: '347', icon: Users, color: 'blue' },
    { label: 'Checked In', value: '289', icon: UserCheck, color: 'green' },
    { label: 'Not Checked In', value: '58', icon: UserX, color: 'red' },
    { label: 'Checked Out', value: '12', icon: Clock, color: 'yellow' }
  ];

  const participants = [
    { 
      id: 'MUN001', 
      name: 'John Smith', 
      email: 'john@university.edu', 
      institution: 'Harvard University',
      committee: 'UNSC',
      portfolio: 'United States',
      checkedIn: true,
      checkedInTime: '2025-03-15 09:15:00',
      checkedOut: false,
      checkedOutTime: null,
      checkInFrequency: 1,
      checkOutFrequency: 0
    },
    { 
      id: 'MUN002', 
      name: 'Sarah Johnson', 
      email: 'sarah@college.edu', 
      institution: 'MIT',
      committee: 'GA',
      portfolio: 'China',
      checkedIn: false,
      checkedInTime: null,
      checkedOut: false,
      checkedOutTime: null,
      checkInFrequency: 0,
      checkOutFrequency: 0
    }
  ];

  const handleUserSearch = (userId: string) => {
    const user = participants.find(p => p.id === userId);
    if (user) {
      setSelectedUser(user);
      setShowCheckInModal(true);
    } else {
      alert('User not found');
    }
  };

  const handleCheckIn = (userId: string) => {
    console.log('Checking in user:', userId);
    // Implementation for check-in
    setShowCheckInModal(false);
  };

  const handleCheckOut = (userId: string) => {
    console.log('Checking out user:', userId);
    // Implementation for check-out
    setShowCheckInModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MUN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Registration Desk Dashboard</h1>
                <p className="text-sm text-gray-600">Manage participant check-ins and attendance</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-800 border-r-2 border-blue-800'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-sm p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${
                          stat.color === 'blue' ? 'bg-blue-100' :
                          stat.color === 'green' ? 'bg-green-100' :
                          stat.color === 'red' ? 'bg-red-100' :
                          'bg-yellow-100'
                        }`}>
                          <stat.icon className={`w-6 h-6 ${
                            stat.color === 'blue' ? 'text-blue-600' :
                            stat.color === 'green' ? 'text-green-600' :
                            stat.color === 'red' ? 'text-red-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Check-ins</h3>
                  <div className="space-y-4">
                    {participants.filter(p => p.checkedIn).map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">{participant.name}</p>
                          <p className="text-sm text-gray-600">{participant.institution}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">Checked In</p>
                          <p className="text-xs text-gray-500">{participant.checkedInTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'checkin' && (
              <div className="space-y-6">
                {/* Check-in Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Participant Check-In/Out</h3>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Enter User ID (e.g., MUN001)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUserSearch((e.target as HTMLInputElement).value);
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const input = document.querySelector('input[placeholder*="User ID"]') as HTMLInputElement;
                        if (input?.value) {
                          handleUserSearch(input.value);
                        }
                      }}
                      className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Check-in Modal */}
                {showCheckInModal && selectedUser && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Participant Details</h3>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">User ID:</span>
                          <span className="font-medium">{selectedUser.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{selectedUser.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Institution:</span>
                          <span className="font-medium">{selectedUser.institution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-in Frequency:</span>
                          <span className="font-medium">{selectedUser.checkInFrequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Check-out Frequency:</span>
                          <span className="font-medium">{selectedUser.checkOutFrequency}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button 
                          onClick={() => setShowCheckInModal(false)}
                          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                        {!selectedUser.checkedIn ? (
                          <button 
                            onClick={() => handleCheckIn(selectedUser.id)}
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Check In
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleCheckOut(selectedUser.id)}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Check Out
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Reports</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Check-In/Out Log</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Export complete check-in and check-out logs with timestamps.
                    </p>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Export Log
                    </button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Daily Summary</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Generate daily attendance summary reports.
                    </p>
                    <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Summary
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAdminDashboard;