/** Hero copy — edit freely. */
export const hero = {
  brand: "The Digital Moments",
  title: "Digital Wedding Invitations for Every Indian Celebration.",
  sub: "Personalised digital wedding invitations for Indian couples, with RSVP, countdowns, galleries and venue maps in one link.",
  cta: "Choose a theme",
  scrollCue: "See all themes & prices",
};

export const collection = {
  eyebrow: "Wedding Websites",
  title: "Wedding Website Templates",
  sub: "Each one is a live website — open the demo, then we personalise it with your names, story, events and photos. RSVP, countdown and venue map included.",
};

export const extras = {
  eyebrow: "More Ways to Celebrate",
  title: "Video Invites & Moments QR",
  sub: "A cinematic invite for WhatsApp, and one shared album for every photo your guests take.",
  videoName: "Video Invitations",
  videoBadge: "Sample playing",
  videoText: "Hand-illustrated, set to music and personalised for your families — vertical and made for WhatsApp.",
  qrBadge: "Interactive preview",
  qrText: "Guests scan a QR at the venue and upload photos and wishes — no app needed. Everything lands in one gallery.",
};

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  title: "Loved by Couples",
  sub: "Kind words from the families we’ve celebrated with.",
};


export const qrHowItWorks = {
  eyebrow: "Moments QR",
  title: "How it works",
  sub: "Every photo your guests take — collected in one place, in three simple steps.",
  steps: [
    { title: "Create your folder & get the QR", text: "We set up a private memories folder for your event and give you a unique QR code." },
    { title: "Place it — guests scan & share", text: "Put the QR on tables, the entrance and the stage. Guests scan it and upload their photos with wishes — no app needed." },
    { title: "All photos on one website", text: "Every photo and wish lands together on your own memories website, ready to relive and share." },
  ],
};

/** Wedding Sale — top bar + discounted theme prices. Set enabled: false when the sale ends. */
export const saleBar = {
  enabled: true,
  discountPercent: 10,
  label: "Wedding Sale",
  text: "Get 10% off any wedding template",
  cta: "Claim now",
};

export function salePrice(price: number) {
  return saleBar.enabled ? Math.round((price * (100 - saleBar.discountPercent)) / 100) : price;
}
