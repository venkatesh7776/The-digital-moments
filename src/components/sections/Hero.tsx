"use client";

import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { formatPrice, themes, videoInvites } from "@/data/catalog";
import { extras, hero, saleBar, salePrice } from "@/data/content";
import { enquiryMessage } from "@/data/site";
import { track } from "@/lib/track";
import { markJump } from "@/lib/view-tracking";
import { Akshata } from "../Akshata";
import { HeroKolams } from "../HeroDecor";
import { CurvedCarousel, type CarouselItem } from "../CurvedCarousel";
import { useAfterLoader } from "../Loader";
import { EASE } from "../motion/Reveal";
import { usePreview } from "../providers/PreviewProvider";
import { useSmoothScroll } from "../providers/SmoothScroll";

export function Hero() {
  const ready = useAfterLoader();
  const { scrollTo } = useSmoothScroll();
  const [atTop, setAtTop] = useState(true);
  const ringRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // hero_section_view — once per page load, after ≥50% of the hero has stayed on screen for 1s
  // (starts after the intro loader, which covers the hero until then)
  useEffect(() => {
    const el = heroRef.current;
    if (!ready || !el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        // ≥50% of the hero, or of the screen if the hero were ever taller than two screens
        const enough = e.intersectionRect.height >= 0.5 * Math.min(e.boundingClientRect.height, window.innerHeight);
        if (enough && !timer) timer = window.setTimeout(() => { track("hero_section_view"); io.disconnect(); }, 1000);
        if (!enough && timer) { clearTimeout(timer); timer = 0; }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    io.observe(el);
    return () => { clearTimeout(timer); io.disconnect(); };
  }, [ready]);

  useEffect(() => {
    const on = () => setAtTop(window.scrollY < 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Carousel cards open the live preview straight away (price + WhatsApp inside); closing it offers a recap
  const { open } = usePreview();
  // template_card_click is sent before the preview opens; one handler per card, swipes are ignored by the carousel
  const cardClick = (id: string, name: string, position: number, type: "wedding_website" | "video_invite") =>
    track("template_card_click", { template_id: id, template_name: name, template_position: position, template_type: type, carousel_name: "hero_carousel" });
  const themeItem = (t: (typeof themes)[number], position: number): CarouselItem => ({
    src: t.heroImage,
    label: `Preview the ${t.name} wedding website`,
    title: t.name,
    kind: "Wedding website",
    onClick: () => {
      cardClick(t.slug, t.name, position, "wedding_website");
      open({ kind: "site", title: t.name, subtitle: "Live demo · Wedding website", url: t.demoUrl, buyMessage: enquiryMessage(t.name), price: t.price, image: t.heroImage, source: "hero" });
    },
  });
  const v = videoInvites[0];
  const videoThumb = "/work/storybook-monogram.webp?v=2";
  const videoItem = (position: number): CarouselItem => ({
    src: videoThumb,
    label: `Watch the ${v.name} video invitation`,
    title: v.name,
    kind: "Video invite",
    onClick: () => {
      cardClick(v.slug, v.name, position, "video_invite");
      open({ kind: "video", title: v.name, subtitle: `Video invitation · ${v.duration} min`, src: v.src, poster: v.poster, buyMessage: enquiryMessage(extras.videoName), price: v.price, image: videoThumb, source: "hero" });
    },
  });
  // Same order as the theme cards, with the video invite in third place; positions are 1-based within the 5 designs
  const items: CarouselItem[] = [
    ...themes.slice(0, 2).map((t, i) => themeItem(t, i + 1)),
    videoItem(3),
    ...themes.slice(2).map((t, i) => themeItem(t, i + 4)),
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
    <section id="home" ref={heroRef} className="hero" aria-label="The Digital Moments">
      <HeroKolams />
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
          <a href="#themes" className="btn btn--dark btn--lg" onClick={(e) => { e.preventDefault(); track("choose_theme_click", { cta_location: "hero_section", cta_name: "choose_theme" }); markJump("choose_theme_click"); scrollTo("#themes"); }}>{hero.cta}</a>
        </motion.div>
        <motion.p className="hero__from" {...show(0.75)}>
          <span className="hero__from-label">Wedding websites start from</span>
          <span className="hero__from-price">
            <strong>{formatPrice(fromSale)}</strong>
            {saleBar.enabled && fromSale < fromFull && (<><s>{formatPrice(fromFull)}</s><span className="hero__from-tag">{saleBar.discountPercent}% off · Wedding Sale</span></>)}
          </span>
        </motion.p>
      </div>

      {ready && <Akshata landRef={ringRef} />}

      <motion.div ref={ringRef} className="hero__ring" initial={{ opacity: 0, y: 80 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}>
        <CurvedCarousel items={items} />
      </motion.div>

      {/* Scroll cue pinned to the bottom of the first screen; fades once the visitor scrolls */}
      <AnimatePresence>
        {ready && atTop && (
          <motion.a
            href="#themes"
            className="scroll-cue"
            onClick={(e) => { e.preventDefault(); track("scroll_cue_click"); markJump("scroll_cue_click"); scrollTo("#themes"); }}
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
