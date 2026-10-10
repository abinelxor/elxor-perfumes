import React from "react";

/** Wraps every standalone "ELXOR" in the brand-font span, like the hand-written markup did. */
export function withBrand(text: string | undefined): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/\b(ELXOR)\b/);
  return parts.map((part, i) =>
    part === "ELXOR" ? (
      <span key={i} className="brand">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}
