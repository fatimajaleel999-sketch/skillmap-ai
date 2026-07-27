import React from 'react';
import { 
  Info, 
  Target, 
  Terminal, 
  User, 
  Sparkles, 
  TrendingUp, 
  ChevronRight, 
  Layers, 
  GitBranch, 
  Server, 
  BrainCircuit, 
  Code2 
} from 'lucide-react';

const About = () => {
  const technologies = [
    { name: 'React 18', category: 'Frontend Library', icon: Code2, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { name: 'Tailwind CSS v4', category: 'Modern Utility Styling', icon: Layers, color: 'text-teal-500 bg-teal-50 border-teal-200' },
    { name: 'React Router v6', category: 'Client Routing', icon: GitBranch, color: 'text-rose-500 bg-rose-50 border-rose-200' },
    { name: 'Google Gemini API', category: 'AI LLM Backend Integration', icon: BrainCircuit, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { name: 'Vercel Serverless', category: 'Hosting & Serverless Functions', icon: Server, color: 'text-slate-800 bg-slate-100 border-slate-300' }
  ];

  const futures = [
    "Interactive learning progress graphs with local storage history.",
    "Real-time bookmarking and documentation parsing of external tutorials.",
    "Mock coding tests and technical interview simulators driven by Gemini.",
    "Community resource sharing where users vote on the best playlists."
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="bg-blue-100 text-navy-medium p-3 rounded-2xl inline-flex mb-1">
            <Info className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-dark tracking-tight sm:text-4xl">
            About SkillMap AI
          </h1>
          <p className="text-slate-500 text-sm">
            Empowering self-learners with automated curriculum engineering.
          </p>
        </div>

        {/* Introduction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl inline-block">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-navy-dark">The Problem It Solves</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Many students, fresh graduates, and career changers are overwhelmed by the sheer volume of coding resources. They don't know what to study first, which skills they are missing, what portfolio builds carry weight with recruiters, or how to write resume bullets. Finding high-quality roadmap pathways takes days of researching scattered documentation and video courses.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl inline-block">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-navy-dark">Our Solution</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              SkillMap AI bridges this gap by acting as an on-demand career mentor. Users enter their target career, existing knowledge level, and timeline. SkillMap calls the Gemini API to formulate a custom monthly study curriculum, check off skill deficiencies, propose beginner-to-advanced portfolio ideas, and output actionable resume and technical interview tips.
            </p>
          </div>
        </div>

        {/* Technologies List */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-navy-dark">Technologies Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                  <div className={`p-2 rounded-xl border flex-shrink-0 ${tech.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-navy-dark">{tech.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{tech.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Developer Info & Version */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-navy-medium text-white w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-2xl select-none">
              F
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-dark">Developer Profile</h2>
              <p className="text-sm text-slate-500 font-medium">Fatima Jaleel</p>
              <div className="flex gap-3 text-xs text-slate-400 mt-1 font-bold">
                <span>Version: 1.0.0</span>
                <span>•</span>
                <span>Branch: main</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <a 
              href="https://github.com/fatimajaleel999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              GitHub Portfolio
            </a>
            <a 
              href="mailto:fatimajaleel999@gmail.com" 
              className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              Email Contact
            </a>
          </div>
        </div>

        {/* Future Features */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy-dark flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Future Roadmap Extensions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futures.map((fut, idx) => (
              <div key={idx} className="flex gap-2.5 items-start text-sm text-slate-600">
                <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="font-semibold leading-relaxed">{fut}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
