"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ── Static course data ────────────────────────────────────────────────────────
const COURSES = [
  {
    id: "11-foundation",
    badge: "11th Foundation",
    title: "Class 11 Foundation Programme",
    tagline: "Laying the groundwork for JEE excellence",
    desc: "A rigorous full-year programme aligned with CBSE/ISC board curriculum and JEE fundamentals. Designed to build conceptual clarity in Physics, Chemistry & Mathematics from first principles.",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    level: "Foundation",
    features: [
      "Complete Class 11 NCERT + JEE concept coverage",
      "Weekly assessments & detailed performance reports",
      "Structured doubt-resolution sessions",
      "Comprehensive study material & DPP sheets",
      "Board examination preparatory modules",
    ],
    icon: "⚛️",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    tag: "Best Start",
    tagBg: "#2563eb",
    certificate: true,
  },
  {
    id: "12-boards-jee",
    badge: "12th + JEE Main",
    title: "Class 12 Boards + JEE Main",
    tagline: "Dual-track preparation for maximum outcomes",
    desc: "A strategically integrated programme enabling simultaneous preparation for Class 12 Boards and JEE Main. Our proven dual-track pedagogy ensures academic excellence on both fronts.",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    level: "Intermediate",
    features: [
      "Board-aligned syllabus with JEE Main mapping",
      "Chapter-wise JEE Main previous year questions",
      "Full-length mock test series (JEE pattern)",
      "Individual performance analytics & feedback",
      "Rank-accelerator sessions pre-examination",
    ],
    icon: "🎯",
    accent: "#059669",
    accentLight: "#ecfdf5",
    tag: "Most Popular",
    tagBg: "#059669",
    certificate: true,
  },
  {
    id: "jee-advanced",
    badge: "JEE Advanced",
    title: "JEE Advanced Intensive Programme",
    tagline: "Precision training for India's most competitive exam",
    desc: "Engineered exclusively for students targeting the Indian Institutes of Technology. This programme delivers advanced problem-solving frameworks, rigorous test practice, and strategic rank improvement methodologies.",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    level: "Advanced",
    features: [
      "Advanced-level problem-solving workshops",
      "20+ full-length mock tests (JEE Advanced pattern)",
      "20-year IIT JEE PYQ analysis with solutions",
      "Personalised rank improvement roadmap",
      "Dedicated one-on-one mentorship sessions",
    ],
    icon: "🏆",
    accent: "#d97706",
    accentLight: "#fffbeb",
    tag: "Top Rated",
    tagBg: "#d97706",
    certificate: true,
  },
  {
    id: "2-year-integrated",
    badge: "2-Year Integrated",
    title: "Integrated 2-Year Programme (11th + 12th)",
    tagline: "The complete academic journey — from foundation to IIT",
    desc: "Our flagship long-format programme commencing from Class 11. A structured, stage-wise curriculum that systematically advances students from fundamental concepts to IIT-level mastery over two academic years.",
    duration: "2 Years",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    level: "All Levels",
    features: [
      "Comprehensive 11th + 12th syllabus (Board + JEE)",
      "Progressive topic sequencing with milestone reviews",
      "Monthly academic progress conferences with guardians",
      "Unlimited doubt resolution access",
      "JEE Main + Advanced full mock test series",
    ],
    icon: "🚀",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    tag: "Best Value",
    tagBg: "#7c3aed",
    certificate: true,
  },
  {
    id: "crash-jee-main",
    badge: "Crash Course",
    title: "JEE Main Intensive Crash Course",
    tagline: "90-day accelerated revision — no syllabus left behind",
    desc: "A high-velocity 3-month preparatory sprint covering the complete JEE Main syllabus. Designed for students seeking rapid conceptual revision, focused problem-solving, and effective last-phase examination strategy.",
    duration: "3 Months",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    level: "Intermediate",
    features: [
      "Full JEE Main syllabus coverage in 90 days",
      "High-weightage chapter prioritisation framework",
      "Daily practice problems with detailed solutions",
      "10 full-length mock tests with in-depth analysis",
      "Examination strategy & time management workshops",
    ],
    icon: "⚡",
    accent: "#db2777",
    accentLight: "#fdf2f8",
    tag: "Rapid Prep",
    tagBg: "#db2777",
    certificate: false,
  },
  {
    id: "dropper-batch",
    badge: "Repeater Batch",
    title: "Repeater Batch — JEE Intensive",
    tagline: "Targeted remediation. Stronger strategy. Better rank.",
    desc: "A focused programme for students re-appearing for JEE. Built around comprehensive gap analysis, targeted weak-area remediation, and the psychological conditioning required to perform at peak capacity.",
    duration: "1 Year",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    level: "Advanced",
    features: [
      "In-depth diagnostic assessment of previous attempt",
      "Customised study plan tailored per student",
      "Targeted intervention for identified weak areas",
      "JEE Main + JEE Advanced complete coverage",
      "Confidence-building & exam temperament coaching",
    ],
    icon: "🔄",
    accent: "#0284c7",
    accentLight: "#f0f9ff",
    tag: "Comeback",
    tagBg: "#0284c7",
    certificate: true,
  },
];

const LEVEL_META: Record<string, { bg: string; text: string }> = {
  Foundation:   { bg: "#dbeafe", text: "#1e40af" },
  Intermediate: { bg: "#fef9c3", text: "#854d0e" },
  Advanced:     { bg: "#fce7f3", text: "#9d174d" },
  "All Levels": { bg: "#f1f5f9", text: "#475569" },
};

const FILTERS = ["All", "11th", "12th", "JEE Main", "JEE Advanced", "Crash Course"];

function filterCourses(courses: typeof COURSES, filter: string) {
  if (filter === "All") return courses;
  if (filter === "11th") return courses.filter(c => c.id.includes("11") || c.id === "2-year-integrated");
  if (filter === "12th") return courses.filter(c => c.id.includes("12") || c.id === "2-year-integrated");
  if (filter === "JEE Main") return courses.filter(c => ["crash-jee-main", "12-boards-jee", "dropper-batch", "2-year-integrated"].includes(c.id));
  if (filter === "JEE Advanced") return courses.filter(c => ["jee-advanced", "2-year-integrated", "dropper-batch"].includes(c.id));
  if (filter === "Crash Course") return courses.filter(c => c.id === "crash-jee-main");
  return courses;
}

// ── Course Card ───────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const lm = LEVEL_META[course.level];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: hov ? `1.5px solid ${course.accent}` : "1.5px solid #e5e7eb",
        boxShadow: hov ? `0 16px 48px ${course.accent}1a` : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all 0.25s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 4, background: course.accent }} />

      {/* Header */}
      <div style={{
        padding: "22px 24px 18px",
        background: course.accentLight,
        borderBottom: `1px solid ${course.accent}18`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: "#fff",
            border: `1px solid ${course.accent}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
            transition: "transform 0.25s",
            transform: hov ? "scale(1.1)" : "none",
          }}>{course.icon}</div>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "1.4px", color: course.accent, marginBottom: 6,
            }}>{course.badge}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 10, fontWeight: 600,
                padding: "3px 10px", borderRadius: 20,
                background: lm.bg, color: lm.text,
              }}>{course.level}</span>
              <span style={{
                fontSize: 10, fontWeight: 600,
                padding: "3px 10px", borderRadius: 20,
                background: "rgba(0,0,0,0.05)", color: "#6b7280",
              }}>⏱ {course.duration}</span>
              {course.certificate && (
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  padding: "3px 10px", borderRadius: 20,
                  background: "#fef9c3", color: "#854d0e",
                }}>🏅 Certificate</span>
              )}
            </div>
          </div>
        </div>
        <span style={{
          flexShrink: 0,
          background: course.tagBg, color: "#fff",
          fontSize: 9, fontWeight: 800,
          padding: "4px 11px", borderRadius: 20,
          letterSpacing: "0.6px", textTransform: "uppercase",
        }}>{course.tag}</span>
      </div>

      {/* Body */}
      <div style={{ padding: "22px 24px 0", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontSize: 17, fontWeight: 700, color: "#111827",
          lineHeight: 1.3, marginBottom: 6,
        }}>{course.title}</h3>

        <p style={{
          fontSize: 12.5, fontWeight: 600, fontStyle: "italic",
          color: course.accent, marginBottom: 12,
        }}>{course.tagline}</p>

        <p style={{
          fontSize: 13, color: "#6b7280", lineHeight: 1.8, marginBottom: 18,
        }}>{course.desc}</p>

        {/* Subjects */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          {course.subjects.map(s => (
            <span key={s} style={{
              fontSize: 10, fontWeight: 700,
              padding: "4px 12px", borderRadius: 6,
              background: course.accentLight, color: course.accent,
              border: `1px solid ${course.accent}25`,
            }}>{s}</span>
          ))}
        </div>

        {/* Features */}
        <div style={{ marginBottom: 22 }}>
          <div style={{
            fontSize: 9, fontWeight: 800, textTransform: "uppercase",
            letterSpacing: "1.2px", color: "#9ca3af", marginBottom: 10,
          }}>Programme Highlights</div>
          {course.features.map((f, i) => (
            <div key={i} style={{
              display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 8,
            }}>
              <span style={{
                width: 15, height: 15, borderRadius: "50%",
                background: course.accentLight, color: course.accent,
                fontSize: 8, fontWeight: 900,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 2,
              }}>✓</span>
              <span style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.55 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 24px 22px",
        borderTop: "1px solid #f3f4f6",
        marginTop: "auto",
      }}>
        <button
          onClick={() => router.push("/Admission")}
          style={{
            width: "100%",
            background: course.accent,
            color: "#fff",
            border: "none",
            borderRadius: 9,
            padding: "13px 20px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.3px",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = "0.88";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "none";
          }}
        >
          Enrol Now →
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filterCourses(COURSES, filter);

  return (
    <>
      <style>{`
        .cr-root, .cr-root *, .cr-root *::before, .cr-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .cr-root {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f6f7fb;
          min-height: 100vh;
          color: #111827;
          --navy: #0d1b3e;
          --gold: #b8962e;
        }
        .cr-hero {
          background: var(--navy);
          padding: 80px 8% 72px;
          position: relative; overflow: hidden;
        }
        .cr-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .cr-hero-glow {
          position: absolute; top: -100px; right: -60px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%);
          pointer-events: none;
        }
        .cr-hero-inner { position: relative; z-index: 2; max-width: 820px; }
        .cr-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(184,150,46,0.35);
          padding: 6px 16px; border-radius: 3px; margin-bottom: 24px;
        }
        .cr-hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          animation: crPulse 2.2s ease-in-out infinite;
        }
        .cr-hero-badge span {
          font-size: 10px; font-weight: 600; color: var(--gold);
          letter-spacing: 3px; text-transform: uppercase;
        }
        .cr-hero-title {
          font-size: clamp(32px, 4.2vw, 54px);
          font-weight: 700; color: #fff;
          line-height: 1.12; letter-spacing: -0.8px; margin-bottom: 18px;
        }
        .cr-hero-title em { font-style: italic; color: var(--gold); }
        .cr-hero-sub {
          font-size: 15px; color: rgba(255,255,255,0.48);
          line-height: 1.8; max-width: 540px;
          margin-bottom: 50px; font-weight: 400;
        }
        .cr-stats { display: flex; flex-wrap: wrap; }
        .cr-stat {
          padding-right: 36px; margin-right: 36px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .cr-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }
        .cr-stat-n {
          font-size: 30px; font-weight: 700; color: var(--gold);
          display: block; letter-spacing: -0.5px; line-height: 1; margin-bottom: 5px;
        }
        .cr-stat-l { font-size: 11px; color: rgba(255,255,255,0.36); }
        .cr-filter-bar {
          background: #fff; border-bottom: 1px solid #e5e7eb;
          padding: 18px 8%;
          display: flex; gap: 8px; flex-wrap: wrap; align-items: center;
          position: sticky; top: 0; z-index: 10;
        }
        .cr-filter-label {
          font-size: 10px; font-weight: 700; color: #bbb;
          letter-spacing: 1.5px; text-transform: uppercase; margin-right: 6px;
        }
        .cr-filter-btn {
          background: transparent; border: 1.5px solid #e5e7eb;
          border-radius: 7px; padding: 7px 16px;
          font-size: 12px; font-weight: 600; color: #6b7280;
          cursor: pointer; transition: all 0.18s; font-family: inherit;
        }
        .cr-filter-btn.active { background: var(--navy); border-color: var(--navy); color: #fff; }
        .cr-filter-btn:hover:not(.active) { border-color: var(--navy); color: var(--navy); }
        .cr-section-header {
          padding: 40px 8% 8px;
          display: flex; align-items: baseline;
          justify-content: space-between; flex-wrap: wrap; gap: 8px;
        }
        .cr-section-title { font-size: 22px; font-weight: 700; color: var(--navy); letter-spacing: -0.2px; }
        .cr-section-title em { font-style: italic; color: #7c3aed; }
        .cr-section-count { font-size: 12px; color: #bbb; font-weight: 500; }
        .cr-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 22px; padding: 22px 8% 80px;
        }
        .cr-strip {
          background: var(--navy);
          padding: 68px 8%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
          position: relative; overflow: hidden;
        }
        .cr-strip::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .cr-strip-inner { position: relative; z-index: 1; }
        .cr-strip-label {
          font-size: 10px; font-weight: 700; color: var(--gold);
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px;
        }
        .cr-strip-title {
          font-size: clamp(22px, 2.6vw, 34px); font-weight: 700;
          color: #fff; line-height: 1.25; margin-bottom: 14px; letter-spacing: -0.3px;
        }
        .cr-strip-title em { font-style: italic; color: var(--gold); }
        .cr-strip-sub {
          font-size: 14px; color: rgba(255,255,255,0.42);
          line-height: 1.8; margin-bottom: 28px;
        }
        .cr-strip-btn {
          background: var(--gold); color: #0d1b3e;
          border: none; border-radius: 9px; padding: 13px 30px;
          font-size: 13.5px; font-weight: 700; cursor: pointer;
          font-family: inherit; transition: all 0.2s;
        }
        .cr-strip-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .cr-chips {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .cr-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(184,150,46,0.18);
          border-radius: 12px; padding: 18px 16px; transition: all 0.22s;
        }
        .cr-chip:hover { background: rgba(184,150,46,0.07); border-color: rgba(184,150,46,0.36); }
        .cr-chip-icon { font-size: 20px; margin-bottom: 8px; }
        .cr-chip-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.82); margin-bottom: 3px; }
        .cr-chip-sub { font-size: 11px; color: rgba(255,255,255,0.36); }
        @keyframes crPulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(1.5);} }
        @media(max-width:1060px){.cr-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){
          .cr-grid{grid-template-columns:1fr;padding:18px 5% 60px;}
          .cr-hero{padding:56px 6% 56px;}
          .cr-stats{gap:18px;}
          .cr-stat{border-right:none;padding-right:0;margin-right:0;}
          .cr-strip{grid-template-columns:1fr;gap:32px;padding:52px 6%;}
          .cr-filter-bar{padding:14px 5%;}
          .cr-section-header{padding:28px 5% 8px;}
        }
      `}</style>

      <div className="cr-root">

        {/* ═══ HERO ═══ */}
        <section className="cr-hero">
          <div className="cr-hero-glow" />
          <div className="cr-hero-inner">
            <div className="cr-hero-badge">
              <span className="cr-hero-badge-dot" />
              <span>Academic Programmes — The Science Centre</span>
            </div>
            <h1 className="cr-hero-title">
              Structured Learning Pathways<br />
              for <em>JEE Excellence</em>
            </h1>
            <p className="cr-hero-sub">
              Outcome-driven academic programmes for Class 11, Class 12 Boards,
              JEE Main and JEE Advanced — each meticulously designed to deliver
              conceptual mastery, measurable progress, and top-rank results.
            </p>
            <div className="cr-stats">
              {[
                { n: "6",    l: "Academic Programmes" },
                { n: "100+", l: "Students Enrolled" },
                { n: "97%",  l: "Success Rate" },
                { n: "10+",  l: "Years of Excellence" },
              ].map(s => (
                <div key={s.l} className="cr-stat">
                  <span className="cr-stat-n">{s.n}</span>
                  <span className="cr-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FILTER BAR ═══ */}
        <div className="cr-filter-bar">
          <span className="cr-filter-label">Filter by:</span>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`cr-filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >{f}</button>
          ))}
        </div>

        {/* ═══ GRID ═══ */}
        <div className="cr-section-header">
          <h2 className="cr-section-title">
            {filter === "All" ? <>All <em>Programmes</em></> : <><em>{filter}</em> Programmes</>}
          </h2>
          <span className="cr-section-count">
            {filtered.length} programme{filtered.length !== 1 ? "s" : ""} available
          </span>
        </div>

        <div className="cr-grid">
          {filtered.length === 0 ? (
            <div style={{
              gridColumn: "1/-1", textAlign: "center",
              padding: "80px 20px", color: "#9ca3af", fontSize: 14,
            }}>
              No programmes match the selected filter.
            </div>
          ) : filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>

        {/* ═══ CTA STRIP ═══ */}
        <section className="cr-strip">
          <div className="cr-strip-inner">
            <div className="cr-strip-label">Begin Your Journey</div>
            <h2 className="cr-strip-title">
              Academic Excellence Begins<br />with the <em>Right Programme</em>
            </h2>
            <p className="cr-strip-sub">
              Hundreds of students have transformed their academic trajectories
              through our structured programmes — securing admissions to IITs,
              NITs, and top engineering institutions across India.
            </p>
            <button
              className="cr-strip-btn"
              onClick={() => { if (typeof window !== "undefined") window.location.href = "/Admission"; }}
            >
              Enrol Now →
            </button>
          </div>
          <div className="cr-chips">
            {[
              { icon: "💻", label: "100% Online Delivery",    sub: "Learn from any location" },
              { icon: "🎥", label: "Live Interactive Classes", sub: "Real-time instruction" },
              { icon: "📖", label: "Curated Study Material",   sub: "DPP sheets & resources" },
              { icon: "💬", label: "Dedicated Doubt Support",  sub: "Available at all times" },
            ].map(c => (
              <div key={c.label} className="cr-chip">
                <div className="cr-chip-icon">{c.icon}</div>
                <div className="cr-chip-label">{c.label}</div>
                <div className="cr-chip-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}