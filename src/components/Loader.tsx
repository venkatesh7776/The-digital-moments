"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { EASE } from "./motion/Reveal";

const WORD = "The Digital Moments";
const MIN_MS = 2600;
const MAX_MS = 5000;

export function markLoaded() {
  (window as unknown as { __tdmLoaded?: boolean }).__tdmLoaded = true;
  document.body.classList.remove("is-loading");
  window.dispatchEvent(new Event("tdm:loaded"));
}

/** Hook for components that animate in after the loader leaves. */
export function useAfterLoader() {
  return useSyncExternalStore(
    (cb) => { window.addEventListener("tdm:loaded", cb); return () => window.removeEventListener("tdm:loaded", cb); },
    () => Boolean((window as unknown as { __tdmLoaded?: boolean }).__tdmLoaded),
    () => false
  );
}

type Fly = { x: number; y: number; scale: number };

/** Measure how far an element must travel/scale to land exactly on a target. */
function flyTo(el: HTMLElement | null, selector: string): Fly | null {
  const target = document.querySelector<HTMLElement>(selector);
  if (!el || !target) return null;
  const a = el.getBoundingClientRect(), b = target.getBoundingClientRect();
  return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
}

const FLY_EASE = [0.76, 0, 0.24, 1] as const;

export function Loader() {
  const [phase, setPhase] = useState<"intro" | "fly" | "done">("intro");
  const [logoFly, setLogoFly] = useState<Fly | null>(null);
  const [wordFly, setWordFly] = useState<Fly | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const minMs = reduce ? 400 : MIN_MS;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, minMs - (performance.now() - start));
      setTimeout(() => {
        // Logo + wordmark glide into their places in the hero
        setLogoFly(flyTo(logoRef.current, ".hero__logo"));
        setWordFly(flyTo(wordRef.current, ".hero__wordmark"));
        setPhase("fly");
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(finish, MAX_MS);
    return () => { clearTimeout(cap); window.removeEventListener("load", finish); };
  }, []);

  const land = () => { markLoaded(); setPhase("done"); };
  useEffect(() => {
    // Safety: if there is nothing to fly to, finish straight away
    if (phase === "fly" && !logoFly) { const t = setTimeout(land, 500); return () => clearTimeout(t); }
  }, [phase, logoFly]);

  if (phase === "done") return null;
  const flying = phase === "fly";

  return (
    <div className="loader" aria-hidden>
      <motion.div className="loader__bg" animate={{ opacity: flying ? 0 : 1 }} transition={{ duration: 0.9, ease: "easeInOut", delay: flying ? 0.35 : 0 }} />
      <div className="loader__inner">
        <motion.div
          ref={logoRef}
          className="loader__logo"
          animate={flying && logoFly ? { x: logoFly.x, y: logoFly.y, scale: logoFly.scale } : {}}
          transition={{ duration: 1.1, ease: FLY_EASE }}
          onAnimationComplete={() => { if (flying) land(); }}
        >
          {/* Monogram draws in left → right */}
          <motion.img
            src="/brand/logo-mark.webp"
            alt=""
            initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(6px)", opacity: 0.4 }}
            animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
          />
          {/* Gold sheen passes across the monogram */}
          <motion.div
            className="loader__sheen"
            initial={{ backgroundPosition: "130% 0" }}
            animate={{ backgroundPosition: "-30% 0" }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 1.35 }}
          />
          {/* Sparkle pops and settles */}
          <motion.img
            src="/brand/sparkle-layer.webp"
            alt=""
            style={{ transformOrigin: "69.17% 21.57%" }}
            initial={{ scale: 0, rotate: -120, opacity: 0 }}
            animate={{ scale: [0, 1.25, 1], rotate: [-120, 10, 0], opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          />
        </motion.div>
        <motion.div
          ref={wordRef}
          className="loader__word"
          aria-label={WORD}
          animate={flying && wordFly ? { x: wordFly.x, y: wordFly.y, scale: wordFly.scale } : {}}
          transition={{ duration: 1.1, ease: FLY_EASE, delay: 0.04 }}
        >
          {/* Wordmark writes on left → right */}
          <motion.img
            src="/brand/wordmark.svg"
            alt=""
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, y: 8 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.9 }}
          />
        </motion.div>
        <motion.div className="loader__line" animate={{ opacity: flying ? 0 : 1 }} transition={{ duration: 0.3 }}>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }} />
        </motion.div>
      </div>
    </div>
  );
}
