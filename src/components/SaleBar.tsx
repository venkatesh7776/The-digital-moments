"use client";

import { saleBar } from "@/data/content";
import { track } from "@/lib/track";
import { useSmoothScroll } from "./providers/SmoothScroll";

/** Offer bar pinned to the top of the screen. Edit it in data/content.ts. */
export function SaleBar() {
  const { scrollTo } = useSmoothScroll();
  if (!saleBar.enabled) return null;
  const go = (e: React.MouseEvent) => { e.preventDefault(); track("sale_bar_click"); scrollTo("#themes"); };
  return (
    <div className="salebar" role="region" aria-label="Offer">
      <a className="salebar__inner" href="#themes" onClick={go}>
        <span className="salebar__label">{saleBar.label}</span>
        <span className="salebar__sep" aria-hidden />
        <span className="salebar__text">{saleBar.text}</span>
        <span className="salebar__cta">{saleBar.cta}</span>
      </a>
    </div>
  );
}
