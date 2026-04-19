"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC VIDEO CONFIG
// Only IDs, category, level and desc are hardcoded here.
// Real titles & author names are fetched live from YouTube's oEmbed API.
// To add more videos: duplicate an entry and paste the YouTube video ID.
// ─────────────────────────────────────────────────────────────────────────────
const VIDEO_CONFIG = [
  {
    id: "dOAXYXyACKY",
    startAt: 390,
    category: "Mathematics",
    level: "Intermediate",
    desc: "Advanced Mathematics concepts explained with JEE-focused problem solving — pick up exactly where it matters most.",
  },
  {
    id: "8DwKnYtIsDw",
    startAt: 0,
    category: "Mathematics",
    level: "Foundation",
    desc: "Mathematics fundamentals for JEE — building conceptual clarity through step-by-step worked examples.",
  },
  {
    id: "CuusZPkbm3U",
    startAt: 0,
    category: "Mathematics",
    level: "Foundation",
    desc: "Core Mathematics concepts broken down from scratch — ideal for Class 11 students beginning their JEE preparation.",
  },
] as const;

type VideoConfig = typeof VIDEO_CONFIG[number];

interface VideoMeta {
  title: string;
  author: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const ytThumb  = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const embedUrl = (id: string, startAt: number) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&start=${startAt}`;

const LEVEL_COLOR: Record<string, [string, string]> = {
  Foundation:           ["#dbeafe", "#1e40af"],
  Beginner:             ["#d1fae5", "#065f46"],
  Basic:                ["#dbeafe", "#1e40af"],
  Intermediate:         ["#fef3c7", "#92400e"],
  "Upper Intermediate": ["#ede9fe", "#5b21b6"],
  Advanced:             ["#fee2e2", "#991b1b"],
  "All Levels":         ["#f3f4f6", "#374151"],
};

const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(VIDEO_CONFIG.map(v => v.category))),
];

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — fetches real YouTube titles via oEmbed (no API key needed)
// ─────────────────────────────────────────────────────────────────────────────
function useYouTubeMeta(ids: readonly string[]) {
  const [meta, setMeta] = useState<Record<string, VideoMeta>>({});

  useEffect(() => {
    ids.forEach(async (id) => {
      try {
        const res  = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
        );
        const data = await res.json();
        setMeta(prev => ({
          ...prev,
          [id]: { title: data.title ?? "Demo Lesson", author: data.author_name ?? "" },
        }));
      } catch {
        setMeta(prev => ({
          ...prev,
          [id]: { title: "Demo Lesson", author: "The Science Centre" },
        }));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return meta;
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON CARD
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
        <div className="dv-skel" style={{ width: "60%", height: 16, borderRadius: 6 }} />
        <div className="dv-skel" style={{ width: "100%", height: 13, borderRadius: 5, marginTop: 6 }} />
        <div className="dv-skel" style={{ width: "75%",  height: 13, borderRadius: 5 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL with fallback
// ─────────────────────────────────────────────────────────────────────────────
function Thumb({ id, title, onPlay }: { id: string; title: string; onPlay: () => void }) {
  const [err, setErr] = useState(false);
  return (
    <div className="dv-thumb" onClick={onPlay}>
      {!err ? (
        <img
          src={ytThumb(id)}
          alt={title}
          onError={() => setErr(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(135deg,#1e1b4b 0%,#302b63 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.08)" />
            <polygon points="18,14 34,22 18,30" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
      )}
      <div className="dv-play-overlay">
        <div className="dv-play-btn">
          <svg width="58" height="40" viewBox="0 0 58 40" fill="none">
            <rect width="58" height="40" rx="10" fill="#FF0000" />
            <polygon points="24,12 40,20 24,28" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO CARD
// ─────────────────────────────────────────────────────────────────────────────
function VideoCard({
  config, meta, onPlay,
}: { config: VideoConfig; meta: VideoMeta | undefined; onPlay: () => void }) {
  const [bg, text] = LEVEL_COLOR[config.level] ?? ["#f3f4f6", "#374151"];

  if (!meta) return <SkeletonCard />;

  return (
    <div className="dv-card">
      <Thumb id={config.id} title={meta.title} onPlay={onPlay} />
      <div className="dv-card-body">
        <div className="dv-card-meta">
          <span className="dv-cat-tag">{config.category}</span>
          <span className="dv-level-tag" style={{ background: bg, color: text }}>{config.level}</span>
        </div>
        <div className="dv-card-title">{meta.title}</div>
        {meta.author && <div className="dv-card-author">by {meta.author}</div>}
        <div className="dv-card-desc">{config.desc}</div>
        <div className="dv-card-footer">
          <button className="dv-watch-btn" onClick={onPlay}>Watch Free →</button>
          <span className="dv-free-tag">FREE</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL — YouTube embed player
// ─────────────────────────────────────────────────────────────────────────────
function VideoModal({ config, meta, onClose }: {
  config: VideoConfig; meta: VideoMeta | undefined; onClose: () => void;
}) {
  return (
    <div className="dv-modal-backdrop" onClick={onClose}>
      <div className="dv-modal" onClick={e => e.stopPropagation()}>
        <button className="dv-modal-close" onClick={onClose}>✕</button>
        <div className="dv-modal-player">
          <iframe
            key={config.id}
            src={embedUrl(config.id, config.startAt)}
            title={meta?.title ?? "Demo Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", display: "block", border: "none" }}
          />
        </div>
        <div className="dv-modal-footer">
          <div>
            <div className="dv-modal-title">{meta?.title ?? "Demo Lesson"}</div>
            <div className="dv-modal-meta">
              {config.category} · {config.level}
              {meta?.author ? ` · ${meta.author}` : ""}
            </div>
          </div>
          <Link className="dv-modal-cta" href="/Admission">Enrol Now →</Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function DemoVideosPage() {
  const ids   = VIDEO_CONFIG.map(v => v.id);
  const meta  = useYouTubeMeta(ids);
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingId, setPlayingId]           = useState<string | null>(null);

  const filtered      = activeCategory === "All"
    ? VIDEO_CONFIG
    : VIDEO_CONFIG.filter(v => v.category === activeCategory);
  const playingConfig = VIDEO_CONFIG.find(v => v.id === playingId) ?? null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        .dv-root,.dv-root *,.dv-root *::before,.dv-root *::after{box-sizing:border-box;margin:0;padding:0}
        .dv-root{font-family:'DM Sans',sans-serif;font-size:15px;line-height:1.75;color:#374151;background:#f8f7ff;min-height:100vh}

        .dv-hero{background:linear-gradient(135deg,#0f0c29 0%,#1e1b4b 45%,#302b63 100%);padding:72px 8% 60px;text-align:center;position:relative;overflow:hidden}
        .dv-hero::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
        .dv-blob{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none}
        .dv-blob-1{width:320px;height:320px;background:#7c3aed;opacity:.13;top:-80px;right:-40px}
        .dv-blob-2{width:240px;height:240px;background:#4f46e5;opacity:.13;bottom:-70px;left:-30px}
        .dv-blob-3{width:180px;height:180px;background:#fbbf24;opacity:.06;top:10px;left:40%}
        .dv-hero-inner{position:relative;z-index:2}
        .dv-hero-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.35);color:#c4b5fd;font-family:'Syne',sans-serif;font-size:10px;font-weight:700;padding:5px 16px;border-radius:20px;text-transform:uppercase;letter-spacing:2px;margin-bottom:22px}
        .dv-badge-dot{width:6px;height:6px;border-radius:50%;background:#a78bfa;animation:dvPulse 2s ease-in-out infinite}
        .dv-hero-title{font-family:'Fraunces',serif;font-size:clamp(36px,5.5vw,64px);font-weight:900;color:#fff;line-height:1.08;letter-spacing:-1.5px;margin-bottom:18px}
        .dv-hero-title .gold{font-style:italic;color:#fbbf24;position:relative;display:inline-block}
        .dv-hero-title .gold::after{content:'';position:absolute;left:0;bottom:-4px;width:100%;height:3px;border-radius:2px;background:linear-gradient(90deg,#fbbf24,#f59e0b)}
        .dv-hero-sub{font-size:16px;color:rgba(255,255,255,.62);line-height:1.8;max-width:480px;margin:0 auto}

        .dv-filter-bar{padding:36px 8% 0;display:flex;flex-wrap:wrap;gap:10px}
        .dv-filter-btn{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;padding:8px 18px;border-radius:20px;border:1.5px solid #e5e7eb;background:#fff;color:#6b7280;cursor:pointer;transition:all .2s;letter-spacing:.3px}
        .dv-filter-btn:hover{border-color:#4f46e5;color:#4f46e5}
        .dv-filter-btn.active{background:linear-gradient(135deg,#4f46e5,#6d28d9);border-color:transparent;color:#fff;box-shadow:0 4px 14px rgba(79,70,229,.3)}

        .dv-grid{padding:28px 8% 80px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

        .dv-card{background:#fff;border-radius:18px;border:1px solid rgba(79,70,229,.08);box-shadow:0 4px 18px rgba(79,70,229,.06);overflow:hidden;transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column}
        .dv-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(79,70,229,.13)}
        .dv-thumb{height:190px;position:relative;cursor:pointer;overflow:hidden;background:#1e1b4b}
        .dv-play-overlay{position:absolute;inset:0;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s}
        .dv-thumb:hover .dv-play-overlay{opacity:1}
        .dv-play-btn{display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 4px 16px rgba(0,0,0,.5));transition:transform .2s}
        .dv-thumb:hover .dv-play-btn{transform:scale(1.08)}
        .dv-card-body{padding:18px 20px 20px;flex:1;display:flex;flex-direction:column}
        .dv-card-meta{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}
        .dv-cat-tag{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.5px;background:#ede9fe;color:#5b21b6}
        .dv-level-tag{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.5px}
        .dv-card-title{font-family:'Fraunces',serif;font-size:16px;font-weight:700;color:#0f0c29;letter-spacing:-.2px;line-height:1.3;margin-bottom:4px}
        .dv-card-author{font-size:11px;color:#9ca3af;font-family:'Syne',sans-serif;font-weight:600;margin-bottom:8px}
        .dv-card-desc{font-size:13px;color:#6b7280;line-height:1.6;flex:1}
        .dv-card-footer{margin-top:16px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}
        .dv-watch-btn{font-family:'Syne',sans-serif;font-size:12px;font-weight:800;color:#4f46e5;background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:5px;padding:0;transition:gap .2s}
        .dv-watch-btn:hover{gap:8px}
        .dv-free-tag{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px}

        .dv-skel{background:linear-gradient(90deg,#ede9ff 25%,#ddd8ff 50%,#ede9ff 75%);background-size:200% 100%;animation:dvShimmer 1.4s infinite}
        @keyframes dvShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

        .dv-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:dvFadeIn .2s ease}
        @keyframes dvFadeIn{from{opacity:0}to{opacity:1}}
        .dv-modal{background:#0f0c29;border-radius:18px;overflow:hidden;max-width:760px;width:100%;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.7);animation:dvSlideUp .25s ease}
        @keyframes dvSlideUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
        .dv-modal-close{position:absolute;top:14px;right:14px;z-index:10;background:rgba(255,255,255,.12);border:none;color:#fff;width:32px;height:32px;border-radius:50%;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
        .dv-modal-close:hover{background:rgba(255,255,255,.22)}
        .dv-modal-player{width:100%;aspect-ratio:16/9;background:#000}
        .dv-modal-footer{padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .dv-modal-title{font-family:'Fraunces',serif;font-size:16px;font-weight:700;color:#fff;letter-spacing:-.2px}
        .dv-modal-meta{font-size:11px;color:rgba(255,255,255,.4);margin-top:3px;font-family:'Syne',sans-serif}
        .dv-modal-cta{background:linear-gradient(135deg,#4f46e5,#6d28d9);color:#fff;border:none;padding:10px 20px;border-radius:10px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:opacity .2s;text-decoration:none;display:inline-block}
        .dv-modal-cta:hover{opacity:.88}

        .dv-cta-banner{margin:0 8% 80px;background:linear-gradient(135deg,#0f0c29 0%,#1e1b4b 45%,#302b63 100%);border-radius:20px;padding:44px 48px;display:flex;align-items:center;justify-content:space-between;gap:24px;position:relative;overflow:hidden}
        .dv-cta-banner::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
        .dv-cta-text{position:relative;z-index:1}
        .dv-cta-title{font-family:'Fraunces',serif;font-size:26px;font-weight:900;color:#fff;letter-spacing:-.5px;margin-bottom:8px}
        .dv-cta-title span{font-style:italic;color:#fbbf24}
        .dv-cta-sub{font-size:14px;color:rgba(255,255,255,.55);line-height:1.6;max-width:380px}
        .dv-cta-actions{display:flex;gap:12px;flex-shrink:0;position:relative;z-index:1}
        .dv-cta-btn-primary{background:linear-gradient(135deg,#4f46e5,#6d28d9);color:#fff;border:none;padding:13px 24px;border-radius:11px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 6px 20px rgba(79,70,229,.4);transition:opacity .2s;text-decoration:none;display:inline-block}
        .dv-cta-btn-primary:hover{opacity:.88}
        .dv-cta-btn-secondary{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.2);padding:13px 24px;border-radius:11px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap;transition:background .2s;text-decoration:none;display:inline-block}
        .dv-cta-btn-secondary:hover{background:rgba(255,255,255,.14)}

        @keyframes dvPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
        @media(max-width:1024px){.dv-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:768px){
          .dv-hero{padding:52px 5% 48px}
          .dv-filter-bar{padding:24px 5% 0}
          .dv-grid{grid-template-columns:1fr;padding:20px 5% 60px}
          .dv-cta-banner{flex-direction:column;margin:0 5% 60px;padding:32px 24px}
          .dv-cta-actions{flex-direction:column;width:100%}
          .dv-modal-footer{flex-direction:column;align-items:flex-start}
        }
      `}</style>

      <div className="dv-root">

        {/* HERO */}
        <div className="dv-hero">
          <div className="dv-blob dv-blob-1" />
          <div className="dv-blob dv-blob-2" />
          <div className="dv-blob dv-blob-3" />
          <div className="dv-hero-inner">
            <div className="dv-hero-badge"><span className="dv-badge-dot" />Free Demo Lessons</div>
            <h1 className="dv-hero-title">Watch &amp; <span className="gold">Learn Free</span></h1>
            <p className="dv-hero-sub">Explore our demo lessons before you enrol. No sign-up required — just press play.</p>
          </div>
        </div>

        {/* FILTER BAR — only shown when more than 2 categories */}
        {ALL_CATEGORIES.length > 2 && (
          <div className="dv-filter-bar">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`dv-filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >{cat}</button>
            ))}
          </div>
        )}

        {/* GRID */}
        <div className="dv-grid">
          {filtered.map(config => (
            <VideoCard
              key={config.id}
              config={config}
              meta={meta[config.id]}
              onPlay={() => setPlayingId(config.id)}
            />
          ))}
        </div>

      </div>

      {/* MODAL */}
      {playingId !== null && playingConfig && (
        <VideoModal
          config={playingConfig}
          meta={meta[playingConfig.id]}
          onClose={() => setPlayingId(null)}
        />
      )}
    </>
  );
}