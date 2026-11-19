"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Akshintalu — one shower of turmeric rice when the hero appears: a burst of grains
 * falls together, lands on the carousel cards and fades away. Plays once, then unmounts.
 * Pure CSS animation; fewer grains on phones, off for prefers-reduced-motion.
 */

// Deterministic "random" so server and client render the same grains
function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

const GRAINS = (() => {
  const r = seeded(7);
  return Array.from({ length: 240 }, () => ({
    x: 1 + r() * 98, // % from left
    delay: r() * r() * 1.1, // s — most leave together, like handfuls thrown at once
    dur: 2.4 + r() * 1.6, // s
    drift: (r() - 0.5) * 80, // px sideways over the fall
    depth: 10 + r() * 80, // px past the cards' top edge where it settles
    spin: (r() > 0.5 ? 1 : -1) * (240 + r() * 480), // deg over the fall
    scale: 0.65 + r() * 0.65,
  }));
})();
const DONE_MS = Math.ceil(Math.max(...GRAINS.map((g) => g.delay + g.dur)) * 1000) + 200;

export function Akshata({ landRef }: { landRef: React.RefObject<HTMLElement | null> }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  // One shower only — remove the grains once the last one has landed
  useEffect(() => {
    const t = setTimeout(() => setDone(true), DONE_MS);
    return () => clearTimeout(t);
  }, []);

  // Grains land where the carousel starts — keep that distance in a CSS variable
  useEffect(() => {
    const layer = layerRef.current, land = landRef.current;
    if (!layer || !land) return;
    // Cards are vertically centred in the ring → land on the centre card's top edge
    const set = () => {
      const card = land.querySelector<HTMLElement>(".curve__card");
      const top = land.offsetTop + (card ? (land.offsetHeight - card.offsetHeight) / 2 : 0);
      layer.style.setProperty("--land", `${Math.round(top)}px`);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(land);
    ro.observe(layer);
    return () => ro.disconnect();
  }, [landRef]);

  if (done) return null;
  return (
    <div className="akshata" ref={layerRef} aria-hidden>
      {GRAINS.map((g, i) => (
        <span
          key={i}
          className="akshata__fall"
          style={{
            left: `${g.x}%`,
            ["--dur" as string]: `${g.dur}s`,
            ["--delay" as string]: `${g.delay}s`,
            ["--drift" as string]: `${g.drift}px`,
            ["--depth" as string]: `${g.depth}px`,
          }}
        >
          <i className="akshata__grain" style={{ ["--spin" as string]: `${g.spin}deg`, ["--s" as string]: g.scale }} />
        </span>
      ))}
    </div>
  );
}
