import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Map, 
  Gauge, 
  Search, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Compass, 
  TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const features = [
    {
      icon: Map,
      title: 'Personalized Roadmaps',
      description: 'Get an actionable, step-by-step monthly study plan structured exactly around your career goals.',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Search,
      title: 'Skill Gap Analysis',
      description: 'Input what you already know and let AI identify the exact technologies and concepts you are missing.',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: BookOpen,
      title: 'Curated Learning Resources',
      description: 'Skip the research. Instantly access the best tutorials, official documentation, and free learning platforms.',
      color: 'bg-violet-100 text-violet-700',
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Discover highly-rated free and paid certifications that will validate your skills and impress recruiters.',
      color: 'bg-amber-100 text-amber-700',
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Define Your Career Goal',
      description: 'Select your dream role and tell us about your current technical skill level and experience.'
    },
    {
      num: '02',
      title: 'Analyze Existing Skills',
      description: 'List the languages and frameworks you already know so the AI doesn\'t repeat basic content.'
    },
    {
      num: '03',
      title: 'Set Study Availability',
      description: 'Specify how many hours you can dedicate daily and the timeframe you want to achieve your goal in.'
    },
    {
      num: '04',
      title: 'Get AI Mentorship',
      description: 'Instantly generate an interactive, customized dashboard containing your roadmap, project ideas, and interview prep.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-16 overflow-hidden">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 -z-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-15"></div>
        
        {/* Hero Text */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            AI-Powered Career Advising
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Navigate Your Career with <span className="gradient-text">SkillMap AI</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
            Stop guessing what to learn next. Get a personalized study roadmap, analyze your skill gaps, and receive expert interview & resume advice tailored to your dream tech job.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              to="/form"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-white gradient-bg-accent hover:shadow-xl hover:shadow-blue-500/25 active:scale-95 transition-all gap-2"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Learn More
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-500 pt-4">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free to use</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant generation</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Vercel & Gemini Powered</span>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="flex-1 w-full max-w-md mx-auto relative flex justify-center items-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-80 h-80 rounded-3xl gradient-bg p-8 text-white relative shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/20 rounded-full filter blur-xl"></div>
            
            <div className="flex justify-between items-start">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                <Compass className="h-8 w-8 text-blue-200" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest bg-blue-500/30 px-3 py-1 rounded-full border border-blue-400/20">Career Mentor</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-300">SYSTEM STATUS: ACTIVE</span>
              <h3 className="text-2xl font-extrabold">SkillMap AI</h3>
              <p className="text-xs text-slate-300">Your custom learning roadmap awaits. Powered by Gemini Pro.</p>
            </div>

            {/* Micro badges floating around */}
            <div className="absolute -left-4 top-1/3 bg-white text-slate-800 p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 text-xs font-bold">
              <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div>
              Skill Gap Checked
            </div>
            <div className="absolute -right-4 bottom-1/4 bg-white text-slate-800 p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 text-xs font-bold">
              <div className="bg-amber-100 p-1.5 rounded-lg text-amber-600"><TrendingUp className="h-4 w-4" /></div>
              3 Project Ideas
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Complete AI Mentorship Toolkit
            </h2>
            <p className="text-slate-500">
              Get all the guidance you would normally receive from a senior engineer, compiled instantly into a beautiful, personalized, and interactive dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i} 
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-xl inline-block mb-4 transition-transform group-hover:scale-110 ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            How SkillMap Works
          </h2>
          <p className="text-slate-500">
            Generate your personalized roadmap in less than 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-4xl font-black text-blue-100 absolute right-4 top-4 select-none">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2 pr-12">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS BAND ===== */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-blue-400 mb-2">500+</span>
            <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">Career Paths Analyzed</span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-blue-400 mb-2">1,000+</span>
            <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">Curated Resources</span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-blue-400 mb-2">100%</span>
            <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">AI Powered</span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl font-black text-blue-400 mb-2">24/7</span>
            <span className="text-sm text-slate-300 font-semibold uppercase tracking-wider">Instant Access</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
