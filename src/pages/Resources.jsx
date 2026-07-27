import React, { useState } from 'react';
import { 
  BookOpen, 
  Youtube, 
  FileText, 
  Award, 
  ExternalLink,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const resourceCategories = ['All', 'YouTube Channels', 'Official Documentation', 'Free Platforms', 'Free Certifications', 'Paid Certifications'];

  const resources = [
    // YouTube
    {
      name: 'freeCodeCamp.org',
      category: 'YouTube Channels',
      url: 'https://www.youtube.com/@freecodecamp',
      description: 'Comprehensive, multi-hour video courses on full stack development, machine learning, Python, Git, and cybersecurity. 100% free.',
      tags: ['Coding', 'AI', 'Web Dev', 'Cyber']
    },
    {
      name: 'Programming with Mosh',
      category: 'YouTube Channels',
      url: 'https://www.youtube.com/@programmingwithmosh',
      description: 'Clear, beginner-friendly crash courses on Java, Python, React, SQL, C++, and software design principles.',
      tags: ['Beginner', 'React', 'Python']
    },
    {
      name: 'CodeWithHarry',
      category: 'YouTube Channels',
      url: 'https://www.youtube.com/@CodeWithHarry',
      description: 'Step-by-step programming and web development tutorials in Hindi/English, covering HTML, CSS, JS, Python, and Django.',
      tags: ['Web Dev', 'Django', 'Hindi']
    },
    {
      name: 'Krish Naik',
      category: 'YouTube Channels',
      url: 'https://www.youtube.com/@krishnaik06',
      description: 'Detailed playlists on machine learning, deep learning, NLP, generative AI, model deployment, and data science interview preparation.',
      tags: ['AI', 'ML', 'Data Science']
    },
    // Documentation
    {
      name: 'MDN Web Docs',
      category: 'Official Documentation',
      url: 'https://developer.mozilla.org',
      description: 'The definitive reference guide for HTML, CSS, JavaScript, Web APIs, and browser compatibilities.',
      tags: ['Web Dev', 'Reference']
    },
    {
      name: 'React Documentation',
      category: 'Official Documentation',
      url: 'https://react.dev',
      description: 'Official React docs with interactive code blocks, diagrams, and recommendations for modern hooks and frameworks.',
      tags: ['React', 'Frontend']
    },
    {
      name: 'Python Official Docs',
      category: 'Official Documentation',
      url: 'https://docs.python.org',
      description: 'Complete guides and tutorials on the standard Python library, syntax structures, modules, and C-bindings.',
      tags: ['Python', 'Core']
    },
    {
      name: 'TensorFlow Documentation',
      category: 'Official Documentation',
      url: 'https://www.tensorflow.org/guide',
      description: 'Complete documentation for building, training, and deploying neural networks on servers and edge devices.',
      tags: ['AI', 'TensorFlow', 'ML']
    },
    // Free Platforms
    {
      name: 'Harvard CS50',
      category: 'Free Platforms',
      url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
      description: 'Harvards flagship introduction to computer science, focusing on algorithmic thinking, memory management, C, Python, and SQL.',
      tags: ['CS Core', 'Algorithms']
    },
    {
      name: 'Kaggle Learn',
      category: 'Free Platforms',
      url: 'https://www.kaggle.com/learn',
      description: 'Interactive, code-first micro-tutorials on pandas, machine learning, deep learning, feature engineering, and SQL.',
      tags: ['Data Science', 'Python', 'ML']
    },
    {
      name: 'freeCodeCamp Curriculum',
      category: 'Free Platforms',
      url: 'https://www.freecodecamp.org/learn',
      description: 'Interactive web-based coding portal offering interactive lessons on responsive design, algorithms, libraries, and relational databases.',
      tags: ['Full Stack', 'Interactive']
    },
    // Free Certifications
    {
      name: 'freeCodeCamp Certifications',
      category: 'Free Certifications',
      url: 'https://www.freecodecamp.org/learn',
      description: 'Earn verified, shareable certifications in Responsive Web Design, Front End Libraries, Relational Databases, and Machine Learning by completing 5 required projects per track.',
      tags: ['Web Dev', 'Python', 'Cert']
    },
    {
      name: 'Kaggle Course Badges',
      category: 'Free Certifications',
      url: 'https://www.kaggle.com/learn',
      description: 'Earn official completion badges for short, intensive AI/Data Science tracks that can be linked to your resume or LinkedIn.',
      tags: ['AI', 'Data Science']
    },
    {
      name: 'Cisco Networking Academy',
      category: 'Free Certifications',
      url: 'https://www.netacad.com',
      description: 'Free self-paced courses on Python fundamentals, Linux basics, cybersecurity pathways, and networking principles.',
      tags: ['Cyber', 'Networking', 'Cert']
    },
    // Paid Certifications
    {
      name: 'Google AI Essentials (Coursera)',
      category: 'Paid Certifications',
      url: 'https://www.coursera.org/professional-certificates/google-ai-essentials',
      description: 'Google-curated introduction to using generative AI tools, writing effective prompts, and assessing AI limitations at work.',
      tags: ['GenAI', 'Google', 'SaaS']
    },
    {
      name: 'Microsoft Azure AI Fundamentals (AI-900)',
      category: 'Paid Certifications',
      url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals',
      description: 'Validates foundational knowledge of machine learning, computer vision, and NLP workloads on Microsoft Azure Cloud.',
      tags: ['Cloud', 'Azure', 'AI']
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      category: 'Paid Certifications',
      url: 'https://aws.amazon.com/certification/certified-cloud-practitioner',
      description: 'Industry-standard certification that validates a complete overview of AWS cloud services, security, architecture, and pricing.',
      tags: ['Cloud', 'AWS', 'Infrastructure']
    },
    {
      name: 'IBM AI Developer Professional Certificate',
      category: 'Paid Certifications',
      url: 'https://www.coursera.org/professional-certificates/ibm-ai-developer',
      description: 'Multi-course sequence on Coursera mapping AI concepts, building chatbots, creating computer vision apps, and using model pipelines.',
      tags: ['AI', 'IBM', 'Deep Learning']
    }
  ];

  const getIcon = (category) => {
    switch (category) {
      case 'YouTube Channels': return <Youtube className="h-5 w-5 text-rose-500" />;
      case 'Official Documentation': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'Free Platforms': return <BookOpen className="h-5 w-5 text-emerald-500" />;
      case 'Free Certifications': return <Award className="h-5 w-5 text-emerald-600" />;
      case 'Paid Certifications': return <Award className="h-5 w-5 text-amber-600" />;
      default: return <BookOpen className="h-5 w-5 text-slate-500" />;
    }
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeTab === 'All' || res.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="bg-blue-100 text-navy-medium p-3 rounded-2xl inline-flex mb-1">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-dark tracking-tight sm:text-4xl">
            Curated Learning Resources
          </h1>
          <p className="text-slate-500 text-sm">
            Top-rated tutorials, books, certifications, and documentation organized to accelerate your study roadmap.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="h-5 w-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search resource or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-800 bg-slate-50/50"
            />
          </div>

          {/* Categories select (mobile) / tabs (desktop) */}
          <div className="w-full md:w-auto flex flex-wrap gap-2 justify-center">
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  activeTab === cat 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 group-hover:scale-105 transition-transform">
                        {getIcon(res.category)}
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {res.category}
                      </span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-navy-dark tracking-tight group-hover:text-blue-600 transition-colors">
                    {res.name}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-100">
                  {res.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <Sparkles className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No resources found</h3>
            <p className="text-slate-400 text-sm mt-1">Try resetting your filter or search query.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Resources;
