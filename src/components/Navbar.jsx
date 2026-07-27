import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Compass, BookOpen, Info, Award } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-navy-medium text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-navy-dark">
                SkillMap <span className="text-blue-accent">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive(link.path)
                      ? 'text-navy-medium bg-blue-light'
                      : 'text-slate-600 hover:text-navy-medium hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/form"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-xl text-white gradient-bg-accent hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all"
            >
              Start Mentorship
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-navy-medium focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-navy-medium bg-blue-light'
                      : 'text-slate-600 hover:text-navy-medium hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2 px-3">
              <Link
                to="/form"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl text-white gradient-bg-accent shadow-md hover:bg-blue-700"
              >
                Start Mentorship
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
