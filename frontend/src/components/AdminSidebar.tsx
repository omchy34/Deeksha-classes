"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

const nav = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: "▦" },
    ],
  },
  {
    group: "Manage",
    items: [
      { label: "Gallery",    href: "/admin/gallery",    icon: "◈" },
      { label: "Admissions",   href: "/admin/admission",   icon: "◫" },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: "⚙" },
      { label: "Logs",     href: "/admin/logs",     icon: "≡" },
    ],
  },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --sb-bg:      #07070f;
          --sb-surface: rgba(255,255,255,0.03);
          --sb-border:  rgba(255,255,255,0.07);
          --sb-text:    #d4d2e0;
          --sb-muted:   rgba(212,210,224,0.32);
          --sb-accent:  #6ee7f7;
          --sb-w:       220px;
          --sb-w-col:   64px;
        }

        .sb-wrap {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 50;
          width: var(--sb-w);
          background: var(--sb-bg);
          border-right: 1px solid var(--sb-border);
          display: flex; flex-direction: column;
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
          font-family: 'Syne', sans-serif;
          overflow: hidden;
        }
        .sb-wrap.collapsed { width: var(--sb-w-col); }

        /* noise grain */
        .sb-wrap::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.022;
        }

        /* top logo row */
        .sb-top {
          padding: 20px 16px 16px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--sb-border);
          min-height: 64px; flex-shrink: 0;
        }
        .sb-logo {
          display: flex; align-items: center; gap: 10px;
          overflow: hidden; white-space: nowrap;
          opacity: 1; transition: opacity 0.15s;
        }
        .sb-logo-mark {
          width: 32px; height: 32px; flex-shrink: 0;
          background: linear-gradient(135deg, rgba(110,231,247,0.2), rgba(110,231,247,0.05));
          border: 1px solid rgba(110,231,247,0.25);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: var(--sb-accent);
          box-shadow: 0 0 14px rgba(110,231,247,0.08);
        }
        .sb-logo-text {
          font-size: 13px; font-weight: 800; letter-spacing: 0.5px;
          color: var(--sb-text);
          font-family: 'JetBrains Mono', monospace;
        }
        .sb-logo-text span { color: var(--sb-accent); }
        .sb-toggle {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: transparent; border: 1px solid var(--sb-border);
          border-radius: 7px; cursor: pointer;
          color: var(--sb-muted); font-size: 11px;
          transition: all 0.15s;
        }
        .sb-toggle:hover { background: rgba(255,255,255,0.05); color: var(--sb-text); }

        /* nav scroll area */
        .sb-nav { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 16px 10px; }
        .sb-nav::-webkit-scrollbar { width: 0; }

        .sb-group-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; font-weight: 500; letter-spacing: 2px;
          color: var(--sb-muted); text-transform: uppercase;
          padding: 0 8px; margin: 16px 0 6px;
          white-space: nowrap; overflow: hidden;
          transition: opacity 0.15s;
        }
        .collapsed .sb-group-label { opacity: 0; }

        .sb-item {
          display: flex; align-items: center; gap: 11px;
          padding: 9px 10px; border-radius: 9px;
          color: var(--sb-muted);
          font-size: 13px; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: all 0.15s ease;
          white-space: nowrap; overflow: hidden;
          position: relative; margin-bottom: 2px;
        }
        .sb-item:hover { background: rgba(255,255,255,0.04); color: var(--sb-text); }
        .sb-item.active {
          background: rgba(110,231,247,0.08);
          color: var(--sb-accent);
          border: 1px solid rgba(110,231,247,0.15);
        }
        .sb-item.active::before {
          content: '';
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 2px; border-radius: 99px;
          background: var(--sb-accent);
          box-shadow: 0 0 8px var(--sb-accent);
        }
        .sb-icon {
          font-size: 15px; flex-shrink: 0; width: 20px;
          text-align: center; line-height: 1;
        }
        .sb-label { transition: opacity 0.15s; }
        .collapsed .sb-label { opacity: 0; width: 0; }

        /* bottom user section */
        .sb-bottom {
          padding: 12px 10px;
          border-top: 1px solid var(--sb-border);
          flex-shrink: 0;
        }
        .sb-user {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--sb-border);
          overflow: hidden; white-space: nowrap;
          margin-bottom: 6px;
        }
        .sb-avatar {
          width: 28px; height: 28px; flex-shrink: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(110,231,247,0.3), rgba(183,148,244,0.3));
          border: 1px solid rgba(110,231,247,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: var(--sb-accent);
          font-family: 'JetBrains Mono', monospace;
        }
        .sb-user-info { overflow: hidden; }
        .sb-user-email {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: var(--sb-muted);
          overflow: hidden; text-overflow: ellipsis;
          max-width: 130px;
          transition: opacity 0.15s;
        }
        .collapsed .sb-user-info { opacity: 0; width: 0; }

        .sb-signout {
          display: flex; align-items: center; gap: 11px;
          width: 100%; padding: 8px 10px; border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: rgba(239,68,68,0.5);
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 600;
          cursor: pointer; transition: all 0.15s;
          white-space: nowrap; overflow: hidden;
          text-align: left;
        }
        .sb-signout:hover {
          background: rgba(239,68,68,0.07);
          border-color: rgba(239,68,68,0.15);
          color: #f87171;
        }
        .collapsed .sb-signout span { opacity: 0; width: 0; overflow: hidden; }
      `}</style>

      <aside className={`sb-wrap${collapsed ? " collapsed" : ""}`}>
        {/* Top */}
        <div className="sb-top">
          <div className="sb-logo">
            <div className="sb-logo-mark">⬡</div>
            {!collapsed && <span className="sb-logo-text">ADM<span>IN</span></span>}
          </div>
          <button className="sb-toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          {nav.map((group) => (
            <div key={group.group}>
              <div className="sb-group-label">{group.group}</div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sb-item${pathname === item.href ? " active" : ""}`}
                >
                  <span className="sb-icon">{item.icon}</span>
                  <span className="sb-label">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="sb-bottom">
          <div className="sb-user">
            <div className="sb-avatar">
              {email?.charAt(0).toUpperCase()}
            </div>
            <div className="sb-user-info">
              <div className="sb-user-email">{email}</div>
            </div>
          </div>
          <button className="sb-signout" onClick={() => signOut({ callbackUrl: "/" })}>
            <span style={{ fontSize: "13px", flexShrink: 0 }}>⏻</span>
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}