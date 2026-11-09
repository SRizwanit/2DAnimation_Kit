import { useVideoConfig } from "remotion";

/** পোর্ট্রেট/ল্যান্ডস্কেপ দুটোর জন্য একই মাপের হিসাব */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const u = Math.min(width, height) / 1080; // ইউনিট স্কেল
  const marginX = portrait ? width * 0.09 : width * 0.12; // নিরাপদ পাশের মার্জিন
  const marginTop = height * (portrait ? 0.08 : 0.07);
  const marginBottom = height * (portrait ? 0.14 : 0.09);
  return { width, height, portrait, u, marginX, marginTop, marginBottom };
};
