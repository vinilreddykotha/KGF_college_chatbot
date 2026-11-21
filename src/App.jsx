import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCards from './components/CourseCards';
import FeeSection from './components/FeeSection';
import CampusFacilities from './components/CampusFacilities';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { MessageSquare, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [externalQuery, setExternalQuery] = useState(null);

  const handleSelectQuestion = (query) => {
    setExternalQuery(query);
  };

  const handleClearExternalQuery = () => {
    setExternalQuery(null);
  };

  const scrollToChatbot = () => {
    const el = document.getElementById('chatbot-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Navbar */}
      <Navbar 
        onOpenChat={scrollToChatbot} 
        onSelectQuestion={handleSelectQuestion} 
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero 
          onOpenChat={scrollToChatbot} 
          onSelectQuestion={handleSelectQuestion} 
        />

        {/* Academic Domains & Courses */}
        <CourseCards 
          onSelectQuestion={handleSelectQuestion} 
        />

        {/* B.Tech Fee Structure */}
        <FeeSection 
          onSelectQuestion={handleSelectQuestion} 
        />

        {/* Campus Facilities, Admissions & Scholarships */}
        <CampusFacilities 
          onSelectQuestion={handleSelectQuestion} 
        />

        {/* Dedicated Chatbot Section */}
        <Chatbot 
          externalQuery={externalQuery} 
          onClearExternalQuery={handleClearExternalQuery} 
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button (FAB) for Chatbot */}
      <div className="floating-fab-container">
        <button
          className="fab-chat pulse-glow"
          onClick={scrollToChatbot}
          title="Open College Enquiry Chatbot"
          aria-label="Enquiry Chatbot"
        >
          <Sparkles size={18} className="fab-sparkle" />
          <MessageSquare size={22} />
          <span className="fab-badge">AI Chat</span>
        </button>
      </div>
    </div>
  );
}
