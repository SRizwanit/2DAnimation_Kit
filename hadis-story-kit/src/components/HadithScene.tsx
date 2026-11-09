import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { HadisProps, Scene } from "../types";
import { COLORS } from "../theme";
import { AR_FONT, BN_FONT } from "../fonts";
import { Background } from "./Background";
import { Tag } from "./Tag";
import { useLayout } from "./useLayout";

/** হাদিসের মূল পাঠ: আরবি + বাংলা অনুবাদ + সূত্র — গল্পের অংশ থেকে আলাদা কার্ড */
export const HadithScene: React.FC<{ scene: Scene; frames: number; meta?: Pick<HadisProps, "narrator" | "grade" | "source"> }> = ({
  scene,
  frames,
  meta,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait, u, marginX, marginTop, marginBottom } = useLayout();
  const arLen = (scene.arabic ?? "").length;
  const arSize = (arLen > 150 ? (portrait ? 54 : 50) : portrait ? 66 : 58) * u;
  const arOpacity = interpolate(frame, [0.3 * fps, 1.1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bnOpacity = interpolate(frame, [1.6 * fps, 2.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const srcOpacity = interpolate(frame, [2.6 * fps, 3.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background theme={scene.theme} figure={scene.figure} frames={frames} dim={0.55} />
      <Tag text="হাদিসের মূল পাঠ" tone="hadith" />
      <div
        style={{
          position: "absolute",
          left: marginX,
          right: marginX,
          top: marginTop + 110 * u,
          bottom: marginBottom,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 34 * u,
        }}
      >
        <div
          style={{
            background: "rgba(8,12,28,0.78)",
            border: `${3 * u}px solid ${COLORS.gold}`,
            borderRadius: 36 * u,
            padding: `${36 * u}px ${34 * u}px`,
            display: "flex",
            flexDirection: "column",
            gap: 30 * u,
          }}
        >
          <div
            dir="rtl"
            style={{
              opacity: arOpacity,
              fontFamily: AR_FONT,
              fontWeight: 700,
              fontSize: arSize,
              lineHeight: 1.85,
              color: COLORS.goldSoft,
              textAlign: "center",
            }}
          >
            {scene.arabic}
          </div>
          <div style={{ height: 2 * u, background: "rgba(232,194,106,0.5)", opacity: bnOpacity }} />
          <div
            style={{
              opacity: bnOpacity,
              fontFamily: BN_FONT,
              fontWeight: 400,
              fontSize: (portrait ? 42 : 38) * u,
              lineHeight: 1.6,
              color: COLORS.cream,
              textAlign: "center",
            }}
          >
            {scene.bengali}
          </div>
        </div>
        {meta ? (
          <div
            style={{
              opacity: srcOpacity,
              fontFamily: BN_FONT,
              fontWeight: 700,
              fontSize: 34 * u,
              color: COLORS.gold,
              textAlign: "center",
            }}
          >
            {meta.source.book} · হাদিস নং {meta.source.number} · মান: {meta.grade}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
