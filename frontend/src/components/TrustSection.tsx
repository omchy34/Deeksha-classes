"use client";
import Image from "next/image";
import Link from "next/link";

interface Stat {
  num: string;
  lbl: string;
}

interface Feature {
  icon: string;
  tag: string;
  title: string;
  sub: string;
}

const stats: Stat[] = [
  { num: "500+",  lbl: "Students" },
  { num: "95%",   lbl: "Success Rate" },
  { num: "₹999",  lbl: "Starting Price" },
];

const features: Feature[] = [
  { icon: "🎥", tag: "LIVE", title: "Live Classes",     sub: "Real-time doubt solving sessions" },
  { icon: "📝", tag: "",     title: "Study Material",   sub: "Notes, DPPs & sample papers" },
  { icon: "🏅", tag: "",     title: "Offline Batches",  sub: "Classroom learning at our centre" },
  { icon: "📊", tag: "",     title: "Test Series",      sub: "JEE-pattern mock exams & analysis" },
];

export default function JEECoachingHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        .ec-root, .ec-root *, .ec-root *::before, .ec-root *::after {
          box-sizing: border-box;
        }
        .ec-root {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(160deg, #eef2ff 0%, #f0f4ff 50%, #e8f0ff 100%);
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }

        /* ── HERO GRID ── */
        .ec-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          padding: 60px 8% 40px 8%;
        }

        /* ── LEFT SIDE ── */
        .ec-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Top badge row */
        .ec-tag-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .ec-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          line-height: 1.4;
        }
        .ec-tag-blue   { background: #dbeafe; color: #1d4ed8; }
        .ec-tag-orange { background: #ffedd5; color: #c2410c; }
        .ec-tag-purple { background: #ede9fe; color: #6d28d9; }

        .ec-h1 {
          font-family: 'Nunito', sans-serif;
          font-size: clamp(26px, 3.6vw, 46px);
          font-weight: 900;
          line-height: 1.15;
          color: #0f172a;
          margin: 0 0 16px 0;
          padding: 0;
        }
        .ec-h1 .ec-accent { color: #1d4ed8; }
        .ec-h1 .ec-orange { color: #ea580c; }

        .ec-sub {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.75;
          max-width: 460px;
          margin: 0 0 28px 0;
          padding: 0;
        }

        /* Subject pills */
        .ec-subjects {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .ec-subject {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          border: 1.5px solid;
        }
        .ec-sub-phy { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
        .ec-sub-che { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
        .ec-sub-mat { background: #fff7ed; color: #c2410c; border-color: #fed7aa; }
        .ec-sub-bio { background: #fdf4ff; color: #7e22ce; border-color: #e9d5ff; }

        /* ── STAT CARDS ── */
        .ec-stats-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          width: 100%;
        }
        .ec-stat {
          background: #ffffff;
          border-radius: 12px;
          padding: 14px 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          text-align: center;
          flex: 1;
          min-width: 80px;
          border-top: 3px solid #1d4ed8;
        }
        .ec-stat-num {
          font-family: 'Nunito', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #1d4ed8;
          line-height: 1.2;
          display: block;
        }
        .ec-stat-lbl {
          font-size: 10px;
          color: #9ca3af;
          font-weight: 600;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          display: block;
        }

        /* ── CTA BUTTONS ── */
        .ec-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .ec-cta-primary {
          display: inline-block;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
          color: #ffffff;
          border: none;
          padding: 14px 30px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 6px 20px rgba(29, 78, 216, 0.38);
          transition: all 0.25s ease;
          text-decoration: none;
          line-height: 1;
        }
        .ec-cta-primary:hover {
          background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(29, 78, 216, 0.42);
        }
        .ec-cta-secondary {
          display: inline-block;
          background: #ffffff;
          color: #1d4ed8;
          border: 2px solid #bfdbfe;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          transition: all 0.25s ease;
          text-decoration: none;
          line-height: 1;
        }
        .ec-cta-secondary:hover {
          border-color: #1d4ed8;
          background: #eff6ff;
          transform: translateY(-2px);
        }

        /* ── RIGHT VISUAL ── */
        .ec-vis {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ec-vis-wrap {
          width: 400px;
          height: 400px;
          position: relative;
        }

        /* Spinning rings */
        .ec-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 320px; height: 320px;
          border-radius: 50%;
          border: 2px dashed rgba(29, 78, 216, 0.2);
          animation: ecSlowSpin 20s linear infinite;
        }
        .ec-ring2 {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 220px; height: 220px;
          border-radius: 50%;
          border: 1.5px dashed rgba(234, 88, 12, 0.18);
          animation: ecSlowSpin 14s linear infinite reverse;
        }

        /* Teacher circle */
        .ec-teacher {
          position: absolute;
          bottom: 30px; left: 30px;
          width: 160px; height: 160px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%);
          border: 5px solid #ffffff;
          box-shadow: 0 12px 40px rgba(15, 23, 42, 0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Formula card — top right */
        .ec-formula {
          position: absolute;
          top: 18px; right: 10px;
          width: 135px; height: 135px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fff7ed 0%, #fdba74 100%);
          border: 5px solid #ffffff;
          box-shadow: 0 6px 24px rgba(234, 88, 12, 0.22);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          animation: ecFloat 5s ease-in-out infinite;
        }
        .ec-formula-text {
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          font-weight: 900;
          color: #9a3412;
          text-align: center;
          line-height: 1.3;
        }
        .ec-formula-label {
          font-size: 9px;
          font-weight: 700;
          color: #c2410c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Rank bubble */
        .ec-bubble-rank {
          position: absolute;
          top: 28px; left: 5px;
          background: #ffffff;
          border-radius: 16px 16px 16px 4px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.10);
          border: 1.5px solid #dbeafe;
          max-width: 170px;
          line-height: 1.5;
          animation: ecFloat 4s ease-in-out infinite;
        }

        /* Answer bubble */
        .ec-bubble-a {
          position: absolute;
          bottom: 78px; right: -8px;
          background: #1d4ed8;
          color: #ffffff;
          border-radius: 16px 16px 4px 16px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(29, 78, 216, 0.35);
          max-width: 195px;
          line-height: 1.5;
          animation: ecFloat 4s ease-in-out infinite 2s;
        }

        /* Score badge — bottom right */
        .ec-score {
          position: absolute;
          bottom: 20px; right: 20px;
          background: #ffffff;
          border-radius: 12px;
          padding: 8px 14px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border: 1.5px solid #bbf7d0;
          font-size: 11px;
          font-weight: 700;
          color: #15803d;
          display: flex;
          align-items: center;
          gap: 5px;
          animation: ecFloat 3.5s ease-in-out infinite 1s;
        }

        /* Decorative dots */
        .ec-dot {
          position: absolute;
          border-radius: 50%;
        }
        .ec-dot-1 { width:10px; height:10px; background:#1d4ed8; top:70px;   left:70px;  animation:ecFloat 3.0s ease-in-out infinite 0.0s; }
        .ec-dot-2 { width:8px;  height:8px;  background:#ea580c; top:100px;  right:65px; animation:ecFloat 3.0s ease-in-out infinite 1.0s; }
        .ec-dot-3 { width:7px;  height:7px;  background:#10b981; bottom:90px; right:28px; animation:ecFloat 3.0s ease-in-out infinite 0.5s; }
        .ec-dot-4 { width:6px;  height:6px;  background:#a855f7; bottom:50px; left:85px;  animation:ecFloat 3.0s ease-in-out infinite 1.5s; }

        /* ── FEATURES BAR ── */
        .ec-features {
          margin: 0 5% 40px 5%;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.07);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
        }
        .ec-feat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px 20px;
          gap: 8px;
          border-right: 1px solid #f1f5f9;
          transition: background 0.2s ease;
          cursor: default;
        }
        .ec-feat:last-child { border-right: none; }
        .ec-feat:hover { background: #eff6ff; }

        .ec-feat-icon-wrap {
          position: relative;
          width: 52px; height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ec-feat-emoji { font-size: 38px; line-height: 1; }
        .ec-feat-live-badge {
          position: absolute;
          top: -4px; left: -6px;
          background: #ef4444;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .ec-feat-live-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #ffffff;
          animation: ecLivePulse 1s ease-in-out infinite;
        }
        .ec-feat-title {
          font-family: 'Nunito', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
          margin: 0; padding: 0;
        }
        .ec-feat-sub {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
          text-align: center;
          margin: 0; padding: 0;
        }

        /* ── KEYFRAMES ── */
        @keyframes ecSlowSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ecFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes ecLivePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ec-hero { grid-template-columns: 1fr; padding: 40px 6% 20px 6%; }
          .ec-vis { display: none; }
          .ec-features { grid-template-columns: repeat(2, 1fr); margin: 0 4% 32px 4%; }
          .ec-feat:nth-child(2) { border-right: none; }
          .ec-feat:nth-child(3) { border-top: 1px solid #f1f5f9; }
        }
        @media (max-width: 480px) {
          .ec-stats-row { gap: 8px; }
          .ec-stat { padding: 10px 10px; }
          .ec-stat-num { font-size: 18px; }
          .ec-cta-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="ec-root">

        {/* ── HERO ── */}
        <section className="ec-hero">

          {/* LEFT */}
          <div className="ec-left">

            {/* Badges */}
            <div className="ec-tag-row">
              <span className="ec-tag ec-tag-blue">Class 11 &amp; 12</span>
              <span className="ec-tag ec-tag-orange">JEE Main</span>
              <span className="ec-tag ec-tag-purple">JEE Advanced</span>
            </div>

            <h1 className="ec-h1">
              Your Path to{" "}
              <span className="ec-accent">IIT &amp; NIT</span>
              <br />
              Starts{" "}
              <span className="ec-orange">Right Here</span>
            </h1>

            <p className="ec-sub">
              Join our expert-led Class 11, 12 &amp; JEE coaching — structured syllabus,
              daily practice, rank-booster tests, and personalised mentorship to
              help you crack the exam you&apos;ve been working towards.
            </p>

            {/* Subject pills */}
            <div className="ec-subjects">
              <span className="ec-subject ec-sub-phy">⚛️ Physics</span>
              <span className="ec-subject ec-sub-che">🧪 Chemistry</span>
              <span className="ec-subject ec-sub-mat">📐 Mathematics</span>
              <span className="ec-subject ec-sub-bio">🧬 Biology</span>
            </div>

            <div className="ec-stats-row">
              {stats.map((s: Stat) => (
                <div key={s.lbl} className="ec-stat">
                  <span className="ec-stat-num">{s.num}</span>
                  <span className="ec-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            <div className="ec-cta-row">
              <Link href="/Admission" className="ec-cta-primary">
                Enroll Now →
              </Link>
              <Link href="/Courses" className="ec-cta-secondary">
                View Courses
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="ec-vis">
            <div className="ec-vis-wrap">
              <div className="ec-ring" />
              <div className="ec-ring2" />

              {/* Teacher photo */}
              <div className="ec-teacher">
                <Image src="/teacher1.png" alt="Faculty" width={130} height={160} style={{ objectFit: "cover", objectPosition: "top" }} />
              </div>

              {/* Formula circle */}
              <div className="ec-formula">
                <span className="ec-formula-text">F = ma</span>
                <span className="ec-formula-text" style={{ fontSize: "12px" }}>E = mc²</span>
                <span className="ec-formula-label">Key Formulas</span>
              </div>

              {/* Student doubt bubble */}
              <div className="ec-bubble-rank">
                🎯 &quot;I want to crack JEE Advanced — where do I start?&quot;
              </div>

              {/* Teacher answer bubble */}
              <div className="ec-bubble-a">
                ✅ Start with our structured Class 11 batch — daily sessions, DPPs &amp; mock tests!
              </div>

              {/* Score badge */}
              <div className="ec-score">
                ✅ 95% Pass Rate
              </div>

              <div className="ec-dot ec-dot-1" />
              <div className="ec-dot ec-dot-2" />
              <div className="ec-dot ec-dot-3" />
              <div className="ec-dot ec-dot-4" />
            </div>
          </div>

        </section>

        {/* ── FEATURES BAR ── */}
        <div className="ec-features">
          {features.map((f: Feature, i: number) => (
            <div key={i} className="ec-feat">
              <div className="ec-feat-icon-wrap">
                <span className="ec-feat-emoji">{f.icon}</span>
                {f.tag && (
                  <div className="ec-feat-live-badge">
                    <div className="ec-feat-live-dot" />
                    {f.tag}
                  </div>
                )}
              </div>
              <p className="ec-feat-title">{f.title}</p>
              <p className="ec-feat-sub">{f.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}