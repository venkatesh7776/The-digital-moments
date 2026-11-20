"use client";

import NextError from "next/error";
import posthog from "posthog-js";
import { posthogConfigured } from "@/lib/posthog-config";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (posthogConfigured) {
      posthog.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
