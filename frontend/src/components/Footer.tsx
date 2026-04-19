"use client";
import Image from "next/image";

const footerLinks = {
  Programmes: [
    "Class 11 Foundation",
    "Class 12 Boards + JEE Main",
    "JEE Advanced Intensive",
    "Integrated 2-Year Programme",
    "JEE Main Crash Course",
    "Repeater Batch",
  ],
  Company: [
    "About Us",
    "Our Faculty",
    "Gallery",
    "Results & Toppers",
    "Careers",
    "Contact Us",
  ],
  Support: [
    "Help Center",
    "Privacy Policy",
    "Terms of Service",
    "Refund Policy",
    "Student Login",
    "Report an Issue",
  ],
};

const socials = [
  { icon: "📘", label: "Facebook" },
  { icon: "📸", label: "Instagram" },
  { icon: "▶️", label: "YouTube" },
  { icon: "🐦", label: "Twitter" },
  { icon: "💼", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .tec-ft *, .tec-ft *::before, .tec-ft *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .tec-ft {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0a0f1e;
          color: rgba(255,255,255,0.6);
          --navy: #0d1b3e;
          --gold: #b8962e;
          --gold-dim: rgba(184,150,46,0.35);
          --purple: #7c3aed;
        }

        /* ── ACHIEVEMENT STRIP ── */
        .tec-ft-strip {
          background: #0d1b3e;
          padding: 36px 8%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          border-bottom: 1px solid rgba(184,150,46,0.12);
        }
        .tec-ft-strip-item {
          text-align: center;
          padding: 0 12px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .tec-ft-strip-item:last-child { border-right: none; }
        .tec-ft-strip-num {
          font-size: 28px; font-weight: 700;
          color: var(--gold); display: block;
          letter-spacing: -0.5px; line-height: 1; margin-bottom: 6px;
        }
        .tec-ft-strip-lbl {
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase; letter-spacing: 1px;
          display: block;
        }

        /* ── MAIN FOOTER ── */
        .tec-ft-main {
          padding: 56px 8% 0;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          position: relative;
        }
        .tec-ft-main::before {
          content: '';
          position: absolute; top: 0; left: 8%; right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,150,46,0.3), rgba(184,150,46,0.3), transparent);
        }

        /* Brand col */
        .tec-ft-brand { padding-top: 4px; }
        .tec-ft-logo { display: block; margin-bottom: 18px; }
        .tec-ft-tagline {
          font-size: 13px; color: rgba(255,255,255,0.4);
          line-height: 1.8; max-width: 280px; margin-bottom: 28px;
        }
        .tec-ft-tagline strong { color: rgba(255,255,255,0.7); font-weight: 600; }

        /* Contact */
        .tec-ft-contact { display: flex; flex-direction: column; gap: 10px; margin-bottom: 26px; }
        .tec-ft-contact-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .tec-ft-contact-item:hover { color: rgba(255,255,255,0.9); }
        .tec-ft-contact-icon {
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(184,150,46,0.1);
          border: 1px solid rgba(184,150,46,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }

        /* Socials */
        .tec-ft-socials { display: flex; gap: 8px; flex-wrap: wrap; }
        .tec-ft-soc {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .tec-ft-soc:hover {
          background: var(--gold); border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(184,150,46,0.35);
        }

        /* Link columns */
        .tec-ft-col h4 {
          font-size: 10px; font-weight: 700;
          color: rgba(255,255,255,0.9);
          text-transform: uppercase; letter-spacing: 2px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(184,150,46,0.2);
          display: block;
        }
        .tec-ft-col a {
          display: flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.42);
          text-decoration: none; font-size: 13px;
          margin-bottom: 12px;
          transition: all 0.2s;
          line-height: 1.3;
        }
        .tec-ft-col a::before {
          content: '›'; color: var(--gold);
          font-size: 15px; font-weight: 700;
          line-height: 1; flex-shrink: 0;
          opacity: 0; transform: translateX(-4px);
          transition: all 0.2s;
        }
        .tec-ft-col a:hover { color: rgba(255,255,255,0.88); padding-left: 4px; }
        .tec-ft-col a:hover::before { opacity: 1; transform: translateX(0); }

        /* ── DIVIDER ── */
        .tec-ft-divider {
          margin: 48px 8% 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
        }

        /* ── BOTTOM BAR ── */
        .tec-ft-bottom {
          padding: 24px 8% 28px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .tec-ft-copy { font-size: 12px; color: rgba(255,255,255,0.25); }
        .tec-ft-copy strong { color: rgba(255,255,255,0.45); font-weight: 600; }
        .tec-ft-bottom-links { display: flex; gap: 20px; flex-wrap: wrap; }
        .tec-ft-bottom-links a {
          font-size: 11px; color: rgba(255,255,255,0.25);
          text-decoration: none; transition: color 0.2s;
        }
        .tec-ft-bottom-links a:hover { color: rgba(255,255,255,0.65); }
        .tec-ft-made { font-size: 11px; color: rgba(255,255,255,0.2); }
        .tec-ft-made span { color: #ef4444; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .tec-ft-main { grid-template-columns: 1fr 1fr 1fr; }
          .tec-ft-brand { grid-column: 1 / -1; display: grid; grid-template-columns: auto 1fr; gap: 40px; align-items: start; }
        }
        @media (max-width: 768px) {
          .tec-ft-strip { grid-template-columns: repeat(2,1fr); }
          .tec-ft-main { grid-template-columns: 1fr 1fr; }
          .tec-ft-brand { grid-column: 1/-1; grid-template-columns: 1fr; }
          .tec-ft-bottom { flex-direction: column; text-align: center; }
          .tec-ft-bottom-links { justify-content: center; }
        }
        @media (max-width: 480px) {
          .tec-ft-main { grid-template-columns: 1fr; }
          .tec-ft-strip { grid-template-columns: repeat(2,1fr); padding: 28px 6%; }
          .tec-ft-strip-item { border-right: none; }
        }
      `}</style>

      <footer className="tec-ft">

        {/* ── ACHIEVEMENT STRIP ── */}
        <div className="tec-ft-strip">
          {[
            { n: "100+",  l: "Students Enrolled" },
            { n: "97%",   l: "Success Rate" },
            { n: "10+",   l: "Years of Excellence" },
            { n: "IIT",   l: "Qualified Selections" },
          ].map(s => (
            <div key={s.l} className="tec-ft-strip-item">
              <span className="tec-ft-strip-num">{s.n}</span>
              <span className="tec-ft-strip-lbl">{s.l}</span>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="tec-ft-main">

          {/* Brand */}
          <div className="tec-ft-brand">
            <div>
              <div className="tec-ft-logo">
                <Image
                  src="/logo_icon.jpg"
                  className="rounded-full"
                  alt="The Science Centre Logo"
                  width={180} height={52}
                  style={{ height: "52px", width: "auto", objectFit: "contain" }}
                />
              </div>
              <p className="tec-ft-tagline">
                India&apos;s trusted JEE coaching institute. We believe{" "}
                <strong>every student deserves expert guidance</strong> — delivered
                online, at scale, without compromise on quality.
              </p>
            </div>
            <div>
              <div className="tec-ft-contact">
                {[
                  { icon: "📞", text: "+91 98765 43210" },
                  { icon: "📧", text: "hello@thesciencecentre.in" },
                  { icon: "📍", text: "100% Online · Pan India" },
                ].map(c => (
                  <div key={c.text} className="tec-ft-contact-item">
                    <div className="tec-ft-contact-icon">{c.icon}</div>
                    {c.text}
                  </div>
                ))}
              </div>
              <div className="tec-ft-socials">
                {socials.map(s => (
                  <div key={s.label} className="tec-ft-soc" title={s.label}>{s.icon}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="tec-ft-col">
              <h4>{title}</h4>
              {links.map(l => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>

        <div className="tec-ft-divider" />

        {/* ── BOTTOM BAR ── */}
        <div className="tec-ft-bottom">
          <div className="tec-ft-copy">
            © 2025 <strong>The Science Centre</strong>. All rights reserved.
          </div>
          <div className="tec-ft-bottom-links">
            {["Privacy Policy", "Terms of Service", "Refund Policy", "Sitemap"].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
          <div className="tec-ft-made">Made with <span>♥</span> for India&apos;s JEE Aspirants</div>
        </div>

      </footer>
    </>
  );
}

export function FloatingCallBtn() {
  return (
    <>
      <style>{`
        .tec-fcall {
          position: fixed; bottom: 28px; right: 28px;
          width: 54px; height: 54px; border-radius: 50%;
          background: #b8962e;
          color: #0d1b3e; display: flex; align-items: center;
          justify-content: center; font-size: 22px;
          cursor: pointer; z-index: 999; border: none;
          box-shadow: 0 4px 20px rgba(184,150,46,0.5);
          animation: tecPulse 2.2s ease-in-out infinite;
          transition: all 0.2s;
        }
        .tec-fcall:hover { transform: scale(1.1); box-shadow: 0 8px 28px rgba(184,150,46,0.65); }
        @keyframes tecPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(184,150,46,0.5); }
          50%       { box-shadow: 0 4px 32px rgba(184,150,46,0.8), 0 0 0 8px rgba(184,150,46,0.12); }
        }
      `}</style>
      <button className="tec-fcall" title="Call Us Now">📞</button>
    </>
  );
}