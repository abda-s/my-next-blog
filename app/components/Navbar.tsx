"use client"
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from '../types';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/all-posts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Salameh
          </Link>
          {/* Social Icons */}
          <Link
            href="https://github.com/abda-s"
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/in/abdullah-salameh/"
            target="_blank"
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </Link>
        </div>
        {/* Search Bar */}
        <form onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery(''); // Clear search input after navigating
          }
        }} className="relative hidden lg:flex ml-6 items-center">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 pr-10 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
        <div className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Mobile Menu and Search Icon */}
        <div className="flex items-center lg:hidden">
          {/* Mobile Search Icon - visible on mobile, opens full-screen search */}
          <button onClick={() => setIsMobileSearchOpen(true)} className="text-gray-300 hover:text-white transition-colors mr-4 focus:outline-none" aria-label="Open search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Hamburger Icon - visible on mobile, opens menu */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Sliding panel menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-xl z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4">
            {/* Removed Search Bar from Mobile Menu */}
            {/*
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery(''); // Clear search input after navigating
                setIsMenuOpen(false); // Close menu after search
              }
            }} className="mb-4">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="hidden">Submit</button> 
            </form>
            */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white text-lg block py-2 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Overlay */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-40 blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
      
      {/* Full-screen Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 z-[60] flex flex-col p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-end mb-4">
            <button onClick={() => setIsMobileSearchOpen(false)} className="text-gray-400 hover:text-white focus:outline-none" aria-label="Close search">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
              setSearchQuery('');
              setIsMobileSearchOpen(false); // Close search after navigating
            }
          }} className="flex items-center bg-gray-800 border border-gray-700 rounded-lg focus-within:border-blue-500 transition-colors pr-3">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-2 bg-transparent text-gray-300 focus:outline-none text-lg"
              autoFocus // Automatically focus input when opened
            />
            <button type="submit" className="p-1 text-gray-400 hover:text-white transition-colors" aria-label="Perform search">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </motion.div>
      )}
    </header>
  );
}