"use client";

import { useEffect, useRef } from "react";

const DEFAULT_TIMEOUT_MS = 2500;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function useKeyboardSequence(
  sequences: string[],
  onMatch: () => void,
  options?: { timeoutMs?: number; enabled?: boolean }
) {
  const onMatchRef = useRef(onMatch);
  onMatchRef.current = onMatch;

  const enabled = options?.enabled ?? true;
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxLength = Math.max(...sequences.map((s) => s.length), 0);

  useEffect(() => {
    if (!enabled || maxLength === 0) return;

    let buffer = "";
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const resetBuffer = () => {
      buffer = "";
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) {
        resetBuffer();
        return;
      }

      const key = event.key.toLowerCase();
      if (key.length !== 1 || !/^[a-z]$/.test(key)) {
        resetBuffer();
        return;
      }

      buffer = (buffer + key).slice(-maxLength);

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(resetBuffer, timeoutMs);

      const matched = sequences.some((sequence) => buffer.endsWith(sequence));
      if (matched) {
        resetBuffer();
        onMatchRef.current();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [enabled, maxLength, sequences, timeoutMs]);
}
