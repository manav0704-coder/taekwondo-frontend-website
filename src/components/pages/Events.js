import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaFilter, FaSearch } from 'react-icons/fa';
// Import new event images
import event1Img from '../../assets/images/event-1-img.jpg';
import event2Img from '../../assets/images/event-2-img.jpg';
import event3Img from '../../assets/images/event-3-img.jpg';
import event4Img from '../../assets/images/event-4-img.jpg';
import event5Img from '../../assets/images/event-5-img.jpg';
// Import Modal and EventContent components
import Modal from '../common/Modal';
import EventContent from '../common/EventContent';

const Events = () => {
  // Create demo events first to ensure they're available
  const demoEvents = useMemo(() => {
    // Direct date strings instead of using formatDateString
    console.log('Creating demo events');
    return [
      {
        _id: '1',
        title: 'Maharashtra State Taekwondo Championship 2023',
        description: 'Join us for the annual state championship featuring top athletes from across Maharashtra. All belt levels are welcome to participate in this prestigious competition.',
        eventType: 'tournament',
        location: {
          city: 'Mumbai',
          state: 'Maharashtra',
          venueDetails: 'Shivaji Park Sports Complex'
        },
        date: {
          startDate: '2024-04-15', // Changed to upcoming date
          endDate: '2024-04-17',
          startTime: '09:00 AM',
          endTime: '06:00 PM'
        },
        registrationInfo: {
          isRegistrationRequired: true,
          registrationDeadline: '2024-03-30'
        },
        image: event1Img
      },
      {
        _id: '2',
        title: 'National Taekwondo Training Camp',
        description: 'Intensive training camp for all students looking to improve their techniques and prepare for upcoming competitions. Training will focus on forms, sparring, and competition strategies.',
        eventType: 'training-camp',
        location: {
          city: 'Pune',
          state: 'Maharashtra',
          venueDetails: 'AMTA Training Center'
        },
        date: {
          startDate: '2024-04-28', // Changed to upcoming date
          endDate: '2024-05-10',
          startTime: '08:00 AM',
          endTime: '04:00 PM'
        },
        registrationInfo: {
          isRegistrationRequired: true,
          registrationDeadline: '2024-04-15'
        },
        image: event2Img
      },
      {
        _id: '3',
        title: 'Spring Belt Promotion Ceremony',
        description: 'Quarterly belt promotion ceremony for students who have completed their requirements. Family and friends are invited to attend and support their athletes.',
        eventType: 'belt-test',
        location: {
          city: 'Nagpur',
          state: 'Maharashtra',
          venueDetails: 'City Sports Hall'
        },
        date: {
          startDate: '2024-05-15', // Changed to upcoming date
          endDate: '2024-05-15',
          startTime: '10:00 AM',
          endTime: '01:00 PM'
        },
        registrationInfo: {
          isRegistrationRequired: false
        },
        image: event3Img
      },
      {
        _id: '4',
        title: 'International Master Workshop',
        description: 'Special training workshop with Grandmaster Lee from South Korea. This is a rare opportunity to learn from one of the most accomplished Taekwondo masters in the world.',
        eventType: 'seminar',
        location: {
          city: 'Mumbai',
          state: 'Maharashtra',
          venueDetails: 'International Sports Arena'
        },
        date: {
          startDate: '2024-05-20', // Changed to upcoming date
          endDate: '2024-05-22',
          startTime: '09:00 AM',
          endTime: '05:00 PM'
        },
        registrationInfo: {
          isRegistrationRequired: true,
          registrationDeadline: '2024-05-10'
        },
        image: event4Img
      },
      // Past events
      {
        _id: '5',
        title: 'Regional Taekwondo Championship',
        description: 'A competitive event for all regional schools to participate and showcase their skills. Various age groups and belt categories were represented in this exciting tournament.',
        eventType: 'tournament',
        location: {
          city: 'Pune',
          state: 'Maharashtra',
          venueDetails: 'Pune Sports Stadium'
        },
        date: {
          startDate: '2023-11-15', // Past date
          endDate: '2023-11-16',
          startTime: '09:00 AM',
          endTime: '06:00 PM'
        },
        registrationInfo: {
          isRegistrationRequired: false
        },
        image: event5Img
      },
      {
        _id: '7',
        title: 'National Youth Championship',
        description: 'Young athletes from across the country competed in various categories showing incredible skill and sportsmanship.',
        eventType: 'tournament',
        location: {
          city: 'Delhi',
          state: 'Delhi',
          venueDetails: 'National Sports Arena'
        },
        date: {
          startDate: '2024-01-20', // Past date
          endDate: '2024-01-22',
          startTime: '08:00 AM',
          endTime: '06:00 PM'
        },
        registrationInfo: {
          isRegistrationRequired: true,
          registrationDeadline: '2024-01-10'
        },
        image: event3Img
      },
    ];
  }, []);

  // Component state setup
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    eventType: '',
    searchQuery: '',
    location: '',
    dateRange: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  // Add state for event modal
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample achievements data (replace with API call when available)
  const sampleAchievements = useMemo(() => [
    {
      id: 1,
      title: 'National Championship Gold Medal',
      description: 'Our students won 5 gold medals at the National Taekwondo Championship',
      year: '2023',
      image: event1Img,
    },
    {
      id: 2,
      title: 'International Tournament Recognition',
      description: 'AMTA received special recognition at the International Taekwondo Federation Tournament',
      year: '2022',
      image: event2Img,
    },
    {
      id: 3,
      title: 'Best Taekwondo School Award',
      description: 'Awarded as the Best Taekwondo School in Maharashtra',
      year: '2023',
      image: event3Img,
    },
  ], []);

  // Fetch events from API - Simplified to always use demo events and show all initially
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log('Setting up events...');
        
        // Always use demo events for reliability
        setEvents(demoEvents);
        setFilteredEvents(demoEvents); // Show all events initially
        
        // Set sample achievements data
        setAchievements(sampleAchievements);
        setLoading(false);
      } catch (err) {
        console.error('Error setting up events:', err);
        setEvents([]);
        setFilteredEvents([]);
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchEvents();
  }, [demoEvents, sampleAchievements]);

  // Filter events only when tab or filters change
  useEffect(() => {
    if (!events || events.length === 0) {
      return;
    }

    // Start with all events
    let result = [...events];
    
    // Only apply tab filtering if not on 'all' tab
    if (activeTab === 'upcoming') {
      const currentDate = new Date();
      result = result.filter(event => {
        const eventStartDate = new Date(event.date?.startDate);
        return eventStartDate >= currentDate;
      });
    } else if (activeTab === 'past') {
      const currentDate = new Date();
      result = result.filter(event => {
        const eventStartDate = new Date(event.date?.startDate);
        return eventStartDate < currentDate;
      });
    }

    // Apply additional filters
    // Apply event type filter
    if (filters.eventType) {
      result = result.filter(event => event.eventType === filters.eventType);
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        event =>
          (event.title && event.title.toLowerCase().includes(query)) ||
          (event.description && event.description.toLowerCase().includes(query))
      );
    }

    // Apply location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      result = result.filter(
        event =>
          (event.location?.city && event.location.city.toLowerCase().includes(locationQuery)) ||
          (event.location?.state && event.location.state.toLowerCase().includes(locationQuery))
      );
    }

    // Apply date range filter
    if (filters.dateRange) {
      if (filters.dateRange === 'thisMonth') {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
        result = result.filter(event => {
          const eventStartDate = new Date(event.date.startDate);
          return eventStartDate >= firstDayOfMonth && eventStartDate <= lastDayOfMonth;
        });
      } else if (filters.dateRange === 'nextMonth') {
        const today = new Date();
        const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
        
        result = result.filter(event => {
          const eventStartDate = new Date(event.date.startDate);
          return eventStartDate >= firstDayOfNextMonth && eventStartDate <= lastDayOfNextMonth;
        });
      } else if (filters.dateRange === 'next3Months') {
        const today = new Date();
        const threeMonthsAhead = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
        
        result = result.filter(event => {
          const eventStartDate = new Date(event.date.startDate);
          return eventStartDate >= today && eventStartDate <= threeMonthsAhead;
        });
      }
    }

    setFilteredEvents(result);
  }, [events, filters, activeTab]);

  // Handle tab change - Updated to include 'all' tab
  const handleTabChange = (tab) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
    
    // Reset filters when changing tabs
    setFilters({
      eventType: '',
      searchQuery: '',
      location: '',
      dateRange: '',
    });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      eventType: '',
      searchQuery: '',
      location: '',
      dateRange: '',
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'TBA';
    }
  };

  // Get event type badge color
  const getEventTypeColor = (type) => {
    const colors = {
      'tournament': 'bg-red-500',
      'seminar': 'bg-blue-500',
      'belt-test': 'bg-yellow-500',
      'training-camp': 'bg-green-500',
      'workshop': 'bg-purple-500',
      'demonstration': 'bg-indigo-500',
      'other': 'bg-gray-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  // Display error message if needed
  const displayError = () => {
    return null;
  };

  // Handle opening event modal
  const openEventModal = (event) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  // Render event card
  const renderEventCard = (event) => {
    if (!event || !event._id) {
      console.log('Invalid event:', event);
      return null;
    }
    
    // Ensure event has all required properties with defaults
    const safeEvent = {
      _id: event._id,
      title: event.title || 'Untitled Event',
      description: event.description || 'No description available',
      eventType: event.eventType || 'event',
      image: event.image || event1Img, // Default to event1Img if no image
      date: {
        startDate: event.date?.startDate || new Date(),
        endDate: event.date?.endDate || event.date?.startDate || new Date()
      },
      location: {
        city: event.location?.city || 'TBA',
        state: event.location?.state || '',
        venueDetails: event.location?.venueDetails || ''
      },
      registrationInfo: {
        isRegistrationRequired: event.registrationInfo?.isRegistrationRequired || false
      }
    };
    
    return (
      <div key={safeEvent._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-2/5 h-48 md:h-64">
            <img 
              src={safeEvent.image} 
              alt={safeEvent.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load, using fallback');
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = event1Img;
              }}
            />
            <div className={`absolute top-0 right-0 mt-2 mr-2 ${getEventTypeColor(safeEvent.eventType)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {safeEvent.eventType.replace('-', ' ').toUpperCase()}
            </div>
          </div>
          
          <div className="p-4 md:w-3/5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2 text-secondary">{safeEvent.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <FaCalendarAlt className="mr-2 text-primary" />
                <span>{formatDate(safeEvent.date.startDate)}</span>
                {safeEvent.date.startDate !== safeEvent.date.endDate && (
                  <span> - {formatDate(safeEvent.date.endDate)}</span>
                )}
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2 text-primary" />
                <span>{safeEvent.location.city}{safeEvent.location.state ? `, ${safeEvent.location.state}` : ''}</span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{safeEvent.description}</p>
            </div>
            
            <div className="flex justify-between items-center mt-auto">
              <button 
                onClick={() => openEventModal(safeEvent)}
                className="text-primary font-medium hover:text-secondary transition-colors"
              >
                View Details
              </button>
              
              {new Date(safeEvent.date.startDate) >= new Date() && safeEvent.registrationInfo.isRegistrationRequired && (
                <Link 
                  to="/enroll"
                  className="bg-primary text-white px-3 py-1 rounded-full font-medium text-sm hover:bg-opacity-90 transition-colors"
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render achievement card
  const renderAchievementCard = (achievement) => {
    return (
      <div key={achievement.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={achievement.image} 
            alt={achievement.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 mt-2 mr-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            {achievement.year}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <FaTrophy className="text-yellow-500 mr-2" />
            <h3 className="text-xl font-bold text-secondary">{achievement.title}</h3>
          </div>
          <p className="text-gray-700">{achievement.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-secondary text-white py-16 px-4 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Achievements</h1>
          <p className="text-xl max-w-2xl mb-6">
            Discover upcoming Taekwondo competitions, seminars, training camps, and celebrate our achievements together.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleTabChange('all')}
              className={`px-5 py-2 rounded-full ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-white text-secondary'} font-medium transition-colors`}
            >
              All Events
            </button>
            <button 
              onClick={() => handleTabChange('upcoming')}
              className={`px-5 py-2 rounded-full ${activeTab === 'upcoming' ? 'bg-primary text-white' : 'bg-white text-secondary'} font-medium transition-colors`}
            >
              Upcoming Events
            </button>
            <button 
              onClick={() => handleTabChange('past')}
              className={`px-5 py-2 rounded-full ${activeTab === 'past' ? 'bg-primary text-white' : 'bg-white text-secondary'} font-medium transition-colors`}
            >
              Past Events
            </button>
            <button 
              onClick={() => handleTabChange('achievements')}
              className={`px-5 py-2 rounded-full ${activeTab === 'achievements' ? 'bg-primary text-white' : 'bg-white text-secondary'} font-medium transition-colors`}
            >
              Achievements
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-8">
        {/* Error message if any */}
        {displayError()}
        
        {/* Filters */}
        {activeTab !== 'achievements' && (
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-secondary">
                {activeTab === 'upcoming' ? 'Upcoming Events' : 
                 activeTab === 'past' ? 'Past Events' : 'All Events'}
              </h2>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-primary hover:text-secondary transition-colors"
              >
                <FaFilter className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {showFilters && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-auto flex-grow">
                    <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="searchQuery"
                        name="searchQuery"
                        value={filters.searchQuery}
                        onChange={handleFilterChange}
                        placeholder="Search events..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex-grow">
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={filters.eventType}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    >
                      <option value="">All Types</option>
                      <option value="tournament">Tournament</option>
                      <option value="seminar">Seminar</option>
                      <option value="belt-test">Belt Test</option>
                      <option value="training-camp">Training Camp</option>
                      <option value="workshop">Workshop</option>
                      <option value="demonstration">Demonstration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="w-full md:w-auto flex-grow">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      placeholder="Filter by city, state..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="w-full md:w-auto flex-grow">
                    <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select
                      id="dateRange"
                      name="dateRange"
                      value={filters.dateRange}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    >
                      <option value="">Any Time</option>
                      <option value="thisMonth">This Month</option>
                      <option value="nextMonth">Next Month</option>
                      <option value="next3Months">Next 3 Months</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* No Events State */}
        {!loading && activeTab !== 'achievements' && (!filteredEvents || filteredEvents.length === 0) && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-3">No events match your criteria</h3>
            {(filters.eventType || filters.searchQuery || filters.location || filters.dateRange) ? (
              <>
                <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            ) : (
              <p className="text-gray-600 mb-8">We'll be adding new events soon. Check back later!</p>
            )}
          </div>
        )}

        {/* Events Grid */}
        {!loading && activeTab !== 'achievements' && filteredEvents && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(renderEventCard)}
          </div>
        )}

        {/* Achievements Section */}
        {activeTab === 'achievements' && !loading && (
          <>
            <h2 className="text-2xl font-bold text-secondary mb-6">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(renderAchievementCard)}
            </div>

            {/* Additional Achievement Content */}
            <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">AMTA Success Story</h3>
                <p className="text-gray-700 mb-4">
                  All Maharashtra Taekwondo Association has a proud history of producing champions and promoting the sport of Taekwondo throughout Maharashtra. Our students have represented the state and country in numerous national and international competitions.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-primary mb-2">Medal Tally - Last 5 Years</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gold</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Silver</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bronze</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 whitespace-nowrap">2023</td>
                          <td className="px-4 py-2 whitespace-nowrap">12</td>
                          <td className="px-4 py-2 whitespace-nowrap">8</td>
                          <td className="px-4 py-2 whitespace-nowrap">15</td>
                          <td className="px-4 py-2 whitespace-nowrap font-medium">35</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 whitespace-nowrap">2022</td>
                          <td className="px-4 py-2 whitespace-nowrap">10</td>
                          <td className="px-4 py-2 whitespace-nowrap">12</td>
                          <td className="px-4 py-2 whitespace-nowrap">8</td>
                          <td className="px-4 py-2 whitespace-nowrap font-medium">30</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 whitespace-nowrap">2021</td>
                          <td className="px-4 py-2 whitespace-nowrap">7</td>
                          <td className="px-4 py-2 whitespace-nowrap">9</td>
                          <td className="px-4 py-2 whitespace-nowrap">11</td>
                          <td className="px-4 py-2 whitespace-nowrap font-medium">27</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 whitespace-nowrap">2020</td>
                          <td className="px-4 py-2 whitespace-nowrap">5</td>
                          <td className="px-4 py-2 whitespace-nowrap">6</td>
                          <td className="px-4 py-2 whitespace-nowrap">8</td>
                          <td className="px-4 py-2 whitespace-nowrap font-medium">19</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 whitespace-nowrap">2019</td>
                          <td className="px-4 py-2 whitespace-nowrap">9</td>
                          <td className="px-4 py-2 whitespace-nowrap">11</td>
                          <td className="px-4 py-2 whitespace-nowrap">14</td>
                          <td className="px-4 py-2 whitespace-nowrap font-medium">34</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-secondary to-primary text-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">Join Our Next Event</h3>
              <p className="text-white text-opacity-90">
                Experience the excitement and challenge of Taekwondo events. From beginners to black belts, there's something for everyone.
              </p>
            </div>
            <div className="md:w-1/3 text-center">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Contact For Details
              </Link>
            </div>
          </div>
        </div>

        {/* Event Modal */}
        <Modal
          isOpen={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
          title={selectedEvent?.title || "Event Details"}
        >
          {selectedEvent && <EventContent event={selectedEvent} />}
        </Modal>
      </div>
    </div>
  );
};

export default Events; 