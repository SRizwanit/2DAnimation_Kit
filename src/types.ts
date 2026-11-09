export type SceneKind = "story" | "hadith" | "lesson";

export type BgTheme =
  | "dawn"
  | "day"
  | "desert-night"
  | "mosque-dusk"
  | "home-lamp";

/**
 * figure: শুধু সিলুয়েট, কোনো চেহারা নেই।
 * "light" = নবী ﷺ-এর উপস্থিতি বোঝাতে শুধু সোনালি আলো (কোনো আকৃতি নয়)।
 */
export type Figure = "none" | "one" | "two" | "group" | "light";

export type Scene = {
  id: string;
  kind: SceneKind;
  theme: BgTheme;
  figure?: Figure;
  /** দৃশ্যের সময় (সেকেন্ড)। audio থাকলে অডিওর দৈর্ঘ্য অনুযায়ী নিজে থেকে বদলে যায় */
  seconds: number;
  /** public/ ফোল্ডারের ভেতরের পথ, যেমন "audio/hadis0000_s01.mp3" */
  audio?: string;
  /** story দৃশ্যের বাংলা বর্ণনা (ক্যাপশন হিসেবে শব্দ ধরে ধরে হাইলাইট হয়) */
  narration?: string;
  /** hadith দৃশ্যের মূল আরবি */
  arabic?: string;
  /** hadith দৃশ্যের বাংলা অনুবাদ */
  bengali?: string;
  /** lesson দৃশ্যের পয়েন্ট (সর্বোচ্চ ৩-৪টি) */
  lessons?: string[];
};

export type HadisData = {
  id: string;
  title: string;
  series: { name: string; episode: number };
  narrator: string;
  grade: string;
  source: { book: string; number: string };
  app: { name: string; cta: string };
  /** public/ এর ভেতরের ব্যাকগ্রাউন্ড মিউজিক, না থাকলে null */
  music?: string | null;
  scenes: Scene[];
};

export type Orientation = "portrait" | "landscape";

export type HadisProps = HadisData & {
  orientation: Orientation;
};
