"use client";

import React, { useState, useEffect, useRef } from "react";

type VideoCategory = "Pronunciation" | "Spoken English" | "Grammar" | "IELTS / PTE / TOEFL" | "Business English" | "Personality Development";
type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

interface Video {
  _id: string;
  title: string;
  category: VideoCategory;
  duration: string;
  level: Level;
  videoUrl: string;
  desc: string;
}

const CATEGORIES: VideoCategory[] = [
  "Pronunciation", "Spoken English", "Grammar",
  "IELTS / PTE / TOEFL", "Business English", "Personality Development",
];
const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const categoryColors: Record<VideoCategory, { bg: string; color: string }> = {
  "Pronunciation":           { bg: "rgba(139,92,246,0.15)",  color: "#a78bfa" },
  "Spoken English":          { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  "Grammar":                 { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  "IELTS / PTE / TOEFL":    { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  "Business English":        { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
  "Personality Development": { bg: "rgba(110,231,247,0.15)", color: "#6ee7f7" },
};
const levelColors: Record<Level, { bg: string; color: string }> = {
  Beginner:     { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  Intermediate: { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  Advanced:     { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
  "All Levels": { bg: "rgba(110,231,247,0.12)", color: "#6ee7f7" },
};

const emptyForm = () => ({
  title:    "",
  category: "Pronunciation" as VideoCategory,
  duration: "",
  level:    "Beginner" as Level,
  desc:     "",
});

export default function AdminVideos() {
  const [videos, setVideos]           = useState<Video[]>([]);
  const [loading, setLoading]         = useState(true);
  const [form, setForm]               = useState(emptyForm());
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [saving, setSaving]           = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast]             = useState<string | null>(null);
  const [filterCat, setFilterCat]     = useState<VideoCategory | "All">("All");
  const [dragOver, setDragOver]       = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl]   = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/demo-upload");
        const json = await res.json();
        if (json.success) setVideos(json.data);
        else showToast("Failed to load videos");
      } catch { showToast("Failed to load videos"); }
      finally  { setLoading(false); }
    })();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.desc.trim())  e.desc  = "Description required";
    if (!uploadedFile)      e.videoUrl = "Please select a video file";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("video/")) { showToast("Only video files are allowed"); return; }
    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    // Auto-fill duration if possible
    const vid = document.createElement("video");
    vid.src = url;
    vid.onloadedmetadata = () => {
      const total = Math.round(vid.duration);
      const m = Math.floor(total / 60);
      const s = String(total % 60).padStart(2, "0");
      setForm(f => ({ ...f, duration: `${m}:${s}` }));
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("file",     uploadedFile!);
      fd.append("title",    form.title);
      fd.append("category", form.category);
      fd.append("level",    form.level);
      fd.append("desc",     form.desc);
      fd.append("duration", form.duration); // auto-calculated from metadata

      const res  = await fetch("/api/demo-upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);

      setVideos(prev => [json.data, ...prev]);
      setForm(emptyForm());
      setErrors({});
      setUploadedFile(null);
      setPreviewUrl(null);
      showToast("Video published");
    } catch (err: any) {
      showToast(err.message || "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res  = await fetch(`/api/demo-upload/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setVideos(prev => prev.filter(v => v._id !== id));
      setDeleteConfirm(null);
      showToast("Video deleted");
    } catch (err: any) {
      showToast(err.message || "Delete failed");
    }
  };

  const handleCancel = () => { setForm(emptyForm()); setErrors({}); setUploadedFile(null); setPreviewUrl(null); };

  const filtered = filterCat === "All" ? videos : videos.filter(v => v.category === filterCat);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        :root{--bg:#07070f;--sf:rgba(255,255,255,0.03);--sf2:rgba(255,255,255,0.055);--bd:rgba(255,255,255,0.07);--bd2:rgba(255,255,255,0.11);--tx:#d4d2e0;--mu:rgba(212,210,224,0.38);--ac:#6ee7f7;--ac2:#a78bfa;}
        .av*{box-sizing:border-box;}
        .av{min-height:100vh;background:var(--bg);font-family:'Syne',sans-serif;color:var(--tx);position:relative;}
        .av::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 60% 40% at 75% 5%,rgba(110,231,247,0.04) 0%,transparent 70%),radial-gradient(ellipse 40% 30% at 15% 85%,rgba(167,139,250,0.04) 0%,transparent 70%);}
        .av-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:36px 28px;}
        .av-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid var(--bd);}
        .av-crumb{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2.5px;color:var(--mu);text-transform:uppercase;margin-bottom:6px;}
        .av-title{font-size:22px;font-weight:800;color:var(--tx);letter-spacing:-0.3px;}
        .av-title span{color:var(--ac);}
        .av-chip{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mu);background:var(--sf);border:1px solid var(--bd);padding:5px 12px;border-radius:8px;}
        .av-filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;}
        .av-filter-btn{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:1px;padding:5px 12px;border-radius:7px;border:1px solid var(--bd);background:transparent;color:var(--mu);cursor:pointer;transition:all 0.15s;text-transform:uppercase;}
        .av-filter-btn:hover{border-color:var(--bd2);color:var(--tx);}
        .av-filter-btn.active{background:rgba(110,231,247,0.08);border-color:rgba(110,231,247,0.25);color:var(--ac);}
        .av-layout{display:grid;grid-template-columns:1fr 420px;gap:24px;align-items:start;}
        @media(max-width:960px){.av-layout{grid-template-columns:1fr;}}
        .av-sec-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:14px;}
        .av-empty{border:1px dashed var(--bd2);border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 24px;color:var(--mu);text-align:center;gap:10px;}
        .av-empty-icon{font-size:28px;opacity:0.3;}
        .av-empty-txt{font-family:'JetBrains Mono',monospace;font-size:11px;}
        .av-cards{display:flex;flex-direction:column;gap:10px;}

        /* Video card */
        .av-card{background:var(--sf);border:1px solid var(--bd);border-radius:14px;overflow:hidden;display:grid;grid-template-columns:160px 1fr auto;transition:all 0.2s;}
        .av-card:hover{border-color:var(--bd2);background:var(--sf2);transform:translateY(-1px);box-shadow:0 8px 28px rgba(0,0,0,0.4);}
        .av-card-thumb{position:relative;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d0c1e,#12102a);flex-shrink:0;min-height:90px;}
        .av-card-thumb-play{width:36px;height:36px;border-radius:50%;background:rgba(110,231,247,0.12);border:1.5px solid rgba(110,231,247,0.3);display:flex;align-items:center;justify-content:center;font-size:13px;transition:all 0.2s;}
        .av-card:hover .av-card-thumb-play{background:rgba(110,231,247,0.2);box-shadow:0 0 18px rgba(110,231,247,0.25);}
        .av-card-dur{position:absolute;bottom:6px;right:6px;font-family:'JetBrains Mono',monospace;font-size:8px;background:rgba(0,0,0,0.7);color:var(--ac);padding:2px 6px;border-radius:4px;letter-spacing:0.5px;}
        .av-card-id{position:absolute;top:6px;left:6px;font-family:'JetBrains Mono',monospace;font-size:7px;color:var(--mu);background:rgba(0,0,0,0.5);padding:2px 6px;border-radius:4px;}
        .av-card-body{padding:12px 14px;display:flex;flex-direction:column;gap:5px;min-width:0;}
        .av-card-tags{display:flex;align-items:center;gap:5px;flex-wrap:wrap;}
        .av-card-cat{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:1px;font-weight:500;padding:2px 7px;border-radius:4px;}
        .av-card-lvl{font-family:'JetBrains Mono',monospace;font-size:8px;font-weight:500;padding:2px 7px;border-radius:4px;}
        .av-card-title{font-size:13px;font-weight:700;color:var(--tx);line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .av-card-desc{font-size:11px;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-style:italic;}
        .av-card-url{font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(110,231,247,0.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .av-card-actions{padding:12px 10px;display:flex;flex-direction:column;gap:5px;align-items:center;justify-content:center;}
        .av-card-btn{width:27px;height:27px;background:var(--sf2);border:1px solid var(--bd);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;color:var(--mu);transition:all 0.15s;}
        .av-card-btn.del:hover{color:#f87171;border-color:rgba(248,113,113,0.3);}

        /* Panel */
        .av-panel{background:var(--sf);border:1px solid var(--bd);border-radius:16px;overflow:hidden;position:sticky;top:24px;}
        .av-panel-head{padding:16px 20px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;}
        .av-panel-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:2px;color:var(--mu);text-transform:uppercase;margin-bottom:3px;}
        .av-panel-title{font-size:14px;font-weight:700;color:var(--tx);}
        .av-dot{width:8px;height:8px;border-radius:50%;background:var(--ac);box-shadow:0 0 8px var(--ac);animation:dp 2s infinite;}
        @keyframes dp{0%,100%{opacity:1}50%{opacity:0.3}}
        .av-fbody{padding:18px 20px;display:flex;flex-direction:column;gap:14px;max-height:72vh;overflow-y:auto;}
        .av-fbody::-webkit-scrollbar{width:3px;}
        .av-fbody::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:4px;}
        .av-lbl{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:500;letter-spacing:2px;color:var(--mu);text-transform:uppercase;display:block;margin-bottom:7px;}
        .av-inp,.av-ta,.av-sel{width:100%;padding:9px 12px;background:rgba(255,255,255,0.025);border:1px solid var(--bd);border-radius:9px;outline:none;font-family:'Syne',sans-serif;font-size:12px;color:var(--tx);transition:all 0.15s;caret-color:var(--ac);}
        .av-inp::placeholder,.av-ta::placeholder{color:rgba(212,210,224,0.2);}
        .av-inp:focus,.av-ta:focus,.av-sel:focus{border-color:rgba(110,231,247,0.3);background:rgba(110,231,247,0.03);box-shadow:0 0 0 3px rgba(110,231,247,0.06);}
        .av-inp.err,.av-ta.err{border-color:rgba(248,113,113,0.35);}
        .av-sel{appearance:none;cursor:pointer;}
        .av-sel option{background:#0e0d1a;color:var(--tx);}
        .av-ta{resize:none;line-height:1.6;}
        .av-err{font-family:'JetBrains Mono',monospace;font-size:9px;color:#f87171;margin-top:4px;}
        .av-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

        /* Drop zone */
        .av-dropzone{border:1.5px dashed var(--bd2);border-radius:10px;padding:28px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:all 0.2s;text-align:center;}
        .av-dropzone.over{border-color:rgba(110,231,247,0.4);background:rgba(110,231,247,0.04);}
        .av-dropzone-icon{font-size:22px;opacity:0.5;}
        .av-dropzone-txt{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--mu);}
        .av-dropzone-sub{font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(212,210,224,0.2);}
        .av-file-chip{display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(110,231,247,0.06);border:1px solid rgba(110,231,247,0.18);border-radius:8px;}
        .av-file-chip-name{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--ac);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .av-file-chip-rm{background:none;border:none;cursor:pointer;color:var(--mu);font-size:11px;transition:color 0.15s;padding:0;line-height:1;}
        .av-file-chip-rm:hover{color:#f87171;}

        /* Video preview */
        .av-preview-vid{width:100%;border-radius:9px;background:#000;max-height:120px;object-fit:contain;border:1px solid var(--bd);}

        /* Footer */
        .av-footer{padding:14px 20px;border-top:1px solid var(--bd);display:flex;gap:8px;}
        .av-btn-pub{flex:1;padding:11px;background:rgba(110,231,247,0.08);border:1px solid rgba(110,231,247,0.22);border-radius:10px;cursor:pointer;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--ac);transition:all 0.15s;}
        .av-btn-pub:hover:not(:disabled){background:rgba(110,231,247,0.14);border-color:rgba(110,231,247,0.38);}
        .av-btn-pub:disabled{opacity:0.5;cursor:not-allowed;}
        .av-btn-can{padding:11px 14px;background:transparent;border:1px solid var(--bd);border-radius:10px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mu);transition:all 0.15s;}
        .av-btn-can:hover{border-color:var(--bd2);color:var(--tx);}

        /* Modal */
        .av-modal-bg{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,0.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px;}
        .av-modal{background:#0c0b18;border:1px solid var(--bd2);border-radius:16px;padding:28px;width:100%;max-width:340px;}
        .av-modal-icon{font-size:26px;margin-bottom:12px;}
        .av-modal-title{font-size:15px;font-weight:700;color:var(--tx);margin-bottom:6px;}
        .av-modal-desc{font-size:12px;color:var(--mu);margin-bottom:22px;line-height:1.6;}
        .av-modal-row{display:flex;gap:8px;}
        .av-btn-del{flex:1;padding:10px;background:rgba(248,113,113,0.09);border:1px solid rgba(248,113,113,0.22);border-radius:9px;cursor:pointer;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:#f87171;transition:all 0.15s;}
        .av-btn-del:hover{background:rgba(248,113,113,0.16);}

        /* Toast */
        .av-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:200;background:#0c0b18;border:1px solid var(--bd2);padding:10px 20px;border-radius:99px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--ac);letter-spacing:0.5px;box-shadow:0 8px 32px rgba(0,0,0,0.5);display:flex;align-items:center;gap:8px;white-space:nowrap;}
        .av-toast-dot{width:5px;height:5px;border-radius:50%;background:var(--ac);box-shadow:0 0 6px var(--ac);}

        /* Saving spinner */
        @keyframes avSpin{to{transform:rotate(360deg)}}
        .av-spinner{width:12px;height:12px;border:2px solid rgba(110,231,247,0.2);border-top-color:var(--ac);border-radius:50%;animation:avSpin 0.7s linear infinite;display:inline-block;margin-right:6px;vertical-align:middle;}
        @keyframes avShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
      `}</style>

      <div className="av">
        <div className="av-inner">

          <div className="av-header">
            <div>
              <div className="av-crumb">manage / videos</div>
              <div className="av-title">Video <span>Library</span></div>
            </div>
            <div className="av-chip">{videos.length} video{videos.length !== 1 ? "s" : ""}</div>
          </div>

          <div className="av-filters">
            {(["All", ...CATEGORIES] as const).map(cat => (
              <button key={cat} className={`av-filter-btn${filterCat === cat ? " active" : ""}`}
                onClick={() => setFilterCat(cat as VideoCategory | "All")}>{cat}</button>
            ))}
          </div>

          <div className="av-layout">

            {/* ── LEFT: video list ── */}
            <div>
              <div className="av-sec-label">published videos ({filtered.length})</div>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[1,2,3].map(i => <div key={i} style={{ height: 90, borderRadius: 14, background: "linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.03) 75%)", backgroundSize: "200% 100%", animation: "avShimmer 1.5s infinite" }} />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="av-empty">
                  <div className="av-empty-icon">▶</div>
                  <div className="av-empty-txt">{videos.length === 0 ? "no videos yet — upload one using the form" : "no videos in this category"}</div>
                </div>
              ) : (
                <div className="av-cards">
                  {filtered.map(v => {
                    const cc = categoryColors[v.category];
                    const lc = levelColors[v.level];
                    return (
                      <div key={v._id} className="av-card">
                        <div className="av-card-thumb">
                          <div className="av-card-thumb-play">▶</div>
                          <div className="av-card-dur">{v.duration}</div>
                        </div>
                        <div className="av-card-body">
                          <div className="av-card-tags">
                            <span className="av-card-cat" style={{ background: cc.bg, color: cc.color }}>{v.category}</span>
                            <span className="av-card-lvl" style={{ background: lc.bg, color: lc.color }}>{v.level}</span>
                          </div>
                          <div className="av-card-title">{v.title}</div>
                          <div className="av-card-desc">{v.desc}</div>
                          <div className="av-card-url">{v.videoUrl}</div>
                        </div>
                        <div className="av-card-actions">
                          <button className="av-card-btn del" onClick={() => setDeleteConfirm(v._id)} title="Delete">✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── RIGHT: form ── */}
            <div className="av-panel">
              <div className="av-panel-head">
                <div>
                  <div className="av-panel-label">upload video</div>
                  <div className="av-panel-title">Add to Library</div>
                </div>
                <div className="av-dot" />
              </div>

              <div className="av-fbody">

                {/* File upload drop zone */}
                <div>
                  <label className="av-lbl">video file</label>
                  {!uploadedFile ? (
                    <div className={`av-dropzone${dragOver ? " over" : ""}`}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}>
                      <div className="av-dropzone-icon">🎬</div>
                      <div className="av-dropzone-txt">Drop video here or click to browse</div>
                      <div className="av-dropzone-sub">MP4 · MOV · WEBM · AVI</div>
                      <input ref={fileInputRef} type="file" accept="video/*" style={{ display: "none" }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {previewUrl && <video className="av-preview-vid" src={previewUrl} controls />}
                      <div className="av-file-chip">
                        <span style={{ fontSize: 13 }}>🎬</span>
                        <span className="av-file-chip-name">{uploadedFile.name}</span>
                        {form.duration && (
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--ac)", background: "rgba(110,231,247,0.1)", padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>⏱ {form.duration}</span>
                        )}
                        <button className="av-file-chip-rm" onClick={() => { setUploadedFile(null); setPreviewUrl(null); setForm(f => ({ ...f, duration: "" })); }}>✕</button>
                      </div>
                    </div>
                  )}
                  {errors.videoUrl && <div className="av-err">⚠ {errors.videoUrl}</div>}
                </div>

                {/* Title */}
                <div>
                  <label className="av-lbl">title</label>
                  <input type="text" className={`av-inp${errors.title ? " err" : ""}`}
                    placeholder="e.g. Master the TH Sound in English"
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                  {errors.title && <div className="av-err">⚠ {errors.title}</div>}
                </div>

                {/* Description */}
                <div>
                  <label className="av-lbl">description</label>
                  <textarea rows={3} className={`av-ta${errors.desc ? " err" : ""}`}
                    placeholder="Brief description of what this video covers..."
                    value={form.desc}
                    onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
                  {errors.desc && <div className="av-err">⚠ {errors.desc}</div>}
                </div>

                {/* Category */}
                <div>
                  <label className="av-lbl">category</label>
                  <select className="av-sel" value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value as VideoCategory }))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="av-lbl">level</label>
                  <select className="av-sel" value={form.level}
                    onChange={e => setForm(f => ({ ...f, level: e.target.value as Level }))}>
                    {LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>

                {/* Live preview card */}
                <div>
                  <label className="av-lbl">preview</label>
                  <div style={{ background: "var(--sf2)", border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ height: 80, background: "linear-gradient(135deg,#0d0c1e,#12102a)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(110,231,247,0.12)", border: "1.5px solid rgba(110,231,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>▶</div>
                      {form.duration && <div style={{ position: "absolute", bottom: 6, right: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 8, background: "rgba(0,0,0,0.7)", color: "var(--ac)", padding: "2px 6px", borderRadius: 4 }}>{form.duration}</div>}
                      {form.category && (
                        <div style={{ position: "absolute", top: 6, left: 6, ...categoryColors[form.category], fontFamily: "'JetBrains Mono',monospace", fontSize: 7, fontWeight: 600, padding: "2px 7px", borderRadius: 4, letterSpacing: 0.8 }}>{form.category}</div>
                      )}
                    </div>
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--tx)", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{form.title || "Video Title"}</div>
                      <div style={{ fontSize: 10, fontStyle: "italic", color: "var(--mu)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{form.desc || "Description goes here"}</div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="av-footer">
                <button className="av-btn-pub" onClick={handleSubmit} disabled={saving}>
                  {saving ? <><span className="av-spinner" />Uploading…</> : "▶  Publish Video"}
                </button>
                {form.title && <button className="av-btn-can" onClick={handleCancel}>✕</button>}
              </div>
            </div>

          </div>
        </div>
      </div>

      {deleteConfirm !== null && (
        <div className="av-modal-bg">
          <div className="av-modal">
            <div className="av-modal-icon">⚠</div>
            <div className="av-modal-title">Delete this video?</div>
            <div className="av-modal-desc">This cannot be undone. The video will be permanently removed from the library.</div>
            <div className="av-modal-row">
              <button className="av-btn-del" onClick={() => handleDelete(deleteConfirm!)}>Delete</button>
              <button className="av-btn-can" style={{ flex: 1 }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="av-toast">
          <div className="av-toast-dot" />{toast}
        </div>
      )}
    </>
  );
}