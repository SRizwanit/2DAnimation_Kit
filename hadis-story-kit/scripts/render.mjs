// ব্যবহার:
//   node scripts/render.mjs --id=hadis0000 --orientation=portrait|landscape|both --quality=hd|4k
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "true"];
  })
);
const id = args.id ?? "hadis0000";
const orientationArg = args.orientation ?? "portrait";
const quality = args.quality ?? "hd";
const orientations = orientationArg === "both" ? ["portrait", "landscape"] : [orientationArg];
const scale = quality === "4k" ? 2 : 1;

mkdirSync("out", { recursive: true });
mkdirSync(".tmp", { recursive: true });
const data = JSON.parse(readFileSync(`data/${id}.json`, "utf8"));

for (const orientation of orientations) {
  const propsFile = `.tmp/${id}_${orientation}.json`;
  writeFileSync(propsFile, JSON.stringify({ ...data, orientation }));
  const out = `out/${id}_${orientation}_${quality}.mp4`;
  console.log(`\n▶ রেন্ডার শুরু: ${out}`);
  const r = spawnSync(
    "npx",
    [
      "remotion", "render", "src/index.ts", "HadisStory", out,
      `--props=${propsFile}`,
      `--scale=${scale}`,
      "--codec=h264",
      "--crf=18",
      "--pixel-format=yuv420p",
      "--log=info",
    ],
    { stdio: "inherit" }
  );
  if (r.status !== 0) {
    console.error(`❌ রেন্ডার ব্যর্থ: ${orientation}`);
    process.exit(r.status ?? 1);
  }
  console.log(`✅ শেষ: ${out}`);
}
