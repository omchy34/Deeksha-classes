"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const centerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/About" },
  { name: "Courses", href: "/Courses" },
  { name: "Gallery", href: "/Gallery" },
  { name: "Testimonials", href: "/Testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // isRounded controls the pill shape — stays false until close animation fully ends
  const [isRounded, setIsRounded] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setIsRounded(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  const handleToggle = () => {
    if (!open) {
      // Opening: immediately square the corners, then expand
      clearTimeout(closeTimerRef.current);
      setIsRounded(false);
      setOpen(true);
    } else {
      // Closing: collapse content first, THEN re-pill after animation finishes
      setOpen(false);
      closeTimerRef.current = setTimeout(() => setIsRounded(true), 400);
    }
  };

  // Drive max-height via JS so both open AND close are equally smooth
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (open) {
      el.style.maxHeight = el.scrollHeight + "px";
      el.style.opacity = "1";
    } else {
      // Pin current rendered height so browser knows where to animate FROM
      el.style.maxHeight = el.scrollHeight + "px";
      // Force reflow so the pinned value registers before we set it to 0
      void el.offsetHeight;
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
    }
  }, [open]);

  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .nav-link {
          position: relative;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          padding: 7px 16px;
          border-radius: 12px;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: rgba(255,255,255,0.75);
          border-radius: 99px;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.13); }
        .nav-link:hover::after { width: 18px; }

        .admission-btn {
          font-family: 'Poppins', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #fff;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.32);
          padding: 8px 22px;
          border-radius: 99px;
          text-decoration: none;
          letter-spacing: 0.03em;
          backdrop-filter: blur(8px);
          transition: background 0.22s, border-color 0.22s, box-shadow 0.22s, transform 0.18s;
          white-space: nowrap;
        }
        .admission-btn:hover {
          background: rgba(255,255,255,0.26);
          border-color: rgba(255,255,255,0.55);
          box-shadow: 0 4px 24px rgba(255,255,255,0.10);
          transform: translateY(-1px);
          color: #fff;
        }

        .hamburger-bar {
          display: block;
          width: 20px;
          height: 2px;
          background: #fff;
          border-radius: 99px;
          transition: all 0.3s ease;
        }
        .bar-open-1 { transform: rotate(45deg) translateY(7px); }
        .bar-open-2 { opacity: 0; transform: scaleX(0); }
        .bar-open-3 { transform: rotate(-45deg) translateY(-7px); }

        .navbar-root {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          width: calc(100% - 24px);
          max-width: 1280px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(15, 15, 25, 0.60);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow: 0 8px 40px rgba(0,0,0,0.30), 0 1px 0 rgba(255,255,255,0.08) inset;
          transition: border-radius cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        .navbar-root.rounded { border-radius: 9999px; }
        .navbar-root.squared { border-radius: 24px; }

        .navbar-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 20px;
        }

        @media (min-width: 1024px) {
          .navbar-root { border-radius: 9999px !important; width: 92%; }
          .navbar-bar {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
          }
        }

        /* JS drives max-height; CSS provides the transition timing */
        .mobile-menu {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity    0.30s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-circle {
          width: 50px; height: 50px;
          border-radius: 50%;
          
         
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px);
          
          transition: background 0.25s, transform 0.25s;
          flex-shrink: 0;
        }
        .logo-wrap {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; min-width: 0;
        }
        .logo-wrap:hover .logo-circle {
          
          
        }

        /* Always show logo text on ALL screen sizes */
        .logo-text-block { display: block; line-height: 1; }

        .mobile-link {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.88);
          padding: 10px 14px;
          border-radius: 12px;
          text-decoration: none;
          display: block;
          transition: background 0.2s, color 0.2s;
        }
        .mobile-link:hover { background: rgba(255,255,255,0.13); color: #fff; }

        .desktop-links     { display: none !important; }
        .desktop-admission { display: none !important; }
        .hamburger-btn     { display: flex !important; }

        @media (min-width: 1024px) {
          .desktop-links     { display: flex !important; }
          .desktop-admission { display: inline-flex !important; }
          .hamburger-btn     { display: none !important; }
        }
      `}</style>

      <nav className={`navbar-root ${isRounded ? "rounded" : "squared"}`}>

        {/* ── Main bar ── */}
        <div className="navbar-bar">

          {/* LEFT — Logo */}
          <Link href="/" className="logo-wrap">
            <div className="logo-circle">
              <Image src="/logo_icon.jpg" className="rounded-full" alt="The English Centre" width={400} height={400} />
            </div>
            <div className="logo-text-block">
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#ffffffff",
                margin: 0,
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}>Deeksha Classes</p>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: "9.5px",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: "2px",
                whiteSpace: "nowrap",
              }}>सा विद्या या विमुक्तये</p>
            </div>
          </Link>

          {/* CENTER — Nav links (desktop only) */}
          <div
            className="desktop-links"
            style={{ alignItems: "center", gap: "2px" }}
          >
            {centerLinks.map(({ name, href }) => (
              <Link key={name} href={href} className="nav-link">{name}</Link>
            ))}
          </div>

          {/* RIGHT — Admission + hamburger */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px" }}>
            <Link href="/Admission" className="admission-btn desktop-admission">
              Admission
            </Link>

            <button
              onClick={handleToggle}
              className="hamburger-btn"
              style={{
                flexDirection: "column",
                gap: "5px",
                padding: "8px",
                borderRadius: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.13)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-bar ${open ? "bar-open-1" : ""}`} />
              <span className={`hamburger-bar ${open ? "bar-open-2" : ""}`} />
              <span className={`hamburger-bar ${open ? "bar-open-3" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <div ref={menuRef} className="mobile-menu" aria-hidden={!open}>
          <div style={{
            padding: "8px 16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}>
            {[...centerLinks, { name: "Admission", href: "/Admission" }].map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => {
                  setOpen(false);
                  closeTimerRef.current = setTimeout(() => setIsRounded(true), 400);
                }}
                className="mobile-link"
                style={{ fontWeight: name === "Admission" ? 600 : 500 }}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

      </nav>
    </>
  );
}