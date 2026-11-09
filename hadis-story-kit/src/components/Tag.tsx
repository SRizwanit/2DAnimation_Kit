import React from "react";
import { COLORS } from "../theme";
import { BN_FONT } from "../fonts";
import { useLayout } from "./useLayout";

/** দর্শক যেন সবসময় বোঝেন এটা হাদিসের পাঠ, নাকি গল্পের বর্ণনা */
export const Tag: React.FC<{ text: string; tone?: "story" | "hadith" | "lesson" }> = ({ text, tone = "story" }) => {
  const { u, marginTop } = useLayout();
  const bg = tone === "hadith" ? COLORS.gold : tone === "lesson" ? COLORS.green : "rgba(255,255,255,0.16)";
  const fg = tone === "hadith" ? COLORS.ink : COLORS.cream;
  return (
    <div style={{ position: "absolute", top: marginTop, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: BN_FONT,
          fontWeight: 700,
          fontSize: 34 * u,
          padding: `${10 * u}px ${28 * u}px`,
          borderRadius: 999,
          background: bg,
          color: fg,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};
