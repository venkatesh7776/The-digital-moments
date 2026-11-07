import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };

export const PlayIcon = (p: P) => (<svg {...base} {...p}><path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5Z" /></svg>);
export const PlayFilled = (p: P) => (<svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}><path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5Z" /></svg>);
export const PauseIcon = (p: P) => (<svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>);
export const ArrowRight = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const ExternalIcon = (p: P) => (<svg {...base} {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></svg>);
export const PhoneIcon = (p: P) => (<svg {...base} {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>);
export const MonitorIcon = (p: P) => (<svg {...base} {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>);
export const VolumeOn = (p: P) => (<svg {...base} {...p}><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4ZM16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></svg>);
export const VolumeOff = (p: P) => (<svg {...base} {...p}><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4ZM16.5 9.5l5 5M21.5 9.5l-5 5" /></svg>);
export const UploadIcon = (p: P) => (<svg {...base} {...p}><path d="M12 15V4M7 8.5 12 4l5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base} {...p}><path d="M5 12.5 10 17 19 7" /></svg>);
export const Expand = (p: P) => (<svg {...base} {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>);
export const StarIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>);

/** Four-point sparkle — echoes the sparkle in the logo. */
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 0c.6 6.2 2.6 9.9 12 12-9.4 2.1-11.4 5.8-12 12-.6-6.2-2.6-9.9-12-12C9.4 9.9 11.4 6.2 12 0Z" />
  </svg>
);

export const EyeIcon = (p: P) => (<svg {...base} {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>);
export const RupeeIcon = (p: P) => (<svg {...base} {...p}><path d="M6 4h12M6 9h12M9 4c6 0 6 9 0 9H6l8 7" /></svg>);
export const PenIcon = (p: P) => (<svg {...base} {...p}><path d="M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4ZM14 7l3 3" /></svg>);
export const TouchIcon = (p: P) => (<svg {...base} {...p}><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.5a6 6 0 0 1-4.6-2.2L4.5 15.6a1.5 1.5 0 0 1 2.3-1.9L9 16" /></svg>);
export const RefreshIcon = (p: P) => (<svg {...base} {...p}><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4" /></svg>);
export const CameraIcon = (p: P) => (<svg {...base} {...p}><path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></svg>);
export const WalletIcon = (p: P) => (<svg {...base} {...p}><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V17a2 2 0 0 0 2 2h14V8H6.5A2.5 2.5 0 0 1 4 7.5Z" /><circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" /></svg>);
export const DiyaIcon = (p: P) => (<svg {...base} {...p}><path d="M12 3c1.6 2 2 3.4 0 5.5C10 6.4 10.4 5 12 3Z" /><path d="M3.5 12h17c-.5 4-4 6.5-8.5 6.5S4 16 3.5 12ZM9 21h6" /></svg>);
export const PinIcon = (p: P) => (<svg {...base} {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>);

export const HelpIcon = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17.2v.1" /></svg>);

export const iconMap = { rupee: RupeeIcon, pen: PenIcon, touch: TouchIcon, refresh: RefreshIcon, camera: CameraIcon, wallet: WalletIcon, eye: EyeIcon, diya: DiyaIcon, pin: PinIcon } as const;
