import { testimonials, type Testimonial } from "@/data/catalog";
import { testimonialsIntro } from "@/data/content";
import { Sparkle, StarIcon } from "../Icons";
import { LineReveal, Reveal } from "../motion/Reveal";

/**
 * On hold until the testimonial request system is live.
 * Renders only when real, client-approved testimonials exist — no placeholders.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  const list: Testimonial[] = testimonials;
  const loop = [...list, ...list];

  return (
    <section id="testimonials" className="section collection testimonials">
      <div className="container">
        <div className="collection__head">
          <Reveal y={12}><span className="collection__eyebrow"><Sparkle width={10} height={10} /> {testimonialsIntro.eyebrow}</span></Reveal>
          <h2 className="collection__title"><LineReveal>{testimonialsIntro.title}</LineReveal></h2>
          <Reveal delay={0.15}><p className="collection__sub">{testimonialsIntro.sub}</p></Reveal>
        </div>
      </div>
      <div className="testi-marquee">
        <div className="testi-track">
          {loop.map((t, i) => (
            <figure className="testi-card" key={i} aria-hidden={i >= list.length}>
              <Sparkle className="testi-card__mark" />
              <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} style={{ opacity: s < t.rating ? 1 : 0.2 }} />)}
              </div>
              <blockquote>“{t.feedback}”</blockquote>
              <figcaption>
                <span className="testi-card__avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {t.photo ? <img src={t.photo} alt="" /> : t.name.split(/\s|&/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <span><b>{t.name}</b><small>{t.projectType}{t.date ? ` · ${t.date}` : ""}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
