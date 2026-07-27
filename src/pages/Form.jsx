import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoadmap } from '../context/RoadmapContext';
import { 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  User, 
  Terminal, 
  Clock, 
  Calendar,
  Briefcase,
  AlertCircle,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Form = () => {
  const { formData, setFormData, generateRoadmap, isLoading } = useRoadmap();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Array of processing status messages to show during loading
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
    "Analyzing career market demand...",
    "Comparing your existing skills with target requirements...",
    "Structuring monthly learning timeline...",
    "Generating industry-relevant portfolio project ideas...",
    "Formulating custom resume & interview advice...",
    "Polishing dashboard..."
  ];

  React.useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.userName.trim()) {
        setErrorMsg('Please enter your name.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    // Trigger Gemini roadmap generation
    await generateRoadmap();
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const careerGoals = [
    "Software Engineer",
    "AI Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Cybersecurity Analyst",
    "Mobile App Developer",
    "Frontend Developer",
    "Backend Developer",
    "Cloud Engineer"
  ];

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const studyTimes = ["1 Hour per Day", "2 Hours per Day", "3+ Hours per Day"];
  const durations = ["1 Month", "3 Months", "6 Months", "1 Year"];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-dark/95 z-50 flex flex-col items-center justify-center text-white px-4"
            >
              <div className="relative flex items-center justify-center mb-8">
                <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-blue-400 opacity-25"></div>
                <div className="relative rounded-2xl bg-blue-600 p-4">
                  <Brain className="h-10 w-10 text-white animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2">SkillMap AI Mentor is Thinking</h2>
              <p className="text-blue-300 text-sm h-6 text-center animate-pulse">
                {loadingMessages[loadingStep]}
              </p>
              
              <div className="w-48 bg-slate-800 rounded-full h-1.5 mt-8 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full animate-infinite-scroll w-1/3"></div>
              </div>
              
              <style>{`
                @keyframes scroll {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(300%); }
                }
                .animate-infinite-scroll {
                  animation: scroll 2s linear infinite;
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 text-navy-medium p-3 rounded-2xl inline-flex mb-3">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-dark">Tell Us Your Career Goals</h1>
          <p className="text-slate-500 text-sm mt-1">Answer a few questions so AI can analyze your gaps and construct your custom mentor map.</p>
        </div>

        {/* Step Progress Indicator */}
        <div className="flex justify-between items-center mb-8 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-initial">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
                  step === s 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-110'
                    : step > s 
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div 
                  className={`h-1 flex-1 mx-2 rounded-full transition-colors duration-300 ${
                    step > s ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2 mb-6 text-sm">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Basic Info & Career Goal */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="userName" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2">
                    <User className="h-4 w-4 text-blue-600" />
                    What is your name?
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="e.g. Fatima"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="careerGoal" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    Choose your dream career goal:
                  </label>
                  <select
                    id="careerGoal"
                    value={formData.careerGoal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800 bg-slate-50/50 appearance-none cursor-pointer"
                  >
                    {careerGoals.map((goal) => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-3">
                    <Terminal className="h-4 w-4 text-blue-600" />
                    What is your current skill level in this field?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {skillLevels.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleSelectOption('skillLevel', lvl)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          formData.skillLevel === lvl
                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm shadow-blue-500/5'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Existing Skills & Context */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="currentSkills" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2">
                    <Terminal className="h-4 w-4 text-blue-600" />
                    Enter your existing skills (comma separated):
                  </label>
                  <textarea
                    id="currentSkills"
                    value={formData.currentSkills}
                    onChange={handleChange}
                    placeholder="e.g. Python, HTML, CSS, JavaScript, Basic SQL"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800 bg-slate-50/50 resize-y text-sm"
                  />
                  <p className="text-xs text-slate-400 mt-1">Listing what you already know helps the mentor map out the gaps correctly.</p>
                </div>

                <div>
                  <label htmlFor="personalInfo" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2">
                    <User className="h-4 w-4 text-blue-600" />
                    Tell the mentor about yourself (optional):
                  </label>
                  <textarea
                    id="personalInfo"
                    value={formData.personalInfo}
                    onChange={handleChange}
                    placeholder="e.g. I am a fresh computer science graduate looking to pivot into AI Engineering."
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800 bg-slate-50/50 resize-y text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="profileLinks" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2">
                    <ClipboardList className="h-4 w-4 text-blue-600" />
                    Social / Profile Links (optional):
                  </label>
                  <textarea
                    id="profileLinks"
                    value={formData.profileLinks}
                    onChange={handleChange}
                    placeholder="LinkedIn: linkedin.com/in/yourname&#10;GitHub: github.com/yourusername"
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-slate-800 bg-slate-50/50 resize-y text-sm"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: Timeline & Schedule */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-3">
                    <Clock className="h-4 w-4 text-blue-600" />
                    How much time can you study daily?
                  </label>
                  <div className="space-y-2">
                    {studyTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleSelectOption('studyTime', time)}
                        className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold border transition-all text-left flex items-center justify-between ${
                          formData.studyTime === time
                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm shadow-blue-500/5'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {time}
                        <Clock className={`h-4 w-4 ${formData.studyTime === time ? 'text-blue-500' : 'text-slate-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    What is your target learning duration?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {durations.map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => handleSelectOption('duration', dur)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                          formData.duration === dur
                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Calendar className="h-4 w-4 mb-0.5" />
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bottom Button Actions */}
            <div className="flex gap-4 pt-4 border-t border-slate-100">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3.5 text-white font-bold rounded-2xl gradient-bg-accent hover:shadow-lg hover:shadow-blue-500/10 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 py-3.5 text-white font-black rounded-2xl gradient-bg-accent hover:shadow-lg hover:shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate My Roadmap
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Form;
