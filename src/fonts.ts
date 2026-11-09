import { loadFont as loadBengali } from "@remotion/google-fonts/NotoSansBengali";
import { loadFont as loadArabic } from "@remotion/google-fonts/Amiri";

const bn = loadBengali("normal", { weights: ["400", "700"], subsets: ["bengali", "latin"] });
const ar = loadArabic("normal", { weights: ["400", "700"], subsets: ["arabic", "latin"] });

export const BN_FONT = bn.fontFamily;
export const AR_FONT = ar.fontFamily;
