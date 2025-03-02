import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">ConnectBook</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition">Home</Link>
            <Link to="/mock-interview" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition">Mock Interviews</Link>
            <Link to="/internship-simulator" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition">Internship Simulator</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition">Dashboard</Link>
                <div className="relative ml-4 flex items-center">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md bg-white text-indigo-700 hover:bg-gray-100 transition flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="ml-4 px-4 py-2 rounded-md bg-white text-indigo-700 hover:bg-gray-100 transition flex items-center">
                <User className="h-4 w-4 mr-1" />
                Login
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/mock-interview" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Mock Interviews
            </Link>
            <Link 
              to="/internship-simulator" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Internship Simulator
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md hover:bg-indigo-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md bg-white text-indigo-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md bg-white text-indigo-700 hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;