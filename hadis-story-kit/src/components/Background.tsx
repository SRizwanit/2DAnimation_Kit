import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";
import { BgTheme, Figure } from "../types";

type Palette = {
  sky: [string, string, string];
  orb: { x: number; y: number; r: number; c: string };
  stars: boolean;
  dune: [string, string];
  mosque: boolean;
  palm: boolean;
  lamp: boolean;
};

const PALETTES: Record<BgTheme, Palette> = {
  dawn: {
    sky: ["#1D2B53", "#C4688A", "#F6B67A"],
    orb: { x: 560, y: 560, r: 70, c: "#FFE2A8" },
    stars: false,
    dune: ["#7A4B3A", "#3A2430"],
    mosque: true,
    palm: true,
    lamp: false,
  },
  day: {
    sky: ["#3E8EDE", "#8CC4F0", "#EAF4FF"],
    orb: { x: 700, y: 230, r: 60, c: "#FFF3B0" },
    stars: false,
    dune: ["#D9B77A", "#A8844F"],
    mosque: true,
    palm: true,
    lamp: false,
  },
  "desert-night": {
    sky: ["#050A1E", "#0E1A3F", "#243865"],
    orb: { x: 700, y: 210, r: 55, c: "#F4F1DE" },
    stars: true,
    dune: ["#2A2A44", "#12122A"],
    mosque: false,
    palm: true,
    lamp: false,
  },
  "mosque-dusk": {
    sky: ["#14122E", "#5B3A6B", "#E39A6B"],
    orb: { x: 330, y: 560, r: 60, c: "#FFD48A" },
    stars: true,
    dune: ["#4A2E3F", "#1C1226"],
    mosque: true,
    palm: true,
    lamp: false,
  },
  "home-lamp": {
    sky: ["#0A0E1F", "#1B1A34", "#3A2B3F"],
    orb: { x: 700, y: 220, r: 45, c: "#EDE6C8" },
    stars: true,
    dune: ["#2B2230", "#130F1B"],
    mosque: false,
    palm: false,
    lamp: true,
  },
};

const Silhouette: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#070A14">
    <circle cx="0" cy="-62" r="15" />
    <path d="M-24 0 Q-27 -38 0 -48 Q27 -38 24 0 Z" />
  </g>
);

const Figures: React.FC<{ figure: Figure; gold: string }> = ({ figure, gold }) => {
  const gy = 735;
  if (figure === "one") return <Silhouette x={500} y={gy} s={2.2} />;
  if (figure === "two") return (<><Silhouette x={430} y={gy} s={2} /><Silhouette x={580} y={gy} s={1.8} /></>);
  if (figure === "group")
    return (
      <>
        {[330, 410, 490, 570, 650].map((x, i) => (
          <Silhouette key={x} x={x} y={gy + (i % 2) * 14} s={1.5 + (i % 3) * 0.15} />
        ))}
      </>
    );
  if (figure === "light")
    return (
      <g>
        <ellipse cx="500" cy="660" rx="120" ry="190" fill="url(#aura)" />
        <ellipse cx="500" cy="660" rx="30" ry="120" fill={gold} opacity="0.35" />
      </g>
    );
  return null;
};

export const Background: React.FC<{ theme: BgTheme; figure?: Figure; frames: number; dim?: number }> = ({
  theme,
  figure = "none",
  frames,
  dim = 0,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const p = PALETTES[theme];
  const scale = interpolate(frame, [0, frames], [1.02, 1.09], { extrapolateRight: "clamp" });
  const drift = interpolate(frame, [0, frames], [-10, 10], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <div style={{ width, height, transform: `translateX(${drift}px) scale(${scale})`, transformOrigin: "50% 60%" }}>
        <svg width={width} height={height} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={p.sky[0]} />
              <stop offset="0.55" stopColor={p.sky[1]} />
              <stop offset="1" stopColor={p.sky[2]} />
            </linearGradient>
            <linearGradient id="dune" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={p.dune[0]} />
              <stop offset="1" stopColor={p.dune[1]} />
            </linearGradient>
            <radialGradient id="orb">
              <stop offset="0" stopColor={p.orb.c} stopOpacity="1" />
              <stop offset="1" stopColor={p.orb.c} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="aura">
              <stop offset="0" stopColor="#FFE9A8" stopOpacity="0.95" />
              <stop offset="0.6" stopColor="#E8C26A" stopOpacity="0.35" />
              <stop offset="1" stopColor="#E8C26A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1000" height="1000" fill="url(#sky)" />
          {p.stars &&
            Array.from({ length: 70 }).map((_, i) => (
              <circle
                key={i}
                cx={random(`sx${i}`) * 1000}
                cy={random(`sy${i}`) * 560}
                r={0.8 + random(`sr${i}`) * 1.8}
                fill="#fff"
                opacity={0.35 + 0.5 * Math.abs(Math.sin(frame / 22 + i))}
              />
            ))}
          <circle cx={p.orb.x} cy={p.orb.y} r={p.orb.r * 2.6} fill="url(#orb)" opacity="0.55" />
          <circle cx={p.orb.x} cy={p.orb.y} r={p.orb.r} fill={p.orb.c} />
          {p.mosque && (
            <g fill="#0D0F22" opacity="0.92">
              <rect x="600" y="600" width="170" height="90" />
              <path d="M610 600 Q685 500 760 600 Z" />
              <rect x="682" y="478" width="6" height="26" />
              <rect x="580" y="520" width="20" height="170" />
              <path d="M578 520 L590 480 L602 520 Z" />
              <rect x="770" y="540" width="18" height="150" />
              <path d="M768 540 L779 502 L790 540 Z" />
            </g>
          )}
          {p.palm && (
            <g fill="#0A0C1C" opacity="0.9">
              <rect x="226" y="560" width="9" height="150" />
              <path d="M230 566 Q190 520 150 548 Q195 530 230 566 Z" />
              <path d="M230 566 Q270 520 312 548 Q268 530 230 566 Z" />
              <path d="M230 566 Q215 505 236 478 Q238 525 230 566 Z" />
            </g>
          )}
          {p.lamp && (
            <g>
              <circle cx="500" cy="560" r="170" fill="url(#orb)" opacity="0.6" />
              <rect x="492" y="545" width="16" height="26" rx="4" fill="#FFD98A" />
            </g>
          )}
          <path d="M0 690 Q180 630 360 680 T700 670 T1000 650 L1000 1000 L0 1000 Z" fill="url(#dune)" />
          <path d="M0 770 Q250 720 520 770 T1000 750 L1000 1000 L0 1000 Z" fill={p.dune[1]} opacity="0.85" />
          <Figures figure={figure} gold="#E8C26A" />
        </svg>
      </div>
      <AbsoluteFill style={{ background: `rgba(5,8,20,${dim})` }} />
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)" }}
      />
    </AbsoluteFill>
  );
};
