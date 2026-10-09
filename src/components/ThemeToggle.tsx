"use client";

import React, { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "elxor-theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#050403" : "#ffffff");
}

const listeners = new Set<() => void>();

function subscribeTheme(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  // The <html data-theme> attribute is the source of truth (set by the inline
  // script before first paint), so subscribe to it instead of mirroring it.
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light" as Theme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 500);
    applyTheme(next);
    listeners.forEach((cb) => cb());
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`theme-toggle ${className}`}
      onClick={toggle}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <Sun size={13} strokeWidth={1.8} className="theme-toggle__icon theme-toggle__icon--sun" />
        <Moon size={13} strokeWidth={1.8} className="theme-toggle__icon theme-toggle__icon--moon" />
        <span className="theme-toggle__knob" />
      </span>
      {showLabel && (
        <span className="theme-toggle__label">{isDark ? "Dark" : "Light"} theme</span>
      )}
    </button>
  );
}
