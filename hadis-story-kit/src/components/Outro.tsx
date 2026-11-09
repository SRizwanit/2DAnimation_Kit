import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { HadisProps } from "../types";
import { COLORS } from "../theme";
import { BN_FONT } from "../fonts";
import { Background } from "./Background";
import { useLayout } from "./useLayout";

export const Outro: React.FC<{ data: HadisProps }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, marginX } = useLayout();
  const o1 = interpolate(frame, [0, fps * 0.8], [0, 1], { extrapolateRight: "clamp" });
  const o2 = interpolate(frame, [fps * 0.8, fps * 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o3 = interpolate(frame, [fps * 1.8, fps * 2.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background theme="mosque-dusk" frames={5 * fps} dim={0.45} />
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", padding: `0 ${marginX}px`, textAlign: "center", gap: 30 * u }}
      >
        <div style={{ opacity: o1, fontFamily: BN_FONT, fontWeight: 700, fontSize: 60 * u, color: COLORS.cream, lineHeight: 1.5 }}>
          {data.app.cta}
        </div>
        <div
          style={{
            opacity: o2,
            fontFamily: BN_FONT,
            fontWeight: 700,
            fontSize: 64 * u,
            color: COLORS.ink,
            background: COLORS.gold,
            padding: `${22 * u}px ${44 * u}px`,
            borderRadius: 28 * u,
            lineHeight: 1.4,
          }}
        >
          {data.app.name}
        </div>
        <div style={{ opacity: o3, fontFamily: BN_FONT, fontWeight: 400, fontSize: 40 * u, color: COLORS.goldSoft }}>
          প্রতিদিন একটি হাদিস · {data.series.name}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
