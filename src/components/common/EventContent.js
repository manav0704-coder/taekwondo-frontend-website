import React from 'react';
import { Link } from 'react-router-dom';
import { format, isValid } from 'date-fns';

const EventContent = ({ event }) => {
  if (!event) return <div>Event information not available</div>;

  // Format dates if they exist
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    
    try {
      const date = new Date(dateString);
      if (!isValid(date)) return dateString;
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Handle both event data structures (API and mock data)
  const startDate = event.date?.startDate 
    ? formatDate(event.date.startDate) 
    : event.date 
      ? formatDate(event.date) 
      : 'TBA';
  
  const endDate = event.date?.endDate 
    ? formatDate(event.date.endDate) 
    : startDate;

  // Safely get the date for display in the header section
  const getEventDay = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (!isValid(date)) return '';
      return date.getDate();
    } catch (error) {
      return '';
    }
  };

  const getEventMonth = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (!isValid(date)) return '';
      return date.toLocaleString('default', { month: 'short' });
    } catch (error) {
      return '';
    }
  };

  const eventDay = getEventDay(event.date?.startDate || event.date);
  const eventMonth = getEventMonth(event.date?.startDate || event.date);

  return (
    <div className="text-secondary">
      {/* Event Header Section */}
      <div className="relative rounded-lg overflow-hidden mb-6">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 md:h-64 object-cover"
          />
        ) : (
          <div className="w-full h-48 md:h-64 bg-secondary-100 flex items-center justify-center">
            <span className="text-secondary">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            {event.eventType || 'Event'}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <div className="bg-primary-50 p-2 rounded text-center min-w-[60px]">
              <span className="text-primary text-xl font-bold">
                {eventDay || ''}
              </span>
              <br />
              <span className="text-primary text-sm">
                {eventMonth || ''}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">{event.title}</h3>
            <div className="text-sm text-gray-600">
              <div className="flex items-center mt-1">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {startDate === endDate ? startDate : `${startDate} - ${endDate}`}
              </div>
              {event.location && (
                <div className="flex items-center mt-1">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {`${event.location.city || ''}, ${event.location.state || ''}`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="text-primary text-lg font-semibold mb-2">Event Description</h4>
        <p className="whitespace-pre-line">{event.description || 'No description available.'}</p>
      </div>

      {/* Event Details Section */}
      {event.details && (
        <div className="mb-6">
          <h4 className="text-primary text-lg font-semibold mb-2">Event Details</h4>
          <div className="bg-gray-50 p-4 rounded">
            {typeof event.details === 'string' ? (
              <p className="whitespace-pre-line">{event.details}</p>
            ) : (
              <ul className="list-disc pl-5">
                {Object.entries(event.details).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* If event has registration info */}
      {event.registration && (
        <div className="mb-6">
          <h4 className="text-primary text-lg font-semibold mb-2">Registration Information</h4>
          <div className="bg-gray-50 p-4 rounded">
            {typeof event.registration === 'string' ? (
              <p className="whitespace-pre-line">{event.registration}</p>
            ) : (
              <ul className="list-disc pl-5">
                {Object.entries(event.registration).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Event Contact */}
      {event.contact && (
        <div className="mb-6">
          <h4 className="text-primary text-lg font-semibold mb-2">Contact Information</h4>
          <div className="bg-gray-50 p-4 rounded">
            <p><span className="font-medium">Contact Person:</span> {event.contact.name || 'N/A'}</p>
            {event.contact.email && <p><span className="font-medium">Email:</span> {event.contact.email}</p>}
            {event.contact.phone && <p><span className="font-medium">Phone:</span> {event.contact.phone}</p>}
          </div>
        </div>
      )}

      {/* Registration Button */}
      <div className="mt-6 bg-primary-50 p-4 rounded-lg">
        <h4 className="text-primary text-lg font-semibold mb-2">Ready to Participate?</h4>
        <p className="mb-4">Register now to secure your spot in this event. Limited spaces available!</p>
        <div className="flex space-x-4">
          <Link to="/enroll" className="btn btn-primary">
            Register Now
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventContent; 