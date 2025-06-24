import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import EventService from '../../api/eventService';
import Modal from '../common/Modal';
import AnniversaryContent from '../common/AnniversaryContent';
import EventContent from '../common/EventContent';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Import event images
import event1Img from '../../assets/images/event-1-img.jpg';
import event2Img from '../../assets/images/event-2-img.jpg';
import event3Img from '../../assets/images/event-3-img.jpg';
import event4Img from '../../assets/images/event-4-img.jpg';
// eslint-disable-next-line no-unused-vars
import event5Img from '../../assets/images/event-5-img.jpg';
import examImg from '../../assets/images/23-feb-2025-exam.jpg';

// Placeholder image as data URI (simple colored rectangle)
const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"%3E%3Crect width="1920" height="1080" fill="%23343A40"%3E%3C/rect%3E%3C/svg%3E';

// Try to import hero image, but if there's an error, use placeholder
let heroBgImg, anniversaryImg;
try {
  heroBgImg = require('../../assets/images/hero-1.png');
  anniversaryImg = require('../../assets/images/frame-1.png');
} catch (e) {
  heroBgImg = placeholderImage;
  anniversaryImg = placeholderImage;
}

// Hero carousel slides - Using the specific requested images
const heroSlides = [
  {
    image: heroBgImg,
    title: "All Maharashtra Taekwondo Association",
    subtitle: "TaeKwon-Do Will Exist Forever.",
    description: "Join us in training the body and mind through the ancient Korean martial art of Taekwondo. Gain discipline, self-defense skills, and physical fitness."
  },
  {
    image: event1Img,
    title: "State Championships",
    subtitle: "Excellence in Competition",
    description: "Participate in prestigious state-level tournaments and competitions to test your skills against the best in Maharashtra."
  },
  {
    image: event3Img,
    title: "Master Training Workshops",
    subtitle: "Learn from the Best",
    description: "Special training workshops with visiting grandmasters provide unique opportunities to enhance your skills and knowledge."
  },
  {
    image: event4Img,
    title: "All-Age Training Programs",
    subtitle: "Taekwondo for Everyone",
    description: "From children to adults, our programs are designed to meet the needs of practitioners at all levels and ages."
  },
  {
    image: examImg,
    title: "Belt Promotion Exams",
    subtitle: "Advancing Your Journey",
    description: "Regular belt promotion exams showcase the dedication and progress of our students in their Taekwondo journey."
  }
];

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [anniversaryModalOpen, setAnniversaryModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to advance to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, []);

  // Function to go back to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }, []);

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Wrap mockEvents in useMemo to prevent it from being recreated on every render
  const mockEvents = useMemo(() => [
    {
      id: 1,
      title: "Maharashtra State Championship 2023",
      eventType: "Tournament",
      date: new Date("2023-12-15"),
      location: { city: "Mumbai", state: "Maharashtra" },
      description: "Annual State championship featuring competitors from across Maharashtra in forms, sparring, and breaking divisions. Open to all belt ranks with age-appropriate divisions.",
      image: event1Img
    },
    {
      id: 2,
      title: "Summer Training Camp",
      eventType: "Camp",
      date: new Date("2023-12-28"),
      location: { city: "Pune", state: "Maharashtra" },
      description: "Intensive 3-day training camp led by Grand Master Kim. Focus areas include advanced forms, competition strategy, and breaking techniques. Open to green belts and above.",
      image: event2Img
    },
    {
      id: 3,
      title: "Black Belt Testing",
      eventType: "Testing",
      date: new Date("2024-01-20"),
      location: { city: "Nagpur", state: "Maharashtra" },
      description: "Quarterly black belt testing event. Candidates will demonstrate forms, sparring, self-defense, breaking, and theoretical knowledge. Pre-registration required.",
      image: event3Img
    }
  ], []); // Empty dependency array means this will only be created once

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await EventService.getUpcomingEvents();
        
        // If we get events from the API, use them
        if (response.data && response.data.length > 0) {
          setUpcomingEvents(response.data);
        } else {
          // Otherwise use mock data
          setUpcomingEvents(mockEvents);
        }
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
        // Use mock data if API call fails
        setUpcomingEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, [mockEvents]); // mockEvents is now stable and won't cause re-renders

  const openProgramModal = (programType) => {
    setSelectedProgram(programType);
    setProgramModalOpen(true);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section className="hero">
        {/* Carousel Navigation Arrows */}
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
        
        {/* Carousel Slides */}
        <div className="carousel-container">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                paddingTop: '3rem' // Add padding to ensure content isn't covered by navbar
              }}
            >
              {/* Overlay for better text visibility */}
              <div className="overlay"></div>
              
              {/* Slide Content - Positioned at bottom left with more margin from top */}
              <div className="carousel-content-wrapper">
                <div className="carousel-content">
                  <h1>{slide.title}</h1>
                  <p className="subtitle">"{slide.subtitle}"</p>
                  <p className="description">
                    {slide.description}
                  </p>
                  <div className="carousel-buttons">
                    <Link to="/programs" className="btn btn-primary">
                      Explore Programs
                    </Link>
                    <Link to="/contact" className="btn btn-outline">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button 
              key={index} 
              className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 70th Anniversary Section */}
      <section className="section bg-primary-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h2 className="text-primary mb-8">
                Celebrating 70 Years Of Taekwon-Do
              </h2>
              <p className="mb-10 text-secondary">
                Seventy years ago, General Choi Hong Hi introduced Taekwon-Do to the world, 
                giving humanity an exceptional martial art that has since united over many 
                millions of practitioners across five continents. May Taekwon-Do continue to 
                promote peace, respect, and mutual understanding around the world. These values, 
                as taught by General Choi Hong Hi, have positively influenced the lives of millions 
                across the globe — and remain at the heart of our beloved art. May his teachings 
                inspire generations to come!
              </p>
              <button 
                onClick={() => setAnniversaryModalOpen(true)} 
                className="btn btn-outline"
              >
                Read More
              </button>
            </div>
            <div className="flex justify-center">
              <img 
                src={anniversaryImg} 
                alt="70 Years of Taekwon-Do" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-center text-secondary mb-12">Upcoming Events</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="mx-auto" style={{width: "64px", height: "64px", border: "4px solid #eee", borderTopColor: "#FF6B35", borderRadius: "50%", animation: "spin 1s linear infinite"}}></div>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-2/5 h-48 md:h-64">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 mt-2 mr-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                        {event.eventType}
                      </div>
                    </div>
                    
                    <div className="p-4 md:w-3/5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-secondary">{event.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <FaCalendarAlt className="mr-2 text-primary" />
                          <span>
                            {event.date instanceof Date ? event.date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'Date TBA'}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <FaMapMarkerAlt className="mr-2 text-primary" />
                          <span>{event.location?.city}, {event.location?.state}</span>
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto">
                        <button 
                          onClick={() => openEventModal(event)} 
                          className="text-primary font-medium hover:text-secondary transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary">No upcoming events at the moment. Please check back later.</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/events" className="btn btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <h2 className="text-center text-secondary mb-12">Our Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Children's Program */}
            <div className="card bg-white">
              <div className="card-body text-center">
                <h3 className="card-title">Children's Program</h3>
                <p className="card-text">
                  Designed for children ages 4-12. Build confidence, discipline, and physical 
                  coordination while having fun!
                  </p>
                <button 
                  onClick={() => openProgramModal('children')} 
                  className="btn btn-sm btn-outline mt-4"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Teens Program */}
            <div className="card bg-white">
              <div className="card-body text-center">
                <h3 className="card-title">Teens Program</h3>
                <p className="card-text">
                  For ages 13-17, focusing on self-discipline, respect, and advanced 
                  techniques suited for developing bodies.
                  </p>
                <button 
                  onClick={() => openProgramModal('teens')} 
                  className="btn btn-sm btn-outline mt-4"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Adults Program */}
            <div className="card bg-white">
              <div className="card-body text-center">
                <h3 className="card-title">Adults Program</h3>
                <p className="card-text">
                  Complete fitness while learning self-defense. Great stress relief and 
                  community for adults of all ages.
                  </p>
                <button 
                  onClick={() => openProgramModal('adults')} 
                  className="btn btn-sm btn-outline mt-4"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/programs" className="btn btn-primary">
              Explore All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <Modal
        isOpen={anniversaryModalOpen}
        onClose={() => setAnniversaryModalOpen(false)}
        title="70 Years of Taekwon-Do"
      >
        <AnniversaryContent />
      </Modal>

      <Modal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        title={selectedEvent?.title || "Event Details"}
      >
        {selectedEvent && <EventContent event={selectedEvent} />}
      </Modal>

      <Modal 
        isOpen={programModalOpen} 
        onClose={() => setProgramModalOpen(false)}
        title={selectedProgram ? `${selectedProgram.charAt(0).toUpperCase() + selectedProgram.slice(1)}'s Program` : "Program Details"}
      >
        <div>
          {selectedProgram && (
            <div>
              <p className="mb-4">
                Our {selectedProgram} program is designed to help participants develop physical fitness, 
                mental discipline, and self-defense skills in a safe and supportive environment.
              </p>
              <h3 className="text-lg font-bold mb-2">Benefits:</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Physical fitness and coordination</li>
                <li>Self-discipline and focus</li>
                <li>Self-defense skills</li>
                <li>Confidence building</li>
                <li>Respect for self and others</li>
              </ul>
              <p>
                Visit our Programs page or contact us directly to learn more about class schedules 
                and registration information.
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Custom CSS for carousel and animations */}
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }
        
        .carousel-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          transition: opacity 0.8s ease-in-out;
        }
        
        .carousel-slide.active {
          z-index: 1;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.2) 100%);
          z-index: 1;
        }
        
        .carousel-content-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 2;
        }
        
        .carousel-content {
          color: white;
          text-align: left;
          padding: 2rem 4rem 4rem;
          max-width: 800px;
        }
        
        .carousel-content h1 {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          line-height: 1.2;
        }
        
        .carousel-content .subtitle {
          font-size: 1.8rem;
          font-style: italic;
          margin-bottom: 1rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }
        
        .carousel-content .description {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          max-width: 600px;
          line-height: 1.5;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
        }
        
        .carousel-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.3);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
          z-index: 10;
        }
        
        .carousel-arrow:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        .carousel-arrow-left {
          left: 20px;
        }
        
        .carousel-arrow-right {
          right: 20px;
        }
        
        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        
        .carousel-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .carousel-indicator.active {
          background: white;
        }
        
        /* Responsive styling */
        @media (max-width: 768px) {
          .hero {
            height: 100vh;
            min-height: 500px;
          }
          
          .carousel-content {
            padding: 1.5rem 2rem 3rem;
          }
          
          .carousel-content h1 {
            font-size: 2.2rem;
          }
          
          .carousel-content .subtitle {
            font-size: 1.4rem;
          }
          
          .carousel-content .description {
            font-size: 1rem;
            margin-bottom: 1rem;
          }
          
          .carousel-arrow {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
        }
        
        /* Even smaller screens */
        @media (max-width: 480px) {
          .carousel-content {
            padding: 1rem 1.5rem 2.5rem;
          }
          
          .carousel-content h1 {
            font-size: 1.8rem;
          }
          
          .carousel-content .subtitle {
            font-size: 1.2rem;
          }
          
          .carousel-content .description {
            font-size: 0.9rem;
          }
          
          .carousel-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home; 