"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

type ScrollApi = {
  scrollTo: (target: string | number) => void;
  lock: () => void;
  unlock: () => void;
};

const Ctx = createContext<ScrollApi>({ scrollTo: () => {}, lock: () => {}, unlock: () => {} });
export const useSmoothScroll = () => useContext(Ctx);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ anchors: { offset: -64 }, duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    lenisRef.current = lenis;
    if (document.body.classList.contains("is-loading")) lenis.stop();
    const onLoaded = () => lenis.start();
    window.addEventListener("tdm:loaded", onLoaded);
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("tdm:loaded", onLoaded); cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const offset = typeof target === "string" && target !== "#home" ? -64 : 0;
    const el = typeof target === "string" ? (target === "#home" ? 0 : document.querySelector(target)) : target;
    if (el === null) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement | number, { offset, duration: 1.4 });
    else if (typeof el === "number") window.scrollTo({ top: el, behavior: "smooth" });
    else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }, []);

  const lock = useCallback(() => { lenisRef.current?.stop(); document.documentElement.style.overflow = "hidden"; }, []);
  const unlock = useCallback(() => { lenisRef.current?.start(); document.documentElement.style.overflow = ""; }, []);

  return <Ctx.Provider value={{ scrollTo, lock, unlock }}>{children}</Ctx.Provider>;
}
