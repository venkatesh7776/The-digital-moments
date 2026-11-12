"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { qrExperience, videoInvites } from "@/data/catalog";
import { enquiryMessage } from "@/data/site";
import { extras } from "@/data/content";
import { PlayFilled, Sparkle } from "../Icons";
import { LineReveal, Reveal } from "../motion/Reveal";
import { ProductInfo } from "../ProductInfo";
import { usePreview } from "../providers/PreviewProvider";
import { QrPhone } from "./QrDemo";

/** Video invitations + Moments QR, side by side, in the hero's visual language. */
export function Extras() {
  const { open } = usePreview();
  const v = videoInvites[0];

  const watch = () => open({ kind: "video", title: v.name, subtitle: `Video invitation · ${v.duration} min`, src: v.src, poster: v.poster, buyMessage: enquiryMessage(extras.videoName) });
  const tryQr = () => open({ kind: "qr", title: qrExperience.name, subtitle: "How it works · Guest photo sharing", buyMessage: enquiryMessage(qrExperience.name) });

  // QR phone cycles scan → upload → gallery while visible
  const [step, setStep] = useState(0);
  const qrRef = useRef<HTMLDivElement>(null);
  const inView = useInView(qrRef, { margin: "-15% 0px" });
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % 3), 4200);
    return () => clearTimeout(id);
  }, [step, inView]);

  return (
    <section id="video" className="section collection extras">
      <div className="container">
        <div className="collection__head">
          <Reveal y={12}><span className="collection__eyebrow"><Sparkle width={10} height={10} /> {extras.eyebrow}</span></Reveal>
          <h2 className="collection__title"><LineReveal>{extras.title}</LineReveal></h2>
          <Reveal delay={0.15}><p className="collection__sub">{extras.sub}</p></Reveal>
        </div>

        <div className="extras-grid">
          <Reveal className="extras-slot">
            <article className="card extra-card" id="video-card">
              <div className="extra-card__media extra-card__media--video" onClick={watch} role="button" tabIndex={-1} aria-hidden>
                <span className="chip chip--neutral extra-card__badge"><span className="live-dot" /> {extras.videoBadge}</span>
                <div className="phone"><span className="phone__buttons" aria-hidden />
                  <div className="phone__screen">
                    <span className="phone__notch" />
                    <video src={v.previewSrc} poster={v.poster} muted loop autoPlay playsInline preload="metadata" />
                    <span className="extra-card__play"><PlayFilled /></span>
                  </div>
                </div>
              </div>
              <ProductInfo name={extras.videoName} tier={`${v.name} · ${v.duration} min`} price={v.price} summary={extras.videoText} demoLabel="Watch" onDemo={watch} />
            </article>
          </Reveal>

          <Reveal className="extras-slot" delay={0.12}>
            <article className="card extra-card" id="qr">
              <div className="extra-card__media extra-card__media--qr" ref={qrRef} onClick={tryQr} role="button" tabIndex={-1} aria-hidden>
                <QrPhone step={step} />
              </div>
              <ProductInfo name={qrExperience.name} tier={qrExperience.tier} price={qrExperience.price} summary={extras.qrText} demoLabel="How it works" demoIcon="help" onDemo={tryQr} />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
