import React, { useState } from 'react';
import { Cpu, Stethoscope, Laptop, Brain, Activity, HeartPulse, Pill, Baby, Sparkles, MessageSquare, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CourseCards({ onSelectQuestion }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'engineering' | 'medical'

  const handleAskBot = (question) => {
    if (onSelectQuestion) {
      onSelectQuestion(question);
      const chatSection = document.getElementById('chatbot-section');
      if (chatSection) chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const engineeringCourses = [
    {
      id: 'cse',
      name: 'Computer Science and Engineering (CSE)',
      code: 'B.Tech CSE',
      duration: '4 Years (8 Semesters)',
      icon: <Laptop size={24} className="course-icon-svg text-blue" />,
      tag: 'Most Popular',
      desc: 'Comprehensive training in algorithms, software architecture, full-stack web development, cloud computing, and cybersecurity. Includes specialized HCL industry training.',
      keyAreas: ['Full Stack Dev', 'Cloud Computing', 'Cybersecurity', 'Database Systems'],
      inclusions: 'Tuition + Hostel + HCL Training',
      botQuery: 'Tell me about B.Tech CSE at CARE KGF'
    },
    {
      id: 'aiml',
      name: 'CSE (Artificial Intelligence & Machine Learning)',
      code: 'B.Tech CSE (AI & ML)',
      duration: '4 Years (8 Semesters)',
      icon: <Brain size={24} className="course-icon-svg text-purple" />,
      tag: 'High Demand',
      desc: 'Next-generation computing focusing on deep learning, neural networks, computer vision, natural language processing, and automated decision systems with high-end GPU labs.',
      keyAreas: ['Deep Learning', 'Computer Vision', 'NLP', 'Data Analytics'],
      inclusions: 'Tuition + Hostel + HCL Training',
      botQuery: 'Is AI and ML available?'
    },
    {
      id: 'ece',
      name: 'Electronics & Communication Engineering (ECE)',
      code: 'B.Tech ECE',
      duration: '4 Years (8 Semesters)',
      icon: <Cpu size={24} className="course-icon-svg text-indigo" />,
      tag: 'Core Tech',
      desc: 'State-of-the-art foundations in analog & digital communication, microcontrollers, embedded systems, signal processing, and Internet of Things (IoT).',
      keyAreas: ['Embedded Systems', 'IoT', 'Digital Signal Processing', 'Wireless Systems'],
      inclusions: 'Tuition + Hostel + HCL Training',
      botQuery: 'Tell me about ECE at CARE KGF'
    },
    {
      id: 'vlsi',
      name: 'ECE (VLSI Design & Technology)',
      code: 'B.Tech ECE - VLSI',
      duration: '4 Years (8 Semesters)',
      icon: <Cpu size={24} className="course-icon-svg text-cyan" />,
      tag: 'Semiconductor Era',
      desc: 'Specialized chip design and microelectronics program aligned with India Semiconductor Mission. Covers FPGA programming, RTL design, ASIC design, and chip verification.',
      keyAreas: ['Chip Design', 'FPGA Architecture', 'Semiconductor Tech', 'ASIC Flow'],
      inclusions: 'Tuition + Hostel + HCL Training',
      botQuery: 'Tell me about VLSI Design & Technology'
    }
  ];

  const medicalCourses = [
    {
      id: 'ahs',
      name: 'B.Sc Allied Health Sciences',
      institute: 'Chettinad Institute of Allied Education and Research',
      duration: '3 Years + 1 Year Internship',
      icon: <Activity size={24} className="course-icon-svg text-emerald" />,
      tag: 'Clinical Technologists',
      desc: 'Hands-on clinical training to assist in technology-driven medical procedures across 6 high-demand specializations.',
      specialties: [
        'Anaesthesia Technology',
        'Cardiac Technology',
        'Medical Laboratory Technology (MLT)',
        'Radiology & Imaging Science Technology',
        'Perfusion Technology',
        'Emergency and Trauma Care Technology'
      ],
      botQuery: 'What specialities are available in Allied Health Sciences?'
    },
    {
      id: 'bpt',
      name: 'Bachelor of Physiotherapy (BPT)',
      institute: 'Chettinad Institute of Physiotherapy & Research',
      duration: '4 Years + 6 Months Internship',
      icon: <HeartPulse size={24} className="course-icon-svg text-rose" />,
      tag: 'Rehabilitative Medicine',
      desc: 'Practical expertise in exercise therapy, electrotherapy, orthopaedics, and traumatology for movement recovery and functional restoration.',
      specialties: ['Exercise Therapy', 'Electrotherapy', 'Orthopaedics', 'Rehabilitation'],
      botQuery: 'Tell me about Bachelor of Physiotherapy BPT'
    },
    {
      id: 'bot',
      name: 'Bachelor of Occupational Therapy (BOT)',
      institute: 'Chettinad Institute of Occupational Therapy & Research',
      duration: '4 Years + 1 Year Internship',
      icon: <Baby size={24} className="course-icon-svg text-amber" />,
      tag: 'Occupational Healthcare',
      desc: 'Global healthcare profession training in patient assessment, cognitive rehabilitation, and meaningful activity recovery.',
      specialties: ['Cognitive Therapy', 'Rehabilitation', 'Pediatric Therapy', 'Sensory Integration'],
      botQuery: 'Tell me about Bachelor of Occupational Therapy BOT'
    },
    {
      id: 'bpharm',
      name: 'Bachelor of Pharmacy (B.Pharm)',
      institute: 'Chettinad Institute of Pharmaceutical Education and Research',
      duration: '4 Years (8 Semesters)',
      icon: <Pill size={24} className="course-icon-svg text-teal" />,
      tag: 'Pharma Industry',
      desc: 'Comprehensive training in medicinal chemistry, pharmacology, drug formulation, clinical research, quality control, and regulatory affairs.',
      specialties: ['Drug Formulation', 'Pharmacology', 'Clinical Research', 'Quality Control'],
      botQuery: 'Tell me about Bachelor of Pharmacy B.Pharm'
    },
    {
      id: 'nursing',
      name: 'B.Sc Nursing',
      institute: 'Chettinad School of Nursing',
      duration: '4 Years + 6 Months Clinical Internship',
      icon: <Stethoscope size={24} className="course-icon-svg text-red" />,
      tag: 'Healthcare Heroes',
      desc: 'Rigorous simulation-based and bedside nursing training preparing compassionate, critically skilled registered nurses and midwives.',
      specialties: ['Simulation Labs', 'Critical Care', 'Maternal Health', 'Bedside Care'],
      botQuery: 'Tell me about B.Sc Nursing at CARE KGF'
    }
  ];

  return (
    <section className="academics-section" id="academics">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">Academic Excellence at KGF Campus</span>
          <h2 className="section-title">
            Two Premier Domains: <span className="text-highlight">Engineering & Medical</span>
          </h2>
          <p className="section-subtitle">
            CARE KGF offers accredited undergraduate degrees combining solid foundational theory, industry/clinical immersion, and dedicated placement training.
          </p>

          {/* Domain Filter Tabs */}
          <div className="domain-tabs">
            <button
              className={`domain-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Academic Programs ({engineeringCourses.length + medicalCourses.length})
            </button>
            <button
              className={`domain-tab ${activeTab === 'engineering' ? 'active' : ''}`}
              onClick={() => setActiveTab('engineering')}
            >
              <Cpu size={16} />
              Engineering & Technology (B.Tech)
            </button>
            <button
              className={`domain-tab ${activeTab === 'medical' ? 'active' : ''}`}
              onClick={() => setActiveTab('medical')}
            >
              <Stethoscope size={16} />
              Medical & Allied Health Sciences
            </button>
          </div>
        </div>

        {/* DOMAIN 1: ENGINEERING & TECHNOLOGY (B.TECH) */}
        {(activeTab === 'all' || activeTab === 'engineering') && (
          <div className="domain-block engineering-domain">
            <div className="domain-block-header">
              <div className="domain-block-title-group">
                <div className="domain-icon-circle blue-gradient">
                  <Cpu size={24} color="#ffffff" />
                </div>
                <div>
                  <div className="domain-institute-tag">Chettinad Institute of Technical Education and Research (CIT)</div>
                  <h3 className="domain-block-title">Engineering & Technology (B.Tech)</h3>
                </div>
              </div>
              <div className="domain-perks-badge">
                <ShieldCheck size={16} className="text-success" />
                <span>Package includes <strong>Hostel + HCL Training</strong></span>
              </div>
            </div>

            <div className="courses-grid">
              {engineeringCourses.map((course) => (
                <div key={course.id} className="course-card engineering-card">
                  <div className="course-card-top">
                    <div className="course-icon-wrap">{course.icon}</div>
                    <span className="course-badge">{course.tag}</span>
                  </div>

                  <div className="course-code-pill">{course.code}</div>
                  <h4 className="course-title">{course.name}</h4>
                  <p className="course-desc">{course.desc}</p>

                  <div className="course-duration-row">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>

                  <div className="course-key-areas">
                    <span className="key-areas-title">Key Focus Areas:</span>
                    <div className="chips-row">
                      {course.keyAreas.map((area, i) => (
                        <span key={i} className="chip">{area}</span>
                      ))}
                    </div>
                  </div>

                  <div className="course-package-included">
                    <CheckCircle2 size={14} className="text-success" />
                    <span>Inclusions: <strong>{course.inclusions}</strong></span>
                  </div>

                  <div className="course-card-footer">
                    <button
                      className="btn-ask-course"
                      onClick={() => handleAskBot(course.botQuery)}
                      title={`Ask bot about ${course.name}`}
                    >
                      <MessageSquare size={14} />
                      <span>Ask Bot About Course</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOMAIN 2: MEDICAL & HEALTH SCIENCES */}
        {(activeTab === 'all' || activeTab === 'medical') && (
          <div className="domain-block medical-domain">
            <div className="domain-block-header">
              <div className="domain-block-title-group">
                <div className="domain-icon-circle red-gradient">
                  <Stethoscope size={24} color="#ffffff" />
                </div>
                <div>
                  <div className="domain-institute-tag">Chettinad Health City Programs – KGF Campus</div>
                  <h3 className="domain-block-title">Medical & Allied Health Sciences</h3>
                </div>
              </div>
              <div className="domain-perks-badge medical-badge">
                <span>Clinical Training in Multi-Specialty Facilities</span>
              </div>
            </div>

            <div className="courses-grid medical-grid">
              {medicalCourses.map((course) => (
                <div key={course.id} className="course-card medical-card">
                  <div className="course-card-top">
                    <div className="course-icon-wrap medical-wrap">{course.icon}</div>
                    <span className="course-badge medical-badge-chip">{course.tag}</span>
                  </div>

                  <div className="course-institute-sub">{course.institute}</div>
                  <h4 className="course-title">{course.name}</h4>
                  <p className="course-desc">{course.desc}</p>

                  <div className="course-duration-row">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>

                  {course.specialties && (
                    <div className="course-specialties">
                      <span className="key-areas-title">
                        {course.id === 'ahs' ? 'Available Specializations:' : 'Core Modules:'}
                      </span>
                      <ul className="specialties-list">
                        {course.specialties.map((spec, i) => (
                          <li key={i}>
                            <span className="bullet-point">•</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="course-card-footer">
                    <button
                      className="btn-ask-course medical-btn"
                      onClick={() => handleAskBot(course.botQuery)}
                      title={`Ask bot about ${course.name}`}
                    >
                      <MessageSquare size={14} />
                      <span>Ask Bot About Program</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Medical fee notice */}
            <div className="medical-note-banner">
              <p>
                <strong>ℹ️ Official Medical Notice:</strong> Medical, Nursing, and Allied Health Sciences intake and fee schedules are governed by respective regulatory councils (INC, PCI, State Board). For the verified fee breakdown and quota availability, please consult the Admissions Office at <strong>+91 971 040 1000</strong> or <strong>kolarenquiry@care.edu.in</strong>.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
