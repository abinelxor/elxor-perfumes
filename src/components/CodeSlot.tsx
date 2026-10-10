"use client";

import React from "react";
import { usePathname } from "next/navigation";
import parse, {
  attributesToProps,
  Element,
  type HTMLReactParserOptions,
} from "html-react-parser";

export type CodePosition = "headStart" | "headEnd" | "bodyStart" | "bodyEnd";

export interface CodeSnippetData {
  _id: string;
  position: CodePosition;
  scope: "site" | "pages";
  code: string;
  includeHome?: boolean;
  /** slugs of the pages / products the snippet is limited to */
  paths?: (string | null)[];
  extraPaths?: string[];
}

const options: HTMLReactParserOptions = {
  // <script> and <style> must keep their body as raw text (not escaped / re-parsed)
  replace(node, index) {
    if (node instanceof Element && (node.name === "script" || node.name === "style")) {
      const props = attributesToProps(node.attribs);
      const text = node.children
        .map((child) => ("data" in child ? String((child as { data: string }).data) : ""))
        .join("");
      const Tag = node.name;
      return text ? (
        <Tag key={index} {...props} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <Tag key={index} {...props} />
      );
    }
  },
};

function normalize(path: string): string {
  const clean = path.split(/[?#]/)[0] || "/";
  return clean.length > 1 ? clean.replace(/\/+$/, "") || "/" : clean;
}

function appliesTo(snippet: CodeSnippetData, pathname: string): boolean {
  if (snippet.scope !== "pages") return true; // entire website

  const path = normalize(pathname);
  if (snippet.includeHome && path === "/") return true;

  const targets = [
    ...(snippet.paths ?? []).filter(Boolean).map((slug) => `/${slug}`),
    ...(snippet.extraPaths ?? []),
  ];

  return targets.some((target) => {
    if (target.endsWith("*")) {
      const prefix = target.slice(0, -1); // "/blog/*" -> "/blog/"
      return path.startsWith(prefix) || path === normalize(prefix);
    }
    return normalize(target) === path;
  });
}

/**
 * Renders the custom code snippets for one position ("head start", "body end"...).
 * Placed at that exact spot of the layout, so the code is part of the server-rendered
 * HTML. Site-wide snippets always render; page-specific ones only on matching paths.
 */
export default function CodeSlot({ snippets }: { snippets: CodeSnippetData[] }) {
  const pathname = usePathname() || "/";
  const active = snippets.filter((snippet) => appliesTo(snippet, pathname));
  if (active.length === 0) return null;

  return (
    <>
      {active.map((snippet) => (
        <React.Fragment key={snippet._id}>{parse(snippet.code, options)}</React.Fragment>
      ))}
    </>
  );
}
