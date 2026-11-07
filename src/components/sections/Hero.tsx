"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { themes, videoInvites } from "@/data/catalog";
import { hero } from "@/data/content";
import { CurvedCarousel, type CarouselItem } from "../CurvedCarousel";
import { useAfterLoader } from "../Loader";
import { EASE } from "../motion/Reveal";
import { usePreview } from "../providers/PreviewProvider";
import { useSmoothScroll } from "../providers/SmoothScroll";

export function Hero() {
  const ready = useAfterLoader();
  const { open } = usePreview();
  const { scrollTo } = useSmoothScroll();
  const v = videoInvites[0];

  const openTheme = (i: number) => () => {
    const t = themes[i];
    open({ kind: "site", title: t.name, subtitle: "Live demo · Wedding website", url: t.demoUrl, buyMessage: `Hi The Digital Moments! I'm interested in the ${t.name} wedding website.` });
  };
  const openVideo = () => open({ kind: "video", title: v.name, subtitle: `Video invitation · ${v.duration} min`, src: v.src, poster: v.poster, buyMessage: `Hi The Digital Moments! I'm interested in the ${v.name} video invitation.` });

  // 3 live theme heroes + the video invitation's monogram — repeated round the ring
  const items: CarouselItem[] = [
    { src: "/themes/theme-1-hero.webp?v=2", label: `${themes[0].name} — open live demo`, onClick: openTheme(0) },
    { src: "/themes/theme-2-hero.webp?v=2", label: `${themes[1].name} — open live demo`, onClick: openTheme(1) },
    { src: "/work/storybook-monogram.webp?v=2", label: "Watercolour Storybook video invitation — play", onClick: openVideo },
    { src: "/themes/theme-3-hero.webp?v=2", label: `${themes[2].name} — open live demo`, onClick: openTheme(2) },
  ];

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
                <span className="hero__word" style={{ "--i": i } as React.CSSProperties}>{word}</span>
              </Fragment>
            ))}
          </span>
        </h1>
        <motion.p className="sub" {...show(0.55)}>{hero.sub}</motion.p>
        <motion.div className="hero__cta" {...show(0.65)}>
          <a href="#themes" className="btn btn--dark btn--lg" onClick={(e) => { e.preventDefault(); scrollTo("#themes"); }}>{hero.cta}</a>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 80 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}>
        <CurvedCarousel items={items} />
      </motion.div>
    </section>
  );
}
