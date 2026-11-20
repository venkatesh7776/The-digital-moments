import posthog from "posthog-js";

type LogAttributes = Record<string, string | number | boolean>;

const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

function info(message: string, attributes: LogAttributes) {
  if (!posthogConfigured) return;

  try {
    posthog.logger.info(message, attributes);
  } catch {}
}

export const posthogLog = {
  offerPreviewOpened(previewType: "site" | "video" | "qr", entryPoint: "hero" | "card") {
    info("offer preview opened", {
      action: "offer_preview_opened",
      preview_type: previewType,
      entry_point: entryPoint,
    });
  },
  enquiryStarted(entryPoint: "offer_card" | "contact_section", offerTier?: string) {
    info("enquiry started", {
      action: "enquiry_started",
      entry_point: entryPoint,
      ...(offerTier ? { offer_tier: offerTier } : {}),
    });
  },
};
