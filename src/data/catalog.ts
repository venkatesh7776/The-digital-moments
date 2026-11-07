/**
 * Content catalogue — themes, video invitations, the QR experience,
 * delivered client projects and testimonials.
 *
 * To add a new theme / project / testimonial, append an object to the
 * matching array. No layout changes needed.
 */

export type Price = number | null; // null → "Price on request"

export interface Theme {
  slug: string;
  name: string;
  tier: string;
  price: Price;
  summary: string;
  demoUrl: string;
  mobileImage: string;
  desktopImage: string;
  accent: string; // muted tint used behind the device mockup
}

export interface VideoInvite {
  slug: string;
  name: string;
  tier: string;
  price: Price;
  duration: string;
  summary: string;
  src: string;
  poster: string;
  previewSrc: string;
  features: string[];
}

export interface Project {
  slug: string;
  couple: string;
  weddingType: string;
  date?: string;
  services: string[];
  description: string;
  image: string;
  imageFit?: "desktop" | "portrait";
  liveUrl?: string;
  videoSlug?: string;
}

export interface Testimonial {
  name: string;
  photo?: string;
  rating: number;
  feedback: string;
  projectType: string;
  date?: string;
}

export const themes: Theme[] = [
  {
    slug: "temple",
    name: "Temple Theme",
    tier: "Premium",
    price: 4999,
    summary: "Carved temple pillars, brass bells, diyas and fresh marigold garlands — a warm, traditional welcome.",
    demoUrl: "https://www.muralivarshitha.in/",
    mobileImage: "/themes/theme-1-mobile.webp?v=2",
    desktopImage: "/themes/theme-1-desktop.webp?v=2",
    accent: "#F6E6D3",
  },
  {
    slug: "noor",
    name: "Noor Theme",
    tier: "Premium",
    price: 4999,
    summary: "Deep teal arches, glowing lanterns and a graceful verse opening — elegant and serene for a Nikah.",
    demoUrl: "https://sahlaabdulbasith.vercel.app/",
    mobileImage: "/themes/theme-2-mobile.webp?v=2",
    desktopImage: "/themes/theme-2-desktop.webp?v=2",
    accent: "#E3E6E2",
  },
  {
    slug: "coastal",
    name: "Coastal Theme",
    tier: "Premium",
    price: 3999,
    summary: "Sunlit seaside photography and refined serif typography — made for destination and beach celebrations.",
    demoUrl: "https://wedding-tau-ivory.vercel.app/",
    mobileImage: "/themes/theme-3-mobile.webp?v=2",
    desktopImage: "/themes/theme-3-desktop.webp?v=2",
    accent: "#F4DFD5",
  },
];

export const videoInvites: VideoInvite[] = [
  {
    slug: "storybook",
    name: "Watercolour Storybook",
    tier: "Cinematic",
    price: null, // TODO: set price
    duration: "1:27",
    summary:
      "A hand-painted storybook that opens page by page — blessings, the couple, every ceremony and a QR to the venue, set to music.",
    src: "/video/storybook-invitation.mp4",
    poster: "/video/storybook-cover.jpg",
    previewSrc: "/video/storybook-preview.mp4",
    features: [
      "Vertical 9:16 — perfect for WhatsApp & Instagram",
      "Personalised artwork, names and family details",
      "Every event — Haldi, Sangeet, Wedding and more",
      "Scannable QR for the venue location",
    ],
  },
];

export const qrExperience = {
  name: "Moments QR",
  tier: "Add-on · Any event",
  price: null as Price, // TODO: set price
  summary:
    "Place a QR at the venue. Guests scan, upload their photos and wishes — no app, no sign-up — and every memory lands in one beautiful shared gallery.",
  steps: [
    { title: "Scan at the venue", text: "Elegant QR cards on tables, entrances and the stage." },
    { title: "Upload in seconds", text: "Guests add photos and wishes straight from their phone camera roll." },
    { title: "Relive it together", text: "Every moment collected in one private gallery for the couple and family." },
  ],
};

export const projects: Project[] = [
  // TODO: confirm these are approved to be shown as client work
  {
    slug: "goldy-ritu",
    couple: "Goldy & Ritu",
    weddingType: "Hindu Wedding · Akola",
    date: "November 2026",
    services: ["Video Invitation"],
    description:
      "A watercolour storybook invitation covering both wedding days — from the groom's introduction to the wedding carnival, finished with a venue QR.",
    image: "/work/storybook-60.jpg",
    imageFit: "portrait",
    videoSlug: "storybook",
  },
  {
    slug: "murali-varshitha",
    couple: "Murali & Varshitha",
    weddingType: "Hindu Wedding",
    services: ["Wedding Website"],
    description:
      "A temple-inspired wedding website with their story, event schedule, venue details and a ceremonial opening.",
    image: "/themes/theme-1-desktop.webp?v=2",
    liveUrl: "https://www.muralivarshitha.in/",
  },
  {
    slug: "sahla-basith",
    couple: "Sahla & Basith",
    weddingType: "Nikah",
    services: ["Wedding Website"],
    description:
      "A serene Nikah website with lantern-lit arches, a verse opening, ceremony timings and venue directions.",
    image: "/themes/theme-2-desktop.webp?v=2",
    liveUrl: "https://sahlaabdulbasith.vercel.app/",
  },
];

/** Only add real, client-approved testimonials. The section stays hidden while empty. */
export const testimonials: Testimonial[] = [];

export function formatPrice(price: Price) {
  if (price === null) return "Price on request";
  return `₹${price.toLocaleString("en-IN")}`;
}
