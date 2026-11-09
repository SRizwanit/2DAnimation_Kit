// ডেটা ফাইল যাচাই: node scripts/validate.mjs hadis0000
import { readFileSync, existsSync } from "node:fs";

const id = process.argv[2] ?? "hadis0000";
const file = `data/${id}.json`;
if (!existsSync(file)) {
  console.error(`❌ ফাইল পাওয়া যায়নি: ${file}`);
  process.exit(1);
}
const d = JSON.parse(readFileSync(file, "utf8"));
const errors = [];
for (const k of ["id", "title", "series", "narrator", "grade", "source", "app", "scenes"]) {
  if (d[k] === undefined) errors.push(`"${k}" নেই`);
}
if (!Array.isArray(d.scenes) || d.scenes.length === 0) errors.push("scenes খালি");
const hasHadith = (d.scenes ?? []).some((s) => s.kind === "hadith");
if (!hasHadith) errors.push("অন্তত একটি kind=hadith দৃশ্য লাগবে (মূল আরবি + অনুবাদ)");
for (const s of d.scenes ?? []) {
  if (!s.id || !s.kind || !s.theme || !s.seconds) errors.push(`দৃশ্য ${s.id ?? "?"}: id/kind/theme/seconds লাগবে`);
  if (s.kind === "story" && !s.narration) errors.push(`দৃশ্য ${s.id}: narration নেই`);
  if (s.kind === "hadith" && (!s.arabic || !s.bengali)) errors.push(`দৃশ্য ${s.id}: arabic ও bengali লাগবে`);
  if (s.kind === "lesson" && !(s.lessons?.length)) errors.push(`দৃশ্য ${s.id}: lessons নেই`);
  if (s.kind === "lesson" && (s.lessons?.length ?? 0) > 4) errors.push(`দৃশ্য ${s.id}: lessons সর্বোচ্চ ৪টি`);
  if (s.audio && !existsSync(`public/${s.audio}`)) errors.push(`দৃশ্য ${s.id}: public/${s.audio} ফাইল নেই`);
}
if (errors.length) {
  console.error("❌ সমস্যা:\n- " + errors.join("\n- "));
  process.exit(1);
}
const total = d.scenes.reduce((a, s) => a + s.seconds, 0) + 4 + 5;
console.log(`✅ ${id} ঠিক আছে — মোট প্রায় ${total} সেকেন্ড (audio থাকলে বদলাতে পারে)`);
