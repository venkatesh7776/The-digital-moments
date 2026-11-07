"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { qrExperience } from "@/data/catalog";
import { ArrowLeft, ArrowRight, CheckIcon, UploadIcon } from "../Icons";
import { EASE } from "../motion/Reveal";

const PHOTOS = [1, 2, 3, 4, 5, 6].map((i) => `/qr/photo-${i}.webp`);
const DEMO_COUPLE = "Aarav & Meera"; // sample names for the simulated walkthrough

/** Decorative QR glyph (deterministic pattern with real finder squares). */
export function QrGlyph({ size = 64, color = "#29211D" }: { size?: number; color?: string }) {
  const cells = useMemo(() => {
    const n = 21, out: [number, number][] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inFinder(x, y) && rnd() > 0.52) out.push([x, y]);
    return out;
  }, []);
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.2" fill={color} />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="0.8" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill={color} />
    </g>
  );
  return (
    <svg viewBox="-1 -1 23 23" width={size} height={size} aria-hidden>
      <rect x="-1" y="-1" width="23" height="23" rx="2" fill="#fff" />
      {cells.map(([x, y]) => <rect key={`${x}.${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.2" fill={color} />)}
      {finder(0, 0)}{finder(14, 0)}{finder(0, 14)}
    </svg>
  );
}

const screen = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.35, ease: EASE } },
};

function ScanScreen() {
  const [found, setFound] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFound(true), 1700); return () => clearTimeout(t); }, []);
  return (
    <motion.div className="qs" {...screen}>
      <div className="qs__camera">
        <div className="qs__frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="qs__card" src="/qr/reception-card.webp" alt="Sample Moments QR card" />
          <motion.div className="qs__scanline" initial={{ top: "12%" }} animate={{ top: ["12%", "88%", "12%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.span key={found ? "f" : "s"} className="qs__hint" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {found ? "✓ Moments QR detected" : "Point your camera at the QR"}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function UploadScreen() {
  return (
    <motion.div className="qs" {...screen}>
      <div className="qs__app">
        <div className="qs__app-head">
          <small>Wedding memories</small>
          <div className="serif">{DEMO_COUPLE}</div>
        </div>
        <div className="qs__drop"><UploadIcon /><span>Add photos &amp; videos</span></div>
        <div className="qs__uploads">
          {PHOTOS.slice(0, 3).map((src, i) => (
            <motion.div key={src} className="qs__up" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.25, ease: EASE, duration: 0.5 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
              <div>
                <b>IMG_20{41 + i * 7}.jpg</b>
                <div className="qs__meter"><motion.span initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.5 + i * 0.35, duration: 1.1, ease: EASE }} /></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div className="qs__wish" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          “Wishing you a lifetime of love &amp; laughter!” — Priya
        </motion.div>
        <div className="qs__btn">Share with the couple</div>
      </div>
    </motion.div>
  );
}

function GalleryScreen() {
  const [count, setCount] = useState(240);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c < 248 ? c + 1 : c)), 160);
    return () => clearInterval(id);
  }, []);
  const grid = [...PHOTOS, ...PHOTOS.slice(0, 3).reverse(), PHOTOS[4], PHOTOS[1], PHOTOS[5]];
  return (
    <motion.div className="qs" {...screen}>
      <div className="qs__app">
        <div className="qs__app-head">
          <small>Shared gallery</small>
          <div className="serif">{DEMO_COUPLE}</div>
        </div>
        <div className="qs__count"><span>From 86 guests</span><span><b>{count}</b> memories</span></div>
        <div className="qs__gallery">
          {grid.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              initial={{ opacity: 0, scale: i === 0 ? 0.4 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i === 0 ? 1.2 : 0.08 * i, duration: 0.6, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function QrScreens({ step }: { step: number }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {step === 0 && <ScanScreen key="scan" />}
      {step === 1 && <UploadScreen key="up" />}
      {step === 2 && <GalleryScreen key="gal" />}
    </AnimatePresence>
  );
}

export function QrPhone({ step }: { step: number }) {
  return (
    <div className="phone">
      <div className="phone__screen">
        <span className="phone__notch" />
        <QrScreens step={step} />
      </div>
    </div>
  );
}

/** Interactive walkthrough used inside the preview modal. */
export function QrWalkthrough() {
  const [step, setStep] = useState(0);
  const steps = qrExperience.steps;
  return (
    <div className="qr-walk">
      <div className="qr-walk__phone"><QrPhone step={step} /></div>
      <div className="qr-walk__panel">
        <span className="eyebrow">Interactive preview · Step {step + 1} of 3</span>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}>
            <h3 className="h2" style={{ marginBottom: 8 }}>{steps[step].title}</h3>
            <p className="muted" style={{ margin: 0 }}>{steps[step].text}</p>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {steps.map((_, i) => (
            <button key={i} onClick={() => setStep(i)} aria-label={`Go to step ${i + 1}`} style={{ height: 4, flex: 1, borderRadius: 4, background: i <= step ? "var(--gold)" : "var(--border)", transition: "background .4s" }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button className="btn btn--secondary" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ opacity: step === 0 ? 0.5 : 1 }}><ArrowLeft /> Back</button>
          {step < 2 ? (
            <button className="btn btn--primary" onClick={() => setStep((s) => s + 1)}>{step === 0 ? "Scan & continue" : "Upload & view"} <ArrowRight /></button>
          ) : (
            <button className="btn btn--primary" onClick={() => setStep(0)}><CheckIcon /> Replay</button>
          )}
        </div>
        <p style={{ fontSize: 12, color: "var(--text-3)", margin: 0 }}>This is a simulated walkthrough. Live galleries are set up privately for each event.</p>
      </div>
    </div>
  );
}
