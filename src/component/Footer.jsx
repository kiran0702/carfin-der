import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ darkMode }) {
  return (
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
  );
}