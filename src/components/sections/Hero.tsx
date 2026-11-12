"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { formatPrice, themes } from "@/data/catalog";
import { hero, saleBar, salePrice } from "@/data/content";
import { track } from "@/lib/track";
import { CurvedCarousel, type CarouselItem } from "../CurvedCarousel";
import { useAfterLoader } from "../Loader";
import { EASE } from "../motion/Reveal";
import { useSmoothScroll } from "../providers/SmoothScroll";

export function Hero() {
  const ready = useAfterLoader();
  const { scrollTo } = useSmoothScroll();
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const on = () => setAtTop(window.scrollY < 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  /** Scroll to the matching card (with price + Enquire) and briefly spotlight it. */
  const goToCard = (id: string, name: string) => () => {
    track("carousel_click", { item: name });
    scrollTo(`#${id}`);
    const el = document.getElementById(id);
    if (!el) return;
    window.setTimeout(() => {
      el.classList.remove("is-spotlight");
      void el.offsetWidth; // restart the animation
      el.classList.add("is-spotlight");
      window.setTimeout(() => el.classList.remove("is-spotlight"), 2400);
    }, 1100);
  };

  // 3 live theme heroes + the video invitation's monogram — repeated round the ring
  const items: CarouselItem[] = [
    { src: "/themes/theme-1-hero.webp?v=2", label: `${themes[0].name} wedding website — see price and details`, title: themes[0].name, kind: "Wedding website", onClick: goToCard(`theme-${themes[0].slug}`, themes[0].name) },
    { src: "/themes/theme-2-hero.webp?v=2", label: `${themes[1].name} wedding website — see price and details`, title: themes[1].name, kind: "Wedding website", onClick: goToCard(`theme-${themes[1].slug}`, themes[1].name) },
    { src: "/work/storybook-monogram.webp?v=2", label: "Watercolour Storybook video invitation — see price and details", title: "Watercolour Storybook", kind: "Video invite", onClick: goToCard("video-card", "Video Invitation") },
    { src: "/themes/theme-3-hero.webp?v=2", label: `${themes[2].name} wedding website — see price and details`, title: themes[2].name, kind: "Wedding website", onClick: goToCard(`theme-${themes[2].slug}`, themes[2].name) },
  ];

  // Lowest theme price (after the sale discount) for the "Starting at" line
  const prices = themes.map((t) => t.price).filter((p): p is number => p !== null);
  const fromFull = Math.min(...prices);
  const fromSale = salePrice(fromFull);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 28, filter: "blur(6px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section id="home" className="hero" aria-label="The Digital Moments">
      <div className="container hero__inner">
        <div className="hero__brand">
          <div className="hero__logo" style={{ opacity: ready ? 1 : 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.webp" alt="" />
            <motion.img
              src="/brand/sparkle-layer.webp"
              alt=""
              style={{ transformOrigin: "69.17% 21.57%" }}
              animate={ready ? { scale: [1, 1.18, 1], rotate: [0, 15, 0] } : {}}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__wordmark" src="/brand/wordmark.svg" alt={hero.brand} width={1245} height={138} style={{ opacity: ready ? 1 : 0 }} />
        </div>
        <h1 className="h-hero hero__title">
          {hero.title.split(" ").map((word, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className="hero__word">
                <motion.span style={{ display: "inline-block" }} initial={{ y: "110%" }} animate={ready ? { y: "0%" } : {}} transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.05 }}>
                  {word}
                </motion.span>
              </span>
            </Fragment>
          ))}
          {/* Gold shine — a copy of the text that sweeps left → right every 5s, first pass right after landing */}
          <span className={`hero__shine ${ready ? "is-on" : ""}`} aria-hidden>
            {hero.title.split(" ").map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="hero__word">{word}</span>
              </Fragment>
            ))}
          </span>
        </h1>
        <motion.p className="sub" {...show(0.55)}>{hero.sub}</motion.p>
        <motion.div className="hero__cta" {...show(0.65)}>
          <a href="#themes" className="btn btn--dark btn--lg" onClick={(e) => { e.preventDefault(); scrollTo("#themes"); }}>{hero.cta}</a>
        </motion.div>
        <motion.p className="hero__from" {...show(0.75)}>
          <span className="hero__from-label">Wedding websites start from</span>
          <span className="hero__from-price">
            <strong>{formatPrice(fromSale)}</strong>
            {saleBar.enabled && fromSale < fromFull && (<><s>{formatPrice(fromFull)}</s><span className="hero__from-tag">{saleBar.discountPercent}% off · Wedding Sale</span></>)}
          </span>
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 80 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}>
        <CurvedCarousel items={items} />
      </motion.div>

      {/* Scroll cue pinned to the bottom of the first screen; fades once the visitor scrolls */}
      <AnimatePresence>
        {ready && atTop && (
          <motion.a
            href="#themes"
            className="scroll-cue"
            onClick={(e) => { e.preventDefault(); track("scroll_cue_click"); scrollTo("#themes"); }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.9 }}
          >
            {hero.scrollCue}
            <span className="scroll-cue__arrow" aria-hidden>↓</span>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}
