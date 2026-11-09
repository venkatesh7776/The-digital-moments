import { track as vercelTrack } from "@vercel/analytics";
import { site } from "@/data/site";

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

/**
 * CTA click tracking — sent to Vercel Analytics and to Google Analytics 4.
 * In GA4 these appear under Reports → Engagement → Events, e.g.
 *   buy_click { item: "Temple Theme", from: "card" }
 */
export function track(event: string, props: Record<string, string> = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the UI */
  }
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    gtag?.("event", event, { ...props, send_to: site.gaMeasurementId });
  } catch {
    /* Google tag blocked or not loaded — ignore */
  }
}
