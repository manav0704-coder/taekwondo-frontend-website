import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FaSearch, FaFilter, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const EnrollmentManagement = () => {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://taekwondo-website-backend.onrender.com/api/enrollments/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        setEnrollments(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch enrollments');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to fetch enrollments');
      console.error('Error fetching enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEnrollmentStatus = async (enrollmentId, newStatus) => {
    try {
      const response = await axios.put(
        `https://taekwondo-website-backend.onrender.com/api/enrollments/${enrollmentId}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        // Update the local state to reflect the change
        setEnrollments(enrollments.map(enrollment => 
          enrollment._id === enrollmentId 
            ? { ...enrollment, status: newStatus } 
            : enrollment
        ));
        
        if (selectedEnrollment && selectedEnrollment._id === enrollmentId) {
          setSelectedEnrollment({ ...selectedEnrollment, status: newStatus });
        }
      } else {
        throw new Error(response.data.message || 'Failed to update enrollment status');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to update enrollment status');
      console.error('Error updating enrollment status:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter enrollments based on search term, status, and program filters
  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    const matchesProgram = programFilter === 'all' || enrollment.program === programFilter;
    
    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Get unique programs for the filter dropdown
  const uniquePrograms = [...new Set(enrollments.map(e => e.program))];

  // Detail view for a selected enrollment
  const renderEnrollmentDetail = () => {
    if (!selectedEnrollment) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Enrollment Details
              </h2>
              <button 
                onClick={() => setSelectedEnrollment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row mb-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 md:mb-0 md:mr-4 md:w-1/3">
                <h3 className="font-semibold text-lg mb-2">Reference</h3>
                <p className="text-primary font-bold">{selectedEnrollment.referenceNumber}</p>
                
                <h3 className="font-semibold text-lg mt-4 mb-2">Status</h3>
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${selectedEnrollment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      selectedEnrollment.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {selectedEnrollment.status.charAt(0).toUpperCase() + selectedEnrollment.status.slice(1)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mt-4 mb-2">Update Status</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => updateEnrollmentStatus(selectedEnrollment._id, 'approved')}
                    className="px-3 py-1 bg-green-500 text-white rounded flex items-center"
                    disabled={selectedEnrollment.status === 'approved'}
                  >
                    <FaCheck className="mr-1" /> Approve
                  </button>
                  <button 
                    onClick={() => updateEnrollmentStatus(selectedEnrollment._id, 'rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center"
                    disabled={selectedEnrollment.status === 'rejected'}
                  >
                    <FaTimes className="mr-1" /> Reject
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg mt-4 mb-2">Date Submitted</h3>
                <p>{formatDate(selectedEnrollment.createdAt)}</p>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Full Name</p>
                    <p className="font-medium">{selectedEnrollment.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium">{selectedEnrollment.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="font-medium">{selectedEnrollment.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Date of Birth</p>
                    <p className="font-medium">{formatDate(selectedEnrollment.dateOfBirth)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Gender</p>
                    <p className="font-medium capitalize">{selectedEnrollment.gender}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <p className="text-gray-500 text-sm">Street Address</p>
                    <p className="font-medium">{selectedEnrollment.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">City</p>
                    <p className="font-medium">{selectedEnrollment.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">State</p>
                    <p className="font-medium">{selectedEnrollment.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">PIN Code</p>
                    <p className="font-medium">{selectedEnrollment.pincode}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="font-medium">{selectedEnrollment.emergencyContact}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="font-medium">{selectedEnrollment.emergencyPhone}</p>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Program Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Program</p>
                    <p className="font-medium capitalize">{selectedEnrollment.program.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Experience Level</p>
                    <p className="font-medium capitalize">
                      {selectedEnrollment.experience === 'none' ? 'No Experience' :
                       selectedEnrollment.experience === 'less-than-1' ? 'Less than 1 year' :
                       selectedEnrollment.experience === '1-3' ? '1-3 years' :
                       selectedEnrollment.experience === '3-5' ? '3-5 years' :
                       selectedEnrollment.experience === '5-plus' ? 'More than 5 years' :
                       selectedEnrollment.experience}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-500 text-sm">Medical Conditions</p>
                    <p className="font-medium">{selectedEnrollment.medicalConditions || 'None specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">How did they hear about us?</p>
                    <p className="font-medium capitalize">
                      {selectedEnrollment.howDidYouHear === 'friend' ? 'Friend or Family' :
                       selectedEnrollment.howDidYouHear === 'social-media' ? 'Social Media' :
                       selectedEnrollment.howDidYouHear === 'search-engine' ? 'Search Engine' :
                       selectedEnrollment.howDidYouHear === 'event' ? 'Event or Demonstration' :
                       selectedEnrollment.howDidYouHear === 'advertisement' ? 'Advertisement' :
                       selectedEnrollment.howDidYouHear === 'other' ? 'Other' :
                       selectedEnrollment.howDidYouHear}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Enrollment Management</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="mb-4 md:mb-0 md:w-1/2 md:mr-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control pl-10"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:w-1/2 md:space-x-2">
            <div className="relative flex-1 mb-4 md:mb-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-control pl-10"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <FaFilter className="absolute top-3 left-3 text-gray-400" />
            </div>
            
            <div className="relative flex-1">
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="form-control pl-10"
              >
                <option value="all">All Programs</option>
                {uniquePrograms.map(program => (
                  <option key={program} value={program}>
                    {program.charAt(0).toUpperCase() + program.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute top-3 left-3 text-gray-400" />
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No enrollments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary">
                        {enrollment.referenceNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {enrollment.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enrollment.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {enrollment.program.replace('-', ' ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(enrollment.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${enrollment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          enrollment.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setSelectedEnrollment(enrollment)}
                        className="text-primary hover:text-primary-dark flex items-center justify-end"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {selectedEnrollment && renderEnrollmentDetail()}
    </div>
  );
};

export default EnrollmentManagement; 