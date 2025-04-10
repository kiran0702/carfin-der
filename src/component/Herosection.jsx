import { useState, useEffect } from 'react';
import { ArrowRight, Car, Shield, Star, Users, Heart, Moon, Sun, Menu, X, Search, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function EnhancedLandingPage() {

  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Check for dark mode preference and wishlist count on mount
  useEffect(() => {
    // Check system preference or localStorage for dark mode
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    // Get wishlist count from localStorage
    const wishlist = JSON.parse(localStorage.getItem('carWishlist')) || [];
    setWishlistCount(wishlist.length);
  }, []);

  // Apply dark mode to document when changed
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'dark' : ''} flex flex-col`}>
      {/* Navbar */}
      <div className={`w-full ${
        darkMode 
          ? 'bg-gray-900 text-gray-100 border-b border-gray-700' 
          : 'bg-white text-gray-800 border-b border-gray-100'
      } transition-colors duration-300 shadow-md sticky top-0 z-50`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="font-bold text-xl md:text-2xl">
                <span className={darkMode ? "text-emerald-400" : "text-blue-600"}>Car</span>Finder
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
  <Link to="/" className={`${darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'} transition-colors`}>Home</Link>
  <Link to="/browse" className={`${darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'} transition-colors`}>Browse Cars</Link>
  
</div>


            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} className={darkMode ? "text-gray-200" : ""} />
                {wishlistCount > 0 && (
                  <span className={`absolute -top-1 -right-1 ${
                    darkMode ? 'bg-emerald-500' : 'bg-blue-600'
                  } text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={`${darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'} transition-colors py-2`}>Home</Link>
              <Link to="/browse" className={`${darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'} transition-colors py-2`}>Browse Cars</Link>
              <Link to="/compare" className={`${darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'} transition-colors py-2`}>Compare</Link>
            </nav>
          </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full">
        {/* Background with conditional dark/light mode styling */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900/70' 
            : 'bg-gradient-to-br from-blue-600/90 via-indigo-600/85 to-purple-500/80'
        } transition-all duration-500 z-10`}></div>
        
        {/* Different background image based on theme */}
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-[url(\'/api/placeholder/1200/800\')] opacity-40' 
            : 'bg-[url(\'/api/placeholder/1200/800\')] opacity-70'
        } bg-cover bg-center bg-no-repeat transition-opacity duration-500`}></div>
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Main heading with enhanced typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-center md:text-left">
              Drive Your Dreams <span className={darkMode ? "text-emerald-400" : "text-blue-300"}>Today</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 md:mb-12 text-center md:text-left">
              Find the perfect vehicle that matches your lifestyle from our extensive collection of premium cars.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center md:justify-start">
              <button className={`${
                darkMode 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center`}>
                Explore Inventory
                <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-medium py-4 px-8 rounded-lg transition-all duration-300">
                Schedule Test Drive
              </button>
            </div>
            
         
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className={`${
              darkMode ? 'bg-gray-800/70 hover:bg-gray-700/80' : 'bg-white/10 hover:bg-white/20'
            } backdrop-blur-md rounded-xl p-6 transition-all transform hover:scale-105 duration-300`}>
              <div className={`${
                darkMode ? 'bg-emerald-600' : 'bg-blue-600'
              } rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                <Car size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Extensive Selection</h3>
              <p className="text-gray-200">Access to over 10,000 vehicles from trusted dealers nationwide.</p>
            </div>
            
            <div className={`${
              darkMode ? 'bg-gray-800/70 hover:bg-gray-700/80' : 'bg-white/10 hover:bg-white/20'
            } backdrop-blur-md rounded-xl p-6 transition-all transform hover:scale-105 duration-300`}>
              <div className={`${
                darkMode ? 'bg-emerald-600' : 'bg-blue-600'
              } rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Guaranteed</h3>
              <p className="text-gray-200">Every vehicle undergoes a rigorous 150-point inspection process.</p>
            </div>
            
            <div className={`${
              darkMode ? 'bg-gray-800/70 hover:bg-gray-700/80' : 'bg-white/10 hover:bg-white/20'
            } backdrop-blur-md rounded-xl p-6 transition-all transform hover:scale-105 duration-300`}>
              <div className={`${
                darkMode ? 'bg-emerald-600' : 'bg-blue-600'
              } rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                <Star size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customer Satisfaction</h3>
              <p className="text-gray-200">Join thousands of happy customers with our 4.8/5 satisfaction rating.</p>
            </div>
          </div>
          
          {/* Stats with enhanced visual appeal */}
          <div className={`mt-16 ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-800/90 to-emerald-900/60' 
              : 'bg-gradient-to-r from-blue-800/50 to-indigo-800/50'
          } rounded-xl p-8 backdrop-blur-md`}>
            <div className="flex flex-wrap justify-between gap-8">
              <div className="text-center flex flex-col items-center">
                <p className="text-4xl font-bold text-white mb-1">10,000+</p>
                <div className={`w-12 h-1 ${darkMode ? 'bg-emerald-400' : 'bg-blue-400'} mb-2`}></div>
                <p className="text-gray-200">Cars Available</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <p className="text-4xl font-bold text-white mb-1">500+</p>
                <div className={`w-12 h-1 ${darkMode ? 'bg-emerald-400' : 'bg-blue-400'} mb-2`}></div>
                <p className="text-gray-200">Trusted Dealers</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <p className="text-4xl font-bold text-white mb-1">4.8/5</p>
                <div className={`w-12 h-1 ${darkMode ? 'bg-emerald-400' : 'bg-blue-400'} mb-2`}></div>
                <p className="text-gray-200">Customer Rating</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <p className="text-4xl font-bold text-white mb-1">24/7</p>
                <div className={`w-12 h-1 ${darkMode ? 'bg-emerald-400' : 'bg-blue-400'} mb-2`}></div>
                <p className="text-gray-200">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${
        darkMode 
          ? 'bg-gray-900 text-gray-200 border-t border-gray-800' 
          : 'bg-gray-100 text-gray-700 border-t border-gray-200'
      } mt-auto transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className={darkMode ? "text-emerald-400" : "text-blue-600"}>Auto</span>Finder
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Connecting car buyers with their dream vehicles since 2010. Your trusted platform for finding the perfect ride.
              </p>
              <div className="flex space-x-4">
                <a href="#" className={`${
                  darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-blue-600'
                } transition-colors`}>
                  <Facebook size={20} />
                </a>
                <a href="#" className={`${
                  darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-blue-600'
                } transition-colors`}>
                  <Twitter size={20} />
                </a>
                <a href="#" className={`${
                  darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-blue-600'
                } transition-colors`}>
                  <Instagram size={20} />
                </a>
                <a href="#" className={`${
                  darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-blue-600'
                } transition-colors`}>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Find a Car
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Sell Your Car
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Car Comparison
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Financing Options
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Car Reviews
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Safety Tips
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={18} className={`mr-2 mt-1 ${darkMode ? 'text-emerald-400' : 'text-blue-600'}`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    123 Automotive Drive<br />
                    Car City, CC 10001
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className={`mr-2 ${darkMode ? 'text-emerald-400' : 'text-blue-600'}`} />
                  <a href="tel:+1234567890" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    (123) 456-7890
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className={`mr-2 ${darkMode ? 'text-emerald-400' : 'text-blue-600'}`} />
                  <a href="mailto:info@autofinder.com" className={`${
                    darkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}>
                    info@autofinder.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className={`${
            darkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
          } rounded-lg p-6 mb-8`}>
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-4 md:mb-0 md:w-1/2">
                <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Stay Updated
                </h4>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Subscribe to our newsletter for the latest car deals and automotive news.
                </p>
              </div>
              <div className="md:w-1/2">
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className={`flex-grow px-4 py-2 rounded-l-lg ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-800 placeholder:text-gray-500'
                    } border focus:outline-none focus:ring-2 ${
                      darkMode ? 'focus:ring-emerald-500' : 'focus:ring-blue-500'
                    }`}
                  />
                  <button 
                    type="submit" 
                    className={`px-4 py-2 rounded-r-lg ${
                      darkMode 
                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white transition-colors`}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className={`text-center pt-6 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              © {new Date().getFullYear()} AutoFinder. All rights reserved.
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              <a href="#" className={`${
                darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'
              } transition-colors`}>Privacy Policy</a> • 
              <a href="#" className={`${
                darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'
              } transition-colors ml-2`}>Terms of Service</a> • 
              <a href="#" className={`${
                darkMode ? 'hover:text-emerald-400' : 'hover:text-blue-600'
              } transition-colors ml-2`}>Sitemap</a>
            </p>
          </div>
        </div>
      </footer>



    </div>

    
  );
}