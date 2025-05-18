import API from './axios';

// Service for handling achievement-related API calls
const AchievementService = {
  // Get all achievements
  getAllAchievements: async () => {
    try {
      const response = await API.get('/achievements');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get a single achievement by ID
  getAchievement: async (id) => {
    try {
      const response = await API.get(`/achievements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Create a new achievement (requires authentication)
  createAchievement: async (achievementData) => {
    try {
      const response = await API.post('/achievements', achievementData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Update an achievement (requires authentication)
  updateAchievement: async (id, achievementData) => {
    try {
      const response = await API.put(`/achievements/${id}`, achievementData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Delete an achievement (requires authentication)
  deleteAchievement: async (id) => {
    try {
      const response = await API.delete(`/achievements/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  }
};

export default AchievementService; 