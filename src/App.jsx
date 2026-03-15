import React, { useMemo, useState, useCallback } from "react";

/* ─────────────────────── ICON SYSTEM ─────────────────────── */
const ICON_PATHS = {
  bookOpen: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  brain: "M9.5 2a3.5 3.5 0 0 0-3 5.1A3.5 3.5 0 0 0 5 10.5V12a3 3 0 0 0 3 3h1v3m6-16a3.5 3.5 0 0 1 3 5.1A3.5 3.5 0 0 1 19 10.5V12a3 3 0 0 1-3 3h-1v3M8 15a4 4 0 0 0 8 0M12 2v2M12 20v2",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  globe: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 0c2.5 2.5 4 6.2 4 10s-1.5 7.5-4 10m0-20C9.5 4.5 8 8.2 8 12s1.5 7.5 4 10m-9-10h18M4.5 7.5h15M4.5 16.5h15",
  search: "M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4z",
  layers: "m12 3-8 4 8 4 8-4-8-4zm-8 9 8 4 8-4M4 17l8 4 8-4",
  chart: "M4 19h16M7 16V9M12 16V5M17 16v-3",
  pencil: "M3 21l3.75-.75L19 8l-3-3L3.75 17.25 3 21zM14 6l3 3",
  volume: "M11 5 6 9H3v6h3l5 4V5zm4.5 3.5a5 5 0 0 1 0 7m2.5-10a9 9 0 0 1 0 13",
  sparkles: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M8 9h3",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  workflow: "M5 4h6v4H5zM13 16h6v4h-6zM5 16h6v4H5zM8 8v3m0 0h8m0 0v3",
  target: "M12 2v4M12 18v4M2 12h4M18 12h4M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",
  ear: "M8 12a4 4 0 1 1 8 0c0 3-2 4-3 5-.7.7-1 1.2-1 2m-2 0h4",
  penTool: "M12 19l7-7 3 3-7 7-3 1 1-4zM18 6l-4-4-9 9 4 4 9-9zM2 22h20",
  shield: "M12 2l7 3v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z",
  star: "M12 3l2.9 5.88L21 9.75l-4.5 4.38L17.6 21 12 18.1 6.4 21l1.1-6.87L3 9.75l6.1-.87L12 3z",
  map: "M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3zM9 3v15m6-12v15",
  grid: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
  alertTriangle: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
  lightbulb: "M9 18h6m-5 2h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  hash: "M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18",
  repeat: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h12M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H5",
  music: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
};

function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICON_PATHS[name] || ""} />
    </svg>
  );
}

/* ─────────────────── TONE CONTOUR SVG ─────────────────── */
function ToneContourDiagram() {
  const w = 520, h = 216, pad = { t: 28, r: 30, b: 50, l: 50 };
  const cw = (w - pad.l - pad.r) / 4;
  const pitchY = (level) => pad.t + (h - pad.t - pad.b) * (1 - (level - 1) / 4);

  const tones = [
    { label: "1st", sub: "High level", color: "#059669", points: [[0, 5], [1, 5]] },
    { label: "2nd", sub: "Rising", color: "#2563eb", points: [[0, 3], [1, 5]] },
    { label: "3rd", sub: "Low dip", color: "#d97706", points: [[0, 3], [0.3, 1.5], [0.7, 1], [1, 2.5]] },
    { label: "4th", sub: "Falling", color: "#dc2626", points: [[0, 5], [1, 1]] },
  ];

  const pitchLabels = ["5 high", "4", "3", "2", "1 low"];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxWidth: 560 }}>
      <defs>
        {tones.map((t, i) => (
          <linearGradient key={i} id={`tg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={t.color} stopOpacity="0.85" />
            <stop offset="100%" stopColor={t.color} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>
      {/* grid lines */}
      {[1, 2, 3, 4, 5].map((lv) => (
        <g key={lv}>
          <line x1={pad.l} y1={pitchY(lv)} x2={w - pad.r} y2={pitchY(lv)} stroke="#e2e8f0" strokeWidth="1" strokeDasharray={lv === 1 || lv === 5 ? "0" : "4 4"} />
          <text x={pad.l - 8} y={pitchY(lv) + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="system-ui">{pitchLabels[5 - lv]}</text>
        </g>
      ))}
      {/* tone curves */}
      {tones.map((t, i) => {
        const ox = pad.l + i * cw;
        const pts = t.points.map(([px, py]) => [ox + 18 + px * (cw - 36), pitchY(py)]);
        const d = pts.length === 2
          ? `M${pts[0][0]},${pts[0][1]} L${pts[1][0]},${pts[1][1]}`
          : `M${pts[0][0]},${pts[0][1]} C${pts[0][0] + 20},${pts[1][1]} ${pts[2][0] - 10},${pts[2][1]} ${pts[2][0]},${pts[2][1]} S${pts[3][0] - 10},${pts[3][1]} ${pts[3][0]},${pts[3][1]}`;
        return (
          <g key={i}>
            <rect x={ox + 2} y={pad.t - 2} width={cw - 4} height={h - pad.t - pad.b + 4} rx="8" fill={t.color} fillOpacity="0.04" />
            <path d={d} stroke={`url(#tg${i})`} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* start dot */}
            <circle cx={pts[0][0]} cy={pts[0][1]} r="4" fill={t.color} />
            {/* end dot */}
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill={t.color} />
            {/* label */}
            <text x={ox + cw / 2} y={h - pad.b + 26} textAnchor="middle" fontSize="12" fontWeight="600" fill={t.color} fontFamily="system-ui">{t.label}</text>
            <text x={ox + cw / 2} y={h - pad.b + 40} textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui">{t.sub}</text>
          </g>
        );
      })}
      <text x={w / 2} y={14} textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155" fontFamily="system-ui">Mandarin Tone Contours (Pitch Levels 1–5)</text>
    </svg>
  );
}

/* ─────────────── SENTENCE STRUCTURE SVG ─────────────── */
function SVODiagram() {
  return (
    <svg viewBox="0 0 480 90" className="w-full" style={{ maxWidth: 500 }}>
      {/* boxes */}
      {[
        { x: 10, label: "Subject", sub: "我", color: "#059669", bg: "#ecfdf5" },
        { x: 170, label: "Verb", sub: "學", color: "#2563eb", bg: "#eff6ff" },
        { x: 330, label: "Object", sub: "中文", color: "#d97706", bg: "#fffbeb" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="10" width="130" height="66" rx="14" fill={b.bg} stroke={b.color} strokeWidth="1.5" />
          <text x={b.x + 65} y="36" textAnchor="middle" fontSize="12" fontWeight="600" fill={b.color} fontFamily="system-ui">{b.label}</text>
          <text x={b.x + 65} y="58" textAnchor="middle" fontSize="20" fontWeight="700" fill="#1e293b" fontFamily="system-ui">{b.sub}</text>
          {i < 2 && (
            <g>
              <line x1={b.x + 138} y1="43" x2={b.x + 162} y2="43" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowSVO)" />
            </g>
          )}
        </g>
      ))}
      <defs>
        <marker id="arrowSVO" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

/* ──────────── CHARACTER COMPONENT BREAKDOWN SVG ──────────── */
function CharacterBreakdownSVG() {
  return (
    <svg viewBox="0 0 420 140" className="w-full" style={{ maxWidth: 440 }}>
      {/* 媽 = 女 + 馬 */}
      <rect x="5" y="8" width="90" height="90" rx="14" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="50" y="50" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1e293b" fontFamily="system-ui">媽</text>
      <text x="50" y="82" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="500" fontFamily="system-ui">mā (mother)</text>

      <text x="118" y="58" textAnchor="middle" fontSize="20" fill="#94a3b8" fontFamily="system-ui">=</text>

      <rect x="142" y="14" width="80" height="78" rx="12" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="182" y="48" textAnchor="middle" fontSize="26" fontWeight="700" fill="#059669" fontFamily="system-ui">女</text>
      <text x="182" y="72" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="600" fontFamily="system-ui">meaning: female</text>

      <text x="244" y="58" textAnchor="middle" fontSize="20" fill="#94a3b8" fontFamily="system-ui">+</text>

      <rect x="268" y="14" width="80" height="78" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="308" y="48" textAnchor="middle" fontSize="26" fontWeight="700" fill="#2563eb" fontFamily="system-ui">馬</text>
      <text x="308" y="72" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="600" fontFamily="system-ui">sound: mǎ</text>

      {/* legend - inline below */}
      <rect x="142" y="108" width="88" height="24" rx="6" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="186" y="124" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="600" fontFamily="system-ui">Semantic part</text>
      <rect x="240" y="108" width="88" height="24" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
      <text x="284" y="124" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="600" fontFamily="system-ui">Phonetic part</text>
    </svg>
  );
}

/* ─────────────────── REUSABLE COMPONENTS ─────────────────── */
function Badge({ children, tone = "default" }) {
  const styles = {
    default: "border-slate-200 bg-white text-slate-600",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
}

function SectionHeader({ icon, eyebrow, title, description }) {
  return (
    <div className="mb-8">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
        <Icon name={icon} className="h-3.5 w-3.5" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p>}
    </div>
  );
}

function Card({ icon, title, description, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {(icon || title) && (
        <div className="mb-4 flex items-start gap-3">
          {icon && (
            <div className="flex-shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600">
              <Icon name={icon} className="h-4 w-4" />
            </div>
          )}
          <div className="min-w-0">
            {title && <h3 className="text-sm font-bold text-slate-900">{title}</h3>}
            {description && <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{description}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

function Table({ columns, rows, compact = false }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th key={col} className={`${compact ? "px-3 py-2 text-[10px]" : "px-4 py-2.5 text-xs"} font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row, i) => (
              <tr key={i} className="align-top hover:bg-slate-50/60 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className={`${compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"} leading-relaxed text-slate-700 ${j === 0 ? "font-medium text-slate-900" : ""}`} style={{ minWidth: j === 0 ? 80 : undefined }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TipBox({ type = "tip", children }) {
  const styles = {
    tip: { border: "border-emerald-200", bg: "bg-emerald-50", icon: "lightbulb", iconColor: "text-emerald-600", textColor: "text-emerald-800" },
    warn: { border: "border-amber-200", bg: "bg-amber-50", icon: "alertTriangle", iconColor: "text-amber-600", textColor: "text-amber-800" },
    error: { border: "border-rose-200", bg: "bg-rose-50", icon: "shield", iconColor: "text-rose-600", textColor: "text-rose-800" },
    info: { border: "border-blue-200", bg: "bg-blue-50", icon: "lightbulb", iconColor: "text-blue-600", textColor: "text-blue-800" },
  };
  const s = styles[type];
  return (
    <div className={`flex items-start gap-3 rounded-xl border ${s.border} ${s.bg} p-4`}>
      <Icon name={s.icon} className={`mt-0.5 h-4 w-4 flex-shrink-0 ${s.iconColor}`} />
      <div className={`text-sm leading-relaxed ${s.textColor}`}>{children}</div>
    </div>
  );
}

function StepFlow({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 sm:rounded-xl sm:px-3 sm:py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">{i + 1}</span>
            <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{item}</span>
          </div>
          {i < items.length - 1 && <Icon name="arrowRight" className="hidden h-3 w-3 text-slate-300 flex-shrink-0 sm:block" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ═══════════════════════ DATA ═══════════════════════ */

const SECTION_ORDER = [
  "sound", "start", "conversation", "grammar", "characters", "reading", "writing", "numbers", "culture", "advanced", "plan", "mistakes"
];

const SECTION_META = {
  sound: { label: "Pronunciation", icon: "volume", level: "Beginner" },
  start: { label: "First Words", icon: "bookOpen", level: "Beginner" },
  conversation: { label: "Conversation", icon: "message", level: "Beginner" },
  grammar: { label: "Grammar", icon: "brain", level: "Beginner+" },
  characters: { label: "Characters", icon: "layers", level: "Beginner+" },
  reading: { label: "Reading", icon: "fileText", level: "Intermediate" },
  writing: { label: "Writing", icon: "penTool", level: "Intermediate" },
  numbers: { label: "Numbers & Time", icon: "hash", level: "Beginner" },
  culture: { label: "Cultural Notes", icon: "users", level: "All levels" },
  advanced: { label: "Advanced", icon: "sparkles", level: "Advanced" },
  plan: { label: "Study Plans", icon: "clock", level: "All levels" },
  mistakes: { label: "Common Errors", icon: "shield", level: "All levels" },
};

const QUICK_START = [
  ["Chinese", "Pinyin", "English"],
  ["你好", "nǐ hǎo", "hello"],
  ["謝謝", "xièxie", "thank you"],
  ["對不起", "duìbuqǐ", "sorry"],
  ["不好意思", "bù hǎoyìsi", "excuse me"],
  ["我是美國人", "wǒ shì Měiguó rén", "I am American"],
  ["我學中文", "wǒ xué Zhōngwén", "I study Chinese"],
  ["這個多少錢？", "zhège duōshao qián?", "how much is this?"],
  ["洗手間在哪裡？", "xǐshǒujiān zài nǎlǐ?", "where is the restroom?"],
  ["我聽不懂", "wǒ tīng bù dǒng", "I do not understand"],
  ["請再說一次", "qǐng zài shuō yí cì", "please say it again"],
  ["沒關係", "méi guānxi", "it is okay / no problem"],
  ["再見", "zàijiàn", "goodbye"],
];

const PRONUNCIATION_INITIALS = [
  ["Group", "Pinyin", "Mouth position"],
  ["Labials", "b p m f", "Made with the lips together or lip-to-teeth"],
  ["Alveolars", "d t n l", "Tongue tip touches the ridge behind front teeth"],
  ["Velars", "g k h", "Back of the tongue against the soft palate"],
  ["Palatals", "j q x", "Tongue fronted; lighter and thinner than English j/ch/sh"],
  ["Retroflex", "zh ch sh r", "Tongue curls slightly back; a distinct Chinese sound group"],
  ["Flat sibilants", "z c s", "Flatter, teeth closer together; contrast with zh/ch/sh"],
  ["Zero initial", "y w", "Spelling conventions for vowel-start syllables"],
];

const PRONUNCIATION_FINALS = [
  ["Type", "Pinyin", "Example words"],
  ["Simple", "a o e i u ü", "mā, bó, hē, nǐ, lù, nǚ"],
  ["Compound", "ai ei ao ou", "hǎi, lèi, hǎo, dōu"],
  ["Front nasal", "an en in ün", "lán, mén, xīn, jūn"],
  ["Back nasal", "ang eng ing ong", "máng, děng, tīng, dōng"],
  ["Common combos", "ia ie iu ua uo üe", "jiā, xiě, liù, huā, guó, xué"],
];

const TONES = [
  { tone: "1st", shape: "High level", pitch: "5→5", cue: "Steady and held, like sustaining a musical note.", ex: "mā 媽, gē 歌, shū 書", color: "#059669" },
  { tone: "2nd", shape: "Rising", pitch: "3→5", cue: "Like the rising inflection when you ask 'huh?' in English.", ex: "má 麻, hé 河, rén 人", color: "#2563eb" },
  { tone: "3rd", shape: "Low / dip", pitch: "2→1→4", cue: "In isolation it dips low then rises slightly. In connected speech it is often just low.", ex: "mǎ 馬, hěn 很, wǒ 我", color: "#d97706" },
  { tone: "4th", shape: "Sharp fall", pitch: "5→1", cue: "Short, firm, decisive. Like a sharp command.", ex: "mà 罵, shì 是, yào 要", color: "#dc2626" },
  { tone: "Neutral", shape: "Light", pitch: "varies", cue: "Unstressed and short. Its actual pitch depends on the tone before it.", ex: "ma 嗎, de 的, le 了", color: "#64748b" },
];

const TONE_SANDHI = [
  ["Rule", "When it happens", "Example", "What changes"],
  ["3rd + 3rd → 2nd + 3rd", "Two consecutive third tones", "你好 nǐ hǎo", "Spoken as ní hǎo; first 3rd becomes 2nd"],
  ["不 bù → bú", "Before a 4th tone", "不要 bù yào", "Spoken as bú yào"],
  ["一 yī → yí", "Before a 4th tone", "一個 yī gè", "Spoken as yí gè"],
  ["一 yī → yì", "Before 1st / 2nd / 3rd tones", "一天 yī tiān", "Spoken as yì tiān"],
];

const PINYIN_TRAPS = [
  ["Pinyin", "Common mistake", "Correct approach"],
  ["j q x", "Pronouncing like English j, ch, sh", "Tongue stays forward; thinner, lighter sound than English equivalents"],
  ["zh ch sh r", "Confusing with z c s", "Tongue curls back slightly; the retroflex series is a defining Chinese sound"],
  ["z c s", "Over-curling the tongue", "Keep it flat and crisp; teeth almost together"],
  ["ü", "Saying English 'oo'", "Round the lips while keeping the tongue forward, as in French 'u'"],
  ["-ian", "Saying 'ee-an'", "Actually closer to 'yen'; the vowel cluster blends"],
  ["-ui", "Saying 'oo-ee'", "Actually closer to 'way'; a quick glide"],
  ["-iu", "Saying 'ee-oo'", "Actually closer to 'yo'; the sounds merge"],
  ["er / -r suffix", "Ignoring it or over-pronouncing", "Important for listening comprehension; common in northern Mandarin"],
];

const TONE_PAIR_DRILLS = [
  ["Pattern", "Example", "Meaning"],
  ["1 + 1", "天空 tiān kōng", "sky"],
  ["1 + 2", "中國 Zhōng guó", "China"],
  ["1 + 3", "喝水 hē shuǐ", "drink water"],
  ["1 + 4", "吃飯 chī fàn", "eat (a meal)"],
  ["2 + 1", "明天 míng tiān", "tomorrow"],
  ["2 + 4", "什麼 shén me", "what"],
  ["3 + 3", "你好 nǐ hǎo", "hello"],
  ["3 + 2", "美國 Měi guó", "America"],
  ["4 + 1", "大家 dà jiā", "everyone"],
  ["4 + 4", "再見 zài jiàn", "goodbye"],
];

const CORE_WORD_BANK = [
  ["Category", "Chinese", "Pinyin", "English"],
  ["Pronouns", "我 / 你 / 他 / 她 / 它", "wǒ / nǐ / tā / tā / tā", "I / you / he / she / it"],
  ["Plural", "我們 / 你們 / 他們", "wǒmen / nǐmen / tāmen", "we / you (pl.) / they"],
  ["Be", "是", "shì", "to be (equative)"],
  ["Have / exist", "有", "yǒu", "to have; there is"],
  ["Negation", "不 / 沒(有)", "bù / méi(yǒu)", "not / did not; do not have"],
  ["Want / need", "要 / 想", "yào / xiǎng", "want; will / would like to; miss"],
  ["Can", "可以 / 會 / 能", "kěyǐ / huì / néng", "may / know how to / be able to"],
  ["Go / come", "去 / 來", "qù / lái", "go / come"],
  ["Eat / drink", "吃 / 喝", "chī / hē", "eat / drink"],
  ["See / look", "看 / 看見", "kàn / kànjiàn", "look at / see"],
  ["Say / speak", "說 / 講", "shuō / jiǎng", "say; speak"],
  ["Study", "學 / 學習", "xué / xuéxí", "study; learn"],
  ["Know", "知道 / 認識", "zhīdào / rènshi", "know (a fact) / know (a person)"],
  ["Like", "喜歡", "xǐhuan", "to like"],
  ["This / that", "這 / 那", "zhè / nà", "this / that"],
  ["Question words", "什麼 / 哪裡 / 誰 / 怎麼 / 為什麼", "shénme / nǎlǐ / shuí / zěnme / wèishénme", "what / where / who / how / why"],
  ["Time basics", "今天 / 明天 / 昨天 / 現在", "jīntiān / míngtiān / zuótiān / xiànzài", "today / tomorrow / yesterday / now"],
];

const BEGINNER_PATTERNS = [
  ["Meaning", "Pattern", "Example"],
  ["I am ...", "我是 + noun", "我是學生。 Wǒ shì xuéshēng."],
  ["I have ...", "我有 + noun", "我有問題。 Wǒ yǒu wèntí."],
  ["I want ...", "我要 + noun/verb", "我要咖啡。 Wǒ yào kāfēi."],
  ["I would like to ...", "我想 + verb", "我想去。 Wǒ xiǎng qù."],
  ["I like ...", "我喜歡 + noun/verb", "我喜歡中文。 Wǒ xǐhuan Zhōngwén."],
  ["I can ...", "我會 + verb", "我會說一點中文。 Wǒ huì shuō yìdiǎn Zhōngwén."],
  ["Where is ...?", "... 在哪裡？", "地鐵站在哪裡？ Dìtiě zhàn zài nǎlǐ?"],
  ["How much?", "... 多少錢？", "這個多少錢？ Zhège duōshao qián?"],
  ["Is it ...? (yes-no)", "... 嗎？", "你忙嗎？ Nǐ máng ma?"],
  ["I do not understand", "我聽不懂", "我聽不懂。 Wǒ tīng bù dǒng."],
  ["Please say it again", "請再說一次", "請再說一次。 Qǐng zài shuō yí cì."],
];

const SURVIVAL_DIALOGUES = [
  {
    title: "Greeting and self-introduction",
    lines: [
      { s: "A", zh: "你好。", py: "Nǐ hǎo.", en: "Hello." },
      { s: "B", zh: "你好。你叫什麼名字？", py: "Nǐ hǎo. Nǐ jiào shénme míngzi?", en: "Hello. What is your name?" },
      { s: "A", zh: "我叫 Alex。你呢？", py: "Wǒ jiào Alex. Nǐ ne?", en: "My name is Alex. And you?" },
      { s: "B", zh: "我叫小明。你是哪國人？", py: "Wǒ jiào Xiǎo Míng. Nǐ shì nǎ guó rén?", en: "I am Xiao Ming. What country are you from?" },
      { s: "A", zh: "我是美國人。我在學中文。", py: "Wǒ shì Měiguó rén. Wǒ zài xué Zhōngwén.", en: "I am American. I am studying Chinese." },
    ]
  },
  {
    title: "Ordering food",
    lines: [
      { s: "A", zh: "你要什麼？", py: "Nǐ yào shénme?", en: "What would you like?" },
      { s: "B", zh: "我要一碗牛肉麵。", py: "Wǒ yào yì wǎn niúròu miàn.", en: "I want a bowl of beef noodles." },
      { s: "A", zh: "要不要辣？", py: "Yào bú yào là?", en: "Do you want it spicy?" },
      { s: "B", zh: "不要辣，謝謝。", py: "Bú yào là, xièxie.", en: "Not spicy, thanks." },
      { s: "A", zh: "好，一共八十塊。", py: "Hǎo, yígòng bāshí kuài.", en: "Okay, 80 kuai total." },
    ]
  },
  {
    title: "Asking directions",
    lines: [
      { s: "A", zh: "請問，地鐵站在哪裡？", py: "Qǐngwèn, dìtiě zhàn zài nǎlǐ?", en: "Excuse me, where is the subway station?" },
      { s: "B", zh: "往前走，然後左轉。", py: "Wǎng qián zǒu, ránhòu zuǒ zhuǎn.", en: "Go straight ahead, then turn left." },
      { s: "A", zh: "遠嗎？", py: "Yuǎn ma?", en: "Is it far?" },
      { s: "B", zh: "不遠，大概五分鐘。", py: "Bù yuǎn, dàgài wǔ fēnzhōng.", en: "Not far, about five minutes." },
      { s: "A", zh: "謝謝你！", py: "Xièxie nǐ!", en: "Thank you!" },
    ]
  },
  {
    title: "Communication repair",
    lines: [
      { s: "A", zh: "不好意思，我聽不懂。", py: "Bù hǎoyìsi, wǒ tīng bù dǒng.", en: "Sorry, I do not understand." },
      { s: "A", zh: "請再說一次。", py: "Qǐng zài shuō yí cì.", en: "Please say it again." },
      { s: "A", zh: "請說慢一點。", py: "Qǐng shuō màn yìdiǎn.", en: "Please speak more slowly." },
      { s: "A", zh: "你可以寫下來嗎？", py: "Nǐ kěyǐ xiě xiàlái ma?", en: "Can you write it down?" },
      { s: "A", zh: "這個中文怎麼說？", py: "Zhège Zhōngwén zěnme shuō?", en: "How do you say this in Chinese?" },
    ]
  },
  {
    title: "Shopping",
    lines: [
      { s: "A", zh: "這個多少錢？", py: "Zhège duōshao qián?", en: "How much is this?" },
      { s: "B", zh: "兩百五十塊。", py: "Liǎng bǎi wǔshí kuài.", en: "250 kuai." },
      { s: "A", zh: "太貴了。便宜一點可以嗎？", py: "Tài guì le. Piányi yìdiǎn kěyǐ ma?", en: "Too expensive. Can you give a discount?" },
      { s: "B", zh: "兩百塊，好不好？", py: "Liǎng bǎi kuài, hǎo bu hǎo?", en: "200 kuai, okay?" },
      { s: "A", zh: "好，我要。", py: "Hǎo, wǒ yào.", en: "Okay, I will take it." },
    ]
  },
];

const GRAMMAR_ROWS = [
  ["Function", "Pattern", "Example", "Meaning"],
  ["Statement", "Subject + Verb + Object", "我學中文。", "I study Chinese."],
  ["Equative (be)", "A 是 B", "她是老師。", "She is a teacher."],
  ["Have / exist", "A 有 B", "我有兩個哥哥。", "I have two older brothers."],
  ["There is...", "Place + 有 + Noun", "桌子上有一本書。", "There is a book on the table."],
  ["Negation (habit / future)", "不 + Verb / Adj", "我不喝咖啡。", "I do not drink coffee."],
  ["Negation (past / have)", "沒(有) + Verb", "我沒去。", "I did not go."],
  ["Yes-no question", "Statement + 嗎", "你忙嗎？", "Are you busy?"],
  ["A-not-A question", "Verb 不 Verb", "你去不去？", "Are you going or not?"],
  ["What", "什麼", "你要什麼？", "What do you want?"],
  ["Where", "在哪裡", "你住在哪裡？", "Where do you live?"],
  ["Who", "誰", "他是誰？", "Who is he?"],
  ["How", "怎麼", "怎麼去？", "How do you get there?"],
  ["Why", "為什麼", "你為什麼學中文？", "Why do you study Chinese?"],
  ["Location", "A 在 B", "書在桌子上。", "The book is on the table."],
  ["Want (noun)", "要 + noun", "我要水。", "I want water."],
  ["Want (action)", "想 / 要 + verb", "我想去台灣。", "I want to go to Taiwan."],
  ["Can (permission)", "可以", "我可以坐這裡嗎？", "May I sit here?"],
  ["Can (learned ability)", "會", "我會說中文。", "I can speak Chinese."],
  ["Can (physical ability)", "能", "你能來嗎？", "Can you come?"],
  ["Progressive (ongoing)", "在 + Verb", "他在吃飯。", "He is eating."],
  ["Completed action", "Verb + 了", "我吃了。", "I ate / I have eaten."],
  ["Change of state", "... 了", "下雨了。", "It started raining (new situation)."],
  ["Experience", "Verb + 過", "我去過日本。", "I have been to Japan."],
  ["Comparison", "A 比 B + Adj", "今天比昨天冷。", "Today is colder than yesterday."],
  ["Degree complement", "Verb + 得 + description", "他說得很快。", "He speaks very fast."],
  ["Result complement", "Verb + result", "我聽懂了。", "I understood (by listening)."],
  ["Giving / for", "給", "請給我一杯水。", "Please give me a cup of water."],
];

const MEASURE_WORDS = [
  ["Measure word", "Used with", "Example"],
  ["個 gè", "General / default classifier", "一個人, 一個問題"],
  ["本 běn", "Books, bound items", "一本書, 一本雜誌"],
  ["杯 bēi", "Cups, glasses, drinks", "一杯咖啡, 一杯水"],
  ["張 zhāng", "Flat items: paper, tickets, tables", "一張票, 一張桌子"],
  ["件 jiàn", "Clothing; matters / incidents", "一件衣服, 一件事"],
  ["台 tái", "Machines, devices", "一台電腦, 一台車"],
  ["位 wèi", "People (polite)", "一位老師, 一位客人"],
  ["家 jiā", "Businesses, families", "一家公司, 一家餐廳"],
  ["條 tiáo", "Long narrow things: roads, fish, rivers", "一條路, 一條魚"],
  ["雙 shuāng", "Pairs", "一雙鞋, 一雙筷子"],
  ["次 cì", "Occurrences, times", "一次, 兩次"],
  ["碗 wǎn", "Bowls of food", "一碗飯, 一碗麵"],
  ["瓶 píng", "Bottles", "一瓶水, 一瓶酒"],
  ["塊 kuài", "Pieces; also 'yuan' (money)", "一塊蛋糕, 十塊錢"],
];

const SENTENCE_PARTICLES = [
  ["Particle", "Function", "Example", "Meaning"],
  ["嗎 ma", "Yes-no question", "你好嗎？", "Are you well?"],
  ["呢 ne", "And you? / What about...?", "我很好，你呢？", "I am fine, and you?"],
  ["吧 ba", "Suggestion / assumption", "我們走吧。", "Let us go."],
  ["了 le (sentence-final)", "Change / new situation", "他走了。", "He has left. (new info)"],
  ["啊 a", "Softening / exclamation", "好啊！", "Okay! / Sure!"],
  ["嘛 ma (falling)", "Isn't it obvious", "這很簡單嘛。", "This is simple (obviously)."],
];

const CHARACTER_SYSTEM = [
  { title: "Start from words, not isolated characters", desc: "Learn 學生 as a word first; then notice 學 and 生 as components. Words stick better than abstract shapes." },
  { title: "Use component logic", desc: "Semantic parts hint at meaning (氵= water, 口 = mouth, 木 = wood). Phonetic parts hint at sound. This is not random art." },
  { title: "Prioritize frequency", desc: "A core 200–300 characters covers the majority of everyday text. Do not start with rare literary characters." },
  { title: "Handwrite enough to understand structure", desc: "Writing by hand forces attention to stroke order and component balance. After that, switch to typing for daily use." },
];

const CHARACTER_TABLE = [
  ["Pattern", "Why it matters", "Example"],
  ["Semantic + phonetic compound", "Most common structure; one part hints at meaning, one at sound", "媽 = 女 (female) + 馬 (mǎ sound)"],
  ["Single-form character", "High-frequency but limited pattern help; must memorize", "人, 大, 小, 中, 上, 下"],
  ["Word family approach", "One character becomes a whole network of related words", "學 → 學生, 學校, 學習, 學費"],
  ["Component recycling", "Same components appear across many characters; recognize once, read many", "請, 清, 情, 晴 all share 青 (qīng)"],
];

const BASIC_RADICALS = [
  ["Radical", "Meaning hint", "Found in"],
  ["氵", "Water / liquid", "河, 海, 洗, 湖, 清, 漢"],
  ["口", "Mouth / speech", "吃, 喝, 叫, 唱, 嗎, 問"],
  ["木", "Wood / plant", "樹, 林, 森, 桌, 椅, 校"],
  ["心 / 忄", "Heart / feeling", "想, 思, 情, 怕, 慢, 快"],
  ["女", "Female", "媽, 姐, 妹, 她, 好, 姓"],
  ["人 / 亻", "Person", "你, 他, 們, 住, 做, 休"],
  ["手 / 扌", "Hand / action", "打, 找, 拿, 把, 拉, 按"],
  ["日", "Sun / day / time", "明, 時, 早, 晚, 星, 昨"],
  ["火 / 灬", "Fire / heat", "燒, 煮, 烤, 熱, 照, 煎"],
  ["言 / 訁", "Speech / language", "說, 話, 語, 謝, 請, 認"],
];

const NUMBERS = [
  ["Number", "Chinese", "Pinyin"],
  ["0", "零", "líng"],
  ["1", "一", "yī"],
  ["2", "二 / 兩", "èr / liǎng"],
  ["3", "三", "sān"],
  ["4", "四", "sì"],
  ["5", "五", "wǔ"],
  ["6", "六", "liù"],
  ["7", "七", "qī"],
  ["8", "八", "bā"],
  ["9", "九", "jiǔ"],
  ["10", "十", "shí"],
  ["11", "十一", "shí yī"],
  ["20", "二十", "èrshí"],
  ["100", "一百", "yì bǎi"],
  ["1000", "一千", "yì qiān"],
  ["10000", "一萬", "yí wàn"],
];

const NUMBER_RULES = [
  { rule: "二 vs. 兩", detail: "Use 二 for counting and phone numbers. Use 兩 before measure words: 兩個人 (two people), 兩杯咖啡 (two coffees)." },
  { rule: "10,000 is the key unit", detail: "Chinese groups numbers by 萬 (10,000), not by 1,000. So 50,000 is 五萬, not fifty thousands." },
  { rule: "Phone numbers", detail: "Read digit by digit. Use 一 for 1 (yāo is often used to avoid confusion with 七 qī)." },
];

const TIME_EXPRESSIONS = [
  ["Chinese", "Pinyin", "Meaning"],
  ["今天", "jīntiān", "today"],
  ["明天", "míngtiān", "tomorrow"],
  ["昨天", "zuótiān", "yesterday"],
  ["現在", "xiànzài", "now"],
  ["早上", "zǎoshang", "morning"],
  ["下午", "xiàwǔ", "afternoon"],
  ["晚上", "wǎnshang", "evening / night"],
  ["星期一 ~ 日", "xīngqī yī ~ rì", "Monday ~ Sunday"],
  ["一月 ~ 十二月", "yī yuè ~ shí'èr yuè", "January ~ December"],
  ["幾點", "jǐ diǎn", "what time"],
  ["三點半", "sān diǎn bàn", "3:30"],
  ["差五分六點", "chà wǔ fēn liù diǎn", "five minutes to six"],
];

const CULTURAL_NOTES = [
  { title: "Addressing people", body: "Chinese speakers often use titles or roles instead of first names: 老師 (teacher), 醫生 (doctor), or surname + title like 王先生 (Mr. Wang). Using someone's bare first name can feel too casual outside close friendships." },
  { title: "Saying 'no' indirectly", body: "Blunt refusal is often avoided. Phrases like 不太方便 (not very convenient) or 我再想想 (let me think about it) serve as softer ways to decline. A direct 不 (no) can sound abrupt in social contexts." },
  { title: "Food culture in conversation", body: "你吃了嗎？(Have you eaten?) is a common greeting, not a literal dinner invitation. Food is deeply social. Expect to discuss food, share dishes at round tables, and encounter the polite insistence of 'you order first.'" },
  { title: "Gift and red envelope etiquette", body: "Gifts are usually declined once or twice before accepting. Red envelopes (紅包) containing money are given during Lunar New Year, weddings, and other occasions. Even numbers are preferred; avoid 4 (sounds like 'death')." },
  { title: "Face (面子)", body: "面子 is the social concept of reputation and dignity. Avoiding public embarrassment (for yourself and others) is important. Correcting someone's mistake privately rather than in front of a group is the expected norm." },
  { title: "Traditional vs. Simplified characters", body: "Traditional characters are used in Taiwan, Hong Kong, and Macau. Simplified characters are used in mainland China and Singapore. The spoken language is essentially the same. Strong learners eventually recognize both writing systems." },
];

const READING_TRACK = [
  { phase: "1", title: "Pinyin-supported reading", desc: "Ultra-short dialogues with pinyin visible. Focus on connecting sound to meaning." },
  { phase: "2", title: "Character-first micro texts", desc: "1–3 sentence passages using only high-frequency characters. Limit new items per text." },
  { phase: "3", title: "Graded readers", desc: "Leveled stories with controlled vocabulary and natural repetition. Build stamina." },
  { phase: "4", title: "Supported real material", desc: "Menus, signs, social posts, news snippets, subtitles. Use a dictionary aggressively." },
];

const WRITING_LAYERS = [
  { icon: "pencil", title: "Handwriting for structure", body: "Practice stroke order and component balance by writing common characters by hand. This is training, not the long-term daily mode." },
  { icon: "penTool", title: "Typing for productivity", body: "Use pinyin-based input on a keyboard or phone. The critical skill is selecting the correct character among many homophones." },
  { icon: "fileText", title: "Controlled sentence output", body: "Start with: self-introduction, daily routine, comparison, opinion, request, apology. Do not attempt essays before building these basics." },
];

const ADVANCED_BLOCKS = [
  { title: "Discourse markers", items: ["其實 (actually; soft correction)", "然後 (then; sequence marker)", "所以 (so; therefore)", "不過 (however; but)", "就是 (it is just that; in spoken explanation)", "反正 (anyway; regardless)"] },
  { title: "Register and politeness", items: ["Spoken forms differ from formal written forms", "請 adds politeness; 麻煩你 is 'please bother yourself'", "您 is the polite 'you' for elders or formal settings", "Recognizing register differences is an advanced skill"] },
  { title: "Beyond translation", items: ["Chinese packages meaning differently from English", "把 construction reframes the object as the topic of the action", "Topic-comment structure is common: 這本書我看過 (this book, I have read it)", "Train yourself to ask: what would a Chinese speaker naturally choose?"] },
  { title: "Rhythm and fluency", items: ["Advanced learners must work on sentence melody and chunking", "Correct individual syllables mean little if sentence rhythm is unnatural", "Shadowing native speakers at full speed is the key exercise", "Erhua, reduction, and connected speech patterns become targets"] },
];

const COMMON_ERRORS = [
  { title: "nǐ hǎo is not two English words", fix: "It is a tone pair. The first 3rd tone changes to rising (tone sandhi). Say it as one fluid Chinese unit, not with English stress patterns." },
  { title: "j, q, x are not English j, ch, sh", fix: "Push the tongue farther forward. The sound is thinner and produced closer to the front palate." },
  { title: "ü is not 'oo'", fix: "Round the lips while keeping the tongue forward. This vowel does not exist in English." },
  { title: "了 is not just 'past tense'", fix: "了 marks completion or a change of state. It is an aspect marker, not a tense marker. 下雨了 means 'it started raining' (new situation)." },
  { title: "是 is not always needed", fix: "Chinese adjectives function as verbs. Say 我很忙 (I am busy), not 我是很忙. 是 is for equating nouns." },
  { title: "Confusing 的, 得, 地", fix: "的 links nouns/modifiers. 得 follows verbs for degree. 地 marks adverbs before verbs. They sound alike but are written differently." },
  { title: "Using English word order for everything", fix: "Time and place come before the verb in Chinese: 我明天在家吃飯 (I tomorrow at-home eat). Subject → Time → Place → Verb → Object." },
  { title: "Ignoring tones in connected speech", fix: "Getting individual tones right is not enough. Tone pairs and tone sandhi in flowing sentences must be practiced." },
];

const STUDY_PLANS = {
  "Lesson 1: Sounds": [
    "Simple finals: a o e i u ü",
    "Labials: b p m f",
    "Alveolars: d t n l",
    "Velars: g k h",
    "Palatals: j q x",
    "Retroflex: zh ch sh r",
    "Flat sibilants: z c s",
    "Four tones: mā má mǎ mà",
    "Tone pair drill: all 16 combinations",
    "Tone sandhi: 3rd + 3rd, 不, 一",
  ],
  "Lesson 2: Core words": [
    "Pronouns: 我 你 他 她 我們 他們",
    "Essentials: 是 有 不 沒 這 那",
    "Question words: 什麼 哪裡 誰 怎麼",
    "Numbers: 一 to 十, then 百 千 萬",
    "Survival phrases: 你好 謝謝 對不起",
    "Patterns: 我是… 我要… …在哪裡？",
    "Time: 今天 明天 昨天 現在",
    "我聽不懂 / 請再說一次",
  ],
  "Lesson 3: Real use": [
    "Self-introduction dialogue (full)",
    "Ordering food dialogue",
    "Asking directions dialogue",
    "Shopping / bargaining dialogue",
    "Communication repair phrases",
    "Measure words: 個 本 杯 張 件",
    "嗎 / 呢 / 吧 sentence particles",
    "再見。",
  ],
};

const LISTENING_LOOP = [
  "Listen once: what is happening?",
  "Listen again: catch exact words and tone movement",
  "Shadow: repeat immediately after the audio",
  "Record yourself and compare rhythm",
  "Fix one small issue at a time",
];

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
export default function ChineseLearningGuide() {
  const [activeSection, setActiveSection] = useState("sound");
  const [studyWindow, setStudyWindow] = useState("Lesson 1: Sounds");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activePlan = useMemo(() => STUDY_PLANS[studyWindow], [studyWindow]);

  const scrollTo = useCallback((id) => {
    setActiveSection(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900" style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden">
              <Icon name="grid" className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
                <Icon name="globe" className="h-3.5 w-3.5" />
                <span>Mandarin Chinese</span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Complete Learning Guide</h1>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Badge tone="emerald">Beginner → Advanced</Badge>
            <Badge tone="blue">Traditional Characters</Badge>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        {/* ── SIDEBAR ── */}
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`${sidebarOpen ? "fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto bg-white p-4 shadow-xl lg:relative lg:z-auto lg:h-auto lg:w-auto lg:overflow-visible lg:p-0 lg:shadow-none" : "hidden lg:block"} lg:sticky lg:top-20 lg:h-fit`}>
          <div className="lg:rounded-2xl lg:border lg:border-slate-200 lg:bg-white lg:p-3 lg:shadow-sm">
            {sidebarOpen && (
              <button type="button" onClick={() => setSidebarOpen(false)} className="mb-3 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 lg:hidden">Close</button>
            )}
            <p className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-slate-400">Sections</p>
            <nav className="space-y-0.5">
              {SECTION_ORDER.map((id) => {
                const m = SECTION_META[id];
                const isActive = activeSection === id;
                return (
                  <button key={id} type="button" onClick={() => scrollTo(id)} className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${isActive ? "bg-emerald-50 font-bold text-emerald-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon name={m.icon} className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{m.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{m.level}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <div className="flex items-start gap-2">
                <Icon name="target" className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-800">Start with <strong>Pronunciation</strong>, then <strong>First Words</strong>, then <strong>Conversation</strong>. This is the recommended sequence.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="space-y-6">

          {/* ═══ HERO ═══ */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Learn Mandarin Chinese directly.</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-2xl">
                  Start with pronunciation, then core words, then basic conversation.
                  This is an actual learning sequence—not a long explanation about how to learn.
                  Every section is designed to be used, not just read.
                </p>
                <div className="mt-6">
                  <StepFlow items={["Pronunciation", "Core words", "Conversation", "Grammar", "Characters", "Expand"]} />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: "volume", t: "Pronunciation first", d: "Learn the sound system before analyzing grammar." },
                    { icon: "message", t: "Words into sentences", d: "Every small unit becomes a usable sentence immediately." },
                    { icon: "layers", t: "Characters after sound", d: "Characters support words, not replace them." },
                    { icon: "zap", t: "Direct learning", d: "Less theory, more actual Chinese." },
                  ].map((p) => (
                    <div key={p.t} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                      <div className="mb-2 inline-flex rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600">
                        <Icon name={p.icon} className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">{p.t}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{p.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">Script decision</p>
                <div className="space-y-3">
                  {[
                    { t: "Spoken language", d: "Standard Mandarin. Pronunciation trained via pinyin." },
                    { t: "Writing system", d: "This guide uses Traditional Chinese characters (正體字)." },
                    { t: "What to know", d: "Traditional and Simplified are two scripts for the same spoken language. Strong learners recognize both eventually." },
                  ].map((s) => (
                    <div key={s.t} className="rounded-xl border border-white bg-white p-3 shadow-sm">
                      <p className="text-xs font-bold text-slate-900">{s.t}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══ PRONUNCIATION ═══ */}
          <section id="sound" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="volume" eyebrow="Pronunciation" title="Pinyin, initials, finals, and tones" description="This is the actual foundation. Everything else depends on getting the sound system right." />

            {/* TONE CONTOUR DIAGRAM */}
            <Card icon="music" title="The four tones + neutral tone" description="Mandarin uses pitch to distinguish meaning. The same syllable with different tones becomes a different word.">
              <div className="mt-2 mb-4">
                <ToneContourDiagram />
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {TONES.map((t) => (
                  <div key={t.tone} className="rounded-xl border border-slate-200 p-3" style={{ borderLeftColor: t.color, borderLeftWidth: 3 }}>
                    <p className="text-xs font-bold" style={{ color: t.color }}>{t.tone} tone</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">{t.shape} · {t.pitch}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{t.cue}</p>
                    <p className="mt-1 text-xs text-slate-500">{t.ex}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-4">
              <TipBox type="warn">
                <strong>Tone sandhi changes are mandatory.</strong> If you skip them, native speakers will hear you as mispronouncing, not just accented.
              </TipBox>
            </div>

            <div className="mt-4">
              <Card icon="repeat" title="Tone sandhi rules" description="These tones change automatically in connected speech. You must learn them as rules, not exceptions.">
                <Table columns={TONE_SANDHI[0]} rows={TONE_SANDHI.slice(1)} />
              </Card>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card icon="volume" title="Initials (consonants)" description="Read these as Chinese sounds—not as English letters.">
                <Table columns={PRONUNCIATION_INITIALS[0]} rows={PRONUNCIATION_INITIALS.slice(1)} compact />
              </Card>
              <Card icon="volume" title="Finals (vowels and endings)" description="These complete the syllable after the initial.">
                <Table columns={PRONUNCIATION_FINALS[0]} rows={PRONUNCIATION_FINALS.slice(1)} compact />
              </Card>
            </div>

            <div className="mt-4">
              <Card icon="alertTriangle" title="Pinyin traps for English speakers" description="These are the sounds most likely to cause persistent errors if not corrected early.">
                <Table columns={PINYIN_TRAPS[0]} rows={PINYIN_TRAPS.slice(1)} />
              </Card>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card icon="repeat" title="Tone pair drill table" description="Practice every combination. This is more useful than reading about tones.">
                <Table columns={TONE_PAIR_DRILLS[0]} rows={TONE_PAIR_DRILLS.slice(1)} compact />
              </Card>
              <Card icon="ear" title="Listening and shadowing loop" description="Use this cycle every time you work with audio.">
                <div className="space-y-2">
                  {LISTENING_LOOP.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">{i + 1}</span>
                      <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ═══ FIRST WORDS ═══ */}
          <section id="start" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="bookOpen" eyebrow="First words" title="The words and patterns you need immediately" description="Do not start with theory. Start with words and sentences you can use today." />
            <Card icon="zap" title="Day-one survival phrases" description="Memorize these before anything else.">
              <Table columns={QUICK_START[0]} rows={QUICK_START.slice(1)} />
            </Card>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card icon="bookOpen" title="Core word bank" description="These are the building blocks for real sentences.">
                <Table columns={CORE_WORD_BANK[0]} rows={CORE_WORD_BANK.slice(1)} compact />
              </Card>
              <Card icon="workflow" title="First sentence patterns" description="Memorize the pattern. Then replace one word at a time.">
                <Table columns={BEGINNER_PATTERNS[0]} rows={BEGINNER_PATTERNS.slice(1)} compact />
              </Card>
            </div>
            <div className="mt-4">
              <TipBox type="tip">
                <strong>Pattern substitution</strong> is the fastest path to real speech. Take 我要咖啡 and swap the noun: 我要水, 我要茶, 我要那個. One pattern → many sentences.
              </TipBox>
            </div>
          </section>

          {/* ═══ CONVERSATION ═══ */}
          <section id="conversation" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="message" eyebrow="Conversation" title="Say these dialogues out loud" description="Do not just read silently. Speak both roles. Repeat until the lines feel automatic." />
            <div className="grid gap-4 lg:grid-cols-2">
              {SURVIVAL_DIALOGUES.map((d, idx) => (
                <Card key={d.title} icon="message" title={d.title} className={idx === SURVIVAL_DIALOGUES.length - 1 && SURVIVAL_DIALOGUES.length % 2 !== 0 ? "lg:col-span-2" : ""}>
                  <div className="space-y-2">
                    {d.lines.map((l, i) => (
                      <div key={i} className={`rounded-xl border p-3 ${l.s === "A" ? "border-emerald-200 bg-emerald-50/50" : "border-blue-200 bg-blue-50/50"}`}>
                        <div className="flex items-start gap-2">
                          <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${l.s === "A" ? "bg-emerald-600" : "bg-blue-600"}`}>{l.s}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900">{l.zh}</p>
                            <p className="text-xs text-slate-500">{l.py}</p>
                            <p className="text-xs text-slate-400 italic">{l.en}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ═══ GRAMMAR ═══ */}
          <section id="grammar" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="brain" eyebrow="Grammar" title="The patterns that unlock the language" description="Chinese grammar is pattern-based, not conjugation-based. Master the patterns and the language opens up." />

            <Card icon="workflow" title="Basic sentence order: Subject → Verb → Object" description="Chinese follows SVO order like English—but time and place go before the verb.">
              <div className="my-3">
                <SVODiagram />
              </div>
              <TipBox type="info">
                Word order with time and place: <strong>我明天在學校學中文。</strong> (I + tomorrow + at school + study + Chinese). Time and place always come before the verb.
              </TipBox>
            </Card>

            <div className="mt-4">
              <Card icon="brain" title="Complete grammar pattern table">
                <Table columns={GRAMMAR_ROWS[0]} rows={GRAMMAR_ROWS.slice(1)} compact />
              </Card>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card icon="layers" title="Measure words (量詞)" description="Chinese requires a measure word between a number and a noun. There is no way around this.">
                <Table columns={MEASURE_WORDS[0]} rows={MEASURE_WORDS.slice(1)} compact />
                <div className="mt-3">
                  <TipBox type="tip">When in doubt, use <strong>個</strong>. It is the most general classifier and works in many informal situations.</TipBox>
                </div>
              </Card>

              <div className="space-y-4">
                <Card icon="search" title="The three 'de' particles" description="These sound the same but are written differently and serve different grammatical functions.">
                  <div className="space-y-2">
                    {[
                      { ch: "的", py: "de", fn: "Possession / modification (noun-linking)", ex: "我的書 (my book), 好吃的菜 (delicious food)", color: "#059669" },
                      { ch: "得", py: "de", fn: "Degree / result after a verb", ex: "他說得很快 (he speaks very fast)", color: "#2563eb" },
                      { ch: "地", py: "de", fn: "Adverb marker before a verb", ex: "慢慢地說 (speak slowly)", color: "#d97706" },
                    ].map((d) => (
                      <div key={d.ch} className="rounded-xl border border-slate-200 p-3" style={{ borderLeftColor: d.color, borderLeftWidth: 3 }}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-slate-900">{d.ch}</span>
                          <span className="text-xs text-slate-400">{d.py}</span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-slate-700">{d.fn}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{d.ex}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card icon="message" title="Sentence-final particles" description="These small words at the end of a sentence change the tone, mood, or function.">
                  <Table columns={SENTENCE_PARTICLES[0]} rows={SENTENCE_PARTICLES.slice(1)} compact />
                </Card>
              </div>
            </div>
          </section>

          {/* ═══ CHARACTERS ═══ */}
          <section id="characters" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="layers" eyebrow="Characters" title="How to learn characters without drowning" description="Characters are not random art. Component logic, frequency control, and word-family grouping beat brute-force memorization." />

            <Card icon="search" title="How characters are built: semantic + phonetic components">
              <div className="my-2">
                <CharacterBreakdownSVG />
              </div>
              <p className="text-sm leading-relaxed text-slate-600">Most Chinese characters are <strong>semantic-phonetic compounds</strong>. One part hints at meaning category; the other hints at pronunciation. This is the single most important structural insight for character learning.</p>
            </Card>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Card icon="bookOpen" title="Core learning principles">
                <div className="space-y-2.5">
                  {CHARACTER_SYSTEM.map((b) => (
                    <div key={b.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                      <p className="text-sm font-bold text-slate-900">{b.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card icon="grid" title="Character pattern overview">
                <Table columns={CHARACTER_TABLE[0]} rows={CHARACTER_TABLE.slice(1)} compact />
              </Card>
            </div>

            <div className="mt-4">
              <Card icon="layers" title="Common radicals (meaning components)" description="Recognizing these radicals gives you a foothold when encountering new characters.">
                <Table columns={BASIC_RADICALS[0]} rows={BASIC_RADICALS.slice(1)} compact />
              </Card>
            </div>
          </section>

          {/* ═══ READING ═══ */}
          <section id="reading" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="fileText" eyebrow="Reading" title="A realistic reading progression" description="Do not start with dense native material. A staged ladder keeps difficulty just high enough to grow." />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {READING_TRACK.map((r) => (
                <div key={r.phase} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Badge tone="blue">Phase {r.phase}</Badge>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">{r.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ WRITING ═══ */}
          <section id="writing" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="penTool" eyebrow="Writing" title="Handwriting, typing, and sentence output" description="Writing is three separate skills. Train each one deliberately." />
            <div className="grid gap-4 md:grid-cols-3">
              {WRITING_LAYERS.map((w) => (
                <Card key={w.title} icon={w.icon} title={w.title}>
                  <p className="text-sm leading-relaxed text-slate-600">{w.body}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ═══ NUMBERS & TIME ═══ */}
          <section id="numbers" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="hash" eyebrow="Numbers & time" title="The number system and time expressions" description="Chinese numbers follow a logical base-10 pattern. Time and date structure is straightforward once you learn the building blocks." />
            <div className="grid gap-4 lg:grid-cols-2">
              <Card icon="hash" title="Numbers 0–10,000" description="Chinese uses a clean base-10 system. 十一 = ten-one = 11. 二十三 = two-ten-three = 23.">
                <Table columns={NUMBERS[0]} rows={NUMBERS.slice(1)} compact />
                <div className="mt-3 space-y-2">
                  {NUMBER_RULES.map((r) => (
                    <div key={r.rule} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-bold text-slate-900">{r.rule}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{r.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card icon="clock" title="Time expressions" description="Time words usually come before the verb: 我明天去 (I tomorrow go).">
                <Table columns={TIME_EXPRESSIONS[0]} rows={TIME_EXPRESSIONS.slice(1)} compact />
                <div className="mt-3">
                  <TipBox type="info">
                    Date order is large → small: <strong>年 (year) → 月 (month) → 日 (day)</strong>. Example: 2025年三月十四日 = March 14, 2025. Days of the week: 星期 + number (星期一 = Monday).
                  </TipBox>
                </div>
              </Card>
            </div>
          </section>

          {/* ═══ CULTURAL NOTES ═══ */}
          <section id="culture" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="users" eyebrow="Cultural notes" title="What the textbook usually skips" description="Language does not exist in a vacuum. These cultural patterns directly affect how you use Chinese in real situations." />
            <div className="grid gap-3 md:grid-cols-2">
              {CULTURAL_NOTES.map((n) => (
                <div key={n.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{n.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ ADVANCED ═══ */}
          <section id="advanced" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="sparkles" eyebrow="Advanced" title="What separates advanced from intermediate" description="The jump to advanced is about precision, rhythm, discourse control, and naturalness—not just vocabulary volume." />
            <div className="grid gap-4 md:grid-cols-2">
              {ADVANCED_BLOCKS.map((b) => (
                <Card key={b.title} icon="star" title={b.title}>
                  <div className="space-y-1.5">
                    {b.items.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Icon name="checkCircle" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ═══ STUDY PLANS ═══ */}
          <section id="plan" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="clock" eyebrow="Study plans" title="Your first three lesson checklists" description="Pick one lesson. Repeat it until every item feels stable in your mouth and ear before moving on." />
            <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 px-1 text-xs font-bold uppercase tracking-widest text-slate-400">Choose a lesson</p>
                <div className="space-y-1.5">
                  {Object.keys(STUDY_PLANS).map((key) => {
                    const sel = key === studyWindow;
                    return (
                      <button key={key} type="button" onClick={() => setStudyWindow(key)} className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${sel ? "border-emerald-300 bg-emerald-50 font-bold text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
                        <span>{key}</span>
                        <Icon name="arrowRight" className="h-3.5 w-3.5 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <Card icon="clock" title={`${studyWindow} checklist`} description="Read, say, and review each item.">
                <div className="grid gap-2 sm:grid-cols-2">
                  {activePlan.map((item, i) => (
                    <div key={item} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">{i + 1}</span>
                      <p className="text-sm text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ═══ COMMON ERRORS ═══ */}
          <section id="mistakes" className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <SectionHeader icon="shield" eyebrow="Common errors" title="The mistakes that waste the most time" description="These are not small details. They are the habits most likely to slow progress or create false confidence." />
            <div className="grid gap-3 md:grid-cols-2">
              {COMMON_ERRORS.map((e) => (
                <div key={e.title} className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg border border-rose-200 bg-white p-1.5 text-rose-600">
                      <Icon name="alertTriangle" className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{e.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{e.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FOOTER ── */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-xs text-slate-400">Mandarin Chinese Guide<br />
              © 2026 EugeneYip.com All Rights Reserved.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
