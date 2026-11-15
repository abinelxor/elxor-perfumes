// Builds the small, email-safe images in public/email/ from the website's own assets.
// Run:  node emails/build-assets.cjs      (they are served at https://www.elxorperfumes.com/email/...)
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public", "email");
fs.mkdirSync(out, { recursive: true });

(async () => {
  // Hero: the final frame of the site's video, centred on the bottle (2x for retina, 600px wide in the email)
  await sharp(path.join(root, "public/frames/frame_120.webp"))
    .resize({ width: 1200, height: 675, fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(out, "hero.jpg"));

  // Logo (transparent), 2x of the ~150px it is shown at
  await sharp(path.join(root, "public/images/elxor-logo.png"))
    .resize({ width: 300 })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(out, "logo.png"));

  // Bottles (transparent cut-outs), 2x of the ~260px they are shown at
  for (const name of ["amoriel", "sanctix"]) {
    await sharp(path.join(root, `public/images/perfume_${name}.png`))
      .resize({ width: 520 })
      .png({ compressionLevel: 9, palette: true, quality: 82, effort: 10 })
      .toFile(path.join(out, `${name}.png`));
  }

  for (const f of fs.readdirSync(out)) {
    const m = await sharp(path.join(out, f)).metadata();
    console.log(f.padEnd(14), `${m.width}x${m.height}`.padEnd(10), (fs.statSync(path.join(out, f)).size / 1024).toFixed(0) + " KB");
  }
})().catch((e) => { console.error(e); process.exit(1); });
