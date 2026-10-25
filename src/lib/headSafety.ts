/**
 * Only these elements are allowed inside <head>. Anything else (a stray <div>, a made-up
 * tag...) makes the browser close the head early and move the rest of it into <body>,
 * which breaks hydration and duplicates scripts. Pure module: used by the site and the Studio.
 */
export const HEAD_TAGS: ReadonlySet<string> = new Set([
  "script",
  "style",
  "link",
  "meta",
  "noscript",
  "base",
  "title",
  "template",
]);

/**
 * Tag names in `code` that cannot go in <head>. The contents of <script>, <style> and
 * comments are ignored, so code such as `document.write("<div>")` is not flagged.
 */
export function findInvalidHeadTags(code: string | null | undefined): string[] {
  if (!code) return [];
  const markup = code
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "<script></script>")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "<style></style>")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/gi, "<noscript></noscript>");

  const invalid = new Set<string>();
  for (const match of markup.matchAll(/<\s*([a-zA-Z][\w:-]*)/g)) {
    const tag = match[1].toLowerCase();
    if (!HEAD_TAGS.has(tag)) invalid.add(tag);
  }
  return [...invalid];
}
