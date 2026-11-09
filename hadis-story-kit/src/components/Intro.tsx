import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HadisProps } from "../types";
import { COLORS } from "../theme";
import { BN_FONT } from "../fonts";
import { Background } from "./Background";
import { useLayout } from "./useLayout";

const bnDigits = (n: number) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const Intro: React.FC<{ data: HadisProps }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, marginX } = useLayout();
  const a = spring({ frame, fps, config: { damping: 15 } });
  const b = interpolate(frame, [fps * 0.8, fps * 1.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const c = interpolate(frame, [fps * 1.6, fps * 2.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background theme="desert-night" frames={4 * fps} dim={0.35} />
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", padding: `0 ${marginX}px`, textAlign: "center", gap: 28 * u }}
      >
        <div
          style={{
            transform: `scale(${0.8 + 0.2 * a})`,
            opacity: a,
            fontFamily: BN_FONT,
            fontWeight: 700,
            fontSize: 110 * u,
            color: COLORS.gold,
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          {data.series.name}
        </div>
        <div style={{ opacity: b, fontFamily: BN_FONT, fontWeight: 700, fontSize: 52 * u, color: COLORS.cream }}>
          পর্ব {bnDigits(data.series.episode)}
        </div>
        <div
          style={{
            opacity: c,
            fontFamily: BN_FONT,
            fontWeight: 700,
            fontSize: 72 * u,
            color: COLORS.cream,
            borderTop: `${3 * u}px solid ${COLORS.gold}`,
            paddingTop: 28 * u,
            lineHeight: 1.4,
          }}
        >
          {data.title}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
