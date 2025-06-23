import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to Maharashtra Taekwondo! I'm your virtual assistant. How may I help you today?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  
  // Suggested queries that users can click on
  const suggestedQueries = [
    { id: 1, text: "Class schedule" },
    { id: 2, text: "Membership fees" },
    { id: 3, text: "Benefits of taekwondo" },
    { id: 4, text: "Belt progression" },
    { id: 5, text: "Trial classes" },
    { id: 6, text: "Instructor qualifications" },
    { id: 7, text: "Equipment needed" },
    { id: 8, text: "Upcoming events" },
  ];
  
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
            text: "Welcome to Maharashtra Taekwondo! I'm your virtual assistant. How may I help you today?",
            sender: 'bot'
          }
        ]);
        setInputMessage('');
        setShowSuggestions(true);
      }, 300); // Small delay to ensure chat is closed before resetting
    }
    setIsOpen(!isOpen);
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setShowSuggestions(false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process the message and respond
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(inputMessage);
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      
      // Show suggestions again after bot responds
      setTimeout(() => {
        setShowSuggestions(true);
      }, 500);
    }, Math.random() * 1000 + 500); // Random delay between 500ms and 1500ms for more natural feel
  };
  
  // Handle clicking a suggested query
  const handleSuggestedQuery = (queryText) => {
    setInputMessage(queryText);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Enhanced response generator with more detailed answers
  const generateBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    
    // Greetings
    if (lowerCaseMessage.match(/\b(hello|hi|hey|greetings|howdy)\b/)) {
      return "Hello! I'm here to assist you with all things related to Maharashtra Taekwondo. How can I help you today?";
    }
    
    // Programs and Classes
    else if (lowerCaseMessage.match(/\b(class|program|training|schedule|lesson|curriculum)\b/)) {
      if (lowerCaseMessage.match(/\b(kid|child|children|youth|young)\b/)) {
        return "Our children's programs develop focus, discipline, confidence and physical fitness in a fun, supportive environment:\n\n• Little Tigers (4-6 years): 30-minute classes focusing on basic motor skills and simple commands\n• Junior Warriors (7-9 years): 45-minute classes developing core techniques and beginning forms\n• Young Champions (10-13 years): Full 60-minute classes covering traditional Taekwondo curriculum";
      } else if (lowerCaseMessage.match(/\b(adult|grown|older)\b/)) {
        return "Our adult programs (14+ years) offer comprehensive training with these options:\n\n• Fundamentals: For beginners focusing on basic techniques and fitness\n• Traditional: Emphasizing forms, breaking, and traditional aspects of Taekwondo\n• Combat: Focus on sparring techniques and competition preparation\n• Family: Train alongside your children in a shared experience\n\nClasses run weekdays (morning/evening) and weekend mornings.";
      } else if (lowerCaseMessage.match(/\b(beginner|new|start|novice)\b/)) {
        return "Our beginner programs welcome students of all ages with no prior experience needed. You'll learn:\n\n• Basic stances and movements\n• Fundamental kicking and striking techniques\n• Core principles of Taekwondo philosophy\n• Essential Korean terminology\n\nWe recommend 2-3 sessions weekly for optimal progress. All beginners receive a free uniform with registration!";
      } else if (lowerCaseMessage.match(/\b(advanced|black belt|expert|master)\b/)) {
        return "Our advanced programs are designed for colored belts progressing toward black belt and current black belts. Training includes:\n\n• Advanced forms (poomsae) and breaking techniques\n• Olympic-style sparring strategies and drills\n• Weapons training (staff, nunchaku, sword)\n• Teaching methodology and leadership development\n• Specialized seminars with visiting masters\n\nMany of our black belts compete nationally and internationally, with several qualifying for national teams.";
      } else {
        return "Maharashtra Taekwondo offers comprehensive programs for all ages (4+) and skill levels. Our curriculum follows Kukkiwon (World Taekwondo) standards and includes:\n\n• Forms (poomsae) - choreographed movement patterns\n• Sparring (kyorugi) - Olympic-style competitive fighting\n• Breaking (kyukpa) - testing power and precision\n• Self-defense (hosinsul) - practical protection skills\n\nClasses run 6 days a week with multiple time options. Visit our Programs page for detailed schedules.";
      }
    }
    
    // Philosophy and History of Taekwondo
    else if (lowerCaseMessage.match(/\b(philosophy|history|origin|principle|value|tenets)\b/)) {
      return "Taekwondo originated in Korea and was formalized in the 1950s, drawing from older Korean martial arts. Its name translates as 'the way of foot and hand.' The art is guided by five core tenets:\n\n• Courtesy (Ye Ui) - Respect for others\n• Integrity (Yom Chi) - Honesty and moral principles\n• Perseverance (In Nae) - Steady persistence despite challenges\n• Self-Control (Guk Gi) - Discipline of emotions and actions\n• Indomitable Spirit (Baekjul Boolgool) - Courage and determination\n\nThese principles are emphasized equally with physical training, developing character alongside martial skill.";
    }
    
    // Techniques and Training Methods
    else if (lowerCaseMessage.match(/\b(technique|kick|punch|stance|form|poomsae|block|self.?defense)\b/)) {
      if (lowerCaseMessage.match(/\b(kick|kicking)\b/)) {
        return "Taekwondo is renowned for its dynamic kicking techniques, which include:\n\n• Front Kick (Ap Chagi) - Basic forward kick using the ball of the foot\n• Side Kick (Yeop Chagi) - Powerful kick with the foot edge\n• Roundhouse Kick (Dollyo Chagi) - Circular kick using the instep\n• Back Kick (Dwit Chagi) - Reverse kick with the heel\n• Spinning/Turning Kicks - Advanced techniques with rotational power\n\nOur curriculum systematically develops kicking power, height, speed, and precision through targeted exercises.";
      } else if (lowerCaseMessage.match(/\b(form|poomsae|pattern|kata)\b/)) {
        return "Forms (Poomsae) are preset patterns of movements that simulate combat against imaginary opponents. The Taekwondo curriculum includes:\n\n• Taegeuk 1-8: Colored belt forms (White through Red)\n• Koryo, Keumgang, Taebaek: First three black belt forms\n• Higher black belt forms continue through Hansu\n\nForms develop coordination, memory, technique precision, and demonstrate a student's understanding of fundamental principles.";
      } else if (lowerCaseMessage.match(/\b(self.?defense)\b/)) {
        return "Our self-defense training (Hosinsul) integrates practical techniques for real-world situations:\n\n• Wrist/clothing grabs releases\n• Defense against strikes and kicks\n• Multiple opponent scenarios\n• Ground defense fundamentals\n• Weapon defense awareness\n• Situational awareness and conflict avoidance\n\nWe emphasize reasonable force and de-escalation alongside physical defense techniques. Special women's self-defense workshops are offered quarterly.";
      } else {
        return "Taekwondo training employs a variety of methods to develop complete martial artists:\n\n• Basic techniques (Kibon Dongjak) - Fundamental movements practiced in isolation\n• Forms (Poomsae) - Choreographed patterns of techniques\n• Step sparring (Ilbo/Ibo Daeryeon) - Predetermined attack and defense sequences\n• Free sparring (Jayu Daeryeon) - Controlled combat using protective equipment\n• Breaking (Kyukpa) - Testing power and focus by breaking boards/tiles\n• Conditioning - Specialized exercises for skill development\n\nEach class incorporates multiple training methods for balanced development.";
      }
    }
    
    // Locations and Contact
    else if (lowerCaseMessage.match(/\b(location|where|address|center|dojang|school)\b/)) {
      return "Maharashtra Taekwondo operates several training centers throughout the state:\n\n• Mumbai Central (Headquarters): 123 Taekwondo Way, Mumbai 400001\n• Pune: 456 Martial Arts Plaza, Pune 411001\n• Nagpur: 789 Olympic Boulevard, Nagpur 440001\n• Nashik: 101 Black Belt Center, Nashik 422001\n\nAll locations feature professional matted floors, spacious training areas, changing facilities, and viewing areas for parents. Visit our Locations page for maps, hours, and specific amenities at each center.";
    }
    else if (lowerCaseMessage.match(/\b(contact|phone|email|call|reach)\b/)) {
      return "You can reach Maharashtra Taekwondo through multiple channels:\n\n• Main Office: (+91) 123-456-7890 (Mon-Fri, 9AM-6PM)\n• Email: info@maharashtrataekowondo.org\n• WhatsApp: (+91) 987-654-3210\n• Instagram/Facebook: @MahaTaekwondo\n\nFor urgent matters after hours, please use the emergency contact form on our website, and a staff member will respond promptly.";
    }
    
    // Events and Tournaments
    else if (lowerCaseMessage.match(/\b(event|tournament|championship|competition|seminar)\b/)) {
      if (lowerCaseMessage.match(/\b(upcoming|next|schedule|calendar)\b/)) {
        return "Upcoming Maharashtra Taekwondo events include:\n\n• State Championship (June 15-16): Mumbai Sports Complex\n• Summer Training Camp (May 20-25): Residential intensive training\n• Black Belt Testing (July 8): Mumbai Headquarters\n• Grandmaster Kim Seminar (August 5-6): Special techniques workshop\n• Children's Tournament (September 10): Beginner-friendly competition\n\nVisit our Events Calendar for registration deadlines and complete details.";
      } else if (lowerCaseMessage.match(/\b(register|sign.?up|join|participate|compete)\b/)) {
        return "Registration for competitions requires:\n\n1. Current membership in good standing\n2. Instructor approval\n3. Completed online registration form\n4. Registration fee payment (varies by event)\n5. Signed liability waiver\n\nEarly registration discounts are available until 3 weeks before events. We offer competition preparation clinics before major tournaments to help participants prepare effectively.";
      } else if (lowerCaseMessage.match(/\b(rule|scoring|point|regulation)\b/)) {
        return "Our tournaments follow World Taekwondo competition rules with these scoring guidelines:\n\n• Body punch: 1 point\n• Body kick: 2 points\n• Head kick: 3 points\n• Turning body kick: 4 points\n• Turning head kick: 5 points\n\nMatches typically consist of 3 rounds (1.5 minutes each) with 30-second breaks. Full protective gear including electronic scoring equipment is mandatory for all competitors.";
      } else {
        return "Maharashtra Taekwondo hosts and participates in various events throughout the year:\n\n• Local tournaments: Monthly in-house competitions for beginners\n• State championships: Quarterly official ranking events\n• National tournaments: Selection events for international teams\n• Seminars: Special training with visiting masters\n• Demonstrations: Public showcases at cultural events\n• Rank promotions: Bi-monthly testing opportunities\n\nAll events are listed on our website with registration information and spectator details.";
      }
    }
    
    // Instructors and Masters
    else if (lowerCaseMessage.match(/\b(instructor|master|coach|teacher|sabum|kwan.?jang)\b/)) {
      return "Our instructing team consists of highly qualified professionals:\n\n• Grandmaster Park (9th Dan): 40+ years experience, former Olympic coach\n• Master Singh (7th Dan): National champion, specialized in forms\n• Master Sharma (6th Dan): Women's team coach, youth development specialist\n• Master Kumar (5th Dan): Paralympic team trainer, adaptive Taekwondo expert\n\nAll instructors are Kukkiwon-certified, undergo regular professional development, and maintain first aid/CPR certification. Many have international competition experience and specialized teaching credentials.";
    }
    
    // Belt System and Progression
    else if (lowerCaseMessage.match(/\b(belt|rank|promotion|test|exam|grading|gup|dan)\b/)) {
      if (lowerCaseMessage.match(/\b(test|exam|grading|promotion)\b/)) {
        return "Belt promotion tests are conducted bi-monthly and evaluate:\n\n• Forms (Poomsae) appropriate for your rank\n• Board breaking requirements\n• One-step and free sparring\n• Self-defense techniques\n• Korean terminology\n• Physical fitness standards\n\nRequirements for testing include minimum class attendance (typically 24 classes), instructor recommendation, and completion of curriculum requirements. Test fees range from ₹1000-3000 depending on rank level.";
      } else if (lowerCaseMessage.match(/\b(time|how.long|duration)\b/)) {
        return "Typical progression through belt ranks:\n\n• White to Yellow: 2-3 months\n• Yellow to Green: 3-4 months\n• Green to Blue: 4-6 months\n• Blue to Red: 6-8 months\n• Red to Black recommended: 8-12 months\n• Black recommended to 1st Dan: 3-6 months\n\nTotal time to 1st Dan averages 3-4 years with regular training (2-3 classes weekly). Individual progression varies based on aptitude, attendance, and dedication.";
      } else {
        return "Our belt system follows traditional Kukkiwon progression:\n\n• White (10th Gup): Beginning student\n• Yellow (9th-8th Gup): Foundational techniques\n• Green (7th-6th Gup): Developing student\n• Blue (5th-4th Gup): Intermediate student\n• Red (3rd-2nd Gup): Advanced student\n• Red/Black (1st Gup): Black belt candidate\n• Black (1st-9th Dan): Expert/master levels\n\nEach rank has specific curriculum requirements including forms, techniques, breaking, and knowledge components.";
      }
    }
    
    // Fees and Pricing
    else if (lowerCaseMessage.match(/\b(fee|cost|price|payment|pay|afford|expensive|cheap)\b/)) {
      return "Maharashtra Taekwondo offers flexible membership options:\n\n• Basic Membership: ₹2000/month (2 classes weekly)\n• Premium Membership: ₹3000/month (unlimited classes)\n• Family Discount: 10% off for additional family members\n• Quarterly Payment Discount: 5% off total\n• Annual Payment Discount: 15% off total\n\nOne-time registration fee (₹4000) includes your uniform and white belt. Additional costs include equipment (₹6000-8000), testing fees (₹1000-3000/test), and optional event participation. Financial assistance programs are available for qualified applicants.";
    }
    
    // Equipment and Uniform
    else if (lowerCaseMessage.match(/\b(equipment|uniform|dobok|gear|protect|pad)\b/)) {
      return "Required Taekwondo equipment includes:\n\n1. Dobok (uniform): White V-neck with colored belt - included with registration\n2. Sparring Gear Set: Includes headgear, chest protector, arm guards, shin guards, mouthguard, and instep protectors (₹6000-8000 for complete set)\n3. Competition Equipment: Electronic foot sensors required for official tournaments (available for purchase or rental)\n\nWe maintain a pro shop at all locations with quality equipment at competitive prices. Students receive a 10% discount on all purchases.";
    }
    
    // Benefits of Taekwondo
    else if (lowerCaseMessage.match(/\b(benefit|advantage|why|good|help|improve)\b/)) {
      if (lowerCaseMessage.match(/\b(physical|body|health|fit|strength)\b/)) {
        return "Physical benefits of Taekwondo include:\n\n• Improved cardiovascular fitness\n• Enhanced flexibility and balance\n• Increased strength and muscle tone\n• Better coordination and reflexes\n• Weight management and healthy body composition\n• Stress reduction through physical activity\n\nStudies show martial artists typically have better functional fitness across all age groups compared to the general population.";
      } else if (lowerCaseMessage.match(/\b(mental|mind|brain|focus|concentrate)\b/)) {
        return "Mental benefits of Taekwondo include:\n\n• Enhanced focus and concentration\n• Improved cognitive function through pattern memorization\n• Stress management and emotional regulation\n• Greater self-confidence and positive self-image\n• Perseverance and goal-setting skills\n• Mental fortitude and resilience\n\nMany students report improvements in academic and work performance due to the mental discipline developed in training.";
      } else if (lowerCaseMessage.match(/\b(child|kid|young|youth)\b/)) {
        return "Taekwondo offers children numerous developmental benefits:\n\n• Improved focus and attention span\n• Enhanced self-discipline and respect for authority\n• Better social skills and teamwork\n• Increased confidence and reduced bullying vulnerability\n• Healthy physical development and activity habits\n• Goal-setting and achievement mentality\n\nMany parents report significant improvements in school behavior and academic performance after children begin training.";
      } else {
        return "Taekwondo provides comprehensive benefits for practitioners:\n\n• Physical fitness and self-defense capability\n• Mental focus, discipline, and stress management\n• Character development through traditional values\n• Community and social connection\n• Achievement through structured advancement\n• Cultural appreciation and global perspective\n\nTaekwondo is more than just a martial art—it's a lifestyle that promotes continuous self-improvement and balance between mind, body, and spirit.";
      }
    }
    
    // Trial Class and Observation
    else if (lowerCaseMessage.match(/\b(trial|free|watch|observe|first.class|begin|start)\b/)) {
      return "We welcome new students with a complimentary trial experience:\n\n• Free Introductory Class: Experience Taekwondo firsthand\n• Observation Welcome: Parents/prospects may observe any regular class\n• Private Introduction: One-on-one orientation with an instructor\n• Starter Package: Special pricing for first-time students\n\nTo arrange your visit, please call us at (+91) 123-456-7890 or use the 'Schedule a Trial' form on our website. Wear comfortable athletic clothes and arrive 15 minutes early to complete a waiver form.";
    }
    
    // Membership and Registration
    else if (lowerCaseMessage.match(/\b(join|membership|register|sign.up|enroll|application)\b/)) {
      return "Joining Maharashtra Taekwondo is simple:\n\n1. Schedule a facility tour and free trial class\n2. Complete registration forms (available online or in-person)\n3. Select your membership plan\n4. Make initial payment (registration fee + first month)\n5. Receive your uniform and welcome package\n6. Schedule your first regular classes\n\nThe entire process takes about 30 minutes. We offer flexible payment options including monthly auto-pay, quarterly, or annual plans.";
    }
    
    // Competition and Sport Aspects
    else if (lowerCaseMessage.match(/\b(competition|sport|olympic|athlete|medal|winner|champion)\b/)) {
      return "Taekwondo as a competitive sport has been in the Olympics since 2000:\n\n• Our competitive team trains athletes for local, state, national and international competitions\n• We've produced 12 national champions and 3 international medalists\n• Competition categories include forms, sparring, breaking, and demonstration team\n• Electronic scoring systems are used in accordance with World Taekwondo standards\n• Weight categories and age divisions ensure fair competition\n\nAthletes receive specialized coaching, conditioning programs, and strategic preparation for optimal performance.";
    }
    
    // Age-Related Questions
    else if (lowerCaseMessage.match(/\b(age|old|young|senior|adult|teen|kid)\b/)) {
      if (lowerCaseMessage.match(/\b(minimum|start|young|begin|early)\b/)) {
        return "We accept students beginning at age 4 in our Little Tigers program. These specially designed classes focus on basic coordination, listening skills, discipline, and fun activities appropriate for preschool development. Children under 4 may be evaluated individually for readiness.";
      } else if (lowerCaseMessage.match(/\b(maximum|too.old|senior|older)\b/)) {
        return "There is no maximum age for Taekwondo! We have dedicated senior classes for practitioners 55+ focusing on balance, flexibility, and modified techniques. Our oldest active student is 78 years old and earned his black belt at 70. Modifications are available for all physical conditions and limitations.";
      } else {
        return "Maharashtra Taekwondo serves all age groups with specialized programs:\n\n• Little Tigers: Ages 4-6\n• Junior Program: Ages 7-12\n• Teen Program: Ages 13-17\n• Adult Program: Ages 18-54\n• Senior Program: Ages 55+\n• Family Classes: Mixed ages for family training\n\nEach program adjusts teaching methods and expectations to be age-appropriate while maintaining core Taekwondo principles.";
      }
    }
    
    // Thank you and Closing
    else if (lowerCaseMessage.match(/\b(thank|thanks|appreciate|gratitude)\b/)) {
      return "You're welcome! I'm happy to assist with any information about Maharashtra Taekwondo. If you have more questions or would like to schedule a visit, please don't hesitate to ask. We look forward to welcoming you to our Taekwondo family!";
    }
    
    // Website-related
    else if (lowerCaseMessage.match(/\b(website|online|enroll|register|apply|web|site|page)\b/)) {
      return "Our website offers comprehensive information and functionality:\n\n• Program details and schedules\n• Online class registration and account management\n• Instructor profiles and facility information\n• Event calendar with registration capabilities\n• Resource library with training videos\n• Online store for equipment purchases\n\nThe member portal allows you to track attendance, view upcoming events, and manage your account details securely.";
    }
    
    // Default response
    else {
      return "I'm here to assist with all your Maharashtra Taekwondo inquiries. You can ask about our programs, philosophy, techniques, events, instructors, facilities, or any other aspect of our organization. If you have a specific question I haven't addressed, please feel free to rephrase or ask something else.";
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot toggle button */}
      <button 
        onClick={toggleChatbot}
        className="bg-primary hover:bg-primary-dark text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[28rem] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-fade-in-up">
          {/* Header */}
          <div className="bg-secondary text-white px-4 py-4 flex items-center">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center mr-3 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Taekwondo Assistant</h3>
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
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 scroll-smooth">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">TKD</span>
                  </div>
                )}
                <div 
                  className={`max-w-[85%] px-4 py-3 rounded-xl shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center ml-2 flex-shrink-0 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                  <span className="text-white text-xs font-bold">TKD</span>
                </div>
                <div className="bg-white text-gray-800 rounded-xl rounded-bl-none border border-gray-200 px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Suggested queries */}
            {showSuggestions && messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
              <div className="mt-3 mb-2">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map(query => (
                    <button
                      key={query.id}
                      onClick={() => handleSuggestedQuery(query.text)}
                      className="bg-white border border-gray-300 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      {query.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 bg-white flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about taekwondo..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-r-lg border border-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
          
          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-3 py-2 text-center">
            <p className="text-xs text-gray-500">Maharashtra Taekwondo © 2025 | Ask us anything</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 