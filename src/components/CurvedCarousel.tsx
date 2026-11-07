"use client";

import { useEffect, useRef } from "react";

export type CarouselItem = { src: string; label: string; onClick?: () => void };

type Props = { items: CarouselItem[]; speed?: number; curve?: number };

/**
 * Cards wrapped on the inside of a cylinder, viewed from its centre.
 * Centre cards sit far away (small), edge cards curve towards the viewer
 * (large, angled). The ring drifts continuously and can be dragged.
 */
export function CurvedCarousel({ items, speed = 0.28, curve = 11 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const state = useRef({ angle: 0, vel: 0, dragging: false, lastX: 0, moved: 0, visible: true });

  // Repeat items so the ring is always full
  const count = Math.max(items.length * 2, 16);
  const ring = Array.from({ length: count }, (_, i) => items[i % items.length]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;
    let raf = 0, last = performance.now();
    let W = wrap.clientWidth;
    let W0 = cardRefs.current[0]?.offsetWidth ?? 160;
    const ro = new ResizeObserver(() => { W = wrap.clientWidth; W0 = cardRefs.current[0]?.offsetWidth ?? 160; });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; });
    io.observe(wrap);

    const DEG = Math.PI / 180;
    // u = position in "card units" from the centre; theta = how far round the curve it sits
    const theta = (u: number) => Math.max(-82, Math.min(82, u * curve));
    const scaleAt = (u: number) => 1 / Math.pow(Math.cos(theta(u) * DEG), 0.55);
    const rotAt = (u: number) => theta(u) * 0.9;
    const widthAt = (u: number) => W0 * scaleAt(u) * Math.cos(rotAt(u) * DEG) + W0 * 0.16; // visible width + gap
    // x(u) = ∫ widthAt — keeps an even gap while cards grow toward the edges
    const xAt = (u: number) => {
      const n = 12, h = u / n;
      let sum = widthAt(0) + widthAt(u);
      for (let k = 1; k < n; k++) sum += (k % 2 ? 4 : 2) * widthAt(k * h);
      return (sum * h) / 3;
    };

    const render = () => {
      const half = count / 2;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const u = (((i + s.angle) % count) + count + half) % count - half;
        const x = xAt(u);
        if (Math.abs(theta(u)) >= 80 || Math.abs(x) > W / 2 + W0 * 2.5) { el.style.visibility = "hidden"; return; }
        const scale = scaleAt(u);
        const y = (scale - 1) * W0 * 0.12;
        el.style.visibility = "visible";
        el.style.zIndex = String(Math.round(scale * 100));
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) perspective(1000px) rotateY(${(-rotAt(u)).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (s.visible) {
        if (!s.dragging) {
          s.vel *= 0.94;
          s.angle -= (reduce ? 0 : speed) * dt; s.angle += s.vel; // drift right → left
        }
        render();
      }
      raf = requestAnimationFrame(tick);
    };
    render();
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [speed, curve, count]);

  const onDown = (e: React.PointerEvent) => {
    const s = state.current;
    s.dragging = true; s.lastX = e.clientX; s.moved = 0; s.vel = 0;
  };
  const onMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.moved += Math.abs(dx);
    if (s.moved > 6 && !(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const d = dx / ((cardRefs.current[0]?.offsetWidth ?? 160) * 1.3);
    s.angle += d; s.vel = d;
  };
  const onUp = () => { state.current.dragging = false; };

  return (
    <div
      className="curve"
      ref={wrapRef}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      aria-roledescription="carousel"
    >
      {ring.map((item, i) => (
        <button
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className="curve__card"
          aria-label={item.label}
          tabIndex={i < items.length ? 0 : -1}
          onClick={(e) => { if (state.current.moved > 6) { e.preventDefault(); return; } item.onClick?.(); }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt="" draggable={false} loading={i < 10 ? "eager" : "lazy"} />
        </button>
      ))}
    </div>
  );
}
