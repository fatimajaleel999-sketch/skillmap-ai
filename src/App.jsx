import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoadmapProvider } from './context/RoadmapContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Form from './pages/Form';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import About from './pages/About';

function App() {
  return (
    <RoadmapProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/form" element={<Form />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </RoadmapProvider>
  );
}

export default App;
