"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
const Heart = () => (
  <svg viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6l1 1.6 1-1.6c.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21Z" /></svg>
);

type Mode = "default" | "link" | "drag" | "view" | "hidden";
type Burst = { id: number; x: number; y: number };

const INTERACTIVE = "a, button, [role='button'], summary, label, .theme-card__media, .extra-card__media";

/**
 * Brand cursor (fine pointers only): a gold heart + a trailing ring.
 * Ring grows over links, becomes a "Drag" pill over the carousel and "View" over its cards.
 * Clicking releases a small burst of hearts.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const start = setTimeout(() => setEnabled(true), 0);
    document.documentElement.classList.add("has-cursor");

    const resolve = (el: Element | null): Mode => {
      if (!el) return "default";
      if (el.closest("iframe")) return "hidden"; // live demos show their own cursor
      if (el.closest(".curve__card")) return "view";
      if (el.closest(".curve")) return "drag";
      if (el.closest(INTERACTIVE)) return "link";
      return "default";
    };
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setMode(resolve(e.target as Element));
    };
    const onLeave = () => setMode("hidden");
    const onDown = (e: PointerEvent) => {
      const id = ++idRef.current;
      setBursts((b) => [...b.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      clearTimeout(start);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const hidden = mode === "hidden";
  const label = mode === "drag" ? "Drag" : mode === "view" ? "View" : "";

  return (
    <div className="cursor-layer" aria-hidden>
      <motion.div className={`cursor-ring cursor-ring--${mode}`} style={{ x: rx, y: ry }} animate={{ opacity: hidden ? 0 : 1 }} transition={{ duration: 0.2 }}>
        <AnimatePresence mode="wait">
          {label && (
            <motion.span key={label} className="cursor-ring__label" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.18 }}>
              {mode === "drag" && <i>‹</i>}{label}{mode === "drag" && <i>›</i>}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="cursor-heart" style={{ x, y }} animate={{ opacity: hidden || label ? 0 : 1, scale: mode === "link" ? 1.25 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
        <Heart />
      </motion.div>

      {bursts.map((b) => (
        <span key={b.id} className="cursor-burst" style={{ left: b.x, top: b.y }}>
          {[0, 1, 2, 3, 4].map((k) => {
            const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
            return (
              <motion.span
                key={k}
                className="cursor-burst__spark"
                initial={{ x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0 }}
                animate={{ x: Math.cos(a) * 26, y: Math.sin(a) * 26, scale: [0.2, 1, 0], opacity: [1, 1, 0], rotate: 90 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <Heart />
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
