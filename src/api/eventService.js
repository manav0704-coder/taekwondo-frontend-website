import API from './axios';

// Service for handling event-related API calls
const EventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await API.get('/events');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get upcoming events
  getUpcomingEvents: async () => {
    try {
      const response = await API.get('/events/upcoming');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Get a single event by ID
  getEvent: async (id) => {
    try {
      const response = await API.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Create a new event (requires authentication)
  createEvent: async (eventData) => {
    try {
      const response = await API.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Update an existing event (requires authentication)
  updateEvent: async (id, eventData) => {
    try {
      const response = await API.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  },

  // Delete an event (requires authentication)
  deleteEvent: async (id) => {
    try {
      const response = await API.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Network error' };
    }
  }
};

export default EventService; 