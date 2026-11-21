import React, { useState } from 'react';
import { IndianRupee, ShieldCheck, AlertCircle, Sparkles, CheckCircle2, Calculator, ArrowRight, Info, HelpCircle } from 'lucide-react';

export default function FeeSection({ onSelectQuestion }) {
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatedTier, setCalculatedTier] = useState(null);

  const feeData = [
    {
      percentageRange: 'Above 85%',
      badge: 'Tier 1 • Top Merit',
      badgeClass: 'badge-success',
      packageFee: '₹7,40,000',
      totalRaw: 740000,
      year1: '₹2,60,000',
      year2: '₹1,60,000',
      year3: '₹1,60,000',
      year4: '₹1,60,000',
      limitedSeats: true,
      min: 85,
      max: 100,
      highlight: true
    },
    {
      percentageRange: '75% – 84%',
      badge: 'Tier 2 • Merit',
      badgeClass: 'badge-primary',
      packageFee: '₹8,40,000',
      totalRaw: 840000,
      year1: '₹2,85,000',
      year2: '₹1,85,000',
      year3: '₹1,85,000',
      year4: '₹1,85,000',
      limitedSeats: true,
      min: 75,
      max: 84.99,
      highlight: false
    },
    {
      percentageRange: '60% – 74%',
      badge: 'Tier 3 • Standard',
      badgeClass: 'badge-primary',
      packageFee: '₹9,40,000',
      totalRaw: 940000,
      year1: '₹3,10,000',
      year2: '₹2,10,000',
      year3: '₹2,10,000',
      year4: '₹2,10,000',
      limitedSeats: true,
      min: 60,
      max: 74.99,
      highlight: false
    },
    {
      percentageRange: 'Below 59%',
      badge: 'Tier 4',
      badgeClass: 'badge-amber',
      packageFee: '₹10,40,000',
      totalRaw: 1040000,
      year1: '₹3,35,000',
      year2: '₹2,35,000',
      year3: '₹2,35,000',
      year4: '₹2,35,000',
      limitedSeats: false,
      min: 50,
      max: 59.99,
      highlight: false
    },
    {
      percentageRange: 'Below 50%',
      badge: 'Tier 5 (Separately listed)',
      badgeClass: 'badge-amber',
      packageFee: '₹11,40,000',
      totalRaw: 1140000,
      year1: '₹2,85,000',
      year2: '₹2,85,000',
      year3: '₹2,85,000',
      year4: '₹2,85,000',
      limitedSeats: false,
      min: 0,
      max: 49.99,
      highlight: false,
      isOverlapping: true
    }
  ];

  const handleCalculate = (e) => {
    e.preventDefault();
    const val = parseFloat(calculatorInput);
    if (isNaN(val) || val < 0 || val > 100) {
      setCalculatedTier({ error: 'Please enter a valid percentage between 35% and 100%.' });
      return;
    }

    if (val >= 85) {
      setCalculatedTier(feeData[0]);
    } else if (val >= 75) {
      setCalculatedTier(feeData[1]);
    } else if (val >= 60) {
      setCalculatedTier(feeData[2]);
    } else if (val >= 50 && val < 60) {
      setCalculatedTier({
        ...feeData[3],
        overlapNote: "The college fee circular also lists a 'Below 50%' tier at ₹11,40,000. For scores under 60%, please verify the exact applicable band with the admissions office."
      });
    } else {
      // below 50%
      setCalculatedTier({
        ...feeData[4],
        overlapNote: "Notice: Both 'Below 59%' (₹10,40,000) and 'Below 50%' (₹11,40,000) are listed in the official fee schedule. Please confirm with admissions desk."
      });
    }
  };

  const handleAskTier = (tierName) => {
    if (onSelectQuestion) {
      onSelectQuestion(`What is the fee for students scoring ${tierName}?`);
      const chatSection = document.getElementById('chatbot-section');
      if (chatSection) chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="fee-section" id="fees">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">Academic Year 2026–27</span>
          <h2 className="section-title">
            B.Tech Merit <span className="text-highlight">Fee Structure</span>
          </h2>
          <p className="section-subtitle">
            Campus: <strong>Kolar Gold Fields (KGF), Karnataka</strong>. 
            All fee packages are tied to the student's +2 aggregate percentage and include <strong>Tuition Fees, Hostel Accommodation, and HCL Training</strong>.
          </p>
        </div>

        {/* Interactive Quick Fee Calculator */}
        <div className="fee-calculator-card">
          <div className="calculator-header">
            <div className="calc-title-box">
              <Calculator size={20} className="text-primary" />
              <h3>Instant B.Tech Fee Estimator</h3>
            </div>
            <span className="calc-sub">Check your 4-year package based on your +2 / 12th percentage</span>
          </div>

          <form onSubmit={handleCalculate} className="calculator-form">
            <div className="calc-input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="Enter your +2 percentage (e.g. 82)"
                value={calculatorInput}
                onChange={(e) => setCalculatorInput(e.target.value)}
                className="calc-input"
              />
              <span className="calc-input-suffix">%</span>
            </div>
            <button type="submit" className="btn btn-primary btn-calc">
              <span>Calculate My Fee</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {calculatedTier && (
            <div className="calculated-result-box">
              {calculatedTier.error ? (
                <div className="calc-error">
                  <AlertCircle size={16} />
                  <span>{calculatedTier.error}</span>
                </div>
              ) : (
                <div className="calc-success">
                  <div className="calc-tier-badge">
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Eligible Tier: <strong>{calculatedTier.percentageRange}</strong></span>
                  </div>
                  <div className="calc-breakdown-row">
                    <div className="calc-stat">
                      <span className="label">Total 4-Year Package</span>
                      <span className="value package-val">{calculatedTier.packageFee}</span>
                    </div>
                    <div className="calc-stat">
                      <span className="label">1st Year Fee</span>
                      <span className="value">{calculatedTier.year1}</span>
                    </div>
                    <div className="calc-stat">
                      <span className="label">2nd Year Fee</span>
                      <span className="value">{calculatedTier.year2}</span>
                    </div>
                    <div className="calc-stat">
                      <span className="label">3rd Year Fee</span>
                      <span className="value">{calculatedTier.year3}</span>
                    </div>
                    <div className="calc-stat">
                      <span className="label">4th Year Fee</span>
                      <span className="value">{calculatedTier.year4}</span>
                    </div>
                  </div>
                  {calculatedTier.overlapNote && (
                    <div className="calc-overlap-note">
                      <AlertCircle size={14} />
                      <span>{calculatedTier.overlapNote}</span>
                    </div>
                  )}
                  <div className="calc-action-row">
                    <button
                      className="btn-ask-calc"
                      onClick={() => handleAskTier(calculatedTier.percentageRange)}
                    >
                      <Sparkles size={14} />
                      <span>Ask Chatbot to explain this tier in detail</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visually Attractive Fee Table */}
        <div className="fee-table-wrapper">
          <div className="fee-table-header-bar">
            <div>
              <h3 className="table-title">Official B.Tech Fee Package (2026–27)</h3>
              <span className="table-subtitle">All B.Tech streams: CSE, CSE (AI&ML), ECE, ECE (VLSI Design & Tech)</span>
            </div>
            <div className="package-tag-pill">
              <ShieldCheck size={16} color="#059669" />
              <span>Includes Tuition + Hostel + HCL Training</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>+2 Marks Percentage</th>
                  <th>Total 4-Yr Package</th>
                  <th>1st Year</th>
                  <th>2nd Year</th>
                  <th>3rd Year</th>
                  <th>4th Year</th>
                  <th>Seat Availability</th>
                  <th>Chatbot Inquiry</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((tier, index) => (
                  <tr key={index} className={tier.highlight ? 'row-highlight' : ''}>
                    <td>
                      <div className="td-pct-wrap">
                        <strong className="pct-title">{tier.percentageRange}</strong>
                        <span className={`badge ${tier.badgeClass}`}>{tier.badge}</span>
                      </div>
                    </td>
                    <td>
                      <strong className="package-price">{tier.packageFee}</strong>
                    </td>
                    <td>{tier.year1}</td>
                    <td>{tier.year2}</td>
                    <td>{tier.year3}</td>
                    <td>{tier.year4}</td>
                    <td>
                      {tier.limitedSeats ? (
                        <span className="status-limited">⚠️ Limited seats only</span>
                      ) : (
                        <span className="status-available">Available</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-table-query"
                        onClick={() => handleAskTier(tier.percentageRange)}
                        title="Query chatbot about this fee band"
                      >
                        Ask Bot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Circular Preserved Overlap Notice */}
        <div className="fee-alert-notice">
          <div className="alert-icon-box">
            <AlertCircle size={22} color="#b45309" />
          </div>
          <div className="alert-text-box">
            <h4>Important Category & Eligibility Notice</h4>
            <p>
              As listed in the official college circular, percentage categories are separately specified for both <strong>'Below 59%' (₹10,40,000 package)</strong> and <strong>'Below 50%' (₹11,40,000 package)</strong>. 
              The figures and percentage bands are preserved exactly as provided in the college fee schedule. 
              Because these ranges contain an overlap, students scoring in this range should confirm the applicable percentage category and exact fees with the <strong>CARE KGF Admissions Office</strong>.
            </p>
          </div>
        </div>

        {/* Fee Package Notes Grid */}
        <div className="fee-notes-grid">
          <div className="note-card">
            <div className="note-card-header">
              <ShieldCheck size={20} className="text-primary" />
              <h4>Package Inclusions</h4>
            </div>
            <p>
              The package strictly includes <strong>Tuition fees, Hostel accommodation, and specialized HCL training</strong> for the complete four-year B.Tech duration.
            </p>
          </div>

          <div className="note-card">
            <div className="note-card-header">
              <Info size={20} className="text-primary" />
              <h4>Hostel Accommodation</h4>
            </div>
            <p>
              Hostel accommodation is provided on a <strong>2, 3, or 4 sharing basis with non-attached washrooms</strong>, allocated strictly subject to availability.
            </p>
          </div>

          <div className="note-card">
            <div className="note-card-header">
              <AlertCircle size={20} className="text-primary" />
              <h4>Food & Mess Variations</h4>
            </div>
            <p>
              Hostel mess fees may vary periodically depending on the prevailing market costs of food, cooking materials, and essential kitchen supplies.
            </p>
          </div>

          <div className="note-card">
            <div className="note-card-header">
              <HelpCircle size={20} className="text-primary" />
              <h4>Additional Costs</h4>
            </div>
            <p>
              Additional statutory expenses may apply for optional value-added certifications, university examination fees, and student kit materials.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
