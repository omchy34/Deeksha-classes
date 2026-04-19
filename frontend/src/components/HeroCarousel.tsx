"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import teacher from "../../public/teacher.png";
import teacher1 from "../../public/teacher1.png";
import teacher2 from "../../public/teacher1.png";
import teacher3 from "../../public/teacher1.png";

type SlideVisual = { type: "image"; src: typeof teacher };

const slides = [
  {
    badge: "🎉 Admissions Open 2025",
    line1: "Class 11 & 12",
    line2: "New Batch Starting!",
    desc: "Enroll now in our Class 11 & 12 Science program — expert faculty, structured syllabus, and proven results to shape your future.",
    cta: "Apply Now",
    visual: { type: "image", src: teacher } as SlideVisual,
    bg: "linear-gradient(110deg,#0d1b4b 0%,#1a3a8f 40%,#2557d6 70%,#0d1b4b 100%)",
    showBadge: true,
  },
  {
    badge: "📐 Class 11 & 12 Science",
    line1: "Master PCM & PCB",
    line2: "With Expert Faculty",
    desc: "Comprehensive coaching in Physics, Chemistry, Maths & Biology — detailed notes, chapter tests, and doubt-clearing sessions every week.",
    cta: "View Courses",
    visual: { type: "image", src: teacher1 } as SlideVisual,
    bg: "linear-gradient(110deg,#0a3d2e 0%,#0f7a50 45%,#16a96e 70%,#083d2a 100%)",
    showBadge: false,
  },
  {
    badge: "🚀 JEE Main 2025–26",
    line1: "Crack JEE Main",
    line2: "With Confidence",
    desc: "Focused JEE Main preparation with NTA-pattern mock tests, concept clarity sessions, and rank-booster problem solving strategies.",
    cta: "Start Preparing",
    visual: { type: "image", src: teacher2 } as SlideVisual,
    bg: "linear-gradient(110deg,#4a1a00 0%,#b84c00 45%,#e86c1a 70%,#3d1500 100%)",
    showBadge: false,
  },
  {
    badge: "🏆 JEE Advanced",
    line1: "IIT is Possible —",
    line2: "Start Today",
    desc: "Elite JEE Advanced batch with advanced problem sets, IIT-level discussions, and mentorship from top-ranker faculty. Limited seats.",
    cta: "Reserve Your Seat",
    visual: { type: "image", src: teacher3 } as SlideVisual,
    bg: "linear-gradient(110deg,#2d0a5e 0%,#5e1fb5 45%,#8b4fe0 70%,#1e0542 100%)",
    showBadge: false,
  },
];

export default function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);

  const goTo = useCallback((n: number) => {
    setCur(((n % slides.length) + slides.length) % slides.length);
  }, []);

  const startAuto = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCur(c => (c + 1) % slides.length), 4500);
  }, []);

  const nav = (dir: number) => { goTo(cur + dir); startAuto(); };

  useEffect(() => {
    startAuto();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [startAuto]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .carousel-wrap { position:relative; overflow:hidden; width:100%; }
        .carousel-track { display:flex; transition:transform 0.6s cubic-bezier(0.77,0,0.18,1); }

        /* ── Slide base ── */
        .c-slide {
          min-width:100%; height:520px;
          display:flex; align-items:center;
          padding:0 6% 0 8%; position:relative; overflow:hidden;
          font-family:'Poppins',sans-serif;
        }

        /* ── Decorative blobs ── */
        .c-deco1 {
          position:absolute; top:-80px; right:-80px; width:340px; height:340px;
          border-radius:50%; background:rgba(255,255,255,0.07); pointer-events:none;
        }
        .c-deco2 {
          position:absolute; bottom:-90px; left:28%; width:220px; height:220px;
          border-radius:50%; background:rgba(255,255,255,0.05); pointer-events:none;
        }

        /* Subtle grid pattern */
        .c-deco3 {
          position:absolute; top:0; left:0; right:0; bottom:0;
          background-image:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px);
          pointer-events:none;
        }

        /* Atom/orbit accent */
        .c-orbit {
          position:absolute; bottom:-60px; left:55%; width:280px; height:280px;
          border:2px dashed rgba(255,255,255,0.1); border-radius:50%; pointer-events:none;
          animation:orbit-spin 18s linear infinite;
        }
        .c-orbit::after {
          content:''; position:absolute; top:8px; left:50%;
          width:10px; height:10px; background:rgba(255,255,255,0.25);
          border-radius:50%; transform:translateX(-50%);
        }
        @keyframes orbit-spin { to { transform:rotate(360deg); } }

        /* ── Desktop text ── */
        .c-content { max-width:520px; z-index:2; position:relative; }

        .c-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.18); color:#fff;
          font-size:11px; font-weight:700; padding:5px 14px; border-radius:20px;
          margin-bottom:16px; border:1px solid rgba(255,255,255,0.28);
          letter-spacing:0.6px; text-transform:uppercase; backdrop-filter:blur(8px);
        }

        .c-h1 {
          font-size:clamp(28px,4vw,54px); font-weight:900; color:#fff;
          line-height:1.1; margin-bottom:14px; text-shadow:0 2px 16px rgba(0,0,0,0.3);
        }
        .c-h1 .hl {
          color:#fde047; display:block;
          text-shadow:0 0 30px rgba(253,224,71,0.4);
        }

        .c-desc {
          color:rgba(255,255,255,0.88); font-size:15px;
          margin-bottom:28px; line-height:1.75; max-width:440px;
        }

        /* Stats row */
        .c-stats {
          display:flex; gap:22px; margin-bottom:24px;
        }
        .c-stat {
          text-align:center;
        }
        .c-stat-num {
          display:block; font-size:20px; font-weight:900; color:#fde047;
          line-height:1.1;
        }
        .c-stat-label {
          display:block; font-size:10px; font-weight:600;
          color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:0.5px;
        }
        .c-stat-div {
          width:1px; background:rgba(255,255,255,0.2); align-self:stretch;
        }

        .c-btn {
          background:#fde047; color:#1a1a1a; border:none;
          padding:13px 32px; border-radius:30px; font-size:15px; font-weight:700;
          cursor:pointer; font-family:'Poppins',sans-serif;
          box-shadow:0 4px 20px rgba(0,0,0,0.25); transition:all 0.25s;
          display:inline-flex; align-items:center; gap:8px;
        }
        .c-btn:hover { transform:scale(1.05) translateY(-1px); box-shadow:0 8px 28px rgba(0,0,0,0.3); }

        /* ── Desktop image ── */
        .c-visual {
          position:absolute; right:4%; bottom:0;
          width:300px; height:100%;
          display:flex; align-items:flex-end; z-index:1;
        }
        .c-avatar { width:300px; height:100%; position:relative; }

        /* ── Spinning admission badge ── */
        .vd-badge {
          position:absolute; top:18px; right:18px; width:74px; height:74px;
          border-radius:50%;
          background:conic-gradient(#f59e0b,#ef4444,#fbbf24,#ef4444,#f59e0b);
          display:flex; align-items:center; justify-content:center;
          text-align:center; font-size:8px; font-weight:800; color:#fff;
          line-height:1.3; padding:8px; z-index:10;
          box-shadow:0 0 0 4px rgba(255,255,255,0.28);
          animation:spin-slow 7s linear infinite;
        }
        @keyframes spin-slow { to { transform:rotate(360deg); } }

        /* ── Mobile row ── */
        .c-mobile-row {
          display:none; width:100%;
          align-items:flex-end; gap:12px;
          z-index:2; position:relative; min-height:200px;
        }
        .c-mobile-text { flex:1; min-width:0; padding-bottom:8px; }
        .c-mobile-text .c-badge { margin-bottom:10px; }
        .c-mobile-text .c-h1 { font-size:clamp(18px,5vw,26px); margin-bottom:8px; }
        .c-mobile-text .c-desc { font-size:12px; margin-bottom:14px; line-height:1.55; }
        .c-mobile-text .c-btn { padding:9px 18px; font-size:12px; }
        .c-mobile-text .c-stats { gap:12px; margin-bottom:14px; }
        .c-mobile-text .c-stat-num { font-size:15px; }
        .c-mobile-text .c-stat-label { font-size:8px; }

        .c-mobile-img {
          flex-shrink:0; width:160px; height:260px;
          position:relative; margin-bottom:-22px;
        }

        /* ── Arrows ── */
        .c-arr {
          position:absolute; top:50%; transform:translateY(-50%); z-index:20;
          width:44px; height:44px; border-radius:50%;
          background:rgba(255,255,255,0.2); color:#fff;
          border:2px solid rgba(255,255,255,0.35); font-size:20px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.2s; backdrop-filter:blur(6px);
        }
        .c-arr:hover { background:rgba(255,255,255,0.4); transform:translateY(-50%) scale(1.1); }
        .c-prev { left:14px; }
        .c-next { right:14px; }

        /* ── Dots ── */
        .c-dots {
          position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
          display:flex; gap:7px; z-index:20;
        }
        .c-dot {
          height:8px; border-radius:4px; cursor:pointer;
          background:rgba(255,255,255,0.4); transition:all 0.3s;
        }
        .c-dot.active { width:24px; background:#fde047; }
        .c-dot:not(.active) { width:8px; }

        /* ── Tablet ── */
        @media(max-width:900px) {
          .c-slide { height:420px; padding:0 5% 0 6%; }
          .c-visual { width:240px; }
          .c-avatar { width:240px; }
          .c-h1 { font-size:clamp(24px,4vw,40px); }
          .c-desc { font-size:14px; }
          .c-stats { gap:14px; }
        }

        /* ── Mobile ── */
        @media(max-width:640px) {
          .c-slide { height:auto; min-height:360px; padding:22px 5% 50px; align-items:stretch; }
          .c-content { display:none; }
          .c-visual  { display:none; }
          .c-mobile-row { display:flex; }
          .c-arr { width:34px; height:34px; font-size:16px; }
          .c-prev { left:8px; }
          .c-next { right:8px; }
        }

        @media(max-width:380px) {
          .c-mobile-img { width:130px; height:200px; }
          .c-mobile-text .c-h1 { font-size:17px; }
          .c-mobile-text .c-desc { display:none; }
        }
      `}</style>

      <div
        className="carousel-wrap"
        onTouchStart={e => { touchX.current = e.changedTouches[0].clientX; }}
        onTouchEnd={e => {
          const d = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 50) nav(d > 0 ? 1 : -1);
        }}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="c-slide" style={{ background: s.bg }}>
              <div className="c-deco1" />
              <div className="c-deco2" />
              <div className="c-deco3" />
              <div className="c-orbit" />

              {/* ── DESKTOP ── */}
              <div className="c-content">
                <span className="c-badge">{s.badge}</span>
                <h1 className="c-h1">
                  <span>{s.line1}</span>
                  <span className="hl">{s.line2}</span>
                </h1>
                <p className="c-desc">{s.desc}</p>
                <div className="c-stats">
                  <div className="c-stat">
                    <span className="c-stat-num">500+</span>
                    <span className="c-stat-label">Students</span>
                  </div>
                  <div className="c-stat-div" />
                  <div className="c-stat">
                    <span className="c-stat-num">95%</span>
                    <span className="c-stat-label">Pass Rate</span>
                  </div>
                  <div className="c-stat-div" />
                  <div className="c-stat">
                    <span className="c-stat-num">Top 100</span>
                    <span className="c-stat-label">JEE Ranks</span>
                  </div>
                </div>
                <button className="c-btn">
                  <Link href="/Admission">{s.cta} →</Link>
                </button>
              </div>

              <div className="c-visual">
                <div className="c-avatar">
                  <Image
                    src={s.visual.src}
                    alt="Faculty"
                    fill
                    style={{ objectFit: "contain", objectPosition: "bottom center" }}
                  />
                </div>
              </div>

              {/* ── MOBILE ── */}
              <div className="c-mobile-row">
                <div className="c-mobile-text">
                  <span className="c-badge">{s.badge}</span>
                  <h1 className="c-h1">
                    <span>{s.line1}</span>
                    <span className="hl">{s.line2}</span>
                  </h1>
                  <p className="c-desc">{s.desc}</p>
                  <div className="c-stats">
                    <div className="c-stat">
                      <span className="c-stat-num">500+</span>
                      <span className="c-stat-label">Students</span>
                    </div>
                    <div className="c-stat-div" />
                    <div className="c-stat">
                      <span className="c-stat-num">95%</span>
                      <span className="c-stat-label">Pass Rate</span>
                    </div>
                  </div>
                  <button className="c-btn">{s.cta} →</button>
                </div>
                <div className="c-mobile-img">
                  <Image
                    src={s.visual.src}
                    alt="Faculty"
                    fill
                    style={{ objectFit: "contain", objectPosition: "bottom center" }}
                  />
                </div>
              </div>

              {s.showBadge && (
                <div className="vd-badge">BATCH<br />OPEN<br />2025</div>
              )}
            </div>
          ))}
        </div>

        <button className="c-arr c-prev" onClick={() => nav(-1)}>‹</button>
        <button className="c-arr c-next" onClick={() => nav(1)}>›</button>

        <div className="c-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`c-dot${i === cur ? " active" : ""}`}
              onClick={() => { goTo(i); startAuto(); }}
            />
          ))}
        </div>
      </div>
    </>
  );
}