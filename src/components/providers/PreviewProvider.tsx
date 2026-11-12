"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/data/site";
import { track } from "@/lib/track";
import { CloseIcon, ExternalIcon, MonitorIcon, PhoneIcon, WhatsAppIcon } from "../Icons";
import { EASE } from "../motion/Reveal";
import { QrHowItWorks } from "../sections/QrHowItWorks";
import { useSmoothScroll } from "./SmoothScroll";

export type Preview =
  | { kind: "site"; title: string; subtitle: string; url: string; buyMessage: string }
  | { kind: "video"; title: string; subtitle: string; src: string; poster: string; buyMessage: string }
  | { kind: "qr"; title: string; subtitle: string; buyMessage: string };

const Ctx = createContext<{ open: (p: Preview) => void }>({ open: () => {} });
export const usePreview = () => useContext(Ctx);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const { lock, unlock } = useSmoothScroll();

  const open = useCallback((p: Preview) => {
    track("preview_open", { kind: p.kind, title: p.title });
    setPreview(p);
  }, []);
  const close = useCallback(() => setPreview(null), []);

  useEffect(() => {
    if (!preview) return;
    lock();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); unlock(); };
  }, [preview, close, lock, unlock]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>{preview && <PreviewModal key="modal" preview={preview} onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

function PreviewModal({ preview, onClose }: { preview: Preview; onClose: () => void }) {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { closeRef.current?.focus(); }, []);

  return (
    <motion.div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${preview.title} preview`}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
      transition={{ duration: 0.35 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="modal__panel"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="modal__bar">
          <div className="modal__title">
            <b>{preview.title}</b>
            <span>{preview.subtitle}</span>
          </div>

          {preview.kind === "site" && (
            <div className="seg" role="group" aria-label="Preview device">
              <button aria-pressed={device === "mobile"} onClick={() => { if (device !== "mobile") { setLoaded(false); setDevice("mobile"); } }}><PhoneIcon /> Mobile</button>
              <button aria-pressed={device === "desktop"} onClick={() => { if (device !== "desktop") { setLoaded(false); setDevice("desktop"); } }}><MonitorIcon /> Desktop</button>
            </div>
          )}
          {preview.kind === "site" && (
            <a className="icon-btn hide-sm" href={preview.url} target="_blank" rel="noopener noreferrer" aria-label="Open in a new tab" title="Open in a new tab">
              <ExternalIcon />
            </a>
          )}
          <a
            className="btn btn--primary btn--sm"
            href={whatsappLink(preview.buyMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("buy_click", { item: preview.title, from: "preview" })}
          >
            <WhatsAppIcon /> <span className="hide-xs">Enquire on WhatsApp</span>
          </a>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close preview"><CloseIcon /></button>
        </div>

        <div className="modal__body">
          {preview.kind === "site" && (
            <div className={`modal__frame modal__frame--${device}`}>
              {device === "desktop" && (
                <div className="browser__bar"><i /><i /><i /><span className="browser__url">{preview.url.replace(/^https?:\/\//, "")}</span></div>
              )}
              <AnimatePresence>
                {!loaded && (
                  <motion.div className="modal__loading" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    <motion.img src="/brand/logo.webp" alt="" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }} />
                    Opening live demo
                  </motion.div>
                )}
              </AnimatePresence>
              <iframe
                key={device}
                src={preview.url}
                title={`${preview.title} live demo`}
                onLoad={() => setLoaded(true)}
                allow="autoplay; fullscreen; clipboard-write"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          {preview.kind === "video" && (
            <div className="modal__video">
              <video src={preview.src} poster={preview.poster} controls autoPlay playsInline />
            </div>
          )}

          {preview.kind === "qr" && (
            <div className="modal__qr"><QrHowItWorks /></div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
