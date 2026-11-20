"use client";

import { themes } from "@/data/catalog";
import { discountPercent, saleBar } from "@/data/content";
import { track } from "@/lib/track";
import { markJump } from "@/lib/view-tracking";
import { useSmoothScroll } from "./providers/SmoothScroll";

/** Offer bar pinned to the top of the screen. Edit it in data/content.ts. */
export function SaleBar() {
  const { scrollTo } = useSmoothScroll();
  if (!saleBar.enabled) return null;
  const maxOff = Math.max(...themes.map((t) => (t.price !== null ? discountPercent(t.price, t.offerPrice, t.offPercent) : 0)));
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    const onPill = (e.target as HTMLElement).closest(".salebar__cta") !== null;
    track("claim_now_click", { cta_location: "announcement_bar", cta_name: "claim_now", promotion_name: "wedding_sale", click_target: onPill ? "claim_now_button" : "banner" });
    markJump("claim_now_click");
    scrollTo("#themes");
  };
  return (
    <div className="salebar" role="region" aria-label="Offer">
      <a className="salebar__inner" href="#themes" onClick={go}>
        <span className="salebar__label">{saleBar.label}</span>
        <span className="salebar__sep" aria-hidden />
        <span className="salebar__text">Up to {maxOff}% off wedding websites</span>
        <span className="salebar__cta">{saleBar.cta}</span>
      </a>
    </div>
  );
}
