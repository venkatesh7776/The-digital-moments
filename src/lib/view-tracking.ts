/**
 * Helpers for "was it really seen?" analytics events.
 */

/** Calls `onView` once, after `isEnough(entry)` has stayed true for `ms`. Returns a cleanup function. */
export function onSeenFor(el: Element, isEnough: (e: IntersectionObserverEntry) => boolean, onView: () => void, ms = 1000) {
  let timer = 0;
  const io = new IntersectionObserver(
    ([e]) => {
      const ok = isEnough(e);
      if (ok && !timer) timer = window.setTimeout(() => { io.disconnect(); onView(); }, ms);
      if (!ok && timer) { clearTimeout(timer); timer = 0; }
    },
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  io.observe(el);
  return () => { clearTimeout(timer); io.disconnect(); };
}

/** Columns the theme grid is showing (matches the .themes-grid breakpoints in globals.css). */
export function themesLayout(): "1_column" | "2_column" | "3_column" {
  const w = window.innerWidth;
  return w >= 1100 ? "3_column" : w >= 720 ? "2_column" : "1_column";
}

/** Remembers the last button that jumped the page down to the themes, so the fold view can say how the visitor got there. */
let lastJump: { name: string; at: number } | null = null;
export function markJump(name: "choose_theme_click" | "claim_now_click" | "scroll_cue_click") {
  lastJump = { name, at: performance.now() };
}
export function recentJump(withinMs = 4000) {
  return lastJump && performance.now() - lastJump.at < withinMs ? lastJump.name : null;
}
