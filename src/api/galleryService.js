import API from './axios';

// Service for handling gallery-related API calls
const GalleryService = {
  // Get all gallery items
  getAllGalleryItems: async () => {
    try {
      const response = await API.get('/gallery');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get gallery items by category
  getGalleryByCategory: async (category) => {
    try {
      const response = await API.get(`/gallery/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get a single gallery item
  getGalleryItem: async (id) => {
    try {
      const response = await API.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Create a new gallery item (requires authentication)
  createGalleryItem: async (itemData) => {
    try {
      const response = await API.post('/gallery', itemData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Update a gallery item (requires authentication)
  updateGalleryItem: async (id, itemData) => {
    try {
      const response = await API.put(`/gallery/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Delete a gallery item (requires authentication)
  deleteGalleryItem: async (id) => {
    try {
      const response = await API.delete(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  }
};

export default GalleryService; 