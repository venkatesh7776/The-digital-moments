import { track as vercelTrack } from "@vercel/analytics";

/** CTA click tracking — sent to Vercel Analytics when deployed, no-op locally. */
export function track(event: string, props: Record<string, string> = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the UI */
  }
}
