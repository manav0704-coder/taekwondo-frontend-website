import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import EventService from '../../api/eventService';
import Modal from '../common/Modal';
import FounderContent from '../common/FounderContent';
import PresidentContent from '../common/PresidentContent';
import ProgramContent from '../common/ProgramContent';
import AnniversaryContent from '../common/AnniversaryContent';
import EventContent from '../common/EventContent';

// Placeholder images as data URIs (very simple colored rectangles)
const placeholderImages = {
  heroBg: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"%3E%3Crect width="1920" height="1080" fill="%23343A40"%3E%3C/rect%3E%3C/svg%3E',
  founder: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EFounder Image%3C/text%3E%3C/svg%3E',
  president: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EITF President Image%3C/text%3E%3C/svg%3E',
};

// Try to import from assets, but if there's an error, use placeholders
let heroBgImg, founderImg, presidentImg, anniversaryImg;
try {
  heroBgImg = require('../../assets/images/hero-1.png');
  founderImg = require('../../assets/images/Ellipse 1.png');
  presidentImg = require('../../assets/images/Ellipse 2.png');
  anniversaryImg = require('../../assets/images/frame-1.png');
} catch (e) {
  heroBgImg = placeholderImages.heroBg;
  founderImg = placeholderImages.founder;
  presidentImg = placeholderImages.president;
  // Use a placeholder if frame-1 image is not found
  anniversaryImg = placeholderImages.heroBg;
}

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [founderModalOpen, setFounderModalOpen] = useState(false);
  const [presidentModalOpen, setPresidentModalOpen] = useState(false);
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [anniversaryModalOpen, setAnniversaryModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Wrap mockEvents in useMemo to prevent it from being recreated on every render
  const mockEvents = useMemo(() => [
    {
      id: 1,
      title: "Maharashtra State Championship 2023",
      eventType: "Tournament",
      date: new Date("2023-12-15"),
      location: { city: "Mumbai", state: "Maharashtra" },
      description: "Annual State championship featuring competitors from across Maharashtra in forms, sparring, and breaking divisions. Open to all belt ranks with age-appropriate divisions.",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23343A40'%3E%3C/rect%3E%3Ctext x='400' y='200' font-family='Arial' font-size='32' fill='white' text-anchor='middle'%3EState Championship%3C/text%3E%3C/svg%3E"
    },
    {
      id: 2,
      title: "Summer Training Camp",
      eventType: "Camp",
      date: new Date("2023-12-28"),
      location: { city: "Pune", state: "Maharashtra" },
      description: "Intensive 3-day training camp led by Grand Master Kim. Focus areas include advanced forms, competition strategy, and breaking techniques. Open to green belts and above.",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23343A40'%3E%3C/rect%3E%3Ctext x='400' y='200' font-family='Arial' font-size='32' fill='white' text-anchor='middle'%3ESummer Camp%3C/text%3E%3C/svg%3E"
    },
    {
      id: 3,
      title: "Black Belt Testing",
      eventType: "Testing",
      date: new Date("2024-01-20"),
      location: { city: "Nagpur", state: "Maharashtra" },
      description: "Quarterly black belt testing event. Candidates will demonstrate forms, sparring, self-defense, breaking, and theoretical knowledge. Pre-registration required.",
      image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23343A40'%3E%3C/rect%3E%3Ctext x='400' y='200' font-family='Arial' font-size='32' fill='white' text-anchor='middle'%3EBlack Belt Test%3C/text%3E%3C/svg%3E"
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
      {/* Hero Section */}
      <section className="hero">
        {/* Overlay for better text visibility */}
        <div className="overlay"></div>
        
        {/* Background image */}
        <div 
          className="hero-bg" 
          style={{ 
            backgroundImage: `url(${heroBgImg || placeholderImages.heroBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="container">
          <div className="hero-content">
            <h1>All Maharashtra Taekwondo Association</h1>
            <p>"TaeKwon-Do Will Exist Forever."</p>
            <p className="mb-8">
              Join us in training the body and mind through the ancient Korean martial art of Taekwondo. 
              Gain discipline, self-defense skills, and physical fitness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/programs" className="btn btn-primary">
                Explore Programs
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <div className="grid grid-cols-1 grid-cols-2">
            <div className="flex justify-center items-center mb-4 md:mb-0">
              <div className="rounded-full overflow-hidden w-64 h-64 border-4 border-white shadow-lg">
                <img 
                  src={founderImg || placeholderImages.founder} 
                  alt="Founder of Taekwon-Do: Gen. Choi Hong Hi" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-secondary">Founder Of Taekwon-Do</h2>
              <h3 className="text-primary">Gen. Choi Hong Hi</h3>
              <p className="mb-6 text-secondary">
                Taekwon-Do was devised, studied and completed by Gen. Choi Hong Hi of Korea 
                and brought into the world as modern martial arts. Gen. Choi Hong Hi had to 
                practice Karate of Japan because Korea was under its colonial occupation for 
                over 36 years. Korea was liberated from Japanese colonial rule in 1945.
              </p>
              <button onClick={() => setFounderModalOpen(true)} className="btn btn-primary">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ITF President Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="text-secondary">ITF President</h2>
              <h3 className="text-primary">Prof. RI Yong Son</h3>
              <p className="mb-6 text-secondary">
                Dear Members,<br />
                I on behalf of the International Taekwon-Do Federation (ITF) would like to extend 
                my heartfelt thanks and congratulations to all the Taekwon-Doists the world over 
                who have been devoting themselves to the worldwide development and evolution of 
                the original Taekwon-Do.
              </p>
              <button onClick={() => setPresidentModalOpen(true)} className="btn btn-primary">
                Read More
              </button>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center mb-4 md:mb-0">
              <div className="rounded-full overflow-hidden w-64 h-64 border-4 border-white shadow-lg">
                <img 
                  src={presidentImg || placeholderImages.president} 
                  alt="ITF President Prof. RI Yong Son" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
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
              <p className="mt-6 text-secondary">Loading events...</p>
            </div>
          ) : upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event._id || event.id} className="card shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div style={{height: "12rem"}} className="bg-secondary-200 relative">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary-100">
                        <span className="text-secondary">No image available</span>
                      </div>
                    )}
                    <div style={{position: "absolute", top: "0", right: "0", backgroundColor: "#FF6B35", color: "white", padding: "0.25rem 0.75rem", borderBottomLeftRadius: "0.5rem"}}>
                      {event.eventType || 'Event'}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h3 className="text-secondary text-lg font-semibold">{event.title}</h3>
                    <p className="mb-2 text-secondary text-sm">
                      {event.date ? new Date(event.date.startDate || event.date).toLocaleDateString() : 'Upcoming'} 
                      - {event.location ? `${event.location.city}, ${event.location.state}` : 'TBA'}
                    </p>
                    <p className="mb-4 text-secondary" style={{overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", minHeight: "4.5rem"}}>
                      {event.description || 'More details coming soon.'}
                    </p>
                    <button 
                      onClick={() => openEventModal(event)} 
                      className="text-primary font-medium hover:underline"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary-50 rounded-xl shadow-sm">
              <p className="text-secondary">No upcoming events at the moment. Please check back later.</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/events" className="btn btn-outline">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="section bg-secondary-50">
        <div className="container">
          <h2 className="text-center text-secondary mb-16">Our Programs</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Children's Program Card */}
            <div className="card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
              <div className="p-6 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <span className="text-3xl text-white">🥋</span>
                  </div>
                  <h3 className="text-secondary text-xl font-semibold mb-3">Children's Program</h3>
                  <p className="text-secondary mb-6">
                    For ages 5-12. Builds confidence, discipline, and fundamental skills in a fun, 
                    supportive environment.
                  </p>
                </div>
                <button 
                  onClick={() => openProgramModal('children')} 
                  className="text-primary font-medium hover:underline"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Teen Program Card */}
            <div className="card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
              <div className="p-6 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <span className="text-3xl text-white">👥</span>
                  </div>
                  <h3 className="text-secondary text-xl font-semibold mb-3">Teen Program</h3>
                  <p className="text-secondary mb-6">
                    For ages 13-17. Focuses on self-defense, fitness, and developing physical and 
                    mental strength during crucial developmental years.
                  </p>
                </div>
                <button 
                  onClick={() => openProgramModal('teen')} 
                  className="text-primary font-medium hover:underline"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Adult Program Card */}
            <div className="card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-1/3">
              <div className="p-6 text-center flex flex-col items-center justify-between h-full">
                <div>
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <span className="text-3xl text-white">🏆</span>
                  </div>
                  <h3 className="text-secondary text-xl font-semibold mb-3">Competition Team</h3>
                  <p className="text-secondary mb-6">
                    Advanced training for students interested in competing at regional, national, 
                    and international levels.
                  </p>
                </div>
                <button 
                  onClick={() => openProgramModal('competition')} 
                  className="text-primary font-medium hover:underline"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button 
              onClick={() => openProgramModal('teenAdult')} 
              className="btn btn-primary btn-lg"
            >
              Explore All Programs
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Taekwondo Journey?</h2>
          <p className="text-lg mb-8">
            Join Maharashtra Taekwondo Federation today and start your journey toward mastering 
            this ancient martial art. Our experienced instructors will guide you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enroll" className="btn bg-white text-primary">
              Enroll Now
            </Link>
            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Modal */}
      <Modal 
        isOpen={founderModalOpen} 
        onClose={() => setFounderModalOpen(false)} 
        title="Gen. Choi Hong Hi - Founder of Taekwon-Do"
      >
        <FounderContent />
      </Modal>

      {/* President Modal */}
      <Modal 
        isOpen={presidentModalOpen} 
        onClose={() => setPresidentModalOpen(false)} 
        title="Prof. RI Yong Son - ITF President"
      >
        <PresidentContent />
      </Modal>

      {/* Program Modal */}
      <Modal
        isOpen={programModalOpen}
        onClose={() => setProgramModalOpen(false)}
        title={
          selectedProgram === 'children' ? "Children's Program" :
          selectedProgram === 'teen' ? "Teen Program" :
          selectedProgram === 'teenAdult' ? "Teen & Adult Program" :
          selectedProgram === 'competition' ? "Competition Team" : 
          "Program Details"
        }
      >
        {selectedProgram && <ProgramContent programType={selectedProgram} />}
      </Modal>

      {/* Anniversary Modal */}
      <Modal
        isOpen={anniversaryModalOpen}
        onClose={() => setAnniversaryModalOpen(false)}
        title="Celebrating 70 Years of Taekwon-Do"
      >
        <AnniversaryContent />
      </Modal>

      {/* Event Modal */}
      <Modal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        title={selectedEvent?.title || "Event Details"}
      >
        {selectedEvent && <EventContent event={selectedEvent} />}
      </Modal>
    </div>
  );
};

export default Home; 