// FeaturesSection — Class 11, 12 & JEE Coaching
const features = [
  {
    icon: "⚛️",
    title: "Physics Mastery",
    desc: "From mechanics to modern physics — concept-first teaching with JEE-level problem solving, derivations, and weekly chapter tests.",
    bg: "rgba(59,130,246,0.18)",
  },
  {
    icon: "🧪",
    title: "Chemistry Simplified",
    desc: "Physical, Organic & Inorganic Chemistry covered in depth. Reaction mechanisms, named reactions, and NCERT + JEE advanced problems.",
    bg: "rgba(16,185,129,0.18)",
  },
  {
    icon: "📐",
    title: "Mathematics Edge",
    desc: "Calculus, Algebra, Coordinate Geometry, Trigonometry — structured from Class 11 foundations all the way to JEE Advanced level.",
    bg: "rgba(245,158,11,0.18)",
  },
  {
    icon: "🧬",
    title: "Biology (NEET Track)",
    desc: "Botany & Zoology with NCERT line-by-line coverage, diagram practice, and high-yield MCQs for NEET & Class 12 board exams.",
    bg: "rgba(139,92,246,0.18)",
  },
  {
    icon: "📊",
    title: "JEE Mock Test Series",
    desc: "NTA-pattern full syllabus mock tests with detailed performance analysis, rank predictions, and chapter-wise weak area reports.",
    bg: "rgba(244,63,94,0.18)",
  },
  {
    icon: "📚",
    title: "Board Exam Prep",
    desc: "CBSE & state board Class 11 & 12 preparation — PYQs, sample papers, revision notes, and important question banks included.",
    bg: "rgba(249,115,22,0.18)",
  },
  {
    icon: "🎯",
    title: "Daily Practice Problems",
    desc: "Topic-wise DPPs designed by expert faculty — from concept-builder to JEE Advanced level, with video solutions for every problem.",
    bg: "rgba(20,184,166,0.18)",
  },
  {
    icon: "🧑‍🏫",
    title: "Doubt Clearing Sessions",
    desc: "Dedicated live doubt sessions after every class. No question goes unanswered — ask in class, on WhatsApp, or book a 1-on-1 slot.",
    bg: "rgba(168,85,247,0.18)",
  },
  {
    icon: "🏆",
    title: "Rank Booster Programme",
    desc: "Special batches for JEE Advanced aspirants — high-difficulty problems, IIT-level discussions, and mentorship from top-rank alumni.",
    bg: "rgba(234,179,8,0.18)",
  },
];

export function FeaturesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .fs-sec {
          background: linear-gradient(145deg, #060d1f 0%, #0d1b3e 55%, #0a1628 100%);
          padding: 88px 8%;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Top-right blue glow */
        .fs-sec::before {
          content: '';
          position: absolute;
          top: -130px; right: -90px;
          width: 460px; height: 460px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Bottom-left orange glow */
        .fs-sec::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -60px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Top label row */
        .fs-tag-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .fs-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 16px;
          border-radius: 30px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          border: 1px solid;
        }
        .fs-tag-blue   { background: rgba(29,78,216,0.15);  color: #93c5fd; border-color: rgba(147,197,253,0.25); }
        .fs-tag-orange { background: rgba(234,88,12,0.15);  color: #fdba74; border-color: rgba(253,186,116,0.25); }
        .fs-tag-purple { background: rgba(124,58,237,0.15); color: #c4b5fd; border-color: rgba(196,181,253,0.25); }

        .fs-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3.5vw, 44px);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .fs-h2 .fs-blue   { color: #60a5fa; }
        .fs-h2 .fs-orange { color: #fb923c; }

        .fs-p {
          color: rgba(255,255,255,0.48);
          font-size: 15px;
          max-width: 560px;
          margin-bottom: 52px;
          line-height: 1.8;
        }

        /* Subject strip */
        .fs-subjects {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .fs-subject {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          border: 1.5px solid;
          font-family: 'DM Sans', sans-serif;
        }
        .fs-sub-phy { background: rgba(59,130,246,0.12);  color: #93c5fd; border-color: rgba(59,130,246,0.25); }
        .fs-sub-che { background: rgba(16,185,129,0.12);  color: #6ee7b7; border-color: rgba(16,185,129,0.25); }
        .fs-sub-mat { background: rgba(245,158,11,0.12);  color: #fcd34d; border-color: rgba(245,158,11,0.25); }
        .fs-sub-bio { background: rgba(168,85,247,0.12);  color: #d8b4fe; border-color: rgba(168,85,247,0.25); }

        /* Grid */
        .fs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .fc {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 30px 24px;
          transition: all 0.35s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .fc::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #1d4ed8, #7c3aed, #ea580c);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .fc:hover {
          background: rgba(29,78,216,0.10);
          border-color: rgba(96,165,250,0.28);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }
        .fc:hover::before { opacity: 1; }

        .fc-icon {
          width: 56px; height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 18px;
        }
        .fc-title {
          color: #f1f5f9;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
          font-family: 'DM Sans', sans-serif;
        }
        .fc-desc {
          color: rgba(255,255,255,0.50);
          font-size: 13.5px;
          line-height: 1.75;
          font-family: 'DM Sans', sans-serif;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .fs-sec { padding: 60px 5%; }
          .fs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="fs-sec">

        {/* Badge row */}
        <div className="fs-tag-row">
          <span className="fs-tag fs-tag-blue">Class 11 &amp; 12</span>
          <span className="fs-tag fs-tag-orange">JEE Main</span>
          <span className="fs-tag fs-tag-purple">JEE Advanced</span>
        </div>

        <h2 className="fs-h2">
          Everything You Need to{" "}
          <span className="fs-blue">Score High</span>
          <br />
          &amp; <span className="fs-orange">Crack JEE</span>
        </h2>

        <p className="fs-p">
          Whether you&apos;re starting Class 11 or targeting JEE Advanced — our
          structured coaching gives you the concepts, practice, and mentorship
          to reach your rank goal.
        </p>

        {/* Subject pills */}
        <div className="fs-subjects">
          <span className="fs-subject fs-sub-phy">⚛️ Physics</span>
          <span className="fs-subject fs-sub-che">🧪 Chemistry</span>
          <span className="fs-subject fs-sub-mat">📐 Mathematics</span>
          <span className="fs-subject fs-sub-bio">🧬 Biology</span>
        </div>

        <div className="fs-grid">
          {features.map((f) => (
            <div key={f.title} className="fc">
              <div className="fc-icon" style={{ background: f.bg }}>
                {f.icon}
              </div>
              <div className="fc-title">{f.title}</div>
              <div className="fc-desc">{f.desc}</div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}