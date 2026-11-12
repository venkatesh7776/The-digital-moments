"use client";

import { motion } from "motion/react";
import { qrHowItWorks } from "@/data/content";
import { whatsappLink } from "@/data/site";
import { track } from "@/lib/track";
import { Sparkle, UploadIcon, WhatsAppIcon } from "../Icons";
import { EASE } from "../motion/Reveal";
import { QrGlyph } from "./QrDemo";

const photo = (n: number) => `/qr/photo-${n}.webp`;

/* ---------- Step illustrations ---------- */

function FolderArt() {
  return (
    <div className="hiw-art">
      <motion.div className="hiw-folder" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: EASE }}>
        <span className="hiw-folder__tab" />
        <span className="hiw-folder__body">
          <b>Aarav &amp; Meera</b>
          <small>Wedding · 248 memories</small>
        </span>
      </motion.div>
      <motion.div className="hiw-qrcard" initial={{ y: 30, opacity: 0, rotate: -8 }} animate={{ y: 0, opacity: 1, rotate: 6 }} transition={{ delay: 0.75, duration: 0.8, ease: EASE }}>
        <QrGlyph size={74} />
        <small>Your event QR</small>
      </motion.div>
    </div>
  );
}

function ScanArt() {
  return (
    <div className="hiw-art">
      <motion.div className="hiw-tent" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.7, ease: EASE }}>
        <small>Share your moments</small>
        <QrGlyph size={58} />
      </motion.div>
      <motion.div className="hiw-phone" initial={{ x: 30, opacity: 0, rotate: 4 }} animate={{ x: 0, opacity: 1, rotate: -6 }} transition={{ delay: 0.85, duration: 0.8, ease: EASE }}>
        <span className="hiw-phone__notch" />
        <span className="hiw-phone__up"><UploadIcon /> Uploading…</span>
        <span className="hiw-phone__grid">
          {[1, 4, 5, 2].map((n, i) => (
            <motion.img key={n} src={photo(n)} alt="" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2 + i * 0.15, duration: 0.5, ease: EASE }} />
          ))}
        </span>
        <motion.span className="hiw-phone__wish" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>“Congratulations! 💛”</motion.span>
      </motion.div>
    </div>
  );
}

function GalleryArt() {
  return (
    <div className="hiw-art">
      <motion.div className="hiw-site" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.65, duration: 0.8, ease: EASE }}>
        <span className="hiw-site__bar"><i /><i /><i /><em>aarav-meera.memories</em></span>
        <span className="hiw-site__head">Our Wedding Memories</span>
        <span className="hiw-site__grid">
          {[1, 2, 3, 4, 5, 6].map((n, i) => (
            <motion.img key={n} src={photo(n)} alt="" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.1, duration: 0.5, ease: EASE }} />
          ))}
        </span>
      </motion.div>
    </div>
  );
}

const ARTS = [FolderArt, ScanArt, GalleryArt];

/** Big "How it works" popup content for Moments QR. */
export function QrHowItWorks() {
  return (
    <div className="hiw">
      <div className="hiw__head">
        <motion.span className="collection__eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Sparkle width={10} height={10} /> {qrHowItWorks.eyebrow}
        </motion.span>
        <motion.h2 className="hiw__title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: EASE }}>
          {qrHowItWorks.title}
        </motion.h2>
        <motion.p className="collection__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>{qrHowItWorks.sub}</motion.p>
      </div>

      <ol className="hiw__steps">
        {qrHowItWorks.steps.map((s, i) => {
          const Art = ARTS[i];
          return (
            <motion.li
              key={s.title}
              className="hiw-step"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.18 }}
            >
              <span className="hiw-step__num">{i + 1}</span>
              <div className={`hiw-step__media hiw-step__media--${i + 1}`}><Art /></div>
              <div className="hiw-step__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <motion.div className="hiw__cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
        <a
          className="btn btn--dark btn--lg"
          href={whatsappLink("Hi, The Digital Moments! I'd like to set up Moments QR for my event.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("buy_click", { item: "Moments QR", from: "how_it_works" })}
        >
          <WhatsAppIcon /> Get Moments QR for my event
        </a>
      </motion.div>
    </div>
  );
}
