import Link from "next/link";
import { site, visibleNav, whatsappLink } from "@/data/site";
import { InstagramIcon, Sparkle, WhatsAppIcon } from "../Icons";

const YEAR = 2026; // update yearly

export function Footer() {
  const display = site.whatsappNumber.replace(/^91/, "+91 ").replace(/(\d{5})(\d{5})$/, "$1 $2");
  return (
    <footer className="footer-v2">
      <div className="footer-v2__glow" aria-hidden />
      <div className="container">
        <div className="footer-v2__top">
          <div className="footer-v2__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt={`${site.name} logo`} width={96} height={54} />
            <p className="footer-v2__tag">{site.tagline}</p>
            <p className="footer-v2__desc">Digital wedding invitations, cinematic video invites and shared memories — designed with care for every Indian celebration.</p>
            <div className="footer-v2__social">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>
          <div className="footer-v2__col">
            <h4>Explore</h4>
            <ul>{visibleNav.map((n) => <li key={n.id}><a href={`/#${n.id}`}>{n.label}</a></li>)}</ul>
          </div>
          <div className="footer-v2__col">
            <h4>Get in touch</h4>
            <ul>
              <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> {display}</a></li>
              <li><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer"><InstagramIcon /> {site.instagramHandle}</a></li>
            </ul>
            <a className="footer-v2__cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Start your invitation</a>
          </div>
        </div>

        <div className="footer-v2__word" aria-hidden>
          <Sparkle className="footer-v2__spark" />
          <span>The Digital Moments</span>
        </div>

        <div className="footer-v2__bottom">
          <span>© {YEAR} {site.name}. All rights reserved.</span>
          <span className="footer-v2__made">Made with <Sparkle width={10} height={10} /> in India</span>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
