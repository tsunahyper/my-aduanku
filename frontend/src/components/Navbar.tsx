import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setTimeout(() => window.location.reload(), 100);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${isAdmin ? 'bg-red-600' : 'bg-blue-600'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img 
              src={isAdmin ? '/images/admin.jpg' : '/images/user.jpg'} 
              className="h-8 w-8 rounded-full" 
              alt={`${isAdmin ? 'Admin' : 'User'} Logo`} 
            />
            <span className="text-white text-xl font-semibold">
              {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
            </span>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1"
            >
              <img 
                className="w-8 h-8 rounded-full border-2 border-white" 
                src={isAdmin ? '/images/admin.jpg' : '/images/user.jpg'} 
                alt="Profile" 
              />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {isAdmin ? 'Administrator' : 'User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isAdmin ? 'admin@example.com' : 'user@example.com'}
                  </p>
                </div>
                
                <div className="py-1">
                  <div 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </div>
                  <div 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div 
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;