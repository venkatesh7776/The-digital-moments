import { testimonials } from "./catalog";

/**
 * Global brand + contact configuration.
 * Change values here — every section reads from this file.
 */
export const site = {
  name: "The Digital Moments",
  tagline: "We turn moments into digital experiences.",
  descriptor: "Digital Experiences for Weddings & Celebrations",
  description:
    "The Digital Moments is a digital experience studio creating wedding websites, cinematic video invitations and QR-based memory sharing for weddings and life's special celebrations.",
  url: "https://thedigitalmoments.in", // TODO: replace with the final domain
  whatsappNumber: "917330828654", // country code + number, digits only
  instagramUrl: "https://www.instagram.com/thedigitalmoments", // TODO: confirm handle
  instagramHandle: "@thedigitalmoments", // TODO: confirm handle
  email: "",
};

export function whatsappLink(message?: string) {
  const text = message ?? "Hi The Digital Moments! I'd love to know more about your digital invitations.";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { id: "home", label: "Home" },
  { id: "themes", label: "Themes" },
  { id: "video", label: "Video & QR" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

export const visibleNav = nav.filter((n) => n.id !== "testimonials" || testimonials.length > 0);
