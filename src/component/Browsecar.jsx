import { useEffect, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// Mock API endpoint
const mockAPI = "https://mockapi.io/cars"; // Replace with actual API

export default function CarFinder() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seating, setSeating] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample data for dropdowns
  const carBrands = ["Toyota", "Honda", "BMW", "Mercedes", "Tesla", "Ford", "Hyundai", "Kia"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
  const seatingOptions = ["2", "4", "5", "6", "7+"];

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Apply filters whenever filter criteria change
  const applyFilters = useCallback(() => {
    if (!cars.length) return;
    
    let filtered = cars.filter(car => {
      return (
        (brand ? car.brand === brand : true) &&
        (fuelType ? car.fuel === fuelType : true) &&
        (seating ? car.seatingCapacity === parseInt(seating) : true) &&
        (car.price >= priceRange[0] && car.price <= priceRange[1]) &&
        (car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         car.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [cars, brand, fuelType, seating, priceRange, searchQuery]);
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      // For development, use mockData if API fails
      let data;
      try {
        const res = await fetch(mockAPI);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        data = await res.json();
      } catch (apiError) {
        console.warn('Using mock data due to API error:', apiError);
        // Mock data as fallback
        data = Array(20).fill(0).map((_, i) => ({
          id: i + 1,
          name: ["Civic", "Corolla", "Model 3", "Elantra", "Accord"][i % 5] + " " + ["SE", "LX", "Sport", "Limited", "EX"][i % 5],
          brand: ["Honda", "Toyota", "Tesla", "Hyundai", "BMW"][i % 5],
          fuel: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"][i % 5],
          seatingCapacity: [2, 4, 5, 6, 7][i % 5],
          price: 20000 + (i * 5000),
          image: `/api/placeholder/800/500?text=Car ${i+1}`,
          rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 star rating
          year: 2020 + (i % 5)
        }));
      }
      
      setCars(data);
      setFilteredCars(data);
    } catch (error) {
      console.error('Error in car data handling:', error);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (car) => {
    let updatedWishlist = wishlist.find(c => c.id === car.id)
      ? wishlist.filter(c => c.id !== car.id)
      : [...wishlist, car];

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setBrand("");
    setFuelType("");
    setSeating("");
    setPriceRange([0, 100000]);
  };

  // Pagination logic
  const carsPerPage = 6;
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const displayedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage, 
    currentPage * carsPerPage
  );

  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Generate stars for ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing cars for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchCars}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Premium Car Finder</h1>
              <p className="text-blue-100">Find your dream car today</p>
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden px-4 py-2 bg-white text-blue-600 rounded-md flex items-center gap-2 font-medium"
            >
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`md:w-64 bg-white p-5 rounded-xl shadow-md h-fit sticky top-4 transition-all duration-300 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-5">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Brands</option>
                  {carBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  {fuelTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Seating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity</label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any Capacity</option>
                  {seatingOptions.map((option) => (
                    <option key={option} value={option}>{option} Seats</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price: {formatPrice(priceRange[1])}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(100000)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            {/* Results summary */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {filteredCars.length} cars found
                </h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)} 
                    className="md:hidden flex items-center gap-1 text-blue-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filters
                  </button>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="featured"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Car grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCars.map(car => (
                  <div key={car.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <button
                        onClick={() => toggleWishlist(car)}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill={wishlist.find(c => c.id === car.id) ? "red" : "none"}
                          stroke={wishlist.find(c => c.id === car.id) ? "red" : "currentColor"} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                          {car.year}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                          <p className="text-sm text-gray-600">{car.brand}</p>
                        </div>
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {formatPrice(car.price)}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        {car.rating && <div className="mb-2">{renderStars(car.rating)}</div>}
                        
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
                              <circle cx="6.5" cy="16.5" r="2.5"></circle>
                              <circle cx="16.5" cy="16.5" r="2.5"></circle>
                            </svg>
                            {car.fuel}
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-700 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            {car.seatingCapacity} Seats
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-5 flex gap-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors">
                          View Details
                        </button>
                        <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-md font-medium transition-colors">
                          Test Drive
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No cars found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search filters to find more options.</p>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredCars.length > carsPerPage && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 border border-gray-300'}`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show current page, first page, last page, and pages close to current
                      return page === 1 || 
                             page === totalPages || 
                             Math.abs(page - currentPage) <= 1;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if pages are skipped
                      const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                      const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;
                      
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsisBefore && <span className="px-2 text-gray-500">...</span>}
                          
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === page 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-blue-600 hover:bg-blue-50 border border-gray-300'}`}
                          >
                            {page}
                          </button>
                          
                          {showEllipsisAfter && <span className="px-2 text-gray-500">...</span>}
                        </div>
                      );
                    })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50 border border-gray-300'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
}