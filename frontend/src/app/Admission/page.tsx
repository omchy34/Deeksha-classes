"use client";

import { useState } from "react";

const scheduleOptions = [
  "Morning (7 AM – 10 AM)",
  "Afternoon (12 PM – 3 PM)",
  "Evening (6 PM – 9 PM)",
  "Weekend Batch (Sat & Sun)",
  "Flexible / Self-paced",
];

const courseOptions = [
  "Class 11 (Science — PCM)",
  "Class 11 (Science — PCB)",
  "Class 12 (Science — PCM)",
  "Class 12 (Science — PCB)",
  "JEE Main Crash Course",
  "JEE Main + Advanced (2-Year)",
  "NEET Preparation",
  "Board Exam Special Batch",
];

const faqs = [
  {
    q: "When do the new batches start for Class 11 & 12?",
    a: "New batches for Class 11 start every April and July. Class 12 and JEE batches start in April, July, and November. Contact us to know the next available date.",
  },
  {
    q: "Do you cover both CBSE board and JEE syllabus together?",
    a: "Yes — our Class 11 & 12 batches are designed to cover CBSE board syllabus fully while simultaneously building JEE Main and Advanced level problem-solving skills.",
  },
  {
    q: "Are classes online or offline?",
    a: "We offer both modes. Live online classes run via Zoom/Google Meet with recordings available within 24 hours. Offline classroom batches are available at our centre.",
  },
  {
    q: "Will I get study material and DPPs?",
    a: "Yes — every student gets chapter-wise notes, Daily Practice Problems (DPPs), formula sheets, and previous year JEE question banks — all included in the fee.",
  },
  {
    q: "How many mock tests are included?",
    a: "JEE Main batches include 20+ full-length NTA-pattern mock tests. JEE Advanced batches include an additional 10+ advanced-level papers with detailed rank analysis.",
  },
  {
    q: "Is there doubt-clearing support between classes?",
    a: "Absolutely. We have dedicated doubt sessions after every class plus a WhatsApp support group where faculty answer queries within a few hours.",
  },
  {
    q: "Is there an EMI option for the fee?",
    a: "Yes — easy 2 or 3-month EMI is available for all batches above ₹2,000. Zero interest, no hidden charges.",
  },
  {
    q: "Can I switch from JEE Main to JEE Advanced batch later?",
    a: "Yes, one free batch upgrade is allowed within the first month of joining based on your performance in the internal tests.",
  },
];

const benefits = [
  { icon: "🏆", title: "Expert JEE Faculty", desc: "Experienced teachers with IIT/NIT backgrounds and 10+ years of coaching." },
  { icon: "📊", title: "20+ Mock Tests", desc: "NTA-pattern full syllabus tests with rank predictions and analysis." },
  { icon: "📚", title: "Complete Study Material", desc: "Notes, DPPs, formula sheets & PYQs included — no extra cost." },
  { icon: "⏺️", title: "Recorded Classes", desc: "Rewatch any session anytime — never miss a concept." },
  { icon: "💬", title: "Doubt Support", desc: "Live doubt sessions + WhatsApp group with faculty response in hours." },
  { icon: "💳", title: "Easy EMI", desc: "2–3 month zero-interest EMI available on all premium batches." },
];

interface FormData {
  name: string; phone: string; email: string; city: string;
  course: string; schedule: string; message: string;
}

const EMPTY: FormData = {
  name: "", phone: "", email: "", city: "",
  course: "", schedule: "", message: "",
};

export default function EnquiryPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Name and phone number are required.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/enqury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(`Server error (${res.status}): API route not found or returned HTML.`);
      }
      if (!res.ok || !json.success) throw new Error(json.error || "Submission failed");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        .ap-root, .ap-root *, .ap-root *::before, .ap-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .ap-root {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; line-height: 1.75;
          color: #374151;
          background: #f0f4ff;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .ap-hero {
          background: linear-gradient(135deg, #060d1f 0%, #0d1b3e 50%, #1a2a5e 100%);
          padding: 72px 8% 60px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .ap-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 44px 44px; pointer-events: none;
        }

        /* Glows */
        .ap-blob { position: absolute; border-radius: 50%; filter: blur(72px); pointer-events: none; }
        .ap-blob-1 { width: 360px; height: 360px; background: #1d4ed8; opacity: 0.14; top: -100px; right: -60px; }
        .ap-blob-2 { width: 260px; height: 260px; background: #7c3aed; opacity: 0.12; bottom: -80px; left: -40px; }
        .ap-blob-3 { width: 200px; height: 200px; background: #ea580c; opacity: 0.08; top: 20px; left: 38%; }

        .ap-hero-inner { position: relative; z-index: 2; }

        .ap-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(29,78,216,0.18); border: 1px solid rgba(96,165,250,0.35);
          color: #93c5fd; font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700; padding: 5px 16px;
          border-radius: 20px; text-transform: uppercase;
          letter-spacing: 2px; margin-bottom: 22px;
        }
        .ap-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #60a5fa; animation: apPulse 2s ease-in-out infinite;
        }

        /* Tag pills */
        .ap-hero-tags {
          display: flex; gap: 8px; justify-content: center;
          flex-wrap: wrap; margin-bottom: 20px;
        }
        .ap-hero-tag {
          display: inline-block; font-size: 11px; font-weight: 700;
          padding: 4px 14px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 0.6px; border: 1px solid;
          font-family: 'Syne', sans-serif;
        }
        .ap-hero-tag-blue   { background: rgba(29,78,216,0.18);  color: #93c5fd; border-color: rgba(96,165,250,0.28); }
        .ap-hero-tag-orange { background: rgba(234,88,12,0.18);  color: #fdba74; border-color: rgba(251,146,60,0.28); }
        .ap-hero-tag-purple { background: rgba(124,58,237,0.18); color: #c4b5fd; border-color: rgba(167,139,250,0.28); }

        .ap-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(34px, 5vw, 62px);
          font-weight: 900; color: #fff; line-height: 1.08;
          letter-spacing: -1.5px; margin-bottom: 16px;
        }
        .ap-hero-title .gold {
          font-style: italic; color: #fb923c; position: relative; display: inline-block;
        }
        .ap-hero-title .gold::after {
          content: ''; position: absolute; left: 0; bottom: -4px;
          width: 100%; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #fb923c, #f59e0b);
        }

        .ap-hero-sub {
          font-size: 16px; color: rgba(255,255,255,0.58);
          line-height: 1.8; max-width: 500px; margin: 0 auto 36px;
        }

        /* Subjects strip */
        .ap-hero-subjects {
          display: flex; gap: 10px; justify-content: center;
          flex-wrap: wrap; margin-bottom: 32px;
        }
        .ap-hero-subject {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 8px;
          font-size: 12px; font-weight: 700; border: 1.5px solid;
          font-family: 'DM Sans', sans-serif;
        }
        .ap-sub-phy { background: rgba(59,130,246,0.12);  color: #93c5fd; border-color: rgba(59,130,246,0.28); }
        .ap-sub-che { background: rgba(16,185,129,0.12);  color: #6ee7b7; border-color: rgba(16,185,129,0.28); }
        .ap-sub-mat { background: rgba(245,158,11,0.12);  color: #fcd34d; border-color: rgba(245,158,11,0.28); }
        .ap-sub-bio { background: rgba(168,85,247,0.12);  color: #d8b4fe; border-color: rgba(168,85,247,0.28); }

        /* Stats */
        .ap-hero-stats {
          display: inline-flex; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; overflow: hidden;
          background: rgba(255,255,255,0.04);
        }
        .ap-stat {
          padding: 14px 28px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .ap-stat:last-child { border-right: none; }
        .ap-stat-num {
          font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900;
          color: #fff; display: block; letter-spacing: -0.5px;
        }
        .ap-stat-lbl {
          font-size: 11px; color: rgba(255,255,255,0.42);
          display: block; margin-top: 3px;
        }

        /* ── BODY ── */
        .ap-body {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 36px; padding: 48px 8% 80px; align-items: start;
        }

        /* ── FORM CARD ── */
        .ap-form-wrap {
          background: #fff; border-radius: 20px; padding: 36px;
          box-shadow: 0 6px 30px rgba(29,78,216,0.09);
          border: 1px solid rgba(29,78,216,0.08);
        }
        .ap-form-title {
          font-family: 'Fraunces', serif; font-size: 22px;
          font-weight: 700; color: #060d1f;
          letter-spacing: -0.3px; margin-bottom: 6px;
        }
        .ap-form-sub {
          font-size: 14px; color: #6b7280;
          line-height: 1.65; margin-bottom: 28px;
        }
        .ap-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ap-form-full { grid-column: 1 / -1; }

        .ap-field-label {
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
          color: #374151; text-transform: uppercase; letter-spacing: 0.8px;
          margin-bottom: 6px; display: block;
        }
        .ap-field-label span { color: #ef4444; }

        .ap-input, .ap-select, .ap-textarea {
          width: 100%; background: #f0f4ff;
          border: 1.5px solid #e5e7eb; color: #060d1f;
          border-radius: 10px; padding: 11px 14px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none; appearance: none;
        }
        .ap-input:focus, .ap-select:focus, .ap-textarea:focus {
          border-color: #1d4ed8;
          box-shadow: 0 0 0 3px rgba(29,78,216,0.1);
        }
        .ap-input::placeholder, .ap-textarea::placeholder { color: #9ca3af; }
        .ap-input:disabled, .ap-select:disabled, .ap-textarea:disabled {
          opacity: 0.6; cursor: not-allowed;
        }
        .ap-textarea { resize: vertical; min-height: 88px; line-height: 1.65; }

        .ap-error {
          font-size: 13px; color: #ef4444;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px; padding: 11px 14px; line-height: 1.5;
        }

        .ap-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          color: #fff; border: none; padding: 14px;
          border-radius: 11px; font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 800; cursor: pointer;
          box-shadow: 0 6px 20px rgba(29,78,216,0.35);
          transition: all 0.25s; letter-spacing: 0.3px; margin-top: 6px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ap-submit-btn:hover:not(:disabled) {
          opacity: 0.92; transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(29,78,216,0.42);
        }
        .ap-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .ap-spinner-sm {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        .ap-form-note {
          font-size: 12px; color: #9ca3af;
          text-align: center; margin-top: 10px; line-height: 1.5;
        }

        /* Success */
        .ap-success { text-align: center; padding: 32px 16px; }
        .ap-success-icon { font-size: 64px; margin-bottom: 16px; }
        .ap-success-title {
          font-family: 'Fraunces', serif; font-size: 24px;
          font-weight: 700; color: #060d1f; margin-bottom: 10px;
          letter-spacing: -0.3px;
        }
        .ap-success-sub { font-size: 15px; color: #6b7280; line-height: 1.75; }
        .ap-success-btn {
          margin-top: 20px;
          background: linear-gradient(135deg, #1d4ed8, #7c3aed);
          color: #fff; border: none; padding: 11px 24px;
          border-radius: 10px; font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer;
          transition: opacity 0.2s;
        }
        .ap-success-btn:hover { opacity: 0.88; }

        /* ── RIGHT COLUMN ── */
        .ap-right-col {
          display: flex; flex-direction: column;
          gap: 18px; position: sticky; top: 24px;
        }

        /* Benefits card */
        .ap-benefits {
          background: #fff; border-radius: 18px; padding: 26px;
          box-shadow: 0 4px 18px rgba(29,78,216,0.07);
          border: 1px solid rgba(29,78,216,0.07);
        }
        .ap-benefits-title {
          font-family: 'Fraunces', serif; font-size: 17px;
          font-weight: 700; color: #060d1f; letter-spacing: -0.2px;
          margin-bottom: 18px;
        }
        .ap-benefits-title span { color: #1d4ed8; font-style: italic; }

        .ap-benefit-item {
          display: flex; align-items: flex-start;
          gap: 12px; margin-bottom: 14px;
        }
        .ap-benefit-item:last-child { margin-bottom: 0; }
        .ap-benefit-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: linear-gradient(135deg, #dbeafe, #93c5fd);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .ap-benefit-name {
          font-family: 'Syne', sans-serif; font-size: 12px;
          font-weight: 700; color: #060d1f; margin-bottom: 2px;
        }
        .ap-benefit-desc { font-size: 12px; color: #6b7280; line-height: 1.55; }

        /* Contact card */
        .ap-contact-card {
          background: linear-gradient(135deg, #060d1f 0%, #0d1b3e 100%);
          border-radius: 16px; padding: 24px;
          border: 1px solid rgba(96,165,250,0.15);
        }
        .ap-contact-title {
          font-family: 'Fraunces', serif; font-size: 17px;
          font-weight: 700; color: #fff; margin-bottom: 6px;
        }
        .ap-contact-sub {
          font-size: 13px; color: rgba(255,255,255,0.5);
          margin-bottom: 18px; line-height: 1.6;
        }
        .ap-contact-item {
          display: flex; align-items: center;
          gap: 12px; margin-bottom: 12px;
        }
        .ap-contact-item:last-child { margin-bottom: 0; }
        .ap-contact-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(29,78,216,0.25);
          border: 1px solid rgba(96,165,250,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }
        .ap-contact-text { font-size: 13px; color: #fff; font-weight: 500; }
        .ap-contact-text span {
          display: block; font-size: 11px;
          color: rgba(255,255,255,0.45); font-weight: 400; margin-bottom: 1px;
        }

        /* ── FAQ ── */
        .ap-faq-section { padding: 0 8% 80px; }
        .ap-faq-heading {
          font-family: 'Fraunces', serif;
          font-size: clamp(20px, 2.5vw, 30px);
          font-weight: 700; color: #060d1f;
          letter-spacing: -0.4px; margin-bottom: 4px;
        }
        .ap-faq-heading span { color: #1d4ed8; font-style: italic; }
        .ap-faq-sub { font-size: 14px; color: #6b7280; margin-bottom: 20px; }

        .ap-faq-list {
          display: flex; flex-direction: column;
          gap: 8px; max-width: 780px; margin: 0 auto;
        }
        .ap-faq-item {
          background: #fff; border-radius: 12px;
          border: 1px solid rgba(29,78,216,0.08);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          overflow: hidden; transition: box-shadow 0.2s;
        }
        .ap-faq-item:hover { box-shadow: 0 5px 20px rgba(29,78,216,0.09); }
        .ap-faq-q {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; cursor: pointer; gap: 12px;
        }
        .ap-faq-q-text {
          font-family: 'Syne', sans-serif; font-size: 13px;
          font-weight: 700; color: #060d1f; line-height: 1.4;
        }
        .ap-faq-chevron {
          font-size: 11px; color: #1d4ed8;
          flex-shrink: 0; transition: transform 0.25s; font-weight: 800;
        }
        .ap-faq-chevron.open { transform: rotate(180deg); }
        .ap-faq-a {
          padding: 12px 20px 16px; font-size: 14px;
          color: #6b7280; line-height: 1.75;
          border-top: 1px solid #f0f4ff;
        }

        /* ── KEYFRAMES ── */
        @keyframes apPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ap-body { grid-template-columns: 1fr; }
          .ap-right-col { position: static; }
        }
        @media (max-width: 768px) {
          .ap-hero { padding: 52px 5% 48px; }
          .ap-hero-stats {
            display: grid; grid-template-columns: 1fr 1fr;
            border-radius: 12px; width: 100%;
          }
          .ap-stat {
            padding: 12px 16px; border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .ap-stat:nth-child(odd)  { border-right: 1px solid rgba(255,255,255,0.08); }
          .ap-stat:nth-last-child(-n+2) { border-bottom: none; }
          .ap-body { padding: 20px 5% 60px; gap: 20px; }
          .ap-faq-section { padding: 0 5% 60px; }
          .ap-faq-heading, .ap-faq-sub { text-align: center; }
          .ap-form-grid { grid-template-columns: 1fr; }
          .ap-form-full { grid-column: 1; }
          .ap-form-wrap { padding: 24px 18px; border-radius: 16px; }
          .ap-benefits, .ap-contact-card { padding: 20px 18px; }
        }
        @media (max-width: 420px) {
          .ap-hero-title { letter-spacing: -0.8px; }
          .ap-hero-subjects { gap: 6px; }
        }
      `}</style>

      <div className="ap-root">

        {/* ── HERO ── */}
        <div className="ap-hero">
          <div className="ap-blob ap-blob-1" />
          <div className="ap-blob ap-blob-2" />
          <div className="ap-blob ap-blob-3" />

          <div className="ap-hero-inner">

            <div className="ap-hero-badge">
              <span className="ap-badge-dot" />
              Admissions Open — 2025 Batches
            </div>

            {/* Course type pills */}
            <div className="ap-hero-tags">
              <span className="ap-hero-tag ap-hero-tag-blue">Class 11 &amp; 12</span>
              <span className="ap-hero-tag ap-hero-tag-orange">JEE Main</span>
              <span className="ap-hero-tag ap-hero-tag-purple">JEE Advanced</span>
            </div>

            <h1 className="ap-hero-title">
              Your Path to{" "}
              <span className="gold">IIT &amp; NIT</span>
              <br />Starts Here
            </h1>

            <p className="ap-hero-sub">
              Fill the form below and our academic counsellor will call you
              within 24 hours to guide you to the right batch for your goal.
            </p>

            {/* Subject pills */}
            <div className="ap-hero-subjects">
              <span className="ap-hero-subject ap-sub-phy">⚛️ Physics</span>
              <span className="ap-hero-subject ap-sub-che">🧪 Chemistry</span>
              <span className="ap-hero-subject ap-sub-mat">📐 Mathematics</span>
              <span className="ap-hero-subject ap-sub-bio">🧬 Biology</span>
            </div>

            <div className="ap-hero-stats">
              {[
                ["500+", "Students Enrolled"],
                ["24 hrs", "Response Time"],
                ["95%",   "Success Rate"],
                ["₹999",  "Starting At"],
              ].map(([n, l]) => (
                <div key={l} className="ap-stat">
                  <span className="ap-stat-num">{n}</span>
                  <span className="ap-stat-lbl">{l}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── BODY ── */}
        <div className="ap-body">

          {/* LEFT — Form */}
          <div>
            <div className="ap-form-wrap">
              {!submitted ? (
                <>
                  <div className="ap-form-title">Enquiry Form</div>
                  <div className="ap-form-sub">
                    Fill in your details — our counsellor will call you within 24 hours
                    and recommend the best batch based on your goal.
                  </div>

                  <div className="ap-form-grid">

                    <div>
                      <label className="ap-field-label">Full Name <span>*</span></label>
                      <input
                        className="ap-input" name="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name} onChange={handleChange} disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="ap-field-label">Phone Number <span>*</span></label>
                      <input
                        className="ap-input" name="phone"
                        placeholder="+91 98765 43210"
                        value={form.phone} onChange={handleChange} disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="ap-field-label">Email Address</label>
                      <input
                        className="ap-input" name="email" type="email"
                        placeholder="you@example.com"
                        value={form.email} onChange={handleChange} disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="ap-field-label">City / State</label>
                      <input
                        className="ap-input" name="city"
                        placeholder="e.g. Patna, Bihar"
                        value={form.city} onChange={handleChange} disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="ap-field-label">Course Interested In</label>
                      <select
                        className="ap-select" name="course"
                        value={form.course} onChange={handleChange} disabled={loading}
                      >
                        <option value="">— Select course —</option>
                        {courseOptions.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="ap-field-label">Preferred Schedule</label>
                      <select
                        className="ap-select" name="schedule"
                        value={form.schedule} onChange={handleChange} disabled={loading}
                      >
                        <option value="">— Select time —</option>
                        {scheduleOptions.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="ap-form-full">
                      <label className="ap-field-label">Your Goal / Message</label>
                      <textarea
                        className="ap-textarea" name="message"
                        placeholder="e.g. Targeting JEE Main 2026, want to start from Class 11 basics..."
                        value={form.message} onChange={handleChange} disabled={loading}
                      />
                    </div>

                    {error && (
                      <div className="ap-form-full">
                        <div className="ap-error">⚠️ {error}</div>
                      </div>
                    )}

                    <div className="ap-form-full">
                      <button
                        className="ap-submit-btn"
                        onClick={handleSubmit} disabled={loading}
                      >
                        {loading
                          ? <><div className="ap-spinner-sm" /> Submitting…</>
                          : "Send Enquiry →"
                        }
                      </button>
                      <p className="ap-form-note">
                        🔒 Your information is 100% secure and never shared.
                      </p>
                    </div>

                  </div>
                </>
              ) : (
                <div className="ap-success">
                  <div className="ap-success-icon">🎉</div>
                  <div className="ap-success-title">Enquiry Submitted!</div>
                  <p className="ap-success-sub">
                    Thank you, <strong>{form.name}</strong>!<br /><br />
                    Our academic counsellor will call you on{" "}
                    <strong>{form.phone}</strong> within 24 hours to help
                    you choose the right batch and get started on your JEE journey.
                  </p>
                  <button
                    className="ap-success-btn"
                    onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                  >
                    Submit Another →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Benefits + Contact */}
          <div className="ap-right-col">

            <div className="ap-benefits">
              <div className="ap-benefits-title">
                Why Join <span>Our Coaching?</span>
              </div>
              {benefits.map((b, i) => (
                <div key={i} className="ap-benefit-item">
                  <div className="ap-benefit-icon">{b.icon}</div>
                  <div>
                    <div className="ap-benefit-name">{b.title}</div>
                    <div className="ap-benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ap-contact-card">
              <div className="ap-contact-title">Need Help? Talk to Us 💬</div>
              <div className="ap-contact-sub">
                Our counsellors are available Mon–Sat, 9 AM – 7 PM.
              </div>
              {[
                { icon: "📞", label: "Call Us",   val: "+91 98765 43210" },
                { icon: "💬", label: "WhatsApp",  val: "+91 98765 43210" },
                { icon: "📧", label: "Email",     val: "admissions@yourinstitute.in" },
              ].map((c, i) => (
                <div key={i} className="ap-contact-item">
                  <div className="ap-contact-icon">{c.icon}</div>
                  <div className="ap-contact-text">
                    <span>{c.label}</span>{c.val}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="ap-faq-section">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 className="ap-faq-heading">
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="ap-faq-sub">
              Everything you need to know before enrolling in our JEE &amp; Science batches.
            </p>
          </div>
          <div className="ap-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="ap-faq-item">
                <div
                  className="ap-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="ap-faq-q-text">{f.q}</div>
                  <div className={`ap-faq-chevron${openFaq === i ? " open" : ""}`}>▼</div>
                </div>
                {openFaq === i && (
                  <div className="ap-faq-a">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}