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
  teensImg = require('../../assets/images/teens-program.jpg');
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
  // Add state for exam modals
  const [aprilExamModalOpen, setAprilExamModalOpen] = useState(false);
  const [mayExamModalOpen, setMayExamModalOpen] = useState(false);
  const [febExamModalOpen, setFebExamModalOpen] = useState(false);
  const [beltExamModalOpen, setBeltExamModalOpen] = useState(false);
  
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
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">White Belt</h3>
                  <p className="text-secondary text-sm">Symbolizes innocence and the beginning of Taekwondo journey.</p>
                </div>
              </div>
              
              {/* Yellow Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Yellow Belt</h3>
                  <p className="text-secondary text-sm">Represents the earth from which a plant sprouts and takes root.</p>
                </div>
              </div>
              
              {/* Yellow Green Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1">
                  <div className="h-1/2 bg-yellow-400"></div>
                  <div className="h-1/2 bg-green-500"></div>
                </div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Yellow Green Belt</h3>
                  <p className="text-secondary text-sm">Represents the plant beginning to grow and develop strength.</p>
                </div>
              </div>
              
              {/* Green Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Green Belt</h3>
                  <p className="text-secondary text-sm">Symbolizes the plant's growth as Taekwondo skills develop.</p>
                </div>
              </div>
              
              {/* Green Blue Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1">
                  <div className="h-1/2 bg-green-500"></div>
                  <div className="h-1/2 bg-blue-500"></div>
                </div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Green Blue Belt</h3>
                  <p className="text-secondary text-sm">Signifies the transition from growing skills to advancing towards mastery.</p>
                </div>
              </div>
              
              {/* Blue Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Blue Belt</h3>
                  <p className="text-secondary text-sm">Represents the sky, as the plant continues to grow toward it.</p>
                </div>
              </div>
              
              {/* Blue Red Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1">
                  <div className="h-1/2 bg-blue-500"></div>
                  <div className="h-1/2 bg-red-600"></div>
                </div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Blue Red Belt</h3>
                  <p className="text-secondary text-sm">Represents the progression from sky to sun, approaching advanced levels.</p>
                </div>
              </div>
              
              {/* Red Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Red Belt</h3>
                  <p className="text-secondary text-sm">Symbolizes the sun and the approaching mastery of techniques.</p>
                </div>
              </div>
              
              {/* Red1 Belt (Advanced Red) - with a white stripe in center */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600">
                  <div className="absolute top-1/2 left-0 h-1 w-full bg-white transform -translate-y-1/2"></div>
                </div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Red Belt (Advanced)</h3>
                  <p className="text-secondary text-sm">Represents further progression in red belt skills and techniques.</p>
                </div>
              </div>
              
              {/* Red Black Belt (Combined) */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1">
                  <div className="h-1/2 bg-red-600"></div>
                  <div className="h-1/2 bg-black"></div>
                </div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Red Black Belt</h3>
                  <p className="text-secondary text-sm">The final stage before black belt, combining red's passion with approaching black belt mastery.</p>
                </div>
              </div>
              
              {/* Black Belt */}
              <div className="bg-white p-5 rounded-lg shadow-md relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
                <div className="pl-4">
                  <h3 className="font-bold mb-2 text-secondary">Black Belt</h3>
                  <p className="text-secondary text-sm">Represents maturity and proficiency in Taekwondo, the opposite of white - the completion of the beginner's journey.</p>
                </div>
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

            {/* Upcoming Examinations - Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* February Exam Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative">
                  <img 
                    src={require('../../assets/images/23-feb-2025-exam.jpg')}
                    alt="February Belt Examination" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-2 px-4 rounded-br-lg font-bold">
                    <span className="text-sm">23 February</span>
                    <span className="text-lg ml-1 font-bold">2025</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Winter Belt Examination</h3>
                  <p className="text-gray-700 mb-4">
                    Our first examination of the year focuses on beginner and intermediate level belt promotions. Students will demonstrate techniques learned during the winter training period.
                  </p>
                  <button 
                    onClick={() => setFebExamModalOpen(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Belt Exam Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative">
                  <img 
                    src={require('../../assets/images/belt-2025-exam .jpg')}
                    alt="Belt Promotion Ceremony" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-2 px-4 rounded-br-lg font-bold">
                    <span className="text-sm">15 June</span>
                    <span className="text-lg ml-1 font-bold">2025</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Summer Belt Ceremony</h3>
                  <p className="text-gray-700 mb-4">
                    Join us for our grand summer belt promotion ceremony celebrating students from all levels who have successfully completed their examinations in the first half of the year.
                  </p>
                  <button 
                    onClick={() => setBeltExamModalOpen(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
              
              {/* April Exam Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative">
                  <img 
                    src={require('../../assets/images/27-april-2025-exam .jpg')}
                    alt="April Belt Examination" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-2 px-4 rounded-br-lg font-bold">
                    <span className="text-sm">27 April</span>
                    <span className="text-lg ml-1 font-bold">2025</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Spring Belt Examination</h3>
                  <p className="text-gray-700 mb-4">
                    Join us for our Spring belt promotion examination. Students from all levels will demonstrate their skills and techniques for advancement to the next belt rank.
                  </p>
                  <button 
                    onClick={() => setAprilExamModalOpen(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
              
              {/* May Exam Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
                <div className="relative">
                  <img 
                    src={require('../../assets/images/18-may-2025-exam.jpg')} 
                    alt="May Belt Examination" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-primary text-white py-2 px-4 rounded-br-lg font-bold">
                    <span className="text-sm">18 May</span>
                    <span className="text-lg ml-1 font-bold">2025</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Black Belt Examination</h3>
                  <p className="text-gray-700 mb-4">
                    Special black belt examination for advanced students ready to achieve their Dan ranks. This prestigious event showcases years of dedication and mastery.
                  </p>
                  <button 
                    onClick={() => setMayExamModalOpen(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Exam Modal - April */}
      {aprilExamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary">Spring Belt Examination - 27 April 2025</h2>
              <button 
                onClick={() => setAprilExamModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <img 
              src={require('../../assets/images/27-april-2025-exam .jpg')} 
              alt="April Belt Examination" 
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2 text-secondary">Examination Details</h3>
                <p className="text-gray-700">
                  Our Spring Belt Examination will evaluate students from all levels who meet the eligibility requirements. This formal assessment will determine readiness for advancement to the next belt rank.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Date & Time</h4>
                <p className="text-gray-700">April 27, 2025 | 9:00 AM - 5:00 PM</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Location</h4>
                <p className="text-gray-700">Main Dojang, 123 Martial Arts Way</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Examination Process</h4>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li><span className="font-medium">Eligibility Assessment</span> - Students must meet minimum training requirements</li>
                  <li><span className="font-medium">Pre-Examination Review</span> - Preparation classes with instructor feedback</li>
                  <li><span className="font-medium">Formal Examination</span> - Evaluation by certified instructors</li>
                  <li><span className="font-medium">Results & Evaluation</span> - Written assessments provided</li>
                  <li><span className="font-medium">Belt Ceremony</span> - Successful candidates receive their new belts</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Requirements</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Basic Techniques (Kibon Dongjak)</li>
                  <li>Forms (Poomsae/Taegeuk)</li>
                  <li>One-Step Sparring (Hanbon Kyorugi)</li>
                  <li>Free Sparring (Kyorugi) - higher ranks only</li>
                  <li>Breaking (Kyukpa) - higher ranks only</li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Link to="/contact" className="px-4 py-2 bg-primary text-white rounded-lg inline-block hover:bg-primary-dark transition-colors">
                  Register for Examination
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Exam Modal - May */}
      {mayExamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary">Black Belt Examination - 18 May 2025</h2>
              <button 
                onClick={() => setMayExamModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <img 
              src={require('../../assets/images/18-may-2025-exam.jpg')} 
              alt="May Belt Examination" 
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2 text-secondary">Black Belt Examination</h3>
                <p className="text-gray-700">
                  This prestigious event is for advanced students who are ready to achieve their Dan ranks. Black belt examinations represent years of dedication and mastery, and are judged by a panel of senior masters.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Date & Time</h4>
                <p className="text-gray-700">May 18, 2025 | 10:00 AM - 4:00 PM</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Location</h4>
                <p className="text-gray-700">Grand Dojang, Taekwondo Headquarters</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Advanced Requirements</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Complete mastery of all Taegeuk forms</li>
                  <li>Black belt specific Poomsae (Koryo for 1st Dan)</li>
                  <li>Advanced sparring techniques</li>
                  <li>Multiple breaking demonstrations</li>
                  <li>Comprehensive oral examination on Taekwondo philosophy and history</li>
                  <li>Teaching demonstration</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Special Requirements</h4>
                <p className="text-gray-700">
                  Candidates must have recommendation letters from their primary instructor and have completed a minimum of 1 year training as a red-black belt. A written thesis on personal Taekwondo journey is also required.
                </p>
              </div>
              
              <div className="pt-4">
                <Link to="/contact" className="px-4 py-2 bg-primary text-white rounded-lg inline-block hover:bg-primary-dark transition-colors">
                  Register for Black Belt Exam
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exam Modal - February */}
      {febExamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary">Winter Belt Examination - 23 February 2025</h2>
              <button 
                onClick={() => setFebExamModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <img 
              src={require('../../assets/images/23-feb-2025-exam.jpg')} 
              alt="February Belt Examination" 
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2 text-secondary">Examination Details</h3>
                <p className="text-gray-700">
                  Our Winter Belt Examination is ideal for beginners and intermediate students looking to advance to their next belt level. This event focuses on fundamental techniques and forms appropriate for white through green belt levels.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Date & Time</h4>
                <p className="text-gray-700">February 23, 2025 | 10:00 AM - 3:00 PM</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Location</h4>
                <p className="text-gray-700">Training Hall, Maharashtra Taekwondo Federation</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Examination Process</h4>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li><span className="font-medium">Registration</span> - All participants must register two weeks before the event</li>
                  <li><span className="font-medium">Warm-up Session</span> - Guided warm-up before examination begins</li>
                  <li><span className="font-medium">Technical Evaluation</span> - Demonstration of required techniques</li>
                  <li><span className="font-medium">Forms Assessment</span> - Performance of appropriate Taegeuk forms</li>
                  <li><span className="font-medium">Certificate Distribution</span> - Successful candidates receive certificates</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Who Should Attend</h4>
                <p className="text-gray-700">
                  This examination is primarily for white through green belt students who have completed the minimum required training hours. Parents and family members are welcome to attend and support participants.
                </p>
              </div>
              
              <div className="pt-4">
                <Link to="/contact" className="px-4 py-2 bg-primary text-white rounded-lg inline-block hover:bg-primary-dark transition-colors">
                  Register for Examination
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exam Modal - Belt Ceremony */}
      {beltExamModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary">Summer Belt Ceremony - 15 June 2025</h2>
              <button 
                onClick={() => setBeltExamModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <img 
              src={require('../../assets/images/belt-2025-exam .jpg')} 
              alt="Belt Promotion Ceremony" 
              className="w-full h-64 object-cover mb-4 rounded-lg"
            />
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2 text-secondary">Summer Belt Ceremony</h3>
                <p className="text-gray-700">
                  The Summer Belt Ceremony is our grand mid-year celebration honoring all students who have successfully passed their belt examinations during the first half of 2025. This formal event recognizes the dedication and progress of our taekwondo practitioners.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Date & Time</h4>
                <p className="text-gray-700">June 15, 2025 | 11:00 AM - 2:00 PM</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Location</h4>
                <p className="text-gray-700">Main Auditorium, Maharashtra Taekwondo Headquarters</p>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">Event Highlights</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Formal Belt Presentation by Master Instructors</li>
                  <li>Special Demonstration by Senior Students</li>
                  <li>Recognition of Outstanding Achievements</li>
                  <li>Photo Opportunities with Instructors</li>
                  <li>Refreshments and Social Gathering</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-secondary mb-1">What to Bring</h4>
                <p className="text-gray-700">
                  Students should wear their current belt and full uniform (dobok). Bring your examination certificate if you received one. Family members are encouraged to attend this special celebration.
                </p>
              </div>
              
              <div className="pt-4">
                <Link to="/contact" className="px-4 py-2 bg-primary text-white rounded-lg inline-block hover:bg-primary-dark transition-colors">
                  Confirm Attendance
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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