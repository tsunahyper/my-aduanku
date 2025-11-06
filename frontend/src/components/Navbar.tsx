import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import aduankuImg from '../assets/aduanku.png'
import defaultPersonImg from '../assets/default-user-icon.png'
import { getCurrentUser } from '../api/users';

interface NavbarProps {
  isAdmin: boolean;
}

interface TabConfig {
  name: string;
  path: string;
  adminOnly?: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState<string>('Loading...');

  const basePath = isAdmin ? '/admin' : '/user';

  const tabs: TabConfig[] = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'User Management', path: '/user-management', adminOnly: true },
    { name: 'Issue Management', path: '/issue-management' },
    { name: 'Analytics & Statistics', path: '/analytics', adminOnly: true },
  ];

  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  const getActiveTab = () => {
    const path = location.pathname;
    return visibleTabs.find(tab => path.includes(tab.path))?.name || 'Dashboard';
  };

  const handleTabClick = (path: string) => {
    navigate(`${basePath}${path}`);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setTimeout(() => window.location.reload(), 100);
  };

  const getTabClassName = (isActive: boolean) => {
    return isActive
      ? 'bg-white text-black border rounded-xl p-2 cursor-pointer'
      : 'text-white hover:bg-white hover:text-black hover:border hover:rounded-xl p-2 cursor-pointer';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    getCurrentUser()
      .then(response => {
        const email = response.success && response.data?.user?.email;
        setUserEmail(email || 'N/A');
      })
      .catch(() => setUserEmail('N/A'));
  }, []);

  const activeTab = getActiveTab();
  const menuItems = [
    { label: 'Profile', onClick: () => setIsDropdownOpen(false) },
    { label: 'Settings', onClick: () => setIsDropdownOpen(false) },
  ];

  return (
    <div>
      <nav className={`${isAdmin ? 'bg-red-700' : 'bg-blue-700'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={aduankuImg} className="h-12 w-12" alt='aduanku-logo' />
              <span className="text-white text-xl font-semibold">
                {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
              </span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1"
              >
                <img
                  className="w-8 h-8 rounded-full border-2 border-white p-0.5"
                  src={defaultPersonImg}
                  alt="Profile"
                />
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {isAdmin ? 'Administrator' : 'User'}
                    </p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    {menuItems.map(item => (
                      <div
                        key={item.label}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={item.onClick}
                      >
                        {item.label}
                      </div>
                    ))}
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

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 ml-6 space-x-6 rtl:space-x-reverse text-sm">
              {visibleTabs.map(tab => (
                <li key={tab.name}>
                  <button
                    onClick={() => handleTabClick(tab.path)}
                    className={getTabClassName(activeTab === tab.name)}
                  >
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;