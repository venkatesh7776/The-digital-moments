"use client";

import { themes } from "@/data/catalog";
import { enquiryMessage, whatsappLink } from "@/data/site";
import { useEffect, useRef } from "react";
import { track } from "@/lib/track";
import { onSeenFor, recentJump, themesLayout } from "@/lib/view-tracking";
import { Sparkle, WhatsAppIcon } from "../Icons";
import { Reveal } from "../motion/Reveal";
import { ProductInfo } from "../ProductInfo";
import { usePreview } from "../providers/PreviewProvider";
import { collection } from "@/data/content";
import { LineReveal } from "../motion/Reveal";

export function Themes() {
  const { open } = usePreview();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // second_fold_view — the themes section fills ≥50% of the screen for 1s (once per page load).
  // Measured against the screen: on phones the section is ~4 cards tall, so "50% of the section" would never happen.
  // theme_card_view — each theme card ≥50% visible for 1s (once per card per page load); the custom card is not tracked.
  // Order is kept funnel-friendly: the fold view always goes first, and cards seen at the same moment go out 1 → 4.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let foldSent = false;
    const pending: number[] = [];
    let flushTimer = 0;
    const sendFold = () => {
      if (foldSent) return;
      foldSent = true;
      track("second_fold_view", { section_name: "themes", fold: 2, entry_method: recentJump() ?? "scroll", layout: themesLayout() });
    };
    const flushCards = () => {
      flushTimer = 0;
      sendFold();
      pending.sort((x, y) => x - y).splice(0).forEach((i) => {
        const t = themes[i];
        track("theme_card_view", { template_id: t.slug, template_name: t.name, card_position: i + 1, total_cards: themes.length, section_name: "themes", layout: themesLayout() });
      });
    };
    const enough = (e: IntersectionObserverEntry) => e.intersectionRect.height >= 0.5 * Math.min(window.innerHeight, e.boundingClientRect.height);
    const cleanups = [
      onSeenFor(section, enough, sendFold),
      ...themes.map((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return () => {};
        return onSeenFor(card, enough, () => { pending.push(i); if (!flushTimer) flushTimer = window.setTimeout(flushCards, 50); });
      }),
    ];
    return () => { clearTimeout(flushTimer); cleanups.forEach((c) => c()); };
  }, []);

  return (
    <section id="themes" ref={sectionRef} className="section collection">
      <div className="container">
        <div className="collection__head">
          <Reveal y={12}><span className="collection__eyebrow"><Sparkle width={10} height={10} /> {collection.eyebrow}</span></Reveal>
          <h2 className="collection__title"><LineReveal>{collection.title}</LineReveal></h2>
          <Reveal delay={0.15}><p className="collection__sub">{collection.sub}</p></Reveal>
        </div>

        <div className="themes-grid">
          {themes.map((t, i) => {
            const demo = () =>
              open({ kind: "site", title: t.name, subtitle: "Live demo · Wedding website", url: t.demoUrl, buyMessage: enquiryMessage(t.name), price: t.price, offerPrice: t.offerPrice, offPercent: t.offPercent, image: t.heroImage, source: "card" });
            return (
              <Reveal key={t.slug} delay={(i % 3) * 0.12} style={{ height: "100%" }}>
                <article ref={(el) => { cardRefs.current[i] = el; }} className="card theme-card" id={`theme-${t.slug}`} style={{ height: "100%" }}>
                  <div className="theme-card__media" style={{ background: `radial-gradient(120% 95% at 50% 18%, #ffffff 0%, #fffdfa 38%, ${t.accent} 100%)` }} onClick={demo} role="button" tabIndex={-1} aria-hidden>
                    <div className="theme-card__badges">
                      <span className="chip chip--neutral"><span className="live-dot" /> Live website</span>
                    </div>
                    <div className="browser">
                      <div className="browser__bar"><i /><i /><i /></div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.desktopImage} alt="" loading="lazy" />
                    </div>
                    <div className="phone"><span className="phone__buttons" aria-hidden />
                      <div className="phone__screen">
                        <span className="phone__notch" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.mobileImage} alt={`${t.name} wedding website on mobile`} loading="lazy" />
                      </div>
                    </div>
                  </div>
                  <ProductInfo name={t.name} tier={t.tier} price={t.price} offerPrice={t.offerPrice} offPercent={t.offPercent} summary={t.summary} onDemo={demo} />
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={0.1} className="custom-slot" style={{ height: "100%" }}>
            <div className="card custom-card custom-card--wide" style={{ height: "100%" }}>
              <div style={{ display: "grid", gap: 12 }}>
                <span className="collection__eyebrow"><Sparkle width={10} height={10} /> Fully customisable</span>
                <h3 className="h2">Need a website in your own theme?</h3>
                <p>Any theme, any culture, any style — share your idea and we’ll design a website that’s completely yours. Yes, it’s possible here.</p>
              </div>
              <a className="btn btn--primary" href={whatsappLink("Hi, Venkatesh! I'd like a custom-designed wedding website.")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { from: "custom_theme" })}>
                <WhatsAppIcon /> Share your idea
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
