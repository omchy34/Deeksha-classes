"use client";
import teacher from "../../../public/teacher.png";
import Image from "next/image";

export default function AboutUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap');

        .ab-root, .ab-root *, .ab-root *::before, .ab-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .ab-root {
          font-family: 'Outfit', sans-serif;
          background: #faf8f3;
          min-height: 100vh;
          --navy: #0d1b3e;
          --navy2: #112050;
          --gold: #7c3aed;;
          --gold-light: #e8c97a;
          --cream: #faf8f3;
          --cream-2: #f2ede3;
          --ink: #1a1a2e;
          --muted: #7a7264;
        }

        /* ═══════════════════════════════
           HERO
        ═══════════════════════════════ */
        .ab-hero {
          min-height: 88vh;
          background: var(--navy);
          display: grid;
          grid-template-columns: 55% 45%;
          position: relative;
          overflow: hidden;
          align-items: end;
        }
        .ab-hero::before {
          content: '';
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .ab-hero-glow {
          position: absolute;
          right: 0; bottom: 0;
          width: 55%; height: 110%;
          background: radial-gradient(ellipse at 60% 90%, rgba(201,168,76,0.12) 0%, rgba(17,32,80,0.5) 55%, transparent 75%);
          pointer-events: none; z-index: 1;
        }
        .ab-hero-divider {
          position: absolute;
          left: 55%; top: 8%; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 80%, transparent);
          z-index: 2; pointer-events: none;
        }

        /* LEFT content */
        .ab-hero-left {
          padding: 80px 5% 80px 8%;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; z-index: 3;
        }
        .ab-badge {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid rgba(201,168,76,0.35);
          padding: 7px 18px; border-radius: 3px;
          margin-bottom: 40px; width: fit-content;
        }
        .ab-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          animation: abPulse 2.2s ease-in-out infinite;
        }
        .ab-badge span {
          font-size: 10px; font-weight: 600; color: var(--gold);
          letter-spacing: 3px; text-transform: uppercase;
        }
        .ab-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 4.5vw, 68px);
          font-weight: 900;
          color: #fff;
          line-height: 1.06;
          margin-bottom: 26px;
          letter-spacing: -1.5px;
        }
        .ab-hero-title em {
          font-style: italic; color: var(--gold); display: block;
        }
        .ab-hero-desc {
          font-size: 15px; color: rgba(255,255,255,0.46);
          line-height: 1.85; max-width: 440px;
          margin-bottom: 52px; font-weight: 300;
        }
        .ab-stats-row { display: flex; align-items: stretch; }
        .ab-stat {
          padding-right: 32px; margin-right: 32px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .ab-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }
        .ab-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 38px; font-weight: 900;
          color: var(--gold); line-height: 1;
          display: block; margin-bottom: 6px; letter-spacing: -1px;
        }
        .ab-stat-lbl {
          font-size: 11px; color: rgba(255,255,255,0.36); font-weight: 500;
        }

        /* RIGHT: cutout photo */
        .ab-hero-right {
          position: relative; z-index: 3;
          display: flex; align-items: flex-end; justify-content: center;
          height: 100%; padding-bottom: 0;
        }
        .ab-hero-arc {
          position: absolute; bottom: -30px; left: 50%;
          transform: translateX(-50%);
          width: 440px; height: 440px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%);
          border: 1px solid rgba(201,168,76,0.1);
          pointer-events: none;
        }
        .ab-hero-arc-2 {
          position: absolute; bottom: -70px; left: 50%;
          transform: translateX(-50%);
          width: 300px; height: 300px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.07);
          pointer-events: none;
        }
        .ab-teacher-img {
          position: relative !important;
          width: auto !important;
          max-width: 90% !important;
          height: auto !important;
          max-height: 80vh;
          object-fit: contain !important;
          object-position: bottom center !important;
          display: block;
          filter: drop-shadow(-8px 0 40px rgba(201,168,76,0.08));
        }
        .ab-name-plate {
          position: absolute;
          bottom: 28px; left: 16px;
          background: rgba(13,27,62,0.88);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 10px; padding: 12px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28);
        }
        .ab-name-plate-name {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 700; color: #fff;
        }
        .ab-name-plate-role {
          font-size: 10px; color: var(--gold);
          font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; margin-top: 3px;
        }

        /* ═══════════════════════════════
           BODY
        ═══════════════════════════════ */
        .ab-body {
          padding: 96px 8%;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px; align-items: start;
          background: var(--cream);
        }
        .ab-story-col { display: flex; flex-direction: column; gap: 36px; }

        .ab-section-label {
          display: flex; align-items: center; gap: 12px;
          font-size: 10px; font-weight: 700; color: var(--gold);
          letter-spacing: 3px; text-transform: uppercase;
        }
        .ab-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent);
        }
        .ab-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 700; color: var(--ink);
          line-height: 1.18; letter-spacing: -0.5px;
        }
        .ab-section-title em { font-style: italic; color: #4a5568; }
        .ab-story-text {
          font-size: 15px; color: var(--muted); line-height: 1.9; font-weight: 300;
        }
        .ab-story-text strong { color: var(--ink); font-weight: 600; }
        .ab-quote {
          border-left: 3px solid var(--gold);
          padding: 8px 0 8px 24px;
        }
        .ab-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-style: italic;
          color: var(--ink); line-height: 1.5;
        }
        .ab-quote-author {
          font-size: 11px; color: var(--gold);
          font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; margin-top: 10px;
        }
        .ab-pillars { display: flex; flex-direction: column; gap: 12px; }
        .ab-pillar {
          background: #fff;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 12px; padding: 18px 20px;
          display: grid; grid-template-columns: 44px 1fr;
          gap: 14px; align-items: start;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .ab-pillar:hover {
          border-color: rgba(201,168,76,0.45);
          box-shadow: 0 8px 30px rgba(201,168,76,0.08);
          transform: translateX(4px);
        }
        .ab-pillar-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: linear-gradient(135deg, #fdf8ec, #f5e8c0);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .ab-pillar-title { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .ab-pillar-desc  { font-size: 12.5px; color: var(--muted); line-height: 1.65; }

        /* Right cards */
        .ab-cards-col {
          display: flex; flex-direction: column; gap: 16px;
          position: sticky; top: 30px;
        }
        .ab-profile-card {
          background: var(--navy);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(13,27,62,0.18);
          border: 1px solid rgba(201,168,76,0.12);
        }
        .ab-profile-header {
          padding: 28px 28px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; gap: 16px; align-items: center;
        }
        .ab-profile-avatar {
          width: 60px; height: 60px; border-radius: 50%;
          border: 2px solid rgba(201,168,76,0.35);
          overflow: hidden; position: relative; flex-shrink: 0;
          background: var(--navy2);
        }
        .ab-profile-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px; font-weight: 700; color: #fff;
        }
        .ab-profile-role {
          font-size: 10px; color: var(--gold);
          text-transform: uppercase; letter-spacing: 1.5px;
          font-weight: 600; margin-top: 4px;
        }
        .ab-profile-body { padding: 20px 28px 26px; }
        .ab-profile-bio {
          font-size: 13px; color: rgba(255,255,255,0.5);
          line-height: 1.78; margin-bottom: 18px;
        }
        .ab-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ab-tag {
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.22);
          color: var(--gold-light);
          font-size: 10px; font-weight: 600;
          padding: 4px 11px; border-radius: 3px;
          letter-spacing: 0.5px; text-transform: uppercase;
        }
        .ab-cta-row { display: flex; gap: 10px; }
        .ab-btn-primary {
          flex: 1; background: var(--gold); color: var(--navy);
          border: none; border-radius: 8px; padding: 14px 20px;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.3px;
          box-shadow: 0 6px 20px rgba(201,168,76,0.3);
          transition: all 0.22s;
        }
        .ab-btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
        .ab-btn-ghost {
          flex: 1; background: transparent; color: var(--ink);
          border: 1.5px solid rgba(13,27,62,0.18); border-radius: 8px;
          padding: 14px 20px; font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.22s;
        }
        .ab-btn-ghost:hover { border-color: var(--gold); color: #a07830; }

        /* ═══════════════════════════════
           FEATURES
        ═══════════════════════════════ */
        .ab-features {
          background: var(--cream-2);
          border-top: 1px solid rgba(201,168,76,0.12);
          padding: 72px 8%;
        }
        .ab-features-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700; color: var(--ink);
          letter-spacing: -0.3px; margin-bottom: 36px;
        }
        .ab-features-title em { font-style: italic; color: #4a5568; }
        .ab-features-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 16px; overflow: hidden;
          gap: 1px; background: rgba(201,168,76,0.1);
        }
        .ab-feature {
          background: var(--cream-2); padding: 32px 24px;
          display: flex; flex-direction: column; gap: 12px;
          transition: background 0.25s;
        }
        .ab-feature:hover { background: #fff; }
        .ab-feature-icon { font-size: 28px; }
        .ab-feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: var(--ink);
        }
        .ab-feature-desc { font-size: 13px; color: var(--muted); line-height: 1.7; }

        /* ═══════════════════════════════
           FOOTER BANNER
        ═══════════════════════════════ */
        .ab-footer-banner {
          background: var(--navy);
          padding: 80px 8%;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
          position: relative; overflow: hidden;
        }
        .ab-footer-banner::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .ab-footer-left { position: relative; z-index: 1; }
        .ab-footer-label {
          font-size: 10px; font-weight: 700; color: var(--gold);
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;
        }
        .ab-footer-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3vw, 40px);
          font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 16px;
        }
        .ab-footer-title em { font-style: italic; color: var(--gold); }
        .ab-footer-desc {
          font-size: 14px; color: rgba(255,255,255,0.43);
          line-height: 1.8; margin-bottom: 28px;
        }
        .ab-footer-btn {
          display: inline-block;
          background: var(--gold); color: var(--navy);
          border: none; border-radius: 8px;
          padding: 14px 32px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; letter-spacing: 0.3px;
          box-shadow: 0 6px 24px rgba(201,168,76,0.35);
          transition: all 0.22s;
        }
        .ab-footer-btn:hover { background: var(--gold-light); transform: translateY(-2px); }
        .ab-footer-right {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .ab-fchip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 12px; padding: 20px 18px;
          display: flex; flex-direction: column; gap: 8px;
          transition: background 0.22s, border-color 0.22s;
        }
        .ab-fchip:hover {
          background: rgba(201,168,76,0.07);
          border-color: rgba(201,168,76,0.35);
        }
        .ab-fchip-icon { font-size: 24px; }
        .ab-fchip-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }
        .ab-fchip-sub   { font-size: 11px; color: rgba(255,255,255,0.35); }

        /* ═══ ANIMATIONS ═══ */
        @keyframes abPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.5); }
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 860px) {
          .ab-hero { grid-template-columns: 1fr; align-items: start; min-height: auto; }
          .ab-hero-right { height: 380px; }
          .ab-hero-divider { display: none; }
          .ab-teacher-img { max-height: 380px !important; }
          .ab-body { grid-template-columns: 1fr; gap: 40px; padding: 60px 6%; }
          .ab-cards-col { position: static; }
          .ab-features-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-footer-banner { grid-template-columns: 1fr; gap: 36px; }
          .ab-footer-right { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ab-hero-left { padding: 52px 6% 40px; }
          .ab-stats-row { flex-wrap: wrap; gap: 20px; }
          .ab-stat { border-right: none; padding-right: 0; margin-right: 0; }
          .ab-features-grid { grid-template-columns: 1fr; }
          .ab-cta-row { flex-direction: column; }
          .ab-footer-right { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ab-root">

        {/* ═══ HERO ═══ */}
        <section className="ab-hero">
          <div className="ab-hero-glow" />
          <div className="ab-hero-divider" />

          {/* LEFT */}
          <div className="ab-hero-left">
            <div className="ab-badge">
              <span className="ab-badge-dot" />
              <span>The Science Centre</span>
            </div>
            <h1 className="ab-hero-title">
              Where Concepts
              <em>Become Results.</em>
            </h1>
            <p className="ab-hero-desc">
              India&apos;s most trusted JEE coaching platform — preparing students for
              JEE Main, JEE Advanced, and Class 12 Boards with clarity,
              depth, and proven strategy.
            </p>
            <div className="ab-stats-row">
              {[
                { num: "10+",  lbl: "Years of Excellence" },
                { num: "100+", lbl: "Students Trained" },
                { num: "97%",  lbl: "Success Rate" },
              ].map((s, i) => (
                <div key={i} className="ab-stat">
                  <span className="ab-stat-num">{s.num}</span>
                  <span className="ab-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — cutout image, natural dimensions, bottom-aligned */}
          <div className="ab-hero-right">
            <div className="ab-hero-arc" />
            <div className="ab-hero-arc-2" />
            <Image
              src={teacher}
              alt="[Sir's Name] – Lead Instructor & Founder"
              className="ab-teacher-img"
              priority
            />
            <div className="ab-name-plate">
              <div className="ab-name-plate-name">[Sir&apos;s Name]</div>
              <div className="ab-name-plate-role">Lead Instructor &amp; Founder</div>
            </div>
          </div>
        </section>

        {/* ═══ BODY ═══ */}
        <section className="ab-body">
          <div className="ab-story-col">
            <div className="ab-section-label">Our Story</div>
            <h2 className="ab-section-title">
              A Coaching Institute Built on<br />
              <em>Science &amp; Strategy</em>
            </h2>
            <p className="ab-story-text">
              <strong>The Science Centre</strong> was founded with a single mission: to bridge the
              gap between understanding concepts and truly <strong>mastering them</strong>. We believe
              education is not just a process — it&apos;s a launchpad that opens the doors to
              IITs, NITs, and top engineering colleges across India.
            </p>
            <div className="ab-quote">
              <div className="ab-quote-text">
                &ldquo;We don&apos;t just teach formulas — we build the intuition to derive them.&rdquo;
              </div>
              <div className="ab-quote-author">— [Sir&apos;s Name], Founder</div>
            </div>
            <p className="ab-story-text">
              From JEE Main to JEE Advanced, Class 12 Boards to competitive problem-solving —
              every programme delivers <strong>real, measurable outcomes</strong>. Our online
              model means expert coaching reaches you wherever you are, on your schedule.
            </p>
            <div className="ab-pillars">
              {[
                { icon: "🔬", title: "Physics, Chemistry & Maths", desc: "Complete JEE Main, JEE Advanced, and Class 12 syllabus — every chapter, every concept covered." },
                { icon: "👨‍🏫", title: "M.Sc Qualified, Personally Guided", desc: "B.Sc and M.Sc qualified educator with a decade of JEE coaching and one-on-one mentorship." },
                { icon: "🚀", title: "Result-Focused Preparation",          desc: "Rank improvement, board marks, IIT/NIT admissions — we prepare you for every target." },
              ].map((p, i) => (
                <div key={i} className="ab-pillar">
                  <div className="ab-pillar-icon">{p.icon}</div>
                  <div>
                    <div className="ab-pillar-title">{p.title}</div>
                    <div className="ab-pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-cards-col">
            <div className="ab-profile-card">
              <div className="ab-profile-header">
                <div className="ab-profile-avatar">
                  <Image
                    src={teacher}
                    alt="[Sir's Name]"
                    fill
                    sizes="60px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                <div>
                  <div className="ab-profile-name">[Sir&apos;s Name]</div>
                  <div className="ab-profile-role">Lead Instructor &amp; Founder</div>
                </div>
              </div>
              <div className="ab-profile-body">
                <p className="ab-profile-bio">
                  With a B.Sc and M.Sc in his field and over a decade of JEE coaching experience,
                  he has guided hundreds of students to crack JEE Main, JEE Advanced, and score
                  top marks in Class 12 Boards through concept clarity and smart strategy.
                </p>
                <div className="ab-tags">
                  <span className="ab-tag">10+ Yrs Exp.</span>
                  <span className="ab-tag">JEE Expert</span>
                  <span className="ab-tag">M.Sc Qualified</span>
                  <span className="ab-tag">12th Boards</span>
                </div>
              </div>
            </div>
            <div className="ab-cta-row">
              <button className="ab-btn-primary">Start Preparing Today →</button>
              <button className="ab-btn-ghost">View Courses</button>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="ab-features">
          <h3 className="ab-features-title">
            Learn from <em>Anywhere</em> — On Your Terms
          </h3>
          <div className="ab-features-grid">
            {[
              { icon: "💻", title: "100% Online",       desc: "Learn from home, hostel, or anywhere. Zero commute, maximum quality." },
              { icon: "🎥", title: "Live Sessions",      desc: "Real-time interactive classes with your instructor every week." },
              { icon: "⏺️", title: "Recorded Backups",  desc: "Every session recorded so you can replay and reinforce learning." },
              { icon: "📅", title: "Flexible Timing",   desc: "Schedule sessions around your school timetable, not the other way around." },
            ].map((f, i) => (
              <div key={i} className="ab-feature">
                <div className="ab-feature-icon">{f.icon}</div>
                <div className="ab-feature-title">{f.title}</div>
                <div className="ab-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER BANNER ═══ */}
        <section className="ab-footer-banner">
          <div className="ab-footer-left">
            <div className="ab-footer-label">Ready to Begin?</div>
            <h2 className="ab-footer-title">
              Your Journey to <em>IIT &amp; Beyond</em><br />Starts Here
            </h2>
            <p className="ab-footer-desc">
              Join hundreds of students who&apos;ve cracked JEE Main, JEE Advanced, and aced
              their Class 12 Boards — all with The Science Centre.
            </p>
            <button className="ab-footer-btn">Enrol Now →</button>
          </div>
          <div className="ab-footer-right">
            {[
              { icon: "📱", label: "Mobile Friendly",     sub: "Learn on any device" },
              { icon: "🌐", label: "Learn Anywhere",       sub: "No location limits" },
              { icon: "🏅", label: "M.Sc Qualified",       sub: "10+ years expertise" },
              { icon: "💬", label: "Doubt Support",        sub: "Always available" },
            ].map((c, i) => (
              <div key={i} className="ab-fchip">
                <div className="ab-fchip-icon">{c.icon}</div>
                <div className="ab-fchip-label">{c.label}</div>
                <div className="ab-fchip-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}