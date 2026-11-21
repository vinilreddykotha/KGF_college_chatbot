import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" id="contact">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Accreditation */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-logo-circle">
                <GraduationCap size={24} color="#ffffff" />
              </div>
              <div>
                <h3 className="footer-title">CARE KGF Campus</h3>
                <span className="footer-subtitle">Chettinad Academy of Research and Education</span>
              </div>
            </div>
            <p className="footer-desc">
              Deemed-to-be University established under Section 3 of the UGC Act 1956. Accredited with <strong>NAAC A++</strong> grade and approved by statutory bodies including AICTE, MCI/NMC, INC, and PCI.
            </p>
            <div className="footer-accredit-pill">
              <ShieldCheck size={16} className="text-success" />
              <span>NAAC A++ Accredited • Approvals: AICTE & MCI</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home Overview</a></li>
              <li><a href="#academics" onClick={(e) => { e.preventDefault(); scrollTo('academics'); }}>B.Tech Engineering Courses</a></li>
              <li><a href="#academics" onClick={(e) => { e.preventDefault(); scrollTo('academics'); }}>Medical & Allied Health</a></li>
              <li><a href="#fees" onClick={(e) => { e.preventDefault(); scrollTo('fees'); }}>2026–27 Fee Structure</a></li>
              <li><a href="#admissions" onClick={(e) => { e.preventDefault(); scrollTo('admissions'); }}>Online Admission Steps</a></li>
              <li><a href="#facilities" onClick={(e) => { e.preventDefault(); scrollTo('facilities'); }}>Hostels & Campus Facilities</a></li>
              <li><a href="#chatbot-section" onClick={(e) => { e.preventDefault(); scrollTo('chatbot-section'); }}>College Enquiry Chatbot</a></li>
            </ul>
          </div>

          {/* Column 3: Academic Domains */}
          <div className="footer-col">
            <h4 className="footer-col-title">Academic Programs</h4>
            <div className="footer-programs-list">
              <div className="footer-program-group">
                <strong className="group-heading">Engineering & Technology (CIT):</strong>
                <span>• B.Tech Computer Science & Engineering</span>
                <span>• B.Tech CSE (AI & ML)</span>
                <span>• B.Tech Electronics & Comm. (ECE)</span>
                <span>• B.Tech ECE (VLSI Design & Tech)</span>
              </div>
              <div className="footer-program-group">
                <strong className="group-heading">Medical & Health Sciences:</strong>
                <span>• B.Sc Allied Health Sciences (6 specialities)</span>
                <span>• Bachelor of Physiotherapy (BPT)</span>
                <span>• Bachelor of Occupational Therapy (BOT)</span>
                <span>• Bachelor of Pharmacy (B.Pharm)</span>
                <span>• B.Sc Nursing</span>
              </div>
            </div>
          </div>

          {/* Column 4: Official Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Campus Contact</h4>
            <div className="footer-contact-items">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon text-accent" />
                <span>
                  <strong>Kolar Campus:</strong><br />
                  36, DK Halli Road, BEML Nagar,<br />
                  Kolar Gold Fields (KGF), Karnataka – 563 115
                </span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon text-accent" />
                <div>
                  <a href="tel:+919710401000" className="contact-link">+91 971 040 1000</a>
                  <span className="contact-note">Admissions Desk (Mon–Sat, 9AM–5:30PM)</span>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon text-accent" />
                <a href="mailto:kolarenquiry@care.edu.in" className="contact-link">kolarenquiry@care.edu.in</a>
              </div>
              <div className="contact-item">
                <Globe size={18} className="contact-icon text-accent" />
                <a
                  href="https://application.care.edu.in/kgf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link portal-link"
                >
                  <span>Official Application Portal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Campuses Network Bar */}
        <div className="footer-campuses-network">
          <span className="network-label">CARE Campus Network:</span>
          <div className="network-pills">
            <span className="network-pill active">KGF Campus (Karnataka)</span>
            <span className="network-pill">Kelambakkam Campus (Chennai)</span>
            <span className="network-pill">Manamai Campus</span>
            <span className="network-pill">Karur Campus</span>
            <span className="network-pill">Kanadukathan Campus</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <div className="bottom-copy">
            &copy; {new Date().getFullYear()} Chettinad Academy of Research and Education (CARE), KGF Campus. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
