"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES — mirrors the Mongoose model shape returned by GET /api/videos
// ─────────────────────────────────────────────────────────────────────────────
interface Video {
  _id:      string;
  title:    string;
  category: string;
  duration: string;
  level:    string;
  videoUrl: string;
  desc:     string;
}

const levelColor: Record<string, string> = {
  Beginner:           "#d1fae5:#065f46",
  Basic:              "#dbeafe:#1e40af",
  Intermediate:       "#fef3c7:#92400e",
  "Upper Intermediate":"#ede9fe:#5b21b6",
  Advanced:           "#fee2e2:#991b1b",
  "All Levels":       "#f3f4f6:#374151",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derives an ImageKit thumbnail from the video URL.
 * Appends /tr:so-2,w-640,h-360,fo-auto to get a JPEG frame at 2 s.
 */
function ikThumb(videoUrl: string): string {
  return `${videoUrl}/tr:so-2,w-640,h-360,fo-auto`;
}

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL — falls back to a gradient placeholder if IK URL isn't live yet
// ─────────────────────────────────────────────────────────────────────────────
function VideoThumb({ videoUrl, title }: { videoUrl: string; title: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div style={{
        width: "100%", height: "100%",
        background: "linear-gradient(135deg, #1e1b4b 0%, #2d2b6e 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "10px",
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.08)" />
          <polygon points="16,13 30,20 16,27" fill="rgba(255,255,255,0.5)" />
        </svg>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "0 12px" }}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={ikThumb(videoUrl)}
      alt={title}
      onError={() => setErrored(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON CARD — shown while fetching
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="dv-card" style={{ pointerEvents: "none" }}>
      <div className="dv-thumb" style={{ background: "#e9e7ff" }} />
      <div className="dv-card-body" style={{ gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="dv-skel" style={{ width: 72, height: 20, borderRadius: 20 }} />
          <div className="dv-skel" style={{ width: 80, height: 20, borderRadius: 20 }} />
        </div>
        <div className="dv-skel" style={{ width: "85%", height: 18, borderRadius: 6 }} />
        <div className="dv-skel" style={{ width: "60%", height: 18, borderRadius: 6 }} />
        <div className="dv-skel" style={{ width: "100%", height: 13, borderRadius: 5, marginTop: 4 }} />
        <div className="dv-skel" style={{ width: "75%",  height: 13, borderRadius: 5 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function DemoVideosPage() {
  const [videos, setVideos]           = useState<Video[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingId, setPlayingId]     = useState<string | null>(null);

  // ── Fetch from API ──────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/demo-upload");
        const json = await res.json();
        if (!json.success) throw new Error(json.error || "Failed to load videos");
        setVideos(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Derived data ────────────────────────────────────────────────────────
  // Build category list dynamically from whatever is in the DB
  const categories = ["All", ...Array.from(new Set(videos.map(v => v.category)))];

  const filtered = activeCategory === "All"
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const playingVideo = videos.find(v => v._id === playingId);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        .dv-root, .dv-root *, .dv-root *::before, .dv-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dv-root {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; line-height: 1.75;
          color: #374151; background: #f8f7ff; min-height: 100vh;
        }

        /* ── HERO ── */
        .dv-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          padding: 72px 8% 60px; text-align: center;
          position: relative; overflow: hidden;
        }
        .dv-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .dv-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .dv-blob-1 { width: 320px; height: 320px; background: #7c3aed; opacity: 0.13; top: -80px; right: -40px; }
        .dv-blob-2 { width: 240px; height: 240px; background: #4f46e5; opacity: 0.13; bottom: -70px; left: -30px; }
        .dv-blob-3 { width: 180px; height: 180px; background: #fbbf24; opacity: 0.06; top: 10px; left: 40%; }
        .dv-hero-inner { position: relative; z-index: 2; }
        .dv-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(139,92,246,0.15); border: 1px solid rgba(139,92,246,0.35);
          color: #c4b5fd; font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700; padding: 5px 16px;
          border-radius: 20px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 22px;
        }
        .dv-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #a78bfa; animation: dvPulse 2s ease-in-out infinite; }
        .dv-hero-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 900; color: #fff; line-height: 1.08;
          letter-spacing: -1.5px; margin-bottom: 18px;
        }
        .dv-hero-title .gold { font-style: italic; color: #fbbf24; position: relative; display: inline-block; }
        .dv-hero-title .gold::after {
          content: ''; position: absolute; left: 0; bottom: -4px;
          width: 100%; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #fbbf24, #f59e0b);
        }
        .dv-hero-sub { font-size: 16px; color: rgba(255,255,255,0.62); line-height: 1.8; max-width: 480px; margin: 0 auto; }

        /* ── FILTER BAR ── */
        .dv-filter-bar { padding: 36px 8% 0; display: flex; flex-wrap: wrap; gap: 10px; }
        .dv-filter-btn {
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          padding: 8px 18px; border-radius: 20px; border: 1.5px solid #e5e7eb;
          background: #fff; color: #6b7280; cursor: pointer;
          transition: all 0.2s; letter-spacing: 0.3px;
        }
        .dv-filter-btn:hover { border-color: #4f46e5; color: #4f46e5; }
        .dv-filter-btn.active {
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          border-color: transparent; color: #fff;
          box-shadow: 0 4px 14px rgba(79,70,229,0.3);
        }

        /* ── GRID ── */
        .dv-grid { padding: 28px 8% 80px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

        /* ── CARD ── */
        .dv-card {
          background: #fff; border-radius: 18px;
          border: 1px solid rgba(79,70,229,0.08);
          box-shadow: 0 4px 18px rgba(79,70,229,0.06);
          overflow: hidden; transition: transform 0.25s, box-shadow 0.25s;
          display: flex; flex-direction: column;
        }
        .dv-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(79,70,229,0.13); }

        .dv-thumb { height: 190px; position: relative; cursor: pointer; overflow: hidden; background: #1e1b4b; }
        .dv-play-overlay {
          position: absolute; inset: 0; background: rgba(15,12,41,0.55);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.25s;
        }
        .dv-thumb:hover .dv-play-overlay { opacity: 1; }
        .dv-play-btn {
          width: 56px; height: 56px; border-radius: 50%; background: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35); transition: transform 0.2s;
        }
        .dv-thumb:hover .dv-play-btn { transform: scale(1.1); }
        .dv-play-triangle {
          width: 0; height: 0;
          border-top: 11px solid transparent; border-bottom: 11px solid transparent;
          border-left: 18px solid #4f46e5; margin-left: 4px;
        }
        .dv-duration-badge {
          position: absolute; bottom: 10px; right: 10px;
          background: rgba(0,0,0,0.72); color: #fff; font-size: 11px;
          font-family: 'Syne', sans-serif; font-weight: 700;
          padding: 3px 9px; border-radius: 6px; letter-spacing: 0.3px;
        }

        .dv-card-body { padding: 18px 20px 20px; flex: 1; display: flex; flex-direction: column; }
        .dv-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
        .dv-cat-tag {
          font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
          padding: 3px 10px; border-radius: 20px; letter-spacing: 0.5px;
          background: #ede9fe; color: #5b21b6;
        }
        .dv-level-tag {
          font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
          padding: 3px 10px; border-radius: 20px; letter-spacing: 0.5px;
        }
        .dv-card-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: #0f0c29; letter-spacing: -0.2px; line-height: 1.3; margin-bottom: 8px; }
        .dv-card-desc { font-size: 13px; color: #6b7280; line-height: 1.6; flex: 1; }
        .dv-card-footer { margin-top: 16px; padding-top: 14px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; }
        .dv-watch-btn {
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 800;
          color: #4f46e5; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 5px; padding: 0;
          transition: gap 0.2s;
        }
        .dv-watch-btn:hover { gap: 8px; }
        .dv-free-tag {
          font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700;
          background: #d1fae5; color: #065f46; padding: 3px 10px; border-radius: 20px;
        }

        /* ── SKELETON ── */
        .dv-skel {
          background: linear-gradient(90deg,#ede9ff 25%,#ddd8ff 50%,#ede9ff 75%);
          background-size: 200% 100%; animation: dvShimmer 1.4s infinite;
        }
        @keyframes dvShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ── ERROR STATE ── */
        .dv-error {
          grid-column: 1/-1; text-align: center; padding: 64px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .dv-error-icon { font-size: 36px; opacity: 0.4; }
        .dv-error-msg { font-family: 'Syne', sans-serif; font-size: 14px; color: #6b7280; }
        .dv-retry-btn {
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          padding: 9px 20px; border-radius: 10px;
          background: linear-gradient(135deg,#4f46e5,#6d28d9); color: #fff;
          border: none; cursor: pointer;
        }

        /* ── EMPTY STATE ── */
        .dv-empty {
          grid-column: 1/-1; text-align: center; padding: 64px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          color: #9ca3af;
        }
        .dv-empty-icon { font-size: 32px; opacity: 0.35; }
        .dv-empty-txt { font-family: 'Syne', sans-serif; font-size: 13px; }

        /* ── MODAL ── */
        .dv-modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 20px;
        }
        .dv-modal {
          background: #0f0c29; border-radius: 18px; overflow: hidden;
          max-width: 680px; width: 100%; position: relative;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }
        .dv-modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          background: rgba(255,255,255,0.12); border: none; color: #fff;
          width: 32px; height: 32px; border-radius: 50%; font-size: 14px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .dv-modal-close:hover { background: rgba(255,255,255,0.22); }
        .dv-modal-player { width: 100%; aspect-ratio: 16/9; background: #000; }
        .dv-modal-player video { width: 100%; height: 100%; display: block; background: #000; }
        .dv-modal-footer {
          padding: 18px 22px; display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }
        .dv-modal-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -0.2px; }
        .dv-modal-meta { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 3px; font-family: 'Syne', sans-serif; }
        .dv-modal-cta {
          background: linear-gradient(135deg, #4f46e5, #6d28d9); color: #fff;
          border: none; padding: 10px 20px; border-radius: 10px;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800;
          cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: opacity 0.2s;
        }
        .dv-modal-cta:hover { opacity: 0.88; }

        /* ── CTA BANNER ── */
        .dv-cta-banner {
          margin: 0 8% 80px;
          background: linear-gradient(135deg, #0f0c29 0%, #1e1b4b 45%, #302b63 100%);
          border-radius: 20px; padding: 44px 48px;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          position: relative; overflow: hidden;
        }
        .dv-cta-banner::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .dv-cta-text { position: relative; z-index: 1; }
        .dv-cta-title { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.5px; margin-bottom: 8px; }
        .dv-cta-title span { font-style: italic; color: #fbbf24; }
        .dv-cta-sub { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.6; max-width: 380px; }
        .dv-cta-actions { display: flex; gap: 12px; flex-shrink: 0; position: relative; z-index: 1; }
        .dv-cta-btn-primary {
          background: linear-gradient(135deg, #4f46e5, #6d28d9); color: #fff;
          border: none; padding: 13px 24px; border-radius: 11px;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800;
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 6px 20px rgba(79,70,229,0.4); transition: opacity 0.2s;
        }
        .dv-cta-btn-primary:hover { opacity: 0.88; }
        .dv-cta-btn-secondary {
          background: rgba(255,255,255,0.08); color: #fff;
          border: 1px solid rgba(255,255,255,0.2); padding: 13px 24px;
          border-radius: 11px; font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 800; cursor: pointer; white-space: nowrap;
          transition: background 0.2s;
        }
        .dv-cta-btn-secondary:hover { background: rgba(255,255,255,0.14); }

        @keyframes dvPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }

        @media (max-width: 1024px) { .dv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .dv-hero { padding: 52px 5% 48px; }
          .dv-filter-bar { padding: 24px 5% 0; }
          .dv-grid { grid-template-columns: 1fr; padding: 20px 5% 60px; }
          .dv-cta-banner { flex-direction: column; margin: 0 5% 60px; padding: 32px 24px; }
          .dv-cta-actions { flex-direction: column; width: 100%; }
          .dv-modal-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="dv-root">

        {/* ── HERO ── */}
        <div className="dv-hero">
          <div className="dv-blob dv-blob-1" />
          <div className="dv-blob dv-blob-2" />
          <div className="dv-blob dv-blob-3" />
          <div className="dv-hero-inner">
            <div className="dv-hero-badge"><span className="dv-badge-dot" />Free Demo Lessons</div>
            <h1 className="dv-hero-title">Watch & <span className="gold">Learn Free</span></h1>
            <p className="dv-hero-sub">Explore our demo lessons before you enrol. No sign-up required — just press play.</p>
          </div>
        </div>

        {/* ── FILTER BAR — hidden while loading ── */}
        {!loading && !error && videos.length > 0 && (
          <div className="dv-filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`dv-filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── VIDEO GRID ── */}
        <div className="dv-grid">

          {/* Loading skeletons */}
          {loading && [1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}

          {/* Error state */}
          {!loading && error && (
            <div className="dv-error">
              <div className="dv-error-icon">⚠️</div>
              <div className="dv-error-msg">{error}</div>
              <button className="dv-retry-btn" onClick={() => window.location.reload()}>Try Again</button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="dv-empty">
              <div className="dv-empty-icon">▶</div>
              <div className="dv-empty-txt">
                {videos.length === 0
                  ? "No demo videos yet — check back soon."
                  : "No videos in this category yet."}
              </div>
            </div>
          )}

          {/* Video cards */}
          {!loading && !error && filtered.map(v => {
            const [bg, text] = (levelColor[v.level] ?? "#f3f4f6:#374151").split(":");
            return (
              <div key={v._id} className="dv-card">
                <div className="dv-thumb" onClick={() => setPlayingId(v._id)}>
                  <VideoThumb videoUrl={v.videoUrl} title={v.title} />
                  <div className="dv-play-overlay">
                    <div className="dv-play-btn">
                      <div className="dv-play-triangle" />
                    </div>
                  </div>
                  <div className="dv-duration-badge">{v.duration}</div>
                </div>
                <div className="dv-card-body">
                  <div className="dv-card-meta">
                    <span className="dv-cat-tag">{v.category}</span>
                    <span className="dv-level-tag" style={{ background: bg, color: text }}>{v.level}</span>
                  </div>
                  <div className="dv-card-title">{v.title}</div>
                  <div className="dv-card-desc">{v.desc}</div>
                  <div className="dv-card-footer">
                    <button className="dv-watch-btn" onClick={() => setPlayingId(v._id)}>Watch Free →</button>
                    <span className="dv-free-tag">FREE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA BANNER ── */}
        {!loading && !error && (
          <div className="dv-cta-banner">
            <div className="dv-cta-text">
              <div className="dv-cta-title">Ready to go <span>beyond demos?</span></div>
              <div className="dv-cta-sub">Join a live batch with Mrs. Anjali Chatterjee and get personalised feedback, recordings, and a completion certificate.</div>
            </div>
            <div className="dv-cta-actions">
              <Link className="dv-cta-btn-primary" href="/Admission">Enrol Now →</Link>
              <Link className="dv-cta-btn-secondary" href="/Admission">Send an Enquiry</Link>
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL ── */}
      {playingId !== null && playingVideo && (
        <div className="dv-modal-backdrop" onClick={() => setPlayingId(null)}>
          <div className="dv-modal" onClick={e => e.stopPropagation()}>
            <button className="dv-modal-close" onClick={() => setPlayingId(null)}>✕</button>
            <div className="dv-modal-player">
              {/*
                key prop forces React to remount the <video> element when switching videos,
                ensuring the new src is loaded fresh rather than appended.
              */}
              <video
                key={playingVideo.videoUrl}
                src={playingVideo.videoUrl}
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
                onContextMenu={e => e.preventDefault()}
              />
            </div>
            <div className="dv-modal-footer">
              <div>
                <div className="dv-modal-title">{playingVideo.title}</div>
                <div className="dv-modal-meta">{playingVideo.category} · {playingVideo.level} · {playingVideo.duration}</div>
              </div>
              <Link className="dv-modal-cta" href="/Admission">
                Enrol Now →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}