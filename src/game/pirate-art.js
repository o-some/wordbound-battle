import tulaBase64 from "../assets/pirate-data/tula.avif.b64.txt?raw";
import coraloxBase64 from "../assets/pirate-data/coralox.avif.b64.txt?raw";
import nebulonBase64 from "../assets/pirate-data/nebulon.avif.b64.txt?raw";
import sturmkrabBase64 from "../assets/pirate-data/sturmkrab.avif.b64.txt?raw";

const avifDataUrl = (base64) => `data:image/avif;base64,${base64.trim()}`;

export const TULA_PIRATE_ASSET = avifDataUrl(tulaBase64);

export const PIRATE_ENEMY_ASSETS = Object.freeze({
  coralox: avifDataUrl(coraloxBase64),
  nebulon: avifDataUrl(nebulonBase64),
  sturmkrab: avifDataUrl(sturmkrabBase64),
});
