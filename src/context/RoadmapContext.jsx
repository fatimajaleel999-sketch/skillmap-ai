import React, { createContext, useState, useContext } from 'react';

const RoadmapContext = createContext();

export const useRoadmap = () => useContext(RoadmapContext);

// A list of realistic fallback roadmaps for different career paths
// to ensure the app is fully functional even if the Gemini API key is missing.
const fallbackRoadmaps = {
  "Software Engineer": {
    haveSkills: ["Python", "Basic HTML/CSS"],
    missingSkills: ["Data Structures & Algorithms", "System Design", "Databases (SQL/NoSQL)", "Git & CI/CD", "Testing (Jest/PyTest)"],
    roadmap: [
      { month: "Month 1", topics: ["Data Structures & Algorithms in Python", "Advanced Git & GitHub", "Object-Oriented Programming (OOP)"] },
      { month: "Month 2", topics: ["Relational Databases & SQL (PostgreSQL)", "RESTful API Development with Express/FastAPI", "Frontend Basics (React)"] },
      { month: "Month 3", topics: ["System Design Principles (Scalability, Caching)", "Testing, CI/CD pipelines, and AWS Deployment"] }
    ],
    projects: {
      beginner: "Command Line Todo list with JSON persistence in Python",
      intermediate: "Full Stack Blogging Platform using React and Node/Express",
      advanced: "Distributed Chat Application with WebSockets and Redis message caching"
    },
    resumeTips: [
      "Highlight data structure knowledge and personal projects on GitHub.",
      "List Git and API development as core technical competencies.",
      "Format work experience using the STAR method (Situation, Task, Action, Result).",
      "Include a clickable link to your portfolio website and GitHub."
    ],
    interviewTips: [
      "Practice Easy/Medium LeetCode questions focusing on arrays and strings.",
      "Review Big-O complexity and explain your thought process out loud.",
      "Prepare stories demonstrating collaboration and resolving technical conflicts.",
      "Understand the basics of REST, HTTP status codes, and database indexing."
    ]
  },
  "AI Engineer": {
    haveSkills: ["Python", "Linear Algebra basics"],
    missingSkills: ["Deep Learning (PyTorch/TensorFlow)", "LLM Fine-tuning", "Vector Databases", "LangChain/LlamaIndex", "Model Deployment (Docker/HuggingFace)"],
    roadmap: [
      { month: "Month 1", topics: ["Advanced Python and Data Manipulation (Pandas, NumPy)", "Introduction to Machine Learning (Scikit-Learn)", "Supervised vs Unsupervised Learning"] },
      { month: "Month 2", topics: ["Deep Learning Fundamentals (Neural Networks, PyTorch)", "Computer Vision (CNNs) & NLP (Transformers)", "Using Pre-trained Models"] },
      { month: "Month 3", topics: ["Generative AI & LLMs (Gemini, OpenAI APIs)", "Vector Databases (ChromaDB, Pinecone)", "Deploying AI Apps on HuggingFace Spaces"] }
    ],
    projects: {
      beginner: "Spam Email Classifier using Scikit-Learn",
      intermediate: "Semantic Document Search Engine using Vector Embeddings",
      advanced: "Fine-tuned LLM Chatbot with LangChain and Custom PDF Knowledge Retrieval (RAG)"
    },
    resumeTips: [
      "Highlight ML/DL frameworks (PyTorch, TensorFlow) and specific model architectures.",
      "Link to interactive HuggingFace Spaces or live demos of your AI models.",
      "Describe project metrics clearly (e.g., 'Improved model accuracy by 14%').",
      "List technical skills grouped by Data Science, Deep Learning, and AI Engineering tools."
    ],
    interviewTips: [
      "Prepare to explain the math behind backpropagation and gradient descent.",
      "Be ready to discuss transformer architecture, attention mechanisms, and fine-tuning strategies.",
      "Understand the trade-offs of using APIs (e.g., Gemini) versus hosting open-source models.",
      "Study system design for ML (e.g., data pipelines, model latency, batching)."
    ]
  }
};

const defaultFallback = {
  haveSkills: ["Self-learning mindset", "Basic computer literacy"],
  missingSkills: ["Core programming languages", "Version control (Git)", "Problem solving", "Frameworks and libraries", "Testing & deployment"],
  roadmap: [
    { month: "Month 1", topics: ["Learn syntax of core language (Python/JS)", "Understand Git & GitHub", "Build 3 simple command-line applications"] },
    { month: "Month 2", topics: ["Explore relevant framework (React/Express/Django)", "Learn database basics (SQL/MongoDB)", "Build a responsive web application"] },
    { month: "Month 3", topics: ["Learn about testing & deployment", "Clean up project code & push to GitHub", "Create a resume & optimize LinkedIn profile"] }
  ],
  projects: {
    beginner: "A CLI utility to organize local folders by file type",
    intermediate: "A personal portfolio site showcase utilizing modern frameworks",
    advanced: "A fully deployed SaaS application with user authentication and database storage"
  },
  resumeTips: [
    "Focus on building solid, completed personal projects to show self-motivation.",
    "Detail your technical stack clearly in a dedicated 'Skills' section.",
    "Add your GitHub link at the top and ensure your repos have clean READMEs.",
    "Highlight transferrable skills from other roles (e.g. project management, communication)."
  ],
  interviewTips: [
    "Practice coding simple algorithms and explaining them step-by-step.",
    "Understand how HTTP requests and web client-server architectures work.",
    "Use the STAR method for behavioral questions ('Tell me about a time you solved a hard bug...').",
    "Show enthusiasm and ask insightful questions about their engineering team."
  ]
};

export const RoadmapProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userName: '',
    personalInfo: '',
    profileLinks: '',
    careerGoal: 'Software Engineer',
    skillLevel: 'Beginner',
    currentSkills: '',
    studyTime: '2 Hours per Day',
    duration: '3 Months'
  });

  const [roadmapData, setRoadmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRoadmap = async (customInputs) => {
    setIsLoading(true);
    setError(null);
    const inputs = { ...formData, ...customInputs };
    setFormData(inputs);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error(`Server returned code ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setRoadmapData(data);
    } catch (err) {
      console.warn("Gemini API generation failed or was bypassed. Loading realistic offline roadmap.", err);
      // Determine the best fallback based on career goal
      const goal = inputs.careerGoal;
      let matchedData = fallbackRoadmaps[goal];
      
      if (!matchedData) {
        // Try substring match
        const foundKey = Object.keys(fallbackRoadmaps).find(k => 
          k.toLowerCase().includes(goal.toLowerCase()) || goal.toLowerCase().includes(k.toLowerCase())
        );
        matchedData = foundKey ? fallbackRoadmaps[foundKey] : defaultFallback;
      }
      
      // Customize the fallback according to duration if possible
      let adjustedRoadmap = [...matchedData.roadmap];
      const durationVal = inputs.duration;
      
      if (durationVal === "1 Month") {
        adjustedRoadmap = [{
          month: "Month 1 (Accelerated)",
          topics: [...matchedData.roadmap[0].topics, ...matchedData.roadmap[1].topics.slice(0, 1)]
        }];
      } else if (durationVal === "6 Months") {
        adjustedRoadmap = [
          { month: "Month 1-2", topics: matchedData.roadmap[0].topics },
          { month: "Month 3-4", topics: matchedData.roadmap[1].topics },
          { month: "Month 5-6", topics: matchedData.roadmap[2].topics }
        ];
      } else if (durationVal === "1 Year") {
        adjustedRoadmap = [
          { month: "Month 1-3", topics: matchedData.roadmap[0].topics },
          { month: "Month 4-6", topics: matchedData.roadmap[1].topics },
          { month: "Month 7-12", topics: matchedData.roadmap[2].topics }
        ];
      }

      // Add a customized header to make it feel personalized
      const personalizedData = {
        ...matchedData,
        haveSkills: inputs.currentSkills 
          ? inputs.currentSkills.split(',').map(s => s.trim()) 
          : matchedData.haveSkills,
        roadmap: adjustedRoadmap,
        isDemo: true // flag indicating it was locally resolved (useful for badge info)
      };

      // Artificially delay a tiny bit to make the loading transition feel natural
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRoadmapData(personalizedData);
    } finally {
      setIsLoading(false);
    }
  };

  const resetRoadmap = () => {
    setRoadmapData(null);
    setError(null);
  };

  return (
    <RoadmapContext.Provider value={{
      formData,
      setFormData,
      roadmapData,
      isLoading,
      error,
      generateRoadmap,
      resetRoadmap
    }}>
      {children}
    </RoadmapContext.Provider>
  );
};
