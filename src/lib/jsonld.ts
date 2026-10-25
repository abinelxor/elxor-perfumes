/**
 * Pure helpers for JSON-LD (schema.org) markup. No Sanity or Next imports, so they can be
 * used by the website, the Studio's field validation and tests alike.
 */

export type JsonLdNode = Record<string, unknown>;

export interface ParsedJsonLd {
  /** every valid schema node found, in order */
  blocks: JsonLdNode[];
  /** one message per chunk that was not valid JSON */
  errors: string[];
}

const SCRIPT_RE = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;

/**
 * Accepts what editors actually paste: one or several
 * `<script type="application/ld+json">...</script>` blocks, a single JSON object,
 * or a JSON array of objects.
 */
export function parseJsonLdBlocks(raw: string | null | undefined): ParsedJsonLd {
  const result: ParsedJsonLd = { blocks: [], errors: [] };
  if (!raw || !raw.trim()) return result;

  const chunks: string[] = [];
  if (/<script\b/i.test(raw)) {
    for (const match of raw.matchAll(SCRIPT_RE)) chunks.push(match[1]);
  } else {
    chunks.push(raw);
  }

  chunks.forEach((chunk, index) => {
    const text = chunk.trim();
    if (!text) return;
    try {
      const value: unknown = JSON.parse(text);
      const items = Array.isArray(value) ? value : [value];
      for (const item of items) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          result.blocks.push(item as JsonLdNode);
        }
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : "invalid JSON";
      result.errors.push(`Block ${index + 1} is not valid JSON (${reason}).`);
    }
  });

  return result;
}

/** All schema.org @type values used by the nodes, including nodes inside an @graph. */
export function jsonLdTypes(blocks: JsonLdNode[]): Set<string> {
  const types = new Set<string>();
  const add = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const type = (node as JsonLdNode)["@type"];
    if (typeof type === "string") types.add(type);
    else if (Array.isArray(type)) type.forEach((t) => typeof t === "string" && types.add(t));
  };
  for (const block of blocks) {
    add(block);
    const graph = block["@graph"];
    if (Array.isArray(graph)) graph.forEach(add);
  }
  return types;
}

/** Serialise for a <script> tag. Escapes "<" so "</script>" inside a string cannot break out. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** For the Studio field: true when empty or fully valid, otherwise a message for the editor. */
export function validateJsonLdField(raw: string | null | undefined): true | string {
  if (!raw || !raw.trim()) return true;
  const { blocks, errors } = parseJsonLdBlocks(raw);
  if (errors.length > 0) return errors[0];
  if (blocks.length === 0) return "No schema found. Paste JSON-LD, with or without the <script> tags.";
  return true;
}
