import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Avatar = ({ name, onSignOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.avatar-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative avatar-container">
      <div 
        className="w-10 h-10 bg-[#00e5ff] text-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="font-medium text-lg">{name[0]}</span>
      </div>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a 
            href="/account" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            My Account
          </a>
          <button 
            onClick={onSignOut} 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("userName");

    if (token && storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 bg-black/80 text-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-white to-[#00e5ff] bg-clip-text text-transparent">
            WayVisor
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              <li>
                <a 
                  href="/contact" 
                  className="text-white/90 hover:text-[#00e5ff] font-medium text-sm transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-white/90 hover:text-[#00e5ff] font-medium text-sm transition-colors"
                >
                  About Us
                </a>
              </li>

              {/* Show only when user is not logged in */}
              {!userName && (
                <>
                  <li>
                    <a 
                      href="/signup" 
                      className="text-white/90 hover:text-[#00e5ff] font-medium text-sm transition-colors"
                    >
                      SignUp
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/signin" 
                      className="text-white/90 hover:text-[#00e5ff] font-medium text-sm transition-colors"
                    >
                      SignIn
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Right Side: Avatar or Mobile Menu */}
          <div className="flex items-center gap-4">
            {userName && <Avatar name={userName} onSignOut={handleSignOut} />}

            {/* Mobile menu button (optional - can add toggle later) */}
            <button className="md:hidden p-2 rounded-lg hover:bg-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
