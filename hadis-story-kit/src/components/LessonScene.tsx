import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Scene } from "../types";
import { COLORS } from "../theme";
import { BN_FONT } from "../fonts";
import { Background } from "./Background";
import { Tag } from "./Tag";
import { useLayout } from "./useLayout";

export const LessonScene: React.FC<{ scene: Scene; frames: number }> = ({ scene, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait, u, marginX, marginTop, marginBottom } = useLayout();
  const items = scene.lessons ?? [];

  return (
    <AbsoluteFill>
      <Background theme={scene.theme} figure={scene.figure} frames={frames} dim={0.5} />
      <Tag text="আজকের শিক্ষা" tone="lesson" />
      <div
        style={{
          position: "absolute",
          left: marginX,
          right: marginX,
          top: marginTop + 120 * u,
          bottom: marginBottom,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30 * u,
        }}
      >
        {items.map((text, i) => {
          const p = spring({ frame: frame - (0.5 + i * 1.2) * fps, fps, config: { damping: 14 } });
          return (
            <div
              key={i}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 40 * u}px)`,
                display: "flex",
                alignItems: "center",
                gap: 24 * u,
                background: "rgba(8,12,28,0.78)",
                borderLeft: `${10 * u}px solid ${COLORS.gold}`,
                borderRadius: 24 * u,
                padding: `${26 * u}px ${30 * u}px`,
              }}
            >
              <div
                style={{
                  fontFamily: BN_FONT,
                  fontWeight: 700,
                  fontSize: 46 * u,
                  color: COLORS.gold,
                  minWidth: 56 * u,
                  textAlign: "center",
                }}
              >
                {["১", "২", "৩", "৪"][i]}
              </div>
              <div style={{ fontFamily: BN_FONT, fontWeight: 700, fontSize: (portrait ? 44 : 40) * u, lineHeight: 1.5, color: COLORS.cream }}>
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
