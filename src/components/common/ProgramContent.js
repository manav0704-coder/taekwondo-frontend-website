import React from 'react';
import { Link } from 'react-router-dom';

const programDetails = {
  children: {
    title: "Children's Program (Ages 5-12)",
    description: "Our Children's Program is designed to help young students develop fundamental taekwondo skills in a fun, supportive environment. Classes focus on improving focus, discipline, coordination, and confidence while teaching self-defense in an age-appropriate manner.",
    ageGroup: "5-12 years",
    benefits: [
      "Improved focus and concentration",
      "Enhanced physical coordination and fitness",
      "Development of self-confidence and respect",
      "Bullying prevention and self-defense skills",
      "Social skills and teamwork",
      "Goal setting through belt progression"
    ],
    curriculum: [
      "Basic stances, blocks, and strikes",
      "Simple kicks and combinations",
      "Beginner forms (patterns)",
      "Partner drills and light sparring (with protective gear)",
      "Interactive games that reinforce Taekwondo skills",
      "Age-appropriate self-defense techniques"
    ],
    classes: [
      { name: "Little Tigers", ages: "5-7", schedule: "Monday, Wednesday: 4:00PM - 4:45PM" },
      { name: "Junior Warriors", ages: "8-12", schedule: "Monday, Wednesday, Friday: 5:00PM - 5:45PM" }
    ],
    instructors: "All children's classes are taught by certified instructors with specialized training in youth development and child psychology."
  },
  teenAdult: {
    title: "Teen & Adult Program (Ages 13+)",
    description: "Our Teen & Adult Program is designed for students ages 13 and up. This comprehensive program focuses on self-defense, physical fitness, and developing both physical and mental strength. Classes are tailored to accommodate all fitness levels.",
    ageGroup: "13+ years",
    benefits: [
      "Complete full-body workout for improved fitness",
      "Practical self-defense skills for real-world situations",
      "Stress reduction and improved mental focus",
      "Increased flexibility, strength, and cardiovascular health",
      "Personal growth and self-confidence",
      "Community and camaraderie with fellow practitioners"
    ],
    curriculum: [
      "Advanced stances, blocks, strikes, and kicks",
      "Traditional Taekwon-Do patterns (tul)",
      "Contact sparring with protective gear",
      "Breaking techniques (breaking boards and other materials)",
      "Self-defense strategies and applications",
      "Weapons training (for advanced students)"
    ],
    classes: [
      { name: "Teen Class", ages: "13-17", schedule: "Tuesday, Thursday: 4:00PM - 5:30PM, Saturday: 10:00AM - 11:30AM" },
      { name: "Adult Beginners", ages: "18+", schedule: "Monday, Wednesday, Friday: 6:30PM - 8:00PM" },
      { name: "Adult Advanced", ages: "18+", schedule: "Tuesday, Thursday: 6:30PM - 8:00PM, Saturday: 12:00PM - 1:30PM" }
    ],
    instructors: "Classes are led by black belt instructors with years of training and teaching experience."
  },
  teen: {
    title: "Teen Program (Ages 13-17)",
    description: "Our Teen Program is tailored to the unique needs of teenagers, helping them build strength, confidence, and discipline during these crucial developmental years. The program combines traditional Taekwondo training with practical self-defense and competitive skills.",
    ageGroup: "13-17 years",
    benefits: [
      "Improved self-confidence and positive self-image",
      "Effective self-defense techniques",
      "Physical conditioning and athletic development",
      "Mental focus and academic performance enhancement",
      "Leadership skills and positive peer relationships",
      "Stress management and emotional control"
    ],
    curriculum: [
      "Intermediate to advanced techniques and combinations",
      "Competition-oriented training (forms and sparring)",
      "Modern self-defense scenarios relevant to teenagers",
      "Physical conditioning and strength training",
      "Mental training and focus exercises",
      "Leadership and assistant instructor opportunities"
    ],
    classes: [
      { name: "Teen Fundamentals", ages: "13-17", schedule: "Monday, Wednesday: 4:30PM - 5:45PM" },
      { name: "Teen Advanced", ages: "13-17", schedule: "Tuesday, Thursday: 4:30PM - 6:00PM, Saturday: 11:00AM - 12:30PM" }
    ],
    instructors: "Teen classes are taught by instructors who specialize in adolescent development and are trained to address the unique physical and emotional needs of teenage students."
  },
  competition: {
    title: "Competition Team",
    description: "Our Competition Team offers advanced training for students interested in competing at regional, national, and international levels. This program is designed for dedicated practitioners who want to test their skills against other Taekwondo athletes.",
    eligibility: "Open to students who have reached at least green belt level and have demonstrated commitment to regular training. Selection is based on skill level, attitude, and dedication.",
    focusAreas: [
      "Olympic-style sparring (kyorugi)",
      "Forms competition (poomsae/tul)",
      "Team demonstrations",
      "Breaking competitions"
    ],
    training: [
      "Specialized conditioning for competitions",
      "Advanced technical training",
      "Tactical and strategic development",
      "Mental preparation and sports psychology",
      "Competition rules and regulations",
      "Performance analysis and improvement"
    ],
    competitions: "Team members participate in multiple competitions throughout the year, from local tournaments to national and international championships.",
    achievements: "Our competition team has a history of success, with members earning medals at state, national, and international competitions."
  },
  blackBelt: {
    title: "Black Belt Program",
    description: "Our Black Belt Program is designed for dedicated students who have achieved the rank of 1st Dan (black belt) and beyond. This advanced program deepens technical knowledge, philosophical understanding, and leadership skills that are essential for high-ranking practitioners of Taekwondo.",
    eligibility: "Open to students who have achieved 1st Dan black belt or higher. Candidates must demonstrate a strong commitment to continuing their Taekwondo journey beyond the initial black belt achievement.",
    benefits: [
      "Mastery of advanced techniques and applications",
      "Deeper understanding of Taekwondo philosophy and history",
      "Enhanced leadership and teaching capabilities",
      "Mental discipline and personal development",
      "Preparation for higher Dan ranks",
      "Recognition within the global Taekwondo community"
    ],
    curriculum: [
      "Advanced forms (Palgwe/Taegeuk 9 and higher)",
      "Black belt-specific techniques and combinations",
      "Weapons training (bo staff, nunchaku, etc.)",
      "Advanced breaking techniques",
      "Teaching methodology and practice",
      "Taekwondo history and philosophy studies"
    ],
    classes: [
      { name: "Black Belt Essentials", level: "1st-2nd Dan", schedule: "Wednesday: 8:30PM - 10:00PM" },
      { name: "Advanced Masters", level: "3rd Dan and above", schedule: "Saturday: 3:00PM - 4:30PM" }
    ],
    mentorship: "Black belt students receive personalized mentorship from our master instructors and are provided opportunities to develop teaching skills by assisting with lower-rank classes.",
    advancement: "The time between dan promotions typically ranges from 2-3 years for 1st to 2nd Dan, and increasingly longer for higher ranks, reflecting the deeper commitment and mastery required."
  },
  instructor: {
    title: "Instructor Training Program",
    description: "Our Instructor Training Program prepares dedicated black belt students to become certified Taekwondo instructors. This comprehensive program covers teaching methodology, class management, student development, and the responsibilities of carrying forward the art of Taekwondo to future generations.",
    eligibility: "Open to black belt students (1st Dan or higher) who have demonstrated exceptional skill, character, and leadership potential. Selection is by invitation from the Master Instructor based on aptitude and commitment.",
    benefits: [
      "Development of professional teaching skills",
      "Enhanced technical understanding through teaching others",
      "Leadership and communication skill development",
      "Deeper martial arts knowledge and perspectives",
      "Official instructor certification recognized by national organizations",
      "Career opportunities within the Taekwondo community"
    ],
    curriculum: [
      "Teaching methodology and pedagogy",
      "Class planning and management techniques",
      "Safety protocols and injury prevention",
      "Age-appropriate instruction methods",
      "Student psychology and motivation strategies",
      "Business aspects of martial arts instruction"
    ],
    trainingProcess: [
      "Observing and assisting certified instructors",
      "Teaching segments of classes under supervision",
      "Attending specialized instructor workshops",
      "Creating and implementing lesson plans",
      "Receiving constructive feedback and mentoring",
      "Final certification assessment"
    ],
    schedule: "Friday: 8:30PM - 10:00PM, plus additional training hours arranged with the Master Instructor",
    certification: "Upon successful completion of the program, graduates receive official instructor certification recognized by relevant Taekwondo governing bodies."
  }
};

const ProgramContent = ({ programType }) => {
  const program = programDetails[programType];

  if (!program) return <div>Program information not available</div>;

  // Render different content based on program type
  if (programType === 'children') {
    return (
      <div className="text-secondary">
        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">🥋</span>
            </div>
            <h3 className="text-primary text-xl font-semibold">{program.title}</h3>
          </div>
          <div className="ml-13">
            <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded inline-block mb-2">
              {program.ageGroup}
            </div>
            <p>{program.description}</p>
          </div>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Program Benefits</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.benefits.map((benefit, index) => (
            <li key={index} className="mb-1">{benefit}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Curriculum Includes</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.curriculum.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Class Schedule</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          {program.classes.map((cls, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <h5 className="font-semibold">{cls.name} (Ages {cls.ages})</h5>
              <p>{cls.schedule}</p>
            </div>
          ))}
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Instructors</h4>
        <p className="mb-6">{program.instructors}</p>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg">
          <h4 className="text-primary text-lg font-semibold mb-2">Ready to Get Started?</h4>
          <p className="mb-4">Contact us to schedule a free trial class for your child. We'd be happy to answer any questions you have about our children's program.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    );
  } else if (programType === 'teen') {
    return (
      <div className="text-secondary">
        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">👥</span>
            </div>
            <h3 className="text-primary text-xl font-semibold">{program.title}</h3>
          </div>
          <div className="ml-13">
            <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded inline-block mb-2">
              {program.ageGroup}
            </div>
            <p>{program.description}</p>
          </div>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Program Benefits</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.benefits.map((benefit, index) => (
            <li key={index} className="mb-1">{benefit}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Curriculum Includes</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.curriculum.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Class Schedule</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          {program.classes.map((cls, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <h5 className="font-semibold">{cls.name} (Ages {cls.ages})</h5>
              <p>{cls.schedule}</p>
            </div>
          ))}
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Instructors</h4>
        <p className="mb-6">{program.instructors}</p>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg">
          <h4 className="text-primary text-lg font-semibold mb-2">Ready to Join?</h4>
          <p className="mb-4">Contact us to schedule a free trial class or to observe a session. No prior martial arts experience is necessary—beginners are always welcome!</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    );
  } else if (programType === 'teenAdult') {
    return (
      <div className="text-secondary">
        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">👥</span>
            </div>
            <h3 className="text-primary text-xl font-semibold">{program.title}</h3>
          </div>
          <div className="ml-13">
            <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded inline-block mb-2">
              {program.ageGroup}
            </div>
            <p>{program.description}</p>
          </div>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Program Benefits</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.benefits.map((benefit, index) => (
            <li key={index} className="mb-1">{benefit}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Curriculum Includes</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.curriculum.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Class Schedule</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          {program.classes.map((cls, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <h5 className="font-semibold">{cls.name} (Ages {cls.ages})</h5>
              <p>{cls.schedule}</p>
            </div>
          ))}
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Instructors</h4>
        <p className="mb-6">{program.instructors}</p>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg">
          <h4 className="text-primary text-lg font-semibold mb-2">Start Your Taekwondo Journey</h4>
          <p className="mb-4">Contact us to schedule a free trial class or to observe a session. No prior martial arts experience is necessary—beginners are always welcome!</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    );
  } else if (programType === 'competition') {
    return (
      <div className="text-secondary">
        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">🏆</span>
            </div>
            <h3 className="text-primary text-xl font-semibold">{program.title}</h3>
          </div>
          <p>{program.description}</p>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Eligibility</h4>
        <p className="mb-6">{program.eligibility}</p>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Competition Focus Areas</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.focusAreas.map((area, index) => (
            <li key={index} className="mb-1">{area}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Training Includes</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.training.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Competition Schedule</h4>
        <p className="mb-6">{program.competitions}</p>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Team Achievements</h4>
        <p className="mb-6">{program.achievements}</p>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg">
          <h4 className="text-primary text-lg font-semibold mb-2">Join Our Competition Team</h4>
          <p className="mb-4">If you're interested in competitive Taekwondo, speak with your instructor about joining the team. Tryouts are held periodically throughout the year.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    );
  } else if (programType === 'blackBelt') {
    return (
      <div className="text-secondary">
        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">🥋</span>
            </div>
            <h3 className="text-primary text-xl font-semibold">{program.title}</h3>
          </div>
          <div className="ml-13">
            <div className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded inline-block mb-2">
              Advanced Students
            </div>
            <p>{program.description}</p>
          </div>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Eligibility</h4>
        <p className="mb-6">{program.eligibility}</p>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Program Benefits</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.benefits.map((benefit, index) => (
            <li key={index} className="mb-1">{benefit}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Curriculum Includes</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.curriculum.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Class Schedule</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          {program.classes.map((cls, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <h5 className="font-semibold">{cls.name} ({cls.level})</h5>
              <p>{cls.schedule}</p>
            </div>
          ))}
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Mentorship</h4>
        <p className="mb-6">{program.mentorship}</p>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Black Belt Advancement</h4>
        <p className="mb-6">{program.advancement}</p>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg">
          <h4 className="text-primary text-lg font-semibold mb-2">Continue Your Black Belt Journey</h4>
          <p className="mb-4">Contact us to learn more about our Black Belt Program and how it can help you continue your growth as a martial artist.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    );
  } else if (programType === 'instructor') {
    return (
      <div className="text-secondary">
        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">👨‍🏫</span>
            </div>
            <h3 className="text-primary text-xl font-semibold">{program.title}</h3>
          </div>
          <div className="ml-13">
            <div className="bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded inline-block mb-2">
              Black Belts (By Selection)
            </div>
            <p>{program.description}</p>
          </div>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Eligibility</h4>
        <p className="mb-6">{program.eligibility}</p>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Program Benefits</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.benefits.map((benefit, index) => (
            <li key={index} className="mb-1">{benefit}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Curriculum</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.curriculum.map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Training Process</h4>
        <ul className="list-disc pl-6 mb-6">
          {program.trainingProcess.map((step, index) => (
            <li key={index} className="mb-1">{step}</li>
          ))}
        </ul>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Schedule</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p>{program.schedule}</p>
        </div>
        
        <h4 className="text-primary text-lg font-semibold mb-2">Certification</h4>
        <p className="mb-6">{program.certification}</p>
        
        <div className="mt-6 bg-primary-50 p-4 rounded-lg">
          <h4 className="text-primary text-lg font-semibold mb-2">Become an Instructor</h4>
          <p className="mb-4">If you're a black belt interested in becoming a certified instructor, speak with our Master Instructor about the selection process and requirements.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    );
  }

  return null;
};

export default ProgramContent; 