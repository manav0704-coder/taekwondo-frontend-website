import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaImages, FaEnvelope, FaTachometerAlt } from 'react-icons/fa';
import EnrollmentManagement from './EnrollmentManagement';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Check if user is admin
  if (!currentUser || currentUser.role !== 'admin') {
    return <Redirect to="/" />;
  }
  
  // Render different sections based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case 'enrollments':
        return <EnrollmentManagement />;
      case 'dashboard':
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Total Users', count: '128', icon: <FaUsers className="text-blue-500" />, color: 'bg-blue-50' },
                { title: 'Enrollments', count: '57', icon: <FaCalendarAlt className="text-green-500" />, color: 'bg-green-50' },
                { title: 'Events', count: '24', icon: <FaCalendarAlt className="text-purple-500" />, color: 'bg-purple-50' },
                { title: 'Gallery Items', count: '215', icon: <FaImages className="text-yellow-500" />, color: 'bg-yellow-50' },
                { title: 'Contact Messages', count: '32', icon: <FaEnvelope className="text-red-500" />, color: 'bg-red-50' }
              ].map((item, index) => (
                <div key={index} className={`${item.color} rounded-lg shadow p-6 flex items-center`}>
                  <div className="p-4 rounded-full bg-white mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">{item.title}</h3>
                    <p className="text-2xl font-bold">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { action: 'New enrollment', user: 'Rahul Sharma', date: '2 hours ago', status: 'pending' },
                      { action: 'Contact message', user: 'Preeti Patel', date: '5 hours ago', status: 'new' },
                      { action: 'Event registration', user: 'Dev Kumar', date: 'Yesterday', status: 'completed' },
                      { action: 'New user signup', user: 'Ananya Singh', date: 'Yesterday', status: 'completed' },
                      { action: 'Enrollment approved', user: 'Suresh Desai', date: '2 days ago', status: 'approved' }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.action}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${item.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              item.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white shadow-lg md:w-64 w-full md:min-h-screen">
        <div className="p-6 bg-primary text-white">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-sm opacity-75">Maharashtra Taekwondo</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'dashboard' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaTachometerAlt className="mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('enrollments')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeSection === 'enrollments' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaCalendarAlt className="mr-3" />
                <span>Enrollments</span>
              </button>
            </li>
            {/* Additional sections can be added here */}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard; 