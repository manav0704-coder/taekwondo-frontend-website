import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EventService from '../../api/eventService';
import EventContent from '../common/EventContent';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const data = await EventService.getEvent(eventId);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        
        // For demo purposes, try to find the event in the mock data
        try {
          // Create date objects for demo events
          const today = new Date();
          const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
          const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
          const threeMonthsLater = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
          
          // Format date function
          const formatDateString = (date) => {
            return date.toISOString().split('T')[0]; // YYYY-MM-DD format
          };
          
          // Demo events
          const demoEvents = [
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
                startDate: formatDateString(nextMonth),
                endDate: formatDateString(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextMonth.getDate() + 2)),
                startTime: '09:00 AM',
                endTime: '06:00 PM'
              },
              registrationInfo: {
                isRegistrationRequired: true,
                registrationDeadline: formatDateString(today)
              },
              details: `## Event Schedule

**Day 1:** Opening ceremony, poomsae preliminaries, and children's divisions
**Day 2:** Adult divisions, team competitions, and preliminary sparring rounds
**Day 3:** Championship matches, demonstrations, and awards ceremony

## Eligibility
Open to all students with valid Maharashtra Taekwondo Federation membership.

## Registration
Pre-registration is required. Deadline is one week prior to the event.`,
              contact: {
                name: 'Tournament Committee',
                email: 'tournament@maharashtratkd.org',
                phone: '+91 98765 43210'
              }
            },
            {
              _id: '2',
              title: 'Taekwondo Summer Training Camp',
              description: 'Intensive summer training camp for all students looking to improve their techniques and prepare for upcoming competitions. Training will focus on forms, sparring, and competition strategies.',
              eventType: 'training-camp',
              location: {
                city: 'Pune',
                state: 'Maharashtra',
                venueDetails: 'AMTA Training Center'
              },
              date: {
                startDate: formatDateString(twoMonthsLater),
                endDate: formatDateString(new Date(twoMonthsLater.getFullYear(), twoMonthsLater.getMonth(), twoMonthsLater.getDate() + 15)),
                startTime: '08:00 AM',
                endTime: '04:00 PM'
              },
              registrationInfo: {
                isRegistrationRequired: true,
                registrationDeadline: formatDateString(new Date(twoMonthsLater.getFullYear(), twoMonthsLater.getMonth(), twoMonthsLater.getDate() - 10))
              },
              details: `## Daily Schedule
8:00 AM - Warm-up and conditioning
9:00 AM - Forms training
10:30 AM - Break
11:00 AM - Sparring techniques
12:30 PM - Lunch
1:30 PM - Competition strategies
3:00 PM - Special training (breaking, self-defense)
4:00 PM - Dismissal

## What to Bring
- Full uniform (dobok)
- All protective gear
- Water bottle
- Snacks and lunch
- Notebook for theory sessions`,
              contact: {
                name: 'Camp Director',
                email: 'camp@maharashtratkd.org',
                phone: '+91 91234 56789'
              }
            },
            {
              _id: '3',
              title: 'Belt Promotion Ceremony',
              description: 'Quarterly belt promotion ceremony for students who have completed their requirements. Family and friends are invited to attend and support their athletes.',
              eventType: 'belt-test',
              location: {
                city: 'Nagpur',
                state: 'Maharashtra',
                venueDetails: 'City Sports Hall'
              },
              date: {
                startDate: formatDateString(threeMonthsLater),
                endDate: formatDateString(threeMonthsLater),
                startTime: '10:00 AM',
                endTime: '01:00 PM'
              },
              registrationInfo: {
                isRegistrationRequired: false
              },
              details: `## Ceremony Schedule
10:00 AM - Opening remarks
10:15 AM - Pattern demonstrations
11:00 AM - Breaking demonstrations
11:30 AM - Self-defense demonstrations
12:00 PM - Belt ceremony
12:45 PM - Closing remarks

## Eligibility
Students must have completed all requirements and received approval from their instructor to participate in the ceremony.`,
              contact: {
                name: 'Head Instructor',
                email: 'instructor@maharashtratkd.org',
                phone: '+91 87654 32109'
              }
            }
          ];
          
          // Find the event with the matching ID
          const mockEvent = demoEvents.find(e => e._id === eventId);
          if (mockEvent) {
            setEvent(mockEvent);
            setLoading(false);
          } else {
            setError('Event not found');
            setLoading(false);
          }
        } catch (mockErr) {
          setError('Event not found');
          setLoading(false);
        }
      }
    };

    fetchEventData();
  }, [eventId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <div className="mt-6">
          <Link to="/events" className="btn btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-6">The event you are looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/events')} 
          className="flex items-center text-primary hover:text-secondary"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <EventContent event={event} />
      </div>
    </div>
  );
};

export default EventDetail; 