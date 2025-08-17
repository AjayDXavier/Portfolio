// components/Navbar.js

"use client";
import { useState } from "react"; // 1. Import useState

export default function Navbar() {
  // 2. Add state to track if the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          <a href="#" className="font-bold">Ajay</a>

          {/* 3. Desktop Menu (hidden on mobile) */}
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>

          {/* 4. Mobile Menu Button (visible on mobile) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                // Close Icon (X)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden pb-4 px-4 flex flex-col gap-4 text-sm">
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Contact</a>
        </div>
      )}
    </nav>
  );
}