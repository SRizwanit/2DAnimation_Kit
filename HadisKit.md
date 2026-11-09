# HadisKit — ধাপ-পরিকল্পনা

নিয়ম: প্রতিটি ধাপ শেষে `[ ]` কে `[x]` করুন।

## পর্ব ১ — কিট কাঠামো
- [x] 1.1 package.json, tsconfig.json, remotion.config.ts (Remotion 4.0.250, React 18)
- [x] 1.2 src/index.ts, Root.tsx (calculateMetadata: অডিও দৈর্ঘ্য, portrait/landscape সাইজ)
- [x] 1.3 types.ts, theme.ts, fonts.ts (Noto Sans Bengali + Amiri)

## পর্ব ২ — দৃশ্য ও কম্পোনেন্ট
- [x] 2.1 Background.tsx (৫টি থিম, সিলুয়েট ফিগার, light = নবী ﷺ-এর জন্য আলো)
- [x] 2.2 StoryScene + Caption (শব্দ-হাইলাইট, সর্বোচ্চ ২ লাইন, নিরাপদ মার্জিন)
- [x] 2.3 HadithScene (আরবি, অনুবাদ, সূত্র, মান) + Tag
- [x] 2.4 LessonScene, Intro, Outro

## পর্ব ৩ — অটোমেশন
- [x] 3.1 scripts/render.mjs (portrait / landscape / both, hd / 4k)
- [x] 3.2 scripts/validate.mjs
- [x] 3.3 .github/workflows/render.yml (npm install, matrix job, প্রতি job শেষে আলাদা artifact)

## পর্ব ৪ — নমুনা ও পরীক্ষা
- [x] 4.1 data/hadis0000.json (নমুনা: সহিহ বুখারী ৬১১৬)
- [x] 4.2 টাইপচেক পাস (tsc --noEmit)
- [ ] 4.3 GitHub Actions-এ প্রথম রেন্ডার চালিয়ে ফল দেখা
- [ ] 4.4 ভয়েসওভার যোগ করে সময় মেলানো

## পর্ব ৫ — পরবর্তী কাজ (পরিকল্পনা)
- [ ] 5.1 অ্যাপের হাদিস ডেটা থেকে JSON জেনারেটর (ট্যাগ: বিষয়, ধরন, দৈর্ঘ্য)
- [ ] 5.2 আরও থিম/টেমপ্লেট (প্রশ্নোত্তর, উপদেশমূলক দৃষ্টান্ত)
- [ ] 5.3 আলেম দিয়ে নমুনা যাচাই
- [ ] 5.4 ৩০-৬০টি পর্ব আগাম তৈরি
