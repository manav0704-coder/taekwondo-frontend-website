import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMedal, FaTrophy, FaHandshake, FaUniversity, FaUsers, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

// Import images
// Import all master images
import master1Img from '../../assets/images/master-1.jpg';
import master2Img from '../../assets/images/master-2.jpg';
import master3Img from '../../assets/images/master-3.jpg';
import master4Img from '../../assets/images/master-4.jpg';
import master5Img from '../../assets/images/master-5.jpg';
import master6Img from '../../assets/images/master-6.jpg';
import mainMasterImg from '../../assets/images/main-master.jpg';
import heroImg from '../../assets/images/programs-hero.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState('history');

  // Core values data
  const coreValues = [
    {
      icon: <FaMedal className="text-primary text-3xl mb-4" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from teaching techniques to organizing competitions, setting high standards for ourselves and our students."
    },
    {
      icon: <FaUsers className="text-primary text-3xl mb-4" />,
      title: "Respect",
      description: "We foster mutual respect among students, instructors, and competitors, honoring the traditions of Taekwondo and treating everyone with dignity."
    },
    {
      icon: <FaTrophy className="text-primary text-3xl mb-4" />,
      title: "Discipline",
      description: "We promote self-discipline as a core value, teaching students to control their actions, emotions, and develop a strong work ethic."
    },
    {
      icon: <FaHeart className="text-primary text-3xl mb-4" />,
      title: "Integrity",
      description: "We uphold the highest standards of honesty and ethical behavior, encouraging students to be truthful in all aspects of life."
    },
    {
      icon: <FaHandshake className="text-primary text-3xl mb-4" />,
      title: "Perseverance",
      description: "We instill the spirit of perseverance, teaching students to overcome obstacles and continue forward despite challenges."
    },
    {
      icon: <FaUniversity className="text-primary text-3xl mb-4" />,
      title: "Community",
      description: "We build a supportive community that encourages growth, provides mentorship, and celebrates achievements together."
    }
  ];

  // Team members data - Neha Diwate, Prajakta Jagtap and Akshada Harke moved to the top
  const teamMembers = [
    {
      id: 7,
      name: "Neha Diwate",
      title: "International Player",
      rank: "Black Belt",
      bio: "Neha Diwate is an accomplished international player with extensive experience in competitive Taekwondo. Her remarkable record includes 7 international matches resulting in 7 Gold, 1 Silver, and 1 Bronze medals. At the national level, she has participated in 25 competitions, earning an impressive 25 Gold medals. Her exceptional competitive record and dedication make her an inspiration to students across all branches.",
      image: mainMasterImg,
      imagePosition: "center center",
      achievements: [
        "7 International Matches - 7 Gold, 1 Silver, 1 Bronze",
        "25 National Competitions - 25 Gold",
        "International Player",
        "Elite Tournament Specialist"
      ]
    },
    {
      id: 5,
      name: "Prajakta Jagtap",
      title: "Instructor - Bhosari Branch",
      rank: "1st Dan Black Belt",
      bio: "Prajakta Jagtap is a 1st Dan black belt martial artist with impressive competition experience, including 20 national and 3 international competitions. She currently works as an instructor at the Bhosari Branch, where she inspires students with her extensive tournament background.",
      image: master5Img,
      imagePosition: "center 30%",
      achievements: [
        "1st Dan Black Belt",
        "20 National Competitions",
        "3 International Competitions",
        "Women's Training Specialist"
      ]
    },
    {
      id: 6,
      name: "Akshada Harke",
      title: "Instructor - Moshi Branch",
      rank: "Black Belt",
      bio: "Akshada Harke is a black belt martial artist with significant competition experience, including 4 national and 1 international competitions. She currently works as an instructor at the Moshi branch, where she focuses on developing both competitive skills and personal growth in her students.",
      image: master6Img,
      imagePosition: "center 25%",
      achievements: [
        "Black Belt",
        "4 National Competitions",
        "1 International Competition",
        "Youth Development Specialist"
      ]
    },
    {
      id: 1,
      name: "Prem Lomte",
      title: "Instructor - Dhavade Wasti, Bhosari Branch",
      rank: "Black Belt",
      bio: "Prem Lomte is a black belt Martial Artist with national level experience. He currently works as an instructor at the Dhavade Wasti, Bhosari Branch, where he shares his expertise and passion for Taekwondo with students of all ages.",
      image: master1Img,
      imagePosition: "center center",
      achievements: [
        "Black Belt",
        "National Level Competitor",
        "Certified Instructor",
        "Specializes in Youth Training"
      ]
    },
    {
      id: 2,
      name: "Sarthak Panchal",
      title: "Instructor - Bhosari Branch",
      rank: "Black Belt",
      bio: "Sarthak Panchal is a black belt martial artist with national-level experience. He currently works as an instructor at the Bhosari branch, where he focuses on developing both technical skills and mental discipline in his students.",
      image: master2Img,
      imagePosition: "center center",
      achievements: [
        "Black Belt",
        "National Level Competitor",
        "Certified Instructor",
        "Technical Skills Specialist"
      ]
    },
    {
      id: 3,
      name: "Mujahid Shaikh",
      title: "Instructor - Ghavane Vasti, Bhosari Branch",
      rank: "Black Belt",
      bio: "Mujahid Shaikh is a black belt Martial Artist with national level experience. He currently works as an instructor at the Ghavane Vasti, Bhosari Branch, where he is known for his dynamic teaching style and commitment to student development.",
      image: master3Img,
      imagePosition: "center 20%",
      achievements: [
        "Black Belt",
        "National Level Competitor",
        "Certified Instructor",
        "Specializes in Combat Techniques"
      ]
    },
    {
      id: 4,
      name: "Omkar Kusale",
      title: "Instructor - Moshi Branch",
      rank: "Black Belt",
      bio: "Omkar Kusale is a black belt Martial Artist with both international and national level experience. He currently works as an instructor at the Moshi Branch, bringing his extensive competition experience to help develop the next generation of champions.",
      image: master4Img,
      imagePosition: "center center",
      achievements: [
        "Black Belt",
        "International Competitor",
        "National Level Competitor",
        "Advanced Training Specialist"
      ]
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: "1985",
      title: "Foundation",
      description: "Establishment of All Maharashtra Taekwondo Association by Grandmaster Rajesh Deshmukh."
    },
    {
      year: "1992",
      title: "First State Championship",
      description: "Successfully organized the first Maharashtra State Taekwondo Championship with participation from 12 districts."
    },
    {
      year: "1997",
      title: "National Recognition",
      description: "Official recognition by the Taekwondo Federation of India as the state governing body."
    },
    {
      year: "2002",
      title: "International Success",
      description: "First international medal won by AMTA athlete at Asian Championships."
    },
    {
      year: "2010",
      title: "New Leadership",
      description: "Master Anil Sharma elected as President, initiating modernization of training methods."
    },
    {
      year: "2015",
      title: "Training Center Expansion",
      description: "Opened three new training centers across Maharashtra to promote grassroots development."
    },
    {
      year: "2018",
      title: "Elite Program Launch",
      description: "Launched Elite Athlete Development Program focusing on international competition preparation."
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Launch of comprehensive digital platform for members and introduction of advanced training methodologies."
    }
  ];

  // Affiliations data
  const affiliations = [
    {
      name: "World Taekwondo Federation (WT)",
      description: "Official member of the global governing body for Olympic Taekwondo."
    },
    {
      name: "Taekwondo Federation of India (TFI)",
      description: "Recognized state association by the national governing body."
    },
    {
      name: "Asian Taekwondo Union (ATU)",
      description: "Member of the continental governing body for Taekwondo in Asia."
    },
    {
      name: "Maharashtra Olympic Association",
      description: "Affiliated with the state Olympic committee for sports development."
    }
  ];

  // Branch locations data
  const branchLocations = [
    {
      id: 1,
      name: "Bhosari Center",
      address: "123 Taekwondo Way, Bhosari, Pune - 411026",
      phone: "+91 98765 43210",
      email: "bhosari@maharashtratkd.org",
      schedule: "Mon-Sat: 6:00 AM - 9:00 PM, Sun: 8:00 AM - 12:00 PM",
      description: "Our flagship center in Bhosari features state-of-the-art training facilities including competition-standard mats, electronic scoring equipment, and a specialized training area for advanced practitioners.",
      instructors: ["Master Sunil Patil (5th Dan)", "Ms. Priya Kulkarni (4th Dan)"]
    },
    {
      id: 2,
      name: "Dighi Center",
      address: "45 Sports Complex, Near MIDC, Dighi, Pune - 411015",
      phone: "+91 87654 32109",
      email: "dighi@maharashtratkd.org",
      schedule: "Mon-Sat: 5:30 AM - 8:30 PM, Sun: Closed",
      description: "The Dighi center specializes in children's programs and beginner classes, with specially trained instructors for young athletes and a safe, supportive training environment.",
      instructors: ["Master Rahul Gaikwad (4th Dan)", "Mr. Vijay Sharma (3rd Dan)"]
    },
    {
      id: 3,
      name: "Moshi Center",
      address: "78 Gandhi Road, Near Municipal School, Moshi, Pune - 412105",
      phone: "+91 76543 21098",
      email: "moshi@maharashtratkd.org",
      schedule: "Mon-Fri: 6:00 AM - 9:00 PM, Sat-Sun: 7:00 AM - 1:00 PM",
      description: "Our Moshi branch focuses on competitive training and has produced several state and national champions in recent years with its intensive training programs and experienced coaching staff.",
      instructors: ["Master Deepak Jadhav (5th Dan)", "Ms. Ashwini Shinde (3rd Dan)"]
    },
    {
      id: 4,
      name: "Shivajinagar Center",
      address: "25 University Road, Near College of Engineering, Shivajinagar, Pune - 411005",
      phone: "+91 65432 10987",
      email: "shivajinagar@maharashtratkd.org",
      schedule: "Mon-Sat: 7:00 AM - 10:00 PM, Sun: 8:00 AM - 2:00 PM",
      description: "Located in the heart of the city, our Shivajinagar center caters primarily to university students and young professionals with flexible scheduling and specialized programs.",
      instructors: ["Master Amit Desai (4th Dan)", "Mr. Kiran Patil (3rd Dan)"]
    },
    {
      id: 5,
      name: "Pimpri Center",
      address: "156 Industrial Area, Near Railway Station, Pimpri, Pune - 411018",
      phone: "+91 54321 09876",
      email: "pimpri@maharashtratkd.org",
      schedule: "Mon-Sat: 5:00 AM - 9:00 PM, Sun: 6:00 AM - 12:00 PM",
      description: "The Pimpri center is our newest facility, equipped with modern training equipment and offering specialized programs including self-defense workshops for women and corporate training sessions.",
      instructors: ["Master Sunita Pawar (4th Dan)", "Mr. Rajesh Kumar (3rd Dan)"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl mb-8">
              All Maharashtra Taekwondo Association (AMTA) has been dedicated to promoting excellence 
              in Taekwondo across Maharashtra since 1985, fostering physical fitness, mental discipline, 
              and the true spirit of martial arts.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-16">
        <div className="container">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium text-lg transition-colors ${
                activeTab === 'history' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-3 font-medium text-lg transition-colors ${
                activeTab === 'mission' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Mission & Values
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-3 font-medium text-lg transition-colors ${
                activeTab === 'team' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Our Team
            </button>
            <button
              onClick={() => setActiveTab('history-timeline')}
              className={`px-6 py-3 font-medium text-lg transition-colors ${
                activeTab === 'history-timeline' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`px-6 py-3 font-medium text-lg transition-colors ${
                activeTab === 'branches' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Our Branches
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Our History</h2>
                
                <div className="bg-white rounded-lg shadow-md mb-8">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-secondary">Founding & Early Years</h3>
                    <p className="text-gray-700 mb-4">
                      All Maharashtra Taekwondo Association was founded in 1985 by Grandmaster Rajesh Deshmukh, who brought his extensive training and experience from South Korea to Maharashtra. What began as a small training center in Pune rapidly grew into the premier Taekwondo organization in the state.
                    </p>
                    <p className="text-gray-700">
                      Throughout the late 1980s and 1990s, AMTA established training centers across major cities in Maharashtra, organizing the first official state championships and developing a structured curriculum that would become the standard for Taekwondo training in the region.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Growth & Recognition</h3>
                  <p className="text-gray-700 mb-4">
                    By 1997, AMTA had gained official recognition from the Taekwondo Federation of India as the governing body for the sport in Maharashtra. This milestone marked our transition from a growing martial arts school to an official sporting organization with responsibilities for athlete development, competition organization, and referee training.
                  </p>
                  <p className="text-gray-700">
                    The early 2000s saw our first international successes, with AMTA-trained athletes representing India in continental and world championships. This period also marked the beginning of our focus on professional coaching development, sports science integration, and modernizing our training methodologies.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Modern Era</h3>
                  <p className="text-gray-700 mb-4">
                    Under the leadership of Master Anil Sharma, who became President in 2010, AMTA has embarked on a comprehensive modernization program. This includes the implementation of electronic scoring systems, video analysis for technical development, and scientific training methodologies.
                  </p>
                  <p className="text-gray-700 mb-4">
                    In recent years, we've expanded our focus beyond competition to emphasize the holistic benefits of Taekwondo as a lifestyle practice. Our programs now address mental wellness, character development, and life skills alongside technical proficiency.
                  </p>
                  <p className="text-gray-700">
                    Today, AMTA serves thousands of practitioners across Maharashtra, from recreational martial artists to Olympic hopefuls, continuing our mission of promoting excellence in Taekwondo and developing well-rounded individuals through martial arts.
                  </p>
                </div>
              </div>
            )}

            {/* Mission & Values Tab */}
            {activeTab === 'mission' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Our Mission & Values</h2>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Mission Statement</h3>
                  <p className="text-gray-700 mb-6">
                    Our mission is to promote and develop Taekwondo throughout Maharashtra as both a competitive sport and a way of life, fostering physical fitness, mental discipline, and character development. We are committed to providing high-quality instruction, organizing fair competitions, and creating pathways for practitioners at all levels to achieve their full potential.
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4 text-secondary">Vision</h3>
                  <p className="text-gray-700">
                    To be recognized as a center of excellence for Taekwondo in India, producing champions at national and international levels while making the benefits of Taekwondo accessible to people of all ages and backgrounds across Maharashtra.
                  </p>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-secondary text-center">Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {coreValues.map((value, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                      {value.icon}
                      <h4 className="text-xl font-bold mb-2 text-secondary">{value.title}</h4>
                      <p className="text-gray-700">{value.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Our Approach</h3>
                  <p className="text-gray-700 mb-4">
                    At AMTA, we believe in a balanced approach to Taekwondo that honors traditional values while embracing modern training methodologies. Our curriculum integrates the five tenets of Taekwondo—courtesy, integrity, perseverance, self-control, and indomitable spirit—with evidence-based training techniques.
                  </p>
                  <p className="text-gray-700">
                    We recognize that each student has unique goals, whether they seek competitive success, self-defense skills, physical fitness, or personal growth. Our programs are designed to support these diverse aspirations while maintaining the highest standards of technical excellence and adherence to Taekwondo principles.
                  </p>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Our Leadership Team</h2>
                
                {teamMembers.map(member => (
                  <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-2/5 h-64 md:h-auto">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                          style={{ objectPosition: member.imagePosition || "center center" }}
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <h3 className="text-2xl font-bold mb-1 text-secondary">{member.name}</h3>
                        <p className="text-primary font-medium mb-2">{member.title}</p>
                        <p className="text-gray-600 mb-4">{member.rank}</p>
                        <p className="text-gray-700 mb-4">{member.bio}</p>
                        
                        <h4 className="font-semibold mb-2 text-secondary">Key Achievements:</h4>
                        <ul className="list-disc pl-5 text-gray-700">
                          {member.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Our Instructors</h3>
                  <p className="text-gray-700 mb-4">
                    AMTA is proud to have a team of over 50 certified instructors across Maharashtra, all holding a minimum of 3rd Dan Black Belt and having completed our rigorous Instructor Certification Program. Many of our instructors are former national and international competitors who bring their competitive experience to their teaching.
                  </p>
                  <p className="text-gray-700">
                    All AMTA instructors undergo continuous professional development, including annual recertification, seminars with international masters, and training in modern coaching methodologies. This ensures that our students receive instruction that balances traditional martial arts wisdom with contemporary sports science.
                  </p>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'history-timeline' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Our Journey</h2>
                
                <div className="relative border-l-2 border-primary ml-6 pl-8 pb-8">
                  {timeline.map((item, index) => (
                    <div key={index} className="mb-12 relative">
                      <div className="absolute -left-14 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {item.year.substring(2)}
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-bold text-secondary">{item.title}</h3>
                          <span className="ml-auto text-gray-500 font-semibold">{item.year}</span>
                        </div>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Affiliations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {affiliations.map((affiliation, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-bold text-secondary mb-1">{affiliation.name}</h4>
                        <p className="text-gray-700">{affiliation.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Branches Tab */}
            {activeTab === 'branches' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-secondary">Our Training Centers</h2>
                <p className="text-gray-700 mb-8">
                  AMTA operates multiple training centers across Pune and surrounding areas, making Taekwondo accessible to students throughout the region. Each center offers a range of programs tailored to different age groups and skill levels.
                </p>
                
                <div className="relative border-l-2 border-primary ml-6 pl-8 pb-8">
                  {branchLocations.map((branch, index) => (
                    <div key={branch.id} className="mb-12 relative">
                      <div className="absolute -left-14 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-3">
                          <h3 className="text-xl font-bold text-secondary">{branch.name}</h3>
                        </div>
                        <p className="text-gray-700 mb-4">{branch.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-primary mt-1 mr-2 flex-shrink-0" />
                            <p className="text-gray-700">{branch.address}</p>
                          </div>
                          <div className="flex items-center">
                            <FaPhone className="text-primary mr-2 flex-shrink-0" />
                            <p className="text-gray-700">{branch.phone}</p>
                          </div>
                          <div className="flex items-center">
                            <FaEnvelope className="text-primary mr-2 flex-shrink-0" />
                            <p className="text-gray-700">{branch.email}</p>
                          </div>
                          <div className="flex items-start">
                            <FaClock className="text-primary mt-1 mr-2 flex-shrink-0" />
                            <p className="text-gray-700">{branch.schedule}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="font-bold text-secondary mb-2">Lead Instructors:</h4>
                          <div className="flex flex-wrap gap-2">
                            {branch.instructors.map((instructor, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {instructor}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Visit a Center</h3>
                  <p className="text-gray-700 mb-4">
                    We welcome visitors to observe classes and learn more about our programs. For the best experience, we recommend contacting the center directly to schedule a visit during appropriate training hours.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="px-5 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors">
                      Contact Us
                    </Link>
                    <Link to="/enroll" className="px-5 py-2 border border-primary text-primary rounded-md hover:bg-gray-100 transition-colors">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">AMTA by the Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">35+</div>
              <p className="text-lg">Years of Excellence</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <p className="text-lg">Certified Instructors</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
              <p className="text-lg">Active Students</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25</div>
              <p className="text-lg">Training Centers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6 text-secondary">Join Our Community</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            Whether you're looking to start your Taekwondo journey, improve your skills, or compete at the highest levels, 
            AMTA offers programs for all ages and skill levels across Maharashtra.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/programs" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              Explore Our Programs
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 