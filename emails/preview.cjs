// Local preview for the email templates: node emails/preview.cjs  ->  http://localhost:4455
//   /            newsletter          /reply          form auto-reply to the customer
//   /notification   form notification to info@
// Merge tags are filled with sample values and image URLs point at public/email,
// so the templates can be checked before the images are deployed.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 4455;
const root = __dirname;
const images = path.join(root, "..", "public", "email");

const pages = {
  "/": "elxor-newsletter.html",
  "/reply": "elxor-form-reply.html",
  "/notification": "elxor-form-notification.html",
};

const merge = {
  "{{first_name}}": "Aisha",
  "{{name}}": "Aisha Rahman",
  "{{email}}": "aisha@example.com",
  "{{phone}}": "+971 55 123 4567",
  "{{phone_digits}}": "971551234567",
  "{{submitted_at}}": "29 Oct 2026, 14:32 (Dubai)",
  "{{message_preview}}": "I would love to know which signature suits an evening occasion...",
  "{{message}}": "I would love to know which signature suits an evening occasion, and whether the 50ml can be gifted with a presentation box.",
  "{{unsubscribe_url}}": "#unsubscribe",
  "{{view_in_browser_url}}": "#view",
};

http
  .createServer((req, res) => {
    const url = (req.url || "/").split("?")[0];

    if (url.startsWith("/email/")) {
      const file = path.join(images, path.basename(url));
      if (fs.existsSync(file)) {
        const type = file.endsWith(".png") ? "image/png" : "image/jpeg";
        res.writeHead(200, { "Content-Type": type });
        return fs.createReadStream(file).pipe(res);
      }
      res.writeHead(404);
      return res.end("not found");
    }

    const page = pages[url];
    if (!page) {
      res.writeHead(404);
      return res.end("not found");
    }
    let html = fs.readFileSync(path.join(root, page), "utf8");
    for (const [tag, value] of Object.entries(merge)) html = html.split(tag).join(value);
    html = html.split("https://www.elxorperfumes.com/email/").join("/email/");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  })
  .listen(PORT, () => console.log(`Email preview: http://localhost:${PORT}  (/reply, /notification)`));
