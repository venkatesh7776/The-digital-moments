import posthog from "posthog-js";
import { posthogHost as host, posthogToken as token } from "@/lib/posthog-config";

if (token && host) {
  posthog.init(token, {
    api_host: host,
    defaults: "2026-08-30",
    capture_exceptions: true,
    // Privacy policy promises cookie-free, non-identifying analytics:
    // no cookies / local storage (unique visitors via PostHog's server-side daily hash) and no session replay.
    // Requires "Cookieless server hash mode" to be ON in the PostHog project settings, or events are discarded.
    cookieless_mode: "always",
    disable_session_recording: true,
    logs: {
      serviceName: "the-digital-moments-web",
      environment: process.env.NODE_ENV,
    },
    debug: process.env.NODE_ENV === "development",
  });
} else if (process.env.NODE_ENV === "development") {
  const missingVariable = token
    ? "NEXT_PUBLIC_POSTHOG_HOST"
    : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN";

  throw new Error(
    `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
  );
}
