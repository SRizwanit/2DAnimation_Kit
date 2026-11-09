# Hadis Story Kit — প্রতিদিন একটি হাদিস (গল্প আকারে)

React + Remotion + GitHub Actions। একটি JSON ফাইল দিলেই ভিডিও রেন্ডার হয়।

## ফোল্ডার কাঠামো

```
hadis-story-kit/
├─ .github/workflows/render.yml   ← GitHub Actions (npm install সহ)
├─ data/hadis0000.json            ← নমুনা হাদিস-গল্প (এটা কপি করে নতুন পর্ব বানান)
├─ public/audio/                  ← ভয়েসওভার / মিউজিক (ঐচ্ছিক)
├─ scripts/render.mjs             ← রেন্ডার স্ক্রিপ্ট (portrait / landscape / both, hd / 4k)
├─ scripts/validate.mjs           ← ডেটা যাচাই
├─ src/
│  ├─ index.ts, Root.tsx          ← কম্পোজিশন + সময় হিসাব (calculateMetadata)
│  ├─ HadisStory.tsx              ← Intro → দৃশ্যগুলো → Outro
│  ├─ types.ts, theme.ts, fonts.ts
│  └─ components/
│     ├─ Background.tsx           ← SVG পটভূমি (মরু, আকাশ, মসজিদ, সিলুয়েট)
│     ├─ StoryScene.tsx           ← গল্পের দৃশ্য + শব্দ-হাইলাইট ক্যাপশন
│     ├─ HadithScene.tsx          ← আরবি + অনুবাদ + সূত্র (আলাদা কার্ড)
│     ├─ LessonScene.tsx          ← আজকের শিক্ষা
│     ├─ Caption.tsx, Tag.tsx, Intro.tsx, Outro.tsx, useLayout.ts
├─ HadisKit.md                    ← ধাপ-পরিকল্পনা (টিক চিহ্নসহ)
└─ package.json, tsconfig.json, remotion.config.ts
```

## লোকালি চালানো

```bash
npm install
npm run dev                                   # Remotion Studio-তে প্রিভিউ
npm run validate -- hadis0000                 # ডেটা যাচাই
node scripts/render.mjs --id=hadis0000 --orientation=portrait --quality=hd
```

## GitHub Actions থেকে রেন্ডার

1. পুরো ফোল্ডার একটি GitHub রিপোজিটরিতে পুশ করুন।
2. **Actions → Render Hadis Video → Run workflow**।
3. `hadis_id` (যেমন `hadis0001`), `orientation` (portrait / landscape / both), `quality` (hd / 4k) বেছে নিন।
4. `both` দিলে দুটি আলাদা job চলে এবং **প্রতিটি শেষ হওয়া মাত্র নিজের artifact আপলোড করে**।
5. রান শেষে নিচে **Artifacts** থেকে MP4 ডাউনলোড করুন।

## নতুন পর্ব বানানো

1. `data/hadis0000.json` কপি করে `data/hadis0001.json` করুন।
2. `id`, `title`, `series.episode`, `narrator`, `grade`, `source` বদলান।
3. `scenes` সাজান:
   - `story` — গল্পের বর্ণনা (`narration`), পর্দায় "গল্পের বর্ণনা" ট্যাগ থাকে
   - `hadith` — মূল `arabic` + `bengali` অনুবাদ, পর্দায় "হাদিসের মূল পাঠ" ট্যাগ ও সূত্র
   - `lesson` — `lessons` (সর্বোচ্চ ৪টি)
4. `figure`: `none | one | two | group | light`
   (নবী ﷺ-কে কোনো আকৃতিতে দেখানো হয় না, শুধু `light` = সোনালি আলো)।
5. `theme`: `dawn | day | desert-night | mosque-dusk | home-lamp`।

## ভয়েসওভার যোগ করা

- অডিও ফাইল রাখুন `public/audio/hadis0001_s01.mp3`।
- দৃশ্যে লিখুন `"audio": "audio/hadis0001_s01.mp3"`।
- দৃশ্যের সময় নিজে থেকে অডিওর দৈর্ঘ্য অনুযায়ী ঠিক হয়ে যায়।
- ব্যাকগ্রাউন্ড মিউজিক: JSON-এ `"music": "audio/bg.mp3"` (ভলিউম ১২%)।

## সতর্কতা (প্রকাশের আগে)

- হাদিসের মূল পাঠ, অনুবাদ ও সূত্র কিতাব থেকে মিলিয়ে নিন; নমুনা হাদিসটিও প্রকাশের আগে যাচাই করুন।
- গল্পের বর্ণনা যেন হাদিসের অংশ হিসেবে না যায়, তাই দুই ধরনের দৃশ্য আলাদা ট্যাগে দেখানো হয়।
- কোনো আলেম দিয়ে স্ক্রিপ্ট যাচাই করিয়ে নিন।
