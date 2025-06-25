import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Container from '../ui/Container';
import logo from '../../assets/logo.png';  

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Data Crunchers" 
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#217346]">Data Crunchers</span>
              <span className="text-sm text-gray-600">Excel Analytics</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#217346]">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#217346]">About</Link>
            <Link to="/login" className="text-gray-700 hover:text-[#217346]">Login</Link>
            <Link to="/signup" className="bg-[#217346] text-white px-6 py-2 rounded-lg hover:bg-[#1a5c38] transition-colors duration-200">
              Sign Up
            </Link>
          </div>

          <button 
            className="md:hidden text-[#217346]" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 bg-white border-t">
            <Link to="/" className="block px-4 text-gray-700 hover:text-[#217346]">Home</Link>
            <Link to="/about" className="block px-4 text-gray-700 hover:text-[#217346]">About</Link>
            <Link to="/login" className="block px-4 text-gray-700 hover:text-[#217346]">Login</Link>
            <Link to="/signup" className="block mx-4 bg-[#217346] text-white px-4 py-2 rounded-lg hover:bg-[#1a5c38] text-center transition-colors duration-200">
              Sign Up
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}