import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { BN_FONT } from "../fonts";
import { useLayout } from "./useLayout";

/**
 * শব্দ ধরে ধরে হাইলাইট হওয়া ক্যাপশন।
 * - সর্বোচ্চ ২ লাইন (শব্দ ভাগ করে চাঙ্কে দেখানো হয়)
 * - নিরাপদ মার্জিনের ভেতরে থাকে
 */
export const Caption: React.FC<{ text: string; seconds: number }> = ({ text, seconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait, u, width, marginX, marginBottom } = useLayout();

  const { words, starts, chunks } = useMemo(() => {
    const words = text.trim().split(/\s+/);
    const size = portrait ? 6 : 10;
    const n = Math.ceil(words.length / size);
    const per = Math.ceil(words.length / n);
    const chunks: number[][] = [];
    for (let i = 0; i < words.length; i += per) {
      chunks.push(words.slice(i, i + per).map((_, k) => i + k));
    }
    // শব্দের দৈর্ঘ্য অনুযায়ী সময় ভাগ (শেষে একটু বিরতি রেখে)
    const weights = words.map((w) => w.length + 2);
    const total = weights.reduce((a, b) => a + b, 0);
    const usable = Math.max(seconds - 0.8, 1) * fps;
    let acc = 0;
    const starts = weights.map((w) => {
      const s = (acc / total) * usable;
      acc += w;
      return s;
    });
    return { words, starts, chunks };
  }, [text, seconds, fps, portrait]);

  let active = 0;
  for (let i = 0; i < starts.length; i++) if (frame >= starts[i] + 4) active = i;
  const chunk = chunks.find((c) => c.includes(active)) ?? chunks[0];

  const fontSize = (portrait ? 62 : 58) * u;
  const lineHeight = fontSize * 1.45;

  return (
    <div
      style={{
        position: "absolute",
        left: marginX,
        right: marginX,
        bottom: marginBottom,
        display: "flex",
        justifyContent: "center",
        maxWidth: width - marginX * 2,
      }}
    >
      <div
        style={{
          fontFamily: BN_FONT,
          fontWeight: 700,
          fontSize,
          lineHeight: `${lineHeight}px`,
          maxHeight: lineHeight * 2 + 40 * u,
          overflow: "hidden",
          textAlign: "center",
          background: "rgba(5,8,20,0.55)",
          padding: `${18 * u}px ${30 * u}px`,
          borderRadius: 28 * u,
          maxWidth: "100%",
          boxSizing: "border-box",
          color: COLORS.cream,
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}
      >
        {chunk.map((i) => (
          <span key={i} style={{ color: i === active ? COLORS.gold : i < active ? COLORS.cream : "rgba(247,241,227,0.72)" }}>
            {words[i]}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};
