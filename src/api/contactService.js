import API from './axios';

// Service for handling contact form submissions
const ContactService = {
  // Submit a contact form
  submitContactForm: async (contactData) => {
    try {
      const response = await API.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get all contact submissions (Admin only)
  getContactSubmissions: async () => {
    try {
      const response = await API.get('/contact');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get a specific contact submission (Admin only)
  getContactSubmission: async (id) => {
    try {
      const response = await API.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Update a contact submission status (Admin only)
  updateContactStatus: async (id, statusData) => {
    try {
      const response = await API.put(`/contact/${id}`, statusData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Delete a contact submission (Admin only)
  deleteContactSubmission: async (id) => {
    try {
      const response = await API.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  }
};

export default ContactService; 