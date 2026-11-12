"use client";

import { formatPrice, type Price } from "@/data/catalog";
import { saleBar, salePrice } from "@/data/content";
import { enquiryMessage, whatsappLink } from "@/data/site";
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

/** Name · tier · price · [Live demo] [Enquire on WhatsApp] — used on every offer card. */
export function ProductInfo({ name, tier, price, summary, demoLabel = "Live demo", demoIcon = "play", onDemo, headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const onSale = price !== null && saleBar.enabled;
  const finalPrice = price !== null ? salePrice(price) : null;
  const message = enquiryMessage(name);
  return (
    <div className="product-info">
      <H className="product-info__name">{name}</H>
      <span className="product-info__tier">{tier}</span>
      {summary && <p className="product-info__summary">{summary}</p>}
      {onSale ? (
        <span className="product-info__price product-info__price--sale">
          <span className="product-info__amount">{formatPrice(finalPrice)}</span>
          <s aria-label={`Original price ${formatPrice(price)}`}>{formatPrice(price)}</s>
          <em>{saleBar.discountPercent}% off</em>
        </span>
      ) : (
        <span className={`product-info__price ${price === null ? "product-info__price--request" : ""}`}>{formatPrice(price)}</span>
      )}
      <div className="product-info__actions">
        <button className="btn btn--secondary" onClick={() => { track("demo_click", { item: name }); onDemo(); }}>
          {demoIcon === "help" ? <HelpIcon /> : <PlayIcon />} {demoLabel}
        </button>
        <a className="btn btn--primary btn--buy" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => track("buy_click", { item: name, from: "card" })}>
          <WhatsAppIcon /> Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
