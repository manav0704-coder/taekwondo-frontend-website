import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Import images directly from assets
import photo1 from '../../assets/images/photo-1.jpg';
import photo3 from '../../assets/images/photo-3.png';
import photo5 from '../../assets/images/photo-5.png';
import event1 from '../../assets/images/event-1-img.jpg';
import event2 from '../../assets/images/event-2-img.jpg';
import event3 from '../../assets/images/event-3-img.jpg';
import event4 from '../../assets/images/event-4-img.jpg';
import event5 from '../../assets/images/event-5-img.jpg';
import stateTaekwondoChampionship from '../../assets/images/Maharashtra-State-Taekwondo-Championship-2023.jpeg';
import summerTrainingCamp from '../../assets/images/Taekwondo-Summer-Training-Camp.jpeg';
import beltCeremony from '../../assets/images/Belt-Promotion-Ceremony.jpg';
import stateChampionshipWinners from '../../assets/images/State-Championship-Winners.jpg';

// Define direct URLs to images in the public folder - keeping as fallback
const publicImages = {
  // Event images
  event1: `${process.env.PUBLIC_URL}/images/event-1-img.jpg`,
  event2: `${process.env.PUBLIC_URL}/images/event-2-img.jpg`,
  event3: `${process.env.PUBLIC_URL}/images/event-3-img.jpg`,
  event4: `${process.env.PUBLIC_URL}/images/event-4-img.jpg`,
  event5: `${process.env.PUBLIC_URL}/images/event-5-img.jpg`,
  // Photo images
  photo1: `${process.env.PUBLIC_URL}/images/photo-1.jpg`,
  photo3: `${process.env.PUBLIC_URL}/images/photo-3.png`,
  photo5: `${process.env.PUBLIC_URL}/images/photo-5.png`,
  // Other images
  stateTaekwondoChampionship: `${process.env.PUBLIC_URL}/images/Maharashtra-State-Taekwondo-Championship-2023.jpeg`,
  summerTrainingCamp: `${process.env.PUBLIC_URL}/images/Taekwondo-Summer-Training-Camp.jpeg`,
  beltCeremony: `${process.env.PUBLIC_URL}/images/Belt-Promotion-Ceremony.jpg`,
  stateChampionshipWinners: `${process.env.PUBLIC_URL}/images/State-Championship-Winners.jpg`,
};

// Absolute URLs as a secondary fallback
const absoluteUrls = {
  // Event images
  event1: '/images/event-1-img.jpg',
  event2: '/images/event-2-img.jpg',
  event3: '/images/event-3-img.jpg',
  event4: '/images/event-4-img.jpg',
  event5: '/images/event-5-img.jpg',
  // Photo images
  photo1: '/images/photo-1.jpg',
  photo3: '/images/photo-3.png',
  photo5: '/images/photo-5.png',
  // Other images
  stateTaekwondoChampionship: '/images/Maharashtra-State-Taekwondo-Championship-2023.jpeg',
  summerTrainingCamp: '/images/Taekwondo-Summer-Training-Camp.jpeg',
  beltCeremony: '/images/Belt-Promotion-Ceremony.jpg',
  stateChampionshipWinners: '/images/State-Championship-Winners.jpg',
};

// Image Component with multiple fallbacks
const GalleryImage = ({ src, alt, className, fallbackSrc, placeholderSrc }) => {
  const [imgSrc, setImgSrc] = useState(src);
  // eslint-disable-next-line no-unused-vars
  const [_loaded, setLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_error, setError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  // Reset on src change
  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
    setError(false);
    setAttemptCount(0);
  }, [src]);
  
  // Handle error with multiple fallbacks
  const handleError = () => {
    setError(true);
    
    // Try fallbacks in order
    if (attemptCount === 0 && fallbackSrc) {
      console.log(`First fallback for ${alt}: ${fallbackSrc}`);
      setImgSrc(fallbackSrc);
      setAttemptCount(1);
    } else if (attemptCount === 1 && placeholderSrc) {
      console.log(`Second fallback for ${alt}: ${placeholderSrc}`);
      setImgSrc(placeholderSrc); 
      setAttemptCount(2);
    } else {
      console.log(`Final fallback for ${alt}: placeholder`);
      setImgSrc('https://via.placeholder.com/800x600?text=Image+Not+Available');
      setAttemptCount(3);
    }
  };
  
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={`${className} gallery-image`}
      loading="lazy"
      onLoad={() => {
        console.log(`Image loaded: ${alt}`);
        setLoaded(true);
      }}
      onError={handleError}
    />
  );
};

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('grid'); // 'grid', 'collage', or 'masonry'
  
  // Preload all images when component mounts
  useEffect(() => {
    console.log("Preloading all gallery images");
    // Preload all images from publicImages
    Object.entries(publicImages).forEach(([key, path]) => {
      const img = new Image();
      img.onload = () => console.log(`Preloaded: ${key}`);
      img.onerror = () => console.error(`Failed to preload: ${key}`);
      img.src = path;
    });
  }, []);
  
  // Format date for demo gallery items
  const formatDateString = useCallback((date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }, []);
  
  // On initial mount, check if we can access the images from public folder
  useEffect(() => {
    console.log("Gallery component mounted, checking image accessibility");
    
    // Function to check if an image in the public folder is accessible
    const checkPublicImage = (path, name) => {
      fetch(process.env.PUBLIC_URL + path)
        .then(response => {
          if (response.ok) {
            console.log(`Public image ${name} accessible: ${process.env.PUBLIC_URL + path}`);
          } else {
            console.error(`Public image ${name} NOT accessible: ${process.env.PUBLIC_URL + path}`);
          }
        })
        .catch(err => {
          console.error(`Error checking public image ${name}: ${err.message}`);
        });
    };
    
    // Check each public image
    Object.entries(publicImages).forEach(([name, path]) => {
      checkPublicImage(path, name);
    });
    
    // Force all images to reload once component is mounted
    setTimeout(() => {
      const galleryImages = document.querySelectorAll('.gallery-image');
      console.log(`Found ${galleryImages.length} gallery images to reload`);
      galleryImages.forEach((img, index) => {
        // Add a timestamp to the URL to force reload
        if (img.src && img.src.includes('images/')) {
          const newSrc = img.src.split('?')[0] + '?t=' + new Date().getTime();
          console.log(`Reloading image ${index}: ${newSrc}`);
          img.src = newSrc;
        }
      });
    }, 500);
  }, []);

  // Demo gallery items - used when API isn't available
  const demoGalleryItems = useCallback(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    
    console.log('Loading demo gallery items');
    
    // Use directly imported images instead of paths
    return [
      {
        _id: '1',
        title: 'State Championship Winners',
        description: 'Our team showing the medals from the Maharashtra State Championship.',
        mediaType: 'image',
        mediaUrl: stateChampionshipWinners,
        category: 'tournament',
        tags: ['competition', 'medals', 'winners', 'championship'],
        isPublic: true,
        uploadedAt: formatDateString(oneMonthAgo)
      },
      {
        _id: '2',
        title: 'Training Session',
        description: 'Students practicing high kicks during training.',
        mediaType: 'image',
        mediaUrl: photo1,
        category: 'training',
        tags: ['practice', 'kicks', 'technique', 'training'],
        isPublic: true,
        uploadedAt: formatDateString(twoMonthsAgo)
      },
      {
        _id: '3',
        title: 'Poomsae Demonstration',
        description: 'Master Kim demonstrating advanced Poomsae techniques.',
        mediaType: 'image',
        mediaUrl: photo3,
        category: 'demonstration',
        tags: ['poomsae', 'forms', 'master', 'technique'],
        isPublic: true,
        uploadedAt: formatDateString(threeMonthsAgo)
      },
      {
        _id: '4',
        title: 'Belt Ceremony',
        description: 'Students receiving their new belts at the quarterly ceremony.',
        mediaType: 'image',
        mediaUrl: beltCeremony,
        category: 'belt-ceremony',
        tags: ['promotion', 'belts', 'ceremony', 'achievement'],
        isPublic: true,
        uploadedAt: formatDateString(oneMonthAgo)
      },
      {
        _id: '5',
        title: 'International Competition Highlights',
        description: 'Highlights from our participation in the International Taekwondo Championship.',
        mediaType: 'image',
        mediaUrl: photo5,
        category: 'tournament',
        tags: ['competition', 'international', 'highlights', 'championship'],
        isPublic: true,
        uploadedAt: formatDateString(twoMonthsAgo)
      },
      {
        _id: '6',
        title: 'Children\'s Class',
        description: 'Our little champions learning the basics of Taekwondo.',
        mediaType: 'image',
        mediaUrl: event1,
        category: 'training',
        tags: ['children', 'beginners', 'learning', 'basics'],
        isPublic: true,
        uploadedAt: formatDateString(threeMonthsAgo)
      },
      {
        _id: '7',
        title: 'Summer Training Camp',
        description: 'Intensive training sessions at our annual summer camp.',
        mediaType: 'image',
        mediaUrl: summerTrainingCamp,
        category: 'training',
        tags: ['camp', 'summer', 'intensive', 'outdoor'],
        isPublic: true,
        uploadedAt: formatDateString(twoMonthsAgo)
      },
      {
        _id: '8',
        title: 'Black Belt Graduation',
        description: 'Proud moment for our students achieving black belt status.',
        mediaType: 'image',
        mediaUrl: event2,
        category: 'belt-ceremony',
        tags: ['black belt', 'graduation', 'achievement', 'ceremony'],
        isPublic: true,
        uploadedAt: formatDateString(oneMonthAgo)
      },
      {
        _id: '9',
        title: 'Sparring Practice',
        description: 'Students practicing sparring techniques with protective gear.',
        mediaType: 'image',
        mediaUrl: event3,
        category: 'training',
        tags: ['sparring', 'practice', 'protective gear', 'technique'],
        isPublic: true,
        uploadedAt: formatDateString(threeMonthsAgo)
      },
      {
        _id: '10',
        title: 'Maharashtra State Championship',
        description: 'Our team competing at the Maharashtra State Taekwondo Championship.',
        mediaType: 'image',
        mediaUrl: stateTaekwondoChampionship,
        category: 'tournament',
        tags: ['competition', 'state', 'championship', 'team'],
        isPublic: true,
        uploadedAt: formatDateString(twoMonthsAgo)
      },
      {
        _id: '11',
        title: 'Breaking Demonstration',
        description: 'Master Lee demonstrating board breaking techniques.',
        mediaType: 'image',
        mediaUrl: event4,
        category: 'demonstration',
        tags: ['breaking', 'boards', 'power', 'demonstration'],
        isPublic: true,
        uploadedAt: formatDateString(oneMonthAgo)
      },
      {
        _id: '12',
        title: 'Team Building Exercise',
        description: 'Students participating in team building activities.',
        mediaType: 'image',
        mediaUrl: event5,
        category: 'training',
        tags: ['team building', 'cooperation', 'activities', 'teamwork'],
        isPublic: true,
        uploadedAt: formatDateString(threeMonthsAgo)
      }
    ];
  }, [formatDateString]);

  // Fetch gallery items - MODIFIED TO ALWAYS USE DEMO DATA
  useEffect(() => {
    setLoading(true);
    console.log('Loading demo gallery items directly');
    
    // Always use demo data for consistent experience
    const demoItems = demoGalleryItems();
    setGalleryItems(demoItems);
    setFilteredItems(demoItems);
    setLoading(false);
  }, [demoGalleryItems]);

  // Filter gallery items when category or search changes
  useEffect(() => {
    let result = [...galleryItems];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) || 
          item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredItems(result);
  }, [galleryItems, activeCategory, searchQuery]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Open media in modal
  const openMedia = (item) => {
    setSelectedMedia(item);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close media modal
  const closeMedia = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      'tournament': 'bg-red-500',
      'training': 'bg-blue-500',
      'demonstration': 'bg-purple-500',
      'celebration': 'bg-green-500',
      'belt-ceremony': 'bg-yellow-500',
      'seminar': 'bg-indigo-500',
      'other': 'bg-gray-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Force trigger for Desktop users
  useEffect(() => {
    // Add a small delay to ensure elements are mounted
    const timer = setTimeout(() => {
      console.log("Triggering desktop image fix");
      
      // Create a test function for image visibility
      const testImageVisibility = (src, imgElement) => {
        const testImg = new Image();
        testImg.onload = () => {
          console.log(`✓ Desktop fix: Successfully loaded ${src}`);
          if (imgElement) {
            // Force repaint by applying small styling change
            imgElement.style.opacity = '0.99';
            setTimeout(() => {
              imgElement.style.opacity = '1';
            }, 10);
          }
        };
        testImg.onerror = () => {
          console.error(`✗ Desktop fix: Failed to load ${src}`);
          if (imgElement && imgElement.src !== 'https://via.placeholder.com/800x600?text=Image+Not+Available') {
            imgElement.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
          }
        };
        testImg.src = src;
      };
      
      // Force browser to repaint images - helps with image loading issues
      const galleryImages = document.querySelectorAll('.gallery-image');
      console.log(`Found ${galleryImages.length} gallery images to reload`);
      
      galleryImages.forEach((img, index) => {
        // Test if image is truly visible
        testImageVisibility(img.src, img);
        
        // Add a timestamp to the URL to force reload
        if (img.src && img.src.includes('/images/')) {
          const timestamp = new Date().getTime();
          const newSrc = img.src.split('?')[0] + `?t=${timestamp}`;
          console.log(`Reloading image ${index}: ${newSrc}`);
          img.src = newSrc;
        }
      });
      
      // Create backup references for direct access
      const backupImages = {};
      
      // Try loading absolute URLs directly as a last resort
      Object.entries(absoluteUrls).forEach(([key, path]) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Direct loading of ${key} successful`);
          backupImages[key] = img.src;
        };
        img.src = path;
      });
      
      // Add hidden images to document to ensure they're cached
      Object.entries(publicImages).forEach(([name, path]) => {
        const div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = `<img src="${path}" alt="preload-${name}" />`;
        document.body.appendChild(div);
        
        setTimeout(() => {
          document.body.removeChild(div);
        }, 2000); // Remove after 2 seconds
      });
      
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [filteredItems]);

  // Render gallery item
  const renderGalleryItem = (item) => {
    return (
      <div 
        key={item._id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-duration-300 cursor-pointer mb-4"
        onClick={() => openMedia(item)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/5 h-48 md:h-64">
            <GalleryImage
              src={item.mediaType === 'video' ? item.thumbnailUrl : item.mediaUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              fallbackSrc={item.mediaType === 'video' 
                ? absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === item.thumbnailUrl) || ''] 
                : absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === item.mediaUrl) || '']}
              placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
            />
            <div className={`absolute top-0 right-0 mt-2 mr-2 ${getCategoryColor(item.category)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
              {item.category.replace('-', ' ').toUpperCase()}
            </div>
            {item.mediaType === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 md:w-3/5">
            <h3 className="text-lg font-bold mb-1 text-secondary">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{formatDate(item.uploadedAt)}</p>
            <p className="text-gray-700 line-clamp-2">{item.description}</p>
          </div>
        </div>
      </div>
    );
  };

  // Media modal
  const renderMediaModal = () => {
    if (!selectedMedia) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closeMedia}>
        <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-4 bg-secondary text-white flex justify-between items-center">
            <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
            <button 
              onClick={closeMedia}
              className="text-white hover:text-primary focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            {selectedMedia.mediaType === 'video' ? (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={selectedMedia.mediaUrl}
                  title={selectedMedia.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <GalleryImage 
                src={selectedMedia.mediaUrl} 
                alt={selectedMedia.title} 
                className="w-full max-h-[70vh] object-contain mx-auto gallery-image"
                fallbackSrc={absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === selectedMedia.mediaUrl) || '']}
                placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
              />
            )}
          </div>
          
          <div className="p-4 border-t">
            <p className="text-gray-700 mb-3">{selectedMedia.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedMedia.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm">Uploaded on {formatDate(selectedMedia.uploadedAt)}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={event1} 
            alt="Gallery Hero" 
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Gallery</h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              Explore our collection of photos and videos showcasing our events,
              tournaments, classes, and achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-secondary">
              Our Gallery
            </h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-primary hover:text-secondary transition-colors"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-auto flex-grow">
                  <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="searchQuery"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search gallery..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-secondary border border-gray-300'
              } transition-colors`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange('tournament')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'tournament' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-secondary border border-gray-300'
              } transition-colors`}
            >
              Tournaments
            </button>
            <button
              onClick={() => handleCategoryChange('training')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'training' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-secondary border border-gray-300'
              } transition-colors`}
            >
              Training
            </button>
            <button
              onClick={() => handleCategoryChange('demonstration')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'demonstration' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-secondary border border-gray-300'
              } transition-colors`}
            >
              Demonstrations
            </button>
            <button
              onClick={() => handleCategoryChange('belt-ceremony')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'belt-ceremony' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white text-secondary border border-gray-300'
              } transition-colors`}
            >
              Belt Ceremonies
            </button>
            <button
              onClick={() => handleCategoryChange('seminar')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'seminar' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white text-secondary border border-gray-300'
              } transition-colors`}
            >
              Seminars
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex justify-end mb-4">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden flex">
              <button 
                onClick={() => setActiveView('grid')}
                className={`px-3 py-2 ${activeView === 'grid' ? 'bg-primary text-white' : 'text-gray-700'}`}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveView('collage')}
                className={`px-3 py-2 ${activeView === 'collage' ? 'bg-primary text-white' : 'text-gray-700'}`}
                title="Collage View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveView('masonry')}
                className={`px-3 py-2 ${activeView === 'masonry' ? 'bg-primary text-white' : 'text-gray-700'}`}
                title="Masonry View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* No Items State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-3">No gallery items match your criteria</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or category filters</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Gallery Grid View */}
        {!loading && filteredItems.length > 0 && activeView === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => renderGalleryItem(item))}
          </div>
        )}

        {/* Gallery Collage View */}
        {!loading && filteredItems.length > 0 && activeView === 'collage' && (
          <div className="grid grid-cols-12 gap-4">
            {filteredItems.length > 0 && (
              <div className="col-span-12 md:col-span-8" onClick={() => openMedia(filteredItems[0])}>
                <div className="relative rounded-lg overflow-hidden shadow-md h-96">
                  <GalleryImage 
                    src={filteredItems[0].mediaType === 'video' ? filteredItems[0].thumbnailUrl : filteredItems[0].mediaUrl} 
                    alt={filteredItems[0].title} 
                    className="w-full h-full object-cover gallery-image"
                    fallbackSrc={filteredItems[0].mediaType === 'video' 
                      ? absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === filteredItems[0].thumbnailUrl) || ''] 
                      : absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === filteredItems[0].mediaUrl) || '']}
                    placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white text-xl font-bold">{filteredItems[0].title}</h3>
                    <p className="text-white text-opacity-80">{filteredItems[0].description}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
              {filteredItems.length > 1 && (
                <div className="row-span-1" onClick={() => openMedia(filteredItems[1])}>
                  <div className="relative rounded-lg overflow-hidden shadow-md h-44">
                    <GalleryImage 
                      src={filteredItems[1].mediaType === 'video' ? filteredItems[1].thumbnailUrl : filteredItems[1].mediaUrl} 
                      alt={filteredItems[1].title} 
                      className="w-full h-full object-cover gallery-image"
                      fallbackSrc={filteredItems[1].mediaType === 'video' 
                        ? absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === filteredItems[1].thumbnailUrl) || ''] 
                        : absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === filteredItems[1].mediaUrl) || '']}
                      placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-white text-sm font-bold">{filteredItems[1].title}</h3>
                    </div>
                  </div>
                </div>
              )}
              
              {filteredItems.length > 2 && (
                <div className="row-span-1" onClick={() => openMedia(filteredItems[2])}>
                  <div className="relative rounded-lg overflow-hidden shadow-md h-44">
                    <GalleryImage 
                      src={filteredItems[2].mediaType === 'video' ? filteredItems[2].thumbnailUrl : filteredItems[2].mediaUrl} 
                      alt={filteredItems[2].title} 
                      className="w-full h-full object-cover gallery-image"
                      fallbackSrc={filteredItems[2].mediaType === 'video' 
                        ? absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === filteredItems[2].thumbnailUrl) || ''] 
                        : absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === filteredItems[2].mediaUrl) || '']}
                      placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-white text-sm font-bold">{filteredItems[2].title}</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Regular grid for remaining items */}
            <div className="col-span-12 grid grid-cols-3 gap-4">
              {filteredItems.length > 3 && filteredItems.slice(3, 6).map((item, index) => (
                <div key={item._id} className="col-span-1" onClick={() => openMedia(item)}>
                  <div className="relative rounded-lg overflow-hidden shadow-md h-48">
                    <GalleryImage 
                      src={item.mediaType === 'video' ? item.thumbnailUrl : item.mediaUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover gallery-image"
                      fallbackSrc={item.mediaType === 'video' 
                        ? absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === item.thumbnailUrl) || ''] 
                        : absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === item.mediaUrl) || '']}
                      placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-white text-xs font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Regular grid for remaining items */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {filteredItems.length > 6 && filteredItems.slice(6).map(renderGalleryItem)}
            </div>
          </div>
        )}

        {/* Gallery Masonry View */}
        {!loading && filteredItems.length > 0 && activeView === 'masonry' && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filteredItems.map(item => (
              <div 
                key={item._id}
                className="break-inside-avoid mb-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-duration-300 cursor-pointer"
                onClick={() => openMedia(item)}
              >
                <div className="flex flex-col">
                  <div className="relative h-48">
                    <GalleryImage 
                      src={item.mediaType === 'video' ? item.thumbnailUrl : item.mediaUrl}
                      alt={item.title} 
                      className="w-full h-full object-cover gallery-image"
                      fallbackSrc={item.mediaType === 'video' 
                        ? absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === item.thumbnailUrl) || ''] 
                        : absoluteUrls[Object.keys(publicImages).find(key => publicImages[key] === item.mediaUrl) || '']}
                      placeholderSrc="https://via.placeholder.com/800x600?text=Image+Not+Available"
                    />
                    <div className={`absolute top-0 right-0 mt-2 mr-2 ${getCategoryColor(item.category)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                      {item.category.replace('-', ' ').toUpperCase()}
                    </div>
                    {item.mediaType === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 text-secondary">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{formatDate(item.uploadedAt)}</p>
                    <p className="text-gray-700 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Moments Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary mb-6">Featured Moments</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <h3 className="text-xl font-bold text-secondary mb-4">Our Achievements</h3>
                  <p className="text-gray-700 mb-4">
                    All Maharashtra Taekwondo Association has a proud history of producing champions and promoting excellence in the sport of Taekwondo. Our students have consistently performed at the highest levels in regional, national, and international competitions.
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">150+</div>
                      <div className="text-sm text-gray-600">Medals Won</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">25+</div>
                      <div className="text-sm text-gray-600">Championships</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">500+</div>
                      <div className="text-sm text-gray-600">Students Trained</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="grid grid-cols-3 gap-2">
                    <img 
                      src={event1} 
                      alt="Achievement" 
                      className="rounded-lg h-24 w-full object-cover"
                    />
                    <img 
                      src={event2} 
                      alt="Achievement" 
                      className="rounded-lg h-24 w-full object-cover"
                    />
                    <img 
                      src={event3} 
                      alt="Achievement" 
                      className="rounded-lg h-24 w-full object-cover"
                    />
                    <img 
                      src={event4} 
                      alt="Achievement" 
                      className="rounded-lg h-24 w-full object-cover"
                    />
                    <img 
                      src={event5} 
                      alt="Achievement" 
                      className="rounded-lg h-24 w-full object-cover"
                    />
                    <img 
                      src={photo1} 
                      alt="Achievement" 
                      className="rounded-lg h-24 w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {renderMediaModal()}
    </div>
  );
};

export default Gallery; 