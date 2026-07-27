import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoadmap } from '../context/RoadmapContext';
import { 
  ArrowLeft, 
  MapPin, 
  FileText, 
  HelpCircle, 
  Wrench, 
  Briefcase, 
  Clock, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Code,
  BookOpen,
  Info,
  TrendingUp,
  FileCheck2,
  HelpCircle as QuestionIcon
} from 'lucide-react';

const Dashboard = () => {
  const { roadmapData, formData, resetRoadmap } = useRoadmap();
  const navigate = useNavigate();
  const [checkedTopics, setCheckedTopics] = useState({});

  // If no roadmap has been generated yet, redirect back to form
  React.useEffect(() => {
    if (!roadmapData) {
      navigate('/form');
    }
  }, [roadmapData, navigate]);

  if (!roadmapData) {
    return null;
  }

  const handleToggleTopic = (monthIndex, topicIndex) => {
    const key = `${monthIndex}-${topicIndex}`;
    setCheckedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateProgress = () => {
    let total = 0;
    let checkedCount = 0;
    
    roadmapData.roadmap.forEach((m, mIdx) => {
      m.topics.forEach((t, tIdx) => {
        total++;
        if (checkedTopics[`${mIdx}-${tIdx}`]) {
          checkedCount++;
        }
      });
    });

    if (total === 0) return 0;
    return Math.round((checkedCount / total) * 100);
  };

  const handleBackToForm = () => {
    resetRoadmap();
    navigate('/form');
  };

  const progress = calculateProgress();

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                AI Career Plan
              </span>
              {roadmapData.isDemo && (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Local Template Mode
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-navy-dark tracking-tight">
              {formData.userName ? `${formData.userName}'s` : 'Your'} Career Roadmap
            </h1>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5 flex-wrap">
              <span>Goal: <strong className="text-navy-dark">{formData.careerGoal}</strong></span>
              <span className="text-slate-300">|</span>
              <span>Level: <strong className="text-navy-dark">{formData.skillLevel}</strong></span>
              <span className="text-slate-300">|</span>
              <span>Target: <strong className="text-navy-dark">{formData.duration} ({formData.studyTime})</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleBackToForm}
              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Edit Answers
            </button>
          </div>
        </div>

        {/* Demo warning box */}
        {roadmapData.isDemo && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-6 py-4 rounded-3xl flex flex-col md:flex-row items-start md:items-center gap-4 text-sm shadow-sm">
            <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">No Gemini API Key found in env configuration.</p>
              <p className="text-amber-700 text-xs mt-0.5">
                The application falls back to structured realistic curricula models when your Gemini key is missing. Add your <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">GEMINI_API_KEY</code> key inside a root <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">.env</code> file to run real AI generation requests.
              </p>
            </div>
          </div>
        )}

        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
                <h3 className="text-3xl font-black text-navy-dark mt-1">{progress}%</h3>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Missing Skills Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Missing Skills Identified</span>
                <h3 className="text-3xl font-black text-navy-dark mt-1">{roadmapData.missingSkills.length}</h3>
              </div>
              <div className="bg-red-50 text-red-600 p-3 rounded-2xl">
                <Wrench className="h-6 w-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-semibold">Your study plan targets these skill gaps.</p>
          </div>

          {/* Study Target Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Study Target</span>
                <h3 className="text-xl font-extrabold text-navy-dark mt-2">{formData.studyTime}</h3>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-semibold">Target timeline: {formData.duration}</p>
          </div>
        </div>

        {/* Dashboard Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main timeline column (Left - spans 2 columns on large screen) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Timeline Learning Roadmap */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-navy-dark flex items-center gap-2 mb-6">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Personalized Learning Roadmap
              </h2>
              
              <div className="relative timeline-line pl-8 space-y-8">
                {roadmapData.roadmap.map((m, mIdx) => (
                  <div key={mIdx} className="relative">
                    
                    {/* Month circle index */}
                    <div className="absolute -left-12 top-0.5 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ring-4 ring-blue-100">
                      {mIdx + 1}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-navy-dark flex items-center gap-1.5">
                        {m.month}
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {m.topics.map((t, tIdx) => {
                          const isChecked = checkedTopics[`${mIdx}-${tIdx}`];
                          return (
                            <div 
                              key={tIdx} 
                              onClick={() => handleToggleTopic(mIdx, tIdx)}
                              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                                isChecked 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm shadow-emerald-50/5'
                                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className={`mt-0.5 rounded-md p-0.5 transition-colors ${isChecked ? 'bg-emerald-500 text-white' : 'border border-slate-300 text-transparent'}`}>
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <span className={`text-sm font-semibold leading-relaxed ${isChecked ? 'line-through opacity-60' : ''}`}>
                                {t}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Portfolio Projects */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-navy-dark flex items-center gap-2 mb-6">
                <Code className="h-6 w-6 text-blue-600" />
                Recommended Portfolio Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(roadmapData.projects).map(([level, desc], idx) => {
                  const colors = {
                    beginner: { badge: 'bg-sky-50 text-sky-800 border-sky-200', border: 'border-sky-100' },
                    intermediate: { badge: 'bg-indigo-50 text-indigo-800 border-indigo-200', border: 'border-indigo-100' },
                    advanced: { badge: 'bg-violet-50 text-violet-800 border-violet-200', border: 'border-violet-100' }
                  }[level] || { badge: 'bg-slate-50 text-slate-800', border: 'border-slate-100' };

                  return (
                    <div key={level} className={`bg-slate-50/50 rounded-2xl p-5 border flex flex-col justify-between ${colors.border}`}>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize border mb-3 ${colors.badge}`}>
                          {level}
                        </span>
                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 font-bold tracking-wider mt-4 uppercase">Project Suggestion</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right sidebar details column */}
          <div className="space-y-8">
            
            {/* Skill Gap Analysis */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-dark flex items-center gap-2 mb-4">
                <Wrench className="h-5 w-5 text-blue-600" />
                Skill Gap Analysis
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Existing Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {roadmapData.haveSkills.length > 0 ? (
                      roadmapData.haveSkills.map((s, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold">
                          ✔ {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">None specified</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Missing Skills to Learn</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {roadmapData.missingSkills.map((s, idx) => (
                      <span key={idx} className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-xs font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Tips */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-dark flex items-center gap-2 mb-4">
                <FileCheck2 className="h-5 w-5 text-blue-600" />
                Resume Improvement Tips
              </h2>
              
              <ul className="space-y-3">
                {roadmapData.resumeTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2.5 text-sm text-slate-600">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span className="font-semibold leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interview Prep Tips */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-dark flex items-center gap-2 mb-4">
                <QuestionIcon className="h-5 w-5 text-blue-600" />
                Interview Preparation Tips
              </h2>
              
              <ul className="space-y-3">
                {roadmapData.interviewTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2.5 text-sm text-slate-600">
                    <span className="text-indigo-500 font-bold mt-0.5">•</span>
                    <span className="font-semibold leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
