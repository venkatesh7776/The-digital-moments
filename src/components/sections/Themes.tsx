"use client";

import { themes } from "@/data/catalog";
import { whatsappLink } from "@/data/site";
import { track } from "@/lib/track";
import { Sparkle, WhatsAppIcon } from "../Icons";
import { Reveal } from "../motion/Reveal";
import { ProductInfo } from "../ProductInfo";
import { usePreview } from "../providers/PreviewProvider";
import { collection } from "@/data/content";
import { LineReveal } from "../motion/Reveal";

export function Themes() {
  const { open } = usePreview();

  return (
    <section id="themes" className="section collection">
      <div className="container">
        <div className="collection__head">
          <Reveal y={12}><span className="collection__eyebrow"><Sparkle width={10} height={10} /> {collection.eyebrow}</span></Reveal>
          <h2 className="collection__title"><LineReveal>{collection.title}</LineReveal></h2>
          <Reveal delay={0.15}><p className="collection__sub">{collection.sub}</p></Reveal>
        </div>

        <div className="themes-grid">
          {themes.map((t, i) => {
            const demo = () =>
              open({ kind: "site", title: t.name, subtitle: "Live demo · Wedding website", url: t.demoUrl, buyMessage: `Hi The Digital Moments! I'm interested in the ${t.name} wedding website. Could you share the details?` });
            return (
              <Reveal key={t.slug} delay={(i % 3) * 0.12} style={{ height: "100%" }}>
                <article className="card theme-card" style={{ height: "100%" }}>
                  <div className="theme-card__media" style={{ background: t.accent }} onClick={demo} role="button" tabIndex={-1} aria-hidden>
                    <div className="theme-card__badges">
                      <span className="chip chip--neutral"><span className="live-dot" /> Live website</span>
                    </div>
                    <div className="browser">
                      <div className="browser__bar"><i /><i /><i /></div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.desktopImage} alt="" loading="lazy" />
                    </div>
                    <div className="phone">
                      <div className="phone__screen">
                        <span className="phone__notch" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.mobileImage} alt={`${t.name} wedding website on mobile`} loading="lazy" />
                      </div>
                    </div>
                  </div>
                  <ProductInfo name={t.name} tier={t.tier} price={t.price} summary={t.summary} onDemo={demo} />
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
              <a className="btn btn--primary" href={whatsappLink("Hi The Digital Moments! I'd like a custom-designed wedding website.")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { from: "custom_theme" })}>
                <WhatsAppIcon /> Share your idea
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
