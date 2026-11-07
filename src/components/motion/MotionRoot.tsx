"use client";

import { MotionConfig } from "motion/react";

/** Respects the visitor's reduced-motion preference across every animation. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
