"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAfterLoader } from "../Loader";
import { site, whatsappLink } from "@/data/site";
import { track } from "@/lib/track";
import { InstagramIcon, WhatsAppIcon } from "../Icons";
import { LineReveal, Reveal } from "../motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="section contact-v2">
      <div className="container">
        <div className="contact-panel">
          <h2 className="contact-panel__title">
            <LineReveal>Your moments deserve</LineReveal>
            <LineReveal delay={0.1}><span className="contact-panel__accent">something beautiful.</span></LineReveal>
          </h2>
          <Reveal delay={0.15}><p className="collection__sub">Let’s create a digital experience that makes your wedding even more special.</p></Reveal>
          <Reveal delay={0.25} className="contact__actions">
            <a className="btn btn--dark btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { from: "contact" })}>
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
            <a className="btn btn--glass btn--lg" href={site.instagramUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("instagram_click", { from: "contact" })}>
              <InstagramIcon /> Follow us on Instagram
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Floating WhatsApp button — always available once the intro finishes. */
/** Card buttons the floating button must never cover (it hides while they pass underneath). */
const FAB_AVOID = ".product-info__actions, .custom-card .btn";

export function WhatsAppFab() {
  const ready = useAfterLoader();
  const [covering, setCovering] = useState(false);
  const [entered, setEntered] = useState(false); // first entrance done → later re-shows are instant

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      // FAB zone: bottom-right corner (button + margin + a little breathing room)
      const zoneLeft = window.innerWidth - 100;
      const zoneTop = window.innerHeight - 100;
      const hit = Array.from(document.querySelectorAll(FAB_AVOID)).some((el) => {
        const r = el.getBoundingClientRect();
        return r.right > zoneLeft && r.bottom > zoneTop && r.top < window.innerHeight;
      });
      setCovering(hit);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(raf); };
  }, []);

  return (
    <AnimatePresence>
      {ready && (
        <motion.a
          className="fab"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          aria-hidden={covering || undefined}
          tabIndex={covering ? -1 : undefined}
          style={{ pointerEvents: covering ? "none" : "auto" }}
          onClick={() => track("whatsapp_click", { from: "fab" })}
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={covering ? { opacity: 0, scale: 0.6, y: 24, transition: { duration: 0.2 } } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 20, delay: entered ? 0 : 1.4 }}
          onAnimationComplete={() => setEntered(true)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppIcon />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
