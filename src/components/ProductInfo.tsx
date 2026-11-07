"use client";

import { formatPrice, type Price } from "@/data/catalog";
import { whatsappLink } from "@/data/site";
import { track } from "@/lib/track";
import { HelpIcon, PlayIcon, WhatsAppIcon } from "./Icons";

type Props = {
  name: string;
  tier: string;
  price: Price;
  summary?: string;
  demoLabel?: string;
  demoIcon?: "play" | "help";
  onDemo: () => void;
  headingLevel?: "h3" | "h4";
};

/** Name · tier · price · [Demo] [Buy Now] — used on every offer card. */
export function ProductInfo({ name, tier, price, summary, demoLabel = "Demo", demoIcon = "play", onDemo, headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const message = `Hi The Digital Moments! I'm interested in the ${name}${price ? ` (${formatPrice(price)})` : ""}. Could you share the details?`;
  return (
    <div className="product-info">
      <H className="product-info__name">{name}</H>
      <span className="product-info__tier">{tier}</span>
      {summary && <p className="product-info__summary">{summary}</p>}
      <span className={`product-info__price ${price === null ? "product-info__price--request" : ""}`}>{formatPrice(price)}</span>
      <div className="product-info__actions">
        <button className="btn btn--secondary" onClick={() => { track("demo_click", { item: name }); onDemo(); }}>
          {demoIcon === "help" ? <HelpIcon /> : <PlayIcon />} {demoLabel}
        </button>
        <a className="btn btn--primary btn--buy" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => track("buy_click", { item: name, from: "card" })}>
          <WhatsAppIcon /> Buy Now
        </a>
      </div>
    </div>
  );
}
