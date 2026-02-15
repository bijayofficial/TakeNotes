import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // change for testing
  const [dropdownOpen, setDropdownOpen] = useState(false);



  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/60 dark:bg-gray-600/40 border-b border-black/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-linear-[25deg,red_80%,yellow_90%,lime_0%,teal] bg-clip-text text-transparent"
          >
            TakeNotes
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-800 dark:text-white font-medium relative">

            {/* Animated Nav Links */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/search">Search</NavLink>

            {/* Auth Conditional Rendering */}
            {!isAuthenticated ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:text-indigo-500 transition"
                >
                  <User size={20} />
                  Profile
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-40 bg-black dark:bg-gray-800 rounded-xl shadow-lg py-2 border dark:border-gray-700">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => setIsAuthenticated(false)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-6 space-y-4 text-gray-800 dark:text-white">
          <MobileLink to="/" setIsOpen={setIsOpen}>Home</MobileLink>
          <MobileLink to="/about" setIsOpen={setIsOpen}>About</MobileLink>
          <MobileLink to="/faq" setIsOpen={setIsOpen}>FAQ</MobileLink>
 <MobileLink to="/search" setIsOpen={setIsOpen}>Search</MobileLink>
          {!isAuthenticated ? (
            <>
              <MobileLink to="/login" setIsOpen={setIsOpen}>Login</MobileLink>
              <MobileLink to="/register" setIsOpen={setIsOpen}>Register</MobileLink>
            </>
          ) : (
            <>
              <MobileLink to="/profile" setIsOpen={setIsOpen}>Profile</MobileLink>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setIsOpen(false);
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          >
            Toggle Dark Mode
          </button>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative group transition duration-300"
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const MobileLink = ({ to, children, setIsOpen }) => (
  <Link
    to={to}
    onClick={() => setIsOpen(false)}
    className="block"
  >
    {children}
  </Link>
);

export default Navbar;
