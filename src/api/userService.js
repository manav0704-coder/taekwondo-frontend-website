import API from './axios';

// Service for handling user-related API calls
const UserService = {
  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await API.get('/users');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get a single user by ID
  getUser: async (id) => {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Update a user (partial update)
  updateUser: async (id, userData) => {
    try {
      const response = await API.patch(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Update user password
  updatePassword: async (passwordData) => {
    try {
      const response = await API.put('/users/updatepassword', passwordData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Delete a user (admin only)
  deleteUser: async (id) => {
    try {
      const response = await API.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Approve a user registration (change status to active)
  approveUser: async (id) => {
    try {
      const response = await API.patch(`/users/${id}/approve`, { status: 'active' });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Reject a user registration (change status to rejected)
  rejectUser: async (id) => {
    try {
      const response = await API.patch(`/users/${id}/reject`, { status: 'rejected' });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  }
};

export default UserService; 