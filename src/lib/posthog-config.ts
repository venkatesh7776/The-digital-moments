/**
 * PostHog project settings. The phc_ project key is a public, browser-side key (safe to ship in code).
 * Env vars still win, so a Vercel / .env.local value can override these without a code change.
 */
export const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || "phc_kNVwcAYQwrYZy4qzYreqZcLUwndNn4NW5nXeQ7VJeUy5";
export const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
export const posthogConfigured = Boolean(posthogToken && posthogHost);
