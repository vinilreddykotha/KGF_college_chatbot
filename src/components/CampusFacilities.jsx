import React from 'react';
import { 
  Building, BookOpen, Monitor, Shield, Trophy, 
  Wifi, Utensils, Bus, CheckCircle2, Award, 
  ExternalLink, ArrowRight, UserCheck, FileCheck, CreditCard, Sparkles
} from 'lucide-react';

export default function CampusFacilities({ onSelectQuestion }) {
  const handleAsk = (q) => {
    if (onSelectQuestion) {
      onSelectQuestion(q);
      const chatSection = document.getElementById('chatbot-section');
      if (chatSection) chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      step: '01',
      title: 'Register Yourself',
      desc: 'Visit application.care.edu.in/kgf and submit your initial registration with basic contact information.',
      icon: <UserCheck size={24} className="text-primary" />
    },
    {
      step: '02',
      title: 'Verify Email',
      desc: 'Confirm your email address through the verification link or OTP delivered to your inbox.',
      icon: <FileCheck size={24} className="text-primary" />
    },
    {
      step: '03',
      title: 'Fill Application Online',
      desc: 'Enter your 10+2 / 12th marks, select your branch (CSE, AI&ML, ECE, Allied Health, Nursing, etc.), and provide personal details.',
      icon: <Building size={24} className="text-primary" />
    },
    {
      step: '04',
      title: 'Pay Application Fee',
      desc: 'Pay the application fee securely online and upload required marks certificates for counseling and seat allotment.',
      icon: <CreditCard size={24} className="text-primary" />
    }
  ];

  const facilities = [
    {
      icon: <Monitor size={26} className="text-blue" />,
      title: 'Advanced Computer & AI Labs',
      desc: 'High-speed computing systems equipped with machine learning GPUs, VLSI design software, and gigabit fiber-optic connectivity.'
    },
    {
      icon: <Shield size={26} className="text-emerald" />,
      title: 'Clinical & Nursing Simulation Labs',
      desc: 'Hospital-grade simulation suites for Nursing, Physiotherapy, and Allied Health Sciences with high-fidelity medical mannequins.'
    },
    {
      icon: <BookOpen size={26} className="text-purple" />,
      title: 'Digital & Physical Central Library',
      desc: 'Over 25,000 reference volumes, IEEE/Elsevier journals, e-book subscriptions, and quiet air-conditioned digital reading rooms.'
    },
    {
      icon: <Building size={26} className="text-amber" />,
      title: 'On-Campus Hostels & Mess',
      desc: 'Separate secure residences for boys and girls with 2/3/4 sharing, 24/7 security, purified drinking water, and wholesome dining.'
    },
    {
      icon: <Trophy size={26} className="text-rose" />,
      title: 'Sports & Recreational Arena',
      desc: 'Cricket and football grounds, basketball and volleyball courts, indoor badminton facilities, and modern gymnasium.'
    },
    {
      icon: <Bus size={26} className="text-indigo" />,
      title: 'Safe Campus Bus Fleet',
      desc: 'Dedicated college buses providing safe, reliable daily commuting across Kolar Gold Fields, Bangarapet, and surrounding sectors.'
    }
  ];

  return (
    <div className="facilities-and-admissions-wrapper">
      {/* ADMISSION STEPS SECTION */}
      <section className="admissions-section" id="admissions">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">How to Join CARE KGF</span>
            <h2 className="section-title">
              Simple 4-Step <span className="text-highlight">Admission Process</span>
            </h2>
            <p className="section-subtitle">
              Follow these straightforward steps to apply for B.Tech and Medical / Allied Health Sciences programs for 2026–27.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((st, i) => (
              <div key={i} className="step-card">
                <div className="step-card-top">
                  <span className="step-number">{st.step}</span>
                  <div className="step-icon-box">{st.icon}</div>
                </div>
                <h4 className="step-title">{st.title}</h4>
                <p className="step-desc">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="admissions-cta-banner">
            <div className="cta-banner-text">
              <h3>Ready to apply for CARE KGF Admissions 2026–27?</h3>
              <p>Admissions portal is open for Engineering (B.Tech) and Medical / Allied Health Sciences.</p>
            </div>
            <div className="cta-banner-buttons">
              <a
                href="https://application.care.edu.in/kgf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>Go to Official Portal</span>
                <ExternalLink size={16} />
              </a>
              <button
                className="btn btn-outline"
                onClick={() => handleAsk("How can I apply for admission?")}
              >
                <span>Ask Bot About Steps</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS FACILITIES SECTION */}
      <section className="facilities-section" id="facilities">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">Student Life & Infrastructure</span>
            <h2 className="section-title">
              World-Class <span className="text-highlight">Campus Facilities</span>
            </h2>
            <p className="section-subtitle">
              Experience an inspiring, supportive educational environment built to nurture your academic growth, research pursuits, and personal well-being.
            </p>
          </div>

          <div className="facilities-grid">
            {facilities.map((fac, i) => (
              <div key={i} className="facility-card">
                <div className="facility-icon-wrap">{fac.icon}</div>
                <h4 className="facility-title">{fac.title}</h4>
                <p className="facility-desc">{fac.desc}</p>
              </div>
            ))}
          </div>

          {/* Placement & Scholarships Banner */}
          <div className="perks-row-grid">
            <div className="perk-card scholarship-perk">
              <div className="perk-icon-circle">
                <Award size={26} color="#ffffff" />
              </div>
              <div className="perk-info">
                <h4>Merit Scholarships & Fee Waivers</h4>
                <p>
                  Built-in merit fee packages (e.g. ₹7.40L for &gt;85% in +2). Additionally, CARE awards institutional scholarships up to 100% for sports stars and economically deserving students.
                </p>
                <button
                  className="btn-perk-ask"
                  onClick={() => handleAsk("Tell me about scholarships")}
                >
                  Ask Bot about Scholarships →
                </button>
              </div>
            </div>

            <div className="perk-card placement-perk">
              <div className="perk-icon-circle blue">
                <Trophy size={26} color="#ffffff" />
              </div>
              <div className="perk-info">
                <h4>HCL Tech Partnership & Placements</h4>
                <p>
                  Specialized HCL training embedded directly in the B.Tech curriculum gives our graduates direct industry readiness, coding agility, and interview advantages with top MNCs.
                </p>
                <button
                  className="btn-perk-ask"
                  onClick={() => handleAsk("What are the placements like?")}
                >
                  Ask Bot about Placements →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
