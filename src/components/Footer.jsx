import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Linkedin, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-accent text-white p-2 rounded-xl">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                SkillMap <span className="text-blue-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              Empowering students, fresh graduates, and career changers to build personalized, actionable career roadmaps and bridge their skills gap with AI mentorship.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="mailto:fatimajaleel999@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-slate-400">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/fatimajaleel" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-slate-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/fatimajaleel999" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-slate-400">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors text-slate-400">Home</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors text-slate-400">Resources</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors text-slate-400">About SkillMap</Link>
              </li>
              <li>
                <Link to="/form" className="hover:text-white transition-colors text-slate-400">Create Roadmap</Link>
              </li>
            </ul>
          </div>

          {/* Developer Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Mentor Support</h3>
            <p className="text-sm text-slate-400 mb-2">
              Have feedback, questions, or ideas? Reach out to the developer Fatima.
            </p>
            <a 
              href="mailto:fatimajaleel999@gmail.com" 
              className="text-sm text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              fatimajaleel999@gmail.com
            </a>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} SkillMap AI. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> by Fatima | Career Mentor App v1.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
