"use client";

import { AnimatePresence, motion } from "motion/react";
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
export function WhatsAppFab() {
  const ready = useAfterLoader();
  return (
    <AnimatePresence>
      {ready && (
        <motion.a
          className="fab"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          onClick={() => track("whatsapp_click", { from: "fab" })}
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 20, delay: 1.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppIcon />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
