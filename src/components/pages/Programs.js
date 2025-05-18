import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';
import ProgramContent from '../common/ProgramContent';
import { FaCalendarAlt, FaCheckCircle, FaUsers } from 'react-icons/fa';

// Placeholder images as data URIs (will be replaced with actual images)
const placeholderImages = {
  children: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EChildren Program%3C/text%3E%3C/svg%3E',
  teens: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3ETeens Program%3C/text%3E%3C/svg%3E',
  adults: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EAdults Program%3C/text%3E%3C/svg%3E',
  competition: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3ECompetition Team%3C/text%3E%3C/svg%3E',
  blackBelt: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EBlack Belt Program%3C/text%3E%3C/svg%3E',
  instructor: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23495057"%3E%3C/rect%3E%3Ctext x="400" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EInstructor Training%3C/text%3E%3C/svg%3E',
  heroBg: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="600" viewBox="0 0 1920 600"%3E%3Crect width="1920" height="600" fill="%23343A40"%3E%3C/rect%3E%3C/svg%3E',
};

// Try to import from assets, but if there's an error, use placeholders
let childrenImg, teensImg, adultsImg, competitionImg, blackBeltImg, instructorImg, heroImg;
try {
  childrenImg = require('../../assets/images/children-program.jpeg');
  teensImg = require('../../assets/images/teens-program.jpeg');
  adultsImg = require('../../assets/images/adults-program.jpeg');
  competitionImg = require('../../assets/images/competition-program.jpeg');
  blackBeltImg = require('../../assets/images/black-belt-program.jpeg');
  instructorImg = require('../../assets/images/instructor-program.jpeg');
  heroImg = require('../../assets/images/programs-hero.jpg');
} catch (e) {
  childrenImg = placeholderImages.children;
  teensImg = placeholderImages.teens;
  adultsImg = placeholderImages.adults;
  competitionImg = placeholderImages.competition;
  blackBeltImg = placeholderImages.blackBelt;
  instructorImg = placeholderImages.instructor;
  heroImg = placeholderImages.heroBg;
}

const programs = [
  {
    id: 'children',
    title: "Children's Program",
    ageRange: '5-12 years',
    description: "Our Children's Program is designed to help young students develop fundamental taekwondo skills in a fun, supportive environment. Classes focus on improving coordination, discipline, respect, and confidence while teaching the basics of taekwondo. Our experienced instructors work with each child to ensure they progress at their own pace.",
    benefits: [
      "Improved focus and concentration",
      "Enhanced physical coordination",
      "Building confidence and self-esteem",
      "Learning respect and discipline",
      "Developing social skills in a team environment",
      "Fun physical activity in a safe environment"
    ],
    schedule: [
      { day: "Monday & Wednesday", time: "4:00 PM - 5:00 PM" },
      { day: "Saturday", time: "10:00 AM - 11:00 AM" }
    ],
    image: childrenImg,
    color: 'bg-blue-500'
  },
  {
    id: 'teens',
    title: "Teen Program",
    ageRange: '13-17 years',
    description: "Our Teen Program is tailored to the unique needs of teenagers, helping them build strength, confidence, and discipline during these crucial developmental years. Classes combine physical training with mental discipline, teaching teenagers valuable skills that extend beyond the dojang into their academic and social lives.",
    benefits: [
      "Physical fitness and strength development",
      "Self-defense skills and awareness",
      "Goal setting and achievement",
      "Stress management and focus",
      "Leadership skills and confidence",
      "Positive social environment with peers"
    ],
    schedule: [
      { day: "Tuesday & Thursday", time: "5:30 PM - 6:30 PM" },
      { day: "Saturday", time: "11:30 AM - 12:30 PM" }
    ],
    image: teensImg,
    color: 'bg-green-500'
  },
  {
    id: 'adults',
    title: "Adult Program",
    ageRange: '18+ years',
    description: "Our Adult Program offers comprehensive taekwondo training for practitioners of all experience levels. Whether you're looking to improve fitness, learn self-defense, reduce stress, or challenge yourself with a new skill, our adult classes provide a supportive environment for growth and development.",
    benefits: [
      "Comprehensive fitness training",
      "Effective self-defense techniques",
      "Stress reduction and mental clarity",
      "Flexibility and coordination improvement",
      "Community and social connection",
      "Achievement through belt progression"
    ],
    schedule: [
      { day: "Monday, Wednesday & Friday", time: "7:00 PM - 8:30 PM" },
      { day: "Saturday", time: "1:00 PM - 2:30 PM" }
    ],
    image: adultsImg,
    color: 'bg-red-500'
  },
  {
    id: 'competition',
    title: "Competition Team",
    ageRange: 'All ages (by selection)',
    description: "Our Competition Team is for dedicated students who want to test their skills in regional, national, and international competitions. Team members receive specialized training in both sparring and patterns/forms, with an emphasis on competition strategies, mental preparation, and peak performance.",
    benefits: [
      "Advanced technical training",
      "Competition-specific strategies",
      "Mental toughness and performance psychology",
      "Team camaraderie and support",
      "Travel opportunities to competitions",
      "Recognition and achievement in the sport"
    ],
    schedule: [
      { day: "Tuesday & Thursday", time: "7:00 PM - 9:00 PM" },
      { day: "Sunday", time: "10:00 AM - 12:00 PM" }
    ],
    image: competitionImg,
    color: 'bg-purple-500'
  },
  {
    id: 'black-belt',
    title: "Black Belt Program",
    ageRange: 'Advanced students',
    description: "Our Black Belt Program is designed for students who have achieved the rank of 1st Dan (black belt) and beyond. This advanced program focuses on deepening technical knowledge, leadership development, and the broader philosophical aspects of taekwondo as a lifelong martial art.",
    benefits: [
      "Advanced technical proficiency",
      "Leadership and teaching skills",
      "Deeper understanding of taekwondo philosophy",
      "Refinement of personal style and expression",
      "Preparation for higher Dan rankings",
      "Mentorship opportunities with masters"
    ],
    schedule: [
      { day: "Wednesday", time: "8:30 PM - 10:00 PM" },
      { day: "Saturday", time: "3:00 PM - 4:30 PM" }
    ],
    image: blackBeltImg,
    color: 'bg-gray-800'
  },
  {
    id: 'instructor',
    title: "Instructor Training",
    ageRange: 'Black belts (by selection)',
    description: "Our Instructor Training Program prepares selected black belt students to become certified taekwondo instructors. This comprehensive program covers teaching methodology, class management, safety protocols, and the responsibilities of being a taekwondo instructor. Participants receive mentoring from senior instructors and hands-on teaching experience.",
    benefits: [
      "Comprehensive teaching methodology",
      "Class management and safety skills",
      "Student psychology and development knowledge",
      "Leadership and communication training",
      "Certification and career opportunities",
      "Personal growth as a martial artist"
    ],
    schedule: [
      { day: "Friday", time: "8:30 PM - 10:00 PM" },
      { day: "By arrangement with Master Instructor" }
    ],
    image: instructorImg,
    color: 'bg-yellow-600'
  }
];

const ProgramCard = ({ program, isFeatured = false, onOpenModal }) => {
  return (
    <div className={`card bg-white rounded-xl border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-3px] overflow-hidden h-full ${isFeatured ? 'col-span-1 md:col-span-2' : ''}`}>
      <div className="flex flex-col md:flex-row h-full">
        {/* Image with enhanced overlay and badge */}
        <div className={`relative ${isFeatured ? 'md:w-2/5' : 'md:w-2/5'} h-52`}>
          <img 
            src={program.image} 
            alt={program.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImages[program.id] || placeholderImages.children;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
          <div className={`absolute top-0 right-0 mt-3 mr-3 ${program.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
            {program.ageRange}
          </div>
          <h3 className="absolute bottom-0 left-0 right-0 text-xl font-bold p-4 text-white">
            {program.title}
          </h3>
        </div>
        
        {/* Content with improved styling */}
        <div className={`p-5 ${isFeatured ? 'md:w-3/5' : 'md:w-3/5'} flex flex-col`}>
          {isFeatured && (
            <div className="inline-block px-3 py-1 mb-3 bg-primary-100 text-primary rounded-md text-sm font-medium">
              Featured Program
            </div>
          )}

          <h3 className={`text-xl font-bold mb-3 text-secondary ${!isFeatured ? 'md:hidden' : ''}`}>
            {program.title}
          </h3>

          <p className="text-secondary mb-4 leading-relaxed text-sm">
            {program.description.substring(0, isFeatured ? 200 : 120) + (program.description.length > (isFeatured ? 200 : 120) ? "..." : "")}
          </p>
          
          {/* Always show key benefits in a brief format */}
          <div className="mb-4">
            <h4 className="font-semibold text-md mb-2 text-secondary flex items-center">
              <FaCheckCircle className="text-primary mr-2" size={14} />
              Benefits
            </h4>
            <ul className="text-secondary text-sm">
              {program.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start mb-1">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {isFeatured && (
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2 text-secondary flex items-center">
                <FaCalendarAlt className="text-primary mr-2" size={14} />
                Schedule
              </h4>
              <ul className="mb-3 text-secondary space-y-1.5 text-sm">
                {program.schedule.map((schedule, index) => (
                  <li key={index} className="flex items-center bg-gray-50 p-1.5 rounded">
                    <span className="font-medium mr-2">{schedule.day}:</span> 
                    <span>{schedule.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-auto flex gap-2">
            <button 
              onClick={() => onOpenModal(program.id)}
              className="flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm text-sm"
            >
              <span>Learn More</span>
            </button>
            
            <Link 
              to="/enroll" 
              className="flex items-center px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors text-sm"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this component for FAQ accordion
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-5 px-4 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-bold text-secondary">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5 px-4' : 'max-h-0'}`}>
        <p className="text-secondary">{answer}</p>
      </div>
    </div>
  );
};

const Programs = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // Testimonials data - moved up before any usage
  const testimonials = [
    {
      id: 1,
      initial: 'A',
      name: 'Aditya Sharma',
      program: 'Adult Program',
      text: '"Joining the Adult Program has been transformative. Not only am I in better shape physically, but I\'ve gained mental discipline that helps me in my professional life as well."'
    },
    {
      id: 2,
      initial: 'P',
      name: 'Priya Patel',
      program: 'Parent of Child Student',
      text: '"My son has been in the Children\'s Program for a year, and the transformation is remarkable. His focus has improved, and he\'s much more confident and respectful."'
    },
    {
      id: 3,
      initial: 'R',
      name: 'Rahul Deshmukh',
      program: 'Competition Team',
      text: '"The Competition Team has pushed me to levels I never thought possible. Our coaches are world-class, and the team spirit makes even the toughest training days enjoyable."'
    },
    {
      id: 4,
      initial: 'S',
      name: 'Shreya Gupta',
      program: 'Teen Program',
      text: '"The Teen Program has given me so much confidence and discipline. I\'ve made great friends and learned skills that help me in school and sports. The instructors are amazing!"'
    },
    {
      id: 5,
      initial: 'V',
      name: 'Vijay Malhotra',
      program: 'Black Belt Program',
      text: '"After achieving my black belt, I was uncertain about next steps. The Black Belt Program has deepened my understanding of Taekwondo and helped me refine my techniques. It\'s a challenging but rewarding journey."'
    }
  ];
  
  const filteredPrograms = selectedFilter === 'all' 
    ? programs 
    : programs.filter(program => program.id === selectedFilter);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // FAQ data
  const faqItems = [
    {
      question: "What age can my child start Taekwondo?",
      answer: "Children can start our programs as young as 5 years old. Our Children's Program is specifically designed with age-appropriate activities and teaching methods that make learning fun while building fundamental skills."
    },
    {
      question: "I'm a complete beginner. Which program is right for me?",
      answer: "Adults should join our Adult Program, even as beginners. We have dedicated instruction for new students, and classes are structured to accommodate all levels. You'll learn at your own pace with personalized guidance from our instructors."
    },
    {
      question: "How often should I train?",
      answer: "For optimal progress, we recommend training 2-3 times per week. Consistent practice is key to developing and maintaining Taekwondo skills. However, even training once a week will help you advance and enjoy the benefits of Taekwondo."
    },
    {
      question: "How long does it take to earn a black belt?",
      answer: "On average, it takes 3-5 years of dedicated training to reach black belt level. The journey varies based on individual commitment, attendance, and natural aptitude. Each belt level has specific requirements and skills that must be mastered before advancement."
    },
    {
      question: "Do I need to be physically fit to start?",
      answer: "No, you don't need to be fit to start. Our programs are designed to gradually build your fitness and flexibility alongside your Taekwondo skills. Many students find that their physical condition improves naturally as they progress through their training."
    }
  ];

  const openProgramModal = (programId) => {
    // Map the program ID directly to the selectedProgram state
    // This will ensure the correct program content is displayed
    switch(programId) {
      case 'children':
        setSelectedProgram('children');
        break;
      case 'teens':
        setSelectedProgram('teen');
        break;
      case 'adults':
        setSelectedProgram('teenAdult');
        break;
      case 'competition':
        setSelectedProgram('competition');
        break;
      case 'black-belt':
        setSelectedProgram('blackBelt');
        break;
      case 'instructor':
        setSelectedProgram('instructor');
        break;
      default:
        setSelectedProgram('children'); // Default fallback
    }
    
    setModalOpen(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-secondary text-white py-16 md:py-24">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Taekwondo Programs</h1>
            <p className="text-xl mb-8">
              Discover the perfect Taekwondo program for your age, skill level, and goals.
              From children to adults, beginners to masters, we have a program to help you 
              achieve excellence in Taekwondo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#programs" className="btn btn-primary">
                View Programs
              </a>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Programs Section */}
      <section id="programs" className="py-12 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">Our Programs</h2>
          <p className="text-center mb-10 text-secondary max-w-3xl mx-auto">
            Our programs are designed to cater to practitioners of all ages and skill levels.
            Explore the options below to find the perfect fit for your Taekwondo journey.
          </p>

          {/* Program Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            <button 
              onClick={() => setSelectedFilter('all')} 
              className={`px-3 py-2 rounded-full text-sm transition-colors flex items-center shadow-sm ${selectedFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-secondary hover:bg-gray-300'}`}
            >
              <FaUsers className={`mr-2 ${selectedFilter === 'all' ? 'text-white' : 'text-primary'}`} size={14} />
              All Programs
            </button>
            {programs.map(program => (
              <button 
                key={program.id}
                onClick={() => setSelectedFilter(program.id)} 
                className={`px-3 py-2 rounded-full text-sm transition-colors shadow-sm ${selectedFilter === program.id ? 'bg-primary text-white' : 'bg-gray-200 text-secondary hover:bg-gray-300'}`}
              >
                {program.title}
              </button>
            ))}
          </div>

          {/* Featured Program */}
          {selectedFilter !== 'all' && (
            <div className="mb-12 max-w-5xl mx-auto">
              <ProgramCard program={filteredPrograms[0]} isFeatured={true} onOpenModal={openProgramModal} />
            </div>
          )}

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedFilter === 'all' ? programs : []).map((program) => (
              <ProgramCard key={program.id} program={program} onOpenModal={openProgramModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Belt Ranking System */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">Belt Ranking System</h2>
            <p className="text-center mb-12 text-secondary">
              Taekwondo uses a colored belt system to denote rank and progress. Each belt represents a level of skill and knowledge.
            </p>
            
            <div className="space-y-4">
              {/* White Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-white">
                <h3 className="font-bold mb-2 text-secondary">White Belt</h3>
                <p className="text-secondary text-sm">Symbolizes innocence and the beginning of Taekwondo journey.</p>
              </div>
              
              {/* Yellow Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-400">
                <h3 className="font-bold mb-2 text-secondary">Yellow Belt</h3>
                <p className="text-secondary text-sm">Represents the earth from which a plant sprouts and takes root.</p>
              </div>
              
              {/* Yellow Green Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1">
                  <div className="h-1/2 bg-yellow-400"></div>
                  <div className="h-1/2 bg-green-500"></div>
                </div>
                <div className="border-l-3 p-5 ml-4">
                  <h3 className="font-bold mb-2 text-secondary">Yellow Green Belt</h3>
                  <p className="text-secondary text-sm">Represents the plant beginning to grow and develop strength.</p>
                </div>
              </div>
              
              {/* Green Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="font-bold mb-2 text-secondary">Green Belt</h3>
                <p className="text-secondary text-sm">Symbolizes the plant's growth as Taekwondo skills develop.</p>
              </div>
              
              {/* Green Blue Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1">
                  <div className="h-1/2 bg-green-500"></div>
                  <div className="h-1/2 bg-blue-500"></div>
                </div>
                <div className="border-l-3 p-5 ml-4">
                  <h3 className="font-bold mb-2 text-secondary">Green Blue Belt</h3>
                  <p className="text-secondary text-sm">Signifies the transition from growing skills to advancing towards mastery.</p>
                </div>
              </div>
              
              {/* Blue Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="font-bold mb-2 text-secondary">Blue Belt</h3>
                <p className="text-secondary text-sm">Represents the sky, as the plant continues to grow toward it.</p>
              </div>
              
              {/* Blue Red Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1">
                  <div className="h-1/2 bg-blue-500"></div>
                  <div className="h-1/2 bg-red-600"></div>
                </div>
                <div className="border-l-3 p-5 ml-4">
                  <h3 className="font-bold mb-2 text-secondary">Blue Red Belt</h3>
                  <p className="text-secondary text-sm">Represents the progression from sky to sun, approaching advanced levels.</p>
                </div>
              </div>
              
              {/* Red Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-600">
                <h3 className="font-bold mb-2 text-secondary">Red Belt</h3>
                <p className="text-secondary text-sm">Symbolizes the sun and the approaching mastery of techniques.</p>
              </div>
              
              {/* Red1 Belt (Advanced Red) - with a white stripe in center */}
              <div className="bg-white p-5 rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1 bg-red-600">
                  <div className="absolute top-1/2 left-0 h-1 w-full bg-white transform -translate-y-1/2"></div>
                </div>
                <div className="border-l-3 p-5 ml-4">
                  <h3 className="font-bold mb-2 text-secondary">Red Belt (Advanced)</h3>
                  <p className="text-secondary text-sm">Represents further progression in red belt skills and techniques.</p>
                </div>
              </div>
              
              {/* Red Black Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1">
                  <div className="h-1/2 bg-red-600"></div>
                  <div className="h-1/2 bg-black"></div>
                </div>
                <div className="border-l-3 p-5 ml-4">
                  <h3 className="font-bold mb-2 text-secondary">Red Black Belt</h3>
                  <p className="text-secondary text-sm">The final stage before black belt, combining red's passion with approaching black belt mastery.</p>
                </div>
              </div>
              
              {/* Black Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-black">
                <h3 className="font-bold mb-2 text-secondary">Black Belt</h3>
                <p className="text-secondary text-sm">Represents maturity and proficiency in Taekwondo, the opposite of white - the completion of the beginner's journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Belt Examination and Promotion Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">Belt Examination & Promotion</h2>
            <p className="text-center mb-12 text-secondary max-w-3xl mx-auto">
              Advancing through the belt ranks requires dedication, practice, and successful completion of formal examinations. 
              Our examination process ensures that students have mastered the necessary skills before progressing to the next level.
            </p>

            {/* Examination Process */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-secondary">Examination Process</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Eligibility Assessment</h4>
                    <p className="text-gray-700">Before applying for an examination, students must meet minimum training requirements, including a specific number of classes attended and time spent at their current rank.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Pre-Examination Review</h4>
                    <p className="text-gray-700">Students participate in preparation classes where instructors provide guidance on exam requirements and offer feedback for improvement.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Formal Examination</h4>
                    <p className="text-gray-700">Exams are conducted by a panel of certified instructors who evaluate each student's performance according to rank-specific criteria. Family members are welcome to observe the examination.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Evaluation & Results</h4>
                    <p className="text-gray-700">Examiners provide written evaluations highlighting strengths and areas for improvement. Results are typically announced at the end of the examination day.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1 flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-secondary mb-1">Belt Ceremony</h4>
                    <p className="text-gray-700">Successful candidates receive their new belts at a formal ceremony that celebrates their achievement and commitment to Taekwondo.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Examination Requirements */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-secondary">Examination Requirements</h3>
              <p className="text-gray-700 mb-4">
                Each belt examination evaluates proficiency in several key areas. The specific techniques and forms required increase in complexity as students advance through the ranks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-secondary mb-2">Basic Techniques (Kibon Dongjak)</h4>
                  <p className="text-gray-700">Fundamental stances, blocks, punches, and kicks that form the foundation of Taekwondo movements.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-secondary mb-2">Forms (Poomsae/Taegeuk)</h4>
                  <p className="text-gray-700">Choreographed patterns of movements that simulate combat against imaginary opponents, demonstrating technique and focus.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-secondary mb-2">One-Step Sparring (Hanbon Kyorugi)</h4>
                  <p className="text-gray-700">Pre-arranged attack and defense sequences performed with a partner to demonstrate practical application of techniques.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-secondary mb-2">Free Sparring (Kyorugi)</h4>
                  <p className="text-gray-700">For higher belt levels, controlled combat with a partner following competition rules and safety protocols.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-secondary mb-2">Breaking (Kyukpa)</h4>
                  <p className="text-gray-700">Demonstration of power and technique by breaking boards, typically required for higher belt examinations.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-secondary mb-2">Theory & Terminology</h4>
                  <p className="text-gray-700">Understanding of Taekwondo principles, history, Korean terminology, and concepts appropriate to rank level.</p>
                </div>
              </div>
            </div>

            {/* Examination Schedule and Fees */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-secondary">Examination Schedule & Fees</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-secondary mb-2">Examination Schedule</h4>
                <p className="text-gray-700 mb-3">
                  Belt examinations are held quarterly at our main training center:
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>March (Spring Examination)</li>
                  <li>June (Summer Examination)</li>
                  <li>September (Fall Examination)</li>
                  <li>December (Winter Examination)</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Specific dates are announced at least one month in advance and posted at all training centers and on our website.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-secondary mb-2">Examination Fees</h4>
                <p className="text-gray-700 mb-3">
                  Examination fees vary by belt level and cover testing, evaluation, certification, and the new belt:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-left">Belt Level</th>
                        <th className="p-3 text-right">Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3">White to Yellow</td>
                        <td className="p-3 text-right">₹1,500</td>
                      </tr>
                      <tr>
                        <td className="p-3">Yellow to Yellow-Green</td>
                        <td className="p-3 text-right">₹1,800</td>
                      </tr>
                      <tr>
                        <td className="p-3">Yellow-Green to Green</td>
                        <td className="p-3 text-right">₹2,000</td>
                      </tr>
                      <tr>
                        <td className="p-3">Green to Green-Blue</td>
                        <td className="p-3 text-right">₹2,200</td>
                      </tr>
                      <tr>
                        <td className="p-3">Green-Blue to Blue</td>
                        <td className="p-3 text-right">₹2,500</td>
                      </tr>
                      <tr>
                        <td className="p-3">Blue to Blue-Red</td>
                        <td className="p-3 text-right">₹2,800</td>
                      </tr>
                      <tr>
                        <td className="p-3">Blue-Red to Red</td>
                        <td className="p-3 text-right">₹3,000</td>
                      </tr>
                      <tr>
                        <td className="p-3">Red to Red-Black</td>
                        <td className="p-3 text-right">₹3,500</td>
                      </tr>
                      <tr>
                        <td className="p-3">Red-Black to Black Belt (1st Dan)</td>
                        <td className="p-3 text-right">₹8,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 text-xs mt-2">
                  *Black belt examinations are conducted less frequently (twice a year) and require additional preparation.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors">
                  Contact for Next Examination
                </Link>
                <Link to="/enroll" className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-gray-100 transition-colors">
                  Register for Classes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modified carousel for better responsive layout */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-secondary">What Our Students Say</h2>
          
          <div className="relative">
            {/* Controls */}
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
              <button 
                onClick={() => setTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-secondary hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <button 
                onClick={() => setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-secondary hover:bg-gray-100"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Testimonial Cards - with improved responsive layout */}
            <div className="overflow-hidden px-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${testimonialIndex * (100 / (windowWidth >= 768 ? 3 : 1))}%)`,
                  gap: '16px' 
                }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                          {testimonial.initial}
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary">{testimonial.name}</h3>
                          <p className="text-sm text-secondary">{testimonial.program}</p>
                        </div>
                      </div>
                      <p className="text-secondary">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indicators and View All button */}
            <div className="flex flex-col items-center mt-8">
              <div className="flex justify-center mb-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-3 h-3 mx-1 rounded-full ${testimonialIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
              <button 
                className="text-primary font-medium hover:underline"
                onClick={() => {
                  document.getElementById('all-testimonials-modal').style.display = 'flex';
                }}
              >
                View All Testimonials
              </button>
            </div>
          </div>
          
          {/* Modal for viewing all testimonials */}
          <div 
            id="all-testimonials-modal" 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center" 
            style={{ display: 'none' }}
            onClick={(e) => {
              if (e.target.id === 'all-testimonials-modal') {
                document.getElementById('all-testimonials-modal').style.display = 'none';
              }
            }}
          >
            <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-secondary">All Testimonials</h3>
                <button 
                  onClick={() => {
                    document.getElementById('all-testimonials-modal').style.display = 'none';
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={`modal-${testimonial.id}`} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                        {testimonial.initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary">{testimonial.name}</h4>
                        <p className="text-sm text-secondary">{testimonial.program}</p>
                      </div>
                    </div>
                    <p className="text-secondary">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced with accordion style */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">Frequently Asked Questions</h2>
          <p className="text-center mb-12 text-secondary max-w-3xl mx-auto">
            Here are answers to some common questions about our Taekwondo programs.
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Taekwondo Journey?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join Maharashtra Taekwondo Federation today and start your journey toward mastering 
            this ancient martial art. Our experienced instructors will guide you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enroll" className="btn bg-white text-primary hover:bg-gray-100">
              Enroll Now
            </Link>
            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Program Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          selectedProgram === 'children' ? "Children's Program" :
          selectedProgram === 'teen' ? "Teen Program" :
          selectedProgram === 'teenAdult' ? "Adult Program" :
          selectedProgram === 'competition' ? "Competition Team" : 
          selectedProgram === 'blackBelt' ? "Black Belt Program" :
          selectedProgram === 'instructor' ? "Instructor Training" :
          "Program Details"
        }
      >
        {selectedProgram && <ProgramContent programType={selectedProgram} />}
      </Modal>
    </div>
  );
};

export default Programs; 