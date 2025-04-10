import { useState, useEffect } from 'react';
import { Heart, Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
  );
}