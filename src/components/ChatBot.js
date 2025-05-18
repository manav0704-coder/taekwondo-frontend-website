import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm the Maharashtra Taekwondo Assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Toggle chatbot visibility and reset messages when closed
  const toggleChatbot = () => {
    // If we're closing the chatbot, reset messages
    if (isOpen) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: "Hello! I'm the Maharashtra Taekwondo Assistant. How can I help you today?",
            sender: 'bot'
          }
        ]);
        setInputMessage('');
      }, 300); // Small delay to ensure chat is closed before resetting
    }
    setIsOpen(!isOpen);
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    
    // Process the message and respond
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 500);
  };

  // Enhanced response generator with more detailed answers
  const generateBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    // Greetings
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      return "Hello! How can I assist you with Maharashtra Taekwondo today? Feel free to ask about our programs, classes, events, or membership details.";
    }
    
    // Programs and Classes
    else if (lowerCaseMessage.includes('class') || lowerCaseMessage.includes('program') || lowerCaseMessage.includes('training')) {
      if (lowerCaseMessage.includes('kid') || lowerCaseMessage.includes('child')) {
        return "Our children's programs are divided by age groups: Little Tigers (4-6 years), Junior Warriors (7-9 years), and Young Champions (10-13 years). Each program focuses on age-appropriate skills, discipline, and fun activities to keep children engaged while learning Taekwondo.";
      } else if (lowerCaseMessage.includes('adult')) {
        return "Our adult programs cater to beginners through advanced practitioners (14+ years). We offer fitness-focused classes, traditional Taekwondo training, and competitive sport Taekwondo. Classes typically run weekday evenings and weekend mornings.";
      } else if (lowerCaseMessage.includes('beginner')) {
        return "Our beginner programs introduce fundamental techniques, stances, and basic movements. No experience is necessary, and we provide all the guidance you need to start your Taekwondo journey. We recommend attending 2-3 classes per week for optimal progress.";
      } else if (lowerCaseMessage.includes('advanced') || lowerCaseMessage.includes('black belt')) {
        return "Advanced programs focus on perfecting techniques, complex forms, sparring strategies, and specialized skills. These classes are for colored belts moving toward black belt or current black belts continuing their training.";
      } else {
        return "We offer Taekwondo programs for all ages (4+) and skill levels. Our curriculum includes traditional Taekwondo techniques, forms (poomsae), sparring, self-defense, board breaking, and competitive training. Visit our Programs page for detailed information about class schedules and specific offerings.";
      }
    }
    
    // Locations and Contact
    else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('where') || lowerCaseMessage.includes('address')) {
      return "Our main training center is located at 123 Taekwondo Way, Mumbai, Maharashtra. We also have affiliated schools throughout the state. Visit our Contact page for specific locations, maps, and contact details for each training center.";
    }
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('phone') || lowerCaseMessage.includes('email')) {
      return "You can reach us by phone at (+91) 123-456-7890 or email at info@maharashtrataekowondo.org. Our administrative office is open Monday-Friday, 9am-5pm. For specific instructor contact information, please visit our Contact page.";
    }
    
    // Events and Tournaments
    else if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('tournament') || lowerCaseMessage.includes('championship')) {
      if (lowerCaseMessage.includes('upcoming') || lowerCaseMessage.includes('next')) {
        return "Our next major event is the Maharashtra State Championship in June. We also host regular belt promotion tests every two months, seminars with guest instructors quarterly, and friendly in-house tournaments for students. Check our Events page for the complete calendar.";
      } else if (lowerCaseMessage.includes('register') || lowerCaseMessage.includes('join') || lowerCaseMessage.includes('participate')) {
        return "To register for tournaments or events, you can sign up through your instructor, use the registration forms on our Events page, or contact our administrative office. Most competitions have registration deadlines 2-4 weeks before the event date.";
      } else {
        return "We organize various events throughout the year, including state and national-level tournaments, belt promotion tests, special training seminars, summer camps, and community demonstrations. Visit our Events page for detailed information about upcoming activities.";
      }
    }
    
    // Instructors and Masters
    else if (lowerCaseMessage.includes('instructor') || lowerCaseMessage.includes('master') || lowerCaseMessage.includes('coach')) {
      return "Our instructors are certified by Kukkiwon (World Taekwondo Headquarters) and have extensive experience in both training and competition. Many hold national and international medals and have specialized teaching certifications. Each instructor undergoes regular continued education to maintain the highest teaching standards. Learn more about our teaching team on the About page.";
    }
    
    // Belt System and Progression
    else if (lowerCaseMessage.includes('belt') || lowerCaseMessage.includes('rank') || lowerCaseMessage.includes('promotion')) {
      if (lowerCaseMessage.includes('test') || lowerCaseMessage.includes('exam')) {
        return "Belt promotion tests are held approximately every two months. To qualify for testing, students must complete the required number of classes, demonstrate proficiency in their current curriculum, and receive instructor approval. Test fees range from ₹1000-3000 depending on rank.";
      } else {
        return "Taekwondo uses a belt ranking system progressing from white (beginner) through yellow, green, blue, red, and finally black (advanced). Each color has multiple levels indicated by stripes. Students typically require 2-5 years of consistent training to achieve black belt, depending on training frequency and individual progress.";
      }
    }
    
    // Fees and Pricing
    else if (lowerCaseMessage.includes('fee') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('price') || lowerCaseMessage.includes('payment')) {
      return "Our program fees vary based on age, program type, and membership duration. Monthly memberships range from ₹1500-4000, with discounts for quarterly or annual payments. One-time registration fee includes your uniform. Family discounts and scholarship programs are available. Please contact us directly for a personalized quote or visit our Programs page for detailed pricing.";
    }
    
    // Equipment and Uniform
    else if (lowerCaseMessage.includes('equipment') || lowerCaseMessage.includes('uniform') || lowerCaseMessage.includes('dobok')) {
      return "Beginners need a dobok (uniform) which is included in your registration fee. As you progress, you'll need protective gear for sparring including: headgear, mouthguard, chest protector, arm/shin guards, and instep pads. We sell approved equipment at our school, or we can recommend reputable suppliers. Competition-level electronic gear is available for rental during tournaments.";
    }
    
    // Benefits of Taekwondo
    else if (lowerCaseMessage.includes('benefit') || lowerCaseMessage.includes('advantage') || lowerCaseMessage.includes('why')) {
      return "Taekwondo provides numerous benefits including: physical fitness and flexibility, self-defense skills, improved focus and concentration, stress relief, confidence building, discipline development, goal-setting experience, and community belonging. It's an Olympic sport that develops both physical and mental strengths while teaching traditional values and cultural appreciation.";
    }
    
    // Trial Class and Observation
    else if (lowerCaseMessage.includes('trial') || lowerCaseMessage.includes('watch') || lowerCaseMessage.includes('observe') || lowerCaseMessage.includes('first class')) {
      return "We offer a free trial class for new students, and you're welcome to observe any regular class before joining. No reservation is needed to observe, but we recommend scheduling trial classes in advance. Just bring comfortable clothes and arrive 15 minutes before class starts to complete a waiver form.";
    }
    
    // Membership and Registration
    else if (lowerCaseMessage.includes('join') || lowerCaseMessage.includes('membership') || lowerCaseMessage.includes('register') || lowerCaseMessage.includes('sign up')) {
      return "To join our school, you can register in person at any location, fill out the application form on our website, or call our main office. We'll help you select the appropriate program, complete necessary paperwork, and schedule your first class. New students can join anytime, and no prior experience is necessary.";
    }
    
    // Thank you and Closing
    else if (lowerCaseMessage.includes('thank') || lowerCaseMessage.includes('thanks')) {
      return "You're welcome! Feel free to ask if you have any other questions about Maharashtra Taekwondo. We hope to see you at one of our training centers soon!";
    }
    
    // Default response
    else {
      return "I'm here to help with information about Maharashtra Taekwondo. You can ask about our programs, classes, events, instructors, locations, fees, equipment, or any other aspect of our organization. How else may I assist you today?";
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot toggle button */}
      <button 
        onClick={toggleChatbot}
        className="bg-primary hover:bg-primary-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-secondary text-white px-4 py-3 flex items-center">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">Taekwondo Assistant</h3>
              <div className="flex items-center">
                <div className="inline-flex items-center">
                  <div className="relative inline-flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-xs">Online 24/7</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-r-md border border-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 