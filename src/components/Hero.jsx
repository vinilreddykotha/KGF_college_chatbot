import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Award, BookOpen, Layers, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export default function Hero({ onOpenChat, onSelectQuestion }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const sampleQuickQuestions = [
    "What engineering courses are available?",
    "How much is the CSE fee for students scoring above 85%?",
    "What medical courses are available?",
    "Is hostel included in the package?"
  ];

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        {/* Left Column: Heading, Subheading & CTAs */}
        <div className="hero-text-content">
          <div className="hero-badge-row">
            <span className="badge badge-primary">
              <Award size={14} />
              NAAC A++ Accredited University
            </span>
            <span className="badge badge-success">
              <CheckCircle2 size={14} />
              Admissions 2026–27 Open
            </span>
          </div>

          <h1 className="hero-heading">
            Discover Your Future at <span className="text-gradient">CARE KGF</span>
          </h1>

          <p className="hero-subheading">
            Your virtual college enquiry assistant. Ask us about courses, admissions, fees, campus facilities and more.
          </p>

          <div className="hero-domains-pill">
            <div className="domain-chip">
              <span className="domain-dot eng"></span>
              <strong>Engineering & Technology</strong> (B.Tech)
            </div>
            <div className="domain-divider">+</div>
            <div className="domain-chip">
              <span className="domain-dot med"></span>
              <strong>Medical & Allied Health Sciences</strong>
            </div>
          </div>

          {/* Prominent Chatbot Action Buttons */}
          <div className="hero-cta-group">
            <button
              className="btn btn-hero-chat pulse-glow"
              onClick={() => {
                scrollToSection('chatbot-section');
                if (onOpenChat) onOpenChat();
              }}
            >
              <Sparkles size={18} />
              <span>Launch Enquiry Chatbot</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-outline"
              onClick={() => scrollToSection('fees')}
            >
              <span>View B.Tech Fee Structure</span>
            </button>
          </div>

          {/* Quick interactive questions right on hero */}
          <div className="hero-sample-prompts">
            <span className="sample-label">Try asking the chatbot:</span>
            <div className="sample-chips">
              {sampleQuickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  className="sample-chip"
                  onClick={() => {
                    if (onSelectQuestion) onSelectQuestion(q);
                    scrollToSection('chatbot-section');
                  }}
                >
                  <MessageSquare size={13} />
                  <span>"{q}"</span>
                </button>
              ))}
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="hero-highlights-row">
            <div className="highlight-item">
              <CheckCircle2 size={16} className="text-success" />
              <span>B.Tech CSE, AI&ML, ECE & VLSI</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={16} className="text-success" />
              <span>Package Includes Hostel & HCL Training</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={16} className="text-success" />
              <span>Starting from ₹7.40 Lakhs (4 Years)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Campus Image & Visual Stats Card */}
        <div className="hero-visual-content">
          <div className="hero-card-frame">
            <div className="hero-image-wrapper">
              <img
                src="https://in4cdn.npfs.co/uploads/template/6869/2961/publish/images/cit_kgf.jpeg?1778243449"
                alt="CARE KGF Campus & CIT Building"
                className="hero-main-img"
                onError={(e) => {
                  // Fallback graceful banner if image network blocked
                  e.target.src = "https://in4cdn.npfs.co/uploads/template/6869/2961/publish/images/kolar_ban.jpg?1779431048";
                }}
              />
              <div className="hero-image-overlay">
                <span className="campus-tag">
                  <Building2 size={14} />
                  CARE KGF Campus – Kolar Gold Fields, Karnataka
                </span>
              </div>
            </div>

            {/* Floating Info Cards */}
            <div className="floating-stat-card stat-1">
              <div className="stat-icon-box blue">
                <Layers size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-title">Merit Fee Package</span>
                <span className="stat-value">₹7,40,000</span>
                <span className="stat-sub">For &gt;85% in +2 (4 Years)</span>
              </div>
            </div>

            <div className="floating-stat-card stat-2">
              <div className="stat-icon-box green">
                <ShieldCheck size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-title">Includes In Package</span>
                <span className="stat-value">Tuition + Hostel + HCL</span>
                <span className="stat-sub">Zero hidden training fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
