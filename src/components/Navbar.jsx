import React, { useState } from 'react';
import { MessageSquare, Phone, GraduationCap, Menu, X, ExternalLink, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenChat, onSelectQuestion }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Top announcement bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="top-badge">Admissions 2026–27 Open</span>
            <span className="top-info">B.Tech & Medical Allied Health Sciences | Kolar Gold Fields Campus</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:+919710401000" className="top-contact">
              <Phone size={13} />
              <span>+91 971 040 1000</span>
            </a>
            <span className="separator">|</span>
            <a href="mailto:kolarenquiry@care.edu.in" className="top-contact">
              <span>kolarenquiry@care.edu.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="container nav-content">
          {/* Logo & College branding */}
          <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="brand-logo-circle">
              <GraduationCap size={26} color="#ffffff" />
            </div>
            <div className="brand-details">
              <div className="brand-title">
                <span className="brand-name-care">CARE</span>
                <span className="brand-campus-pill">KGF CAMPUS</span>
              </div>
              <span className="brand-subtitle">Chettinad Academy of Research and Education</span>
              <span className="brand-accredit">NAAC A++ Deemed-to-be University</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
            </li>
            <li>
              <a href="#academics" onClick={(e) => { e.preventDefault(); scrollToSection('academics'); }}>Academics</a>
            </li>
            <li>
              <a href="#fees" onClick={(e) => { e.preventDefault(); scrollToSection('fees'); }}>Fee Structure</a>
            </li>
            <li>
              <a href="#admissions" onClick={(e) => { e.preventDefault(); scrollToSection('admissions'); }}>Admissions</a>
            </li>
            <li>
              <a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection('facilities'); }}>Facilities</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            </li>
          </ul>

          {/* Action CTAs */}
          <div className="nav-actions">
            <button
              className="btn-chat-nav pulse-glow"
              onClick={() => {
                scrollToSection('chatbot-section');
                if (onOpenChat) onOpenChat();
              }}
              title="Chat with AI College Assistant"
            >
              <Sparkles size={16} />
              <span>Enquiry Chatbot</span>
            </button>
            <a
              href="https://application.care.edu.in/kgf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apply-nav"
            >
              <span>Apply Online</span>
              <ExternalLink size={14} />
            </a>
            <button
              className="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="container mobile-menu-links">
              <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>Home</a>
              <a href="#academics" onClick={(e) => { e.preventDefault(); scrollToSection('academics'); }}>Academics (B.Tech & Medical)</a>
              <a href="#fees" onClick={(e) => { e.preventDefault(); scrollToSection('fees'); }}>B.Tech Fee Structure (2026-27)</a>
              <a href="#admissions" onClick={(e) => { e.preventDefault(); scrollToSection('admissions'); }}>Admission Steps</a>
              <a href="#facilities" onClick={(e) => { e.preventDefault(); scrollToSection('facilities'); }}>Campus & Hostels</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Info</a>
              <div className="mobile-menu-actions">
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => {
                    scrollToSection('chatbot-section');
                    setMobileMenuOpen(false);
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Open Enquiry Chatbot</span>
                </button>
                <a
                  href="https://application.care.edu.in/kgf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  <span>Apply at application.care.edu.in</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
