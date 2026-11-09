import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PreviewProvider } from "@/components/providers/PreviewProvider";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Wedding Websites, Video Invitations & QR Memories`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["wedding website", "digital wedding invitation", "video invitation", "wedding invitation video", "WhatsApp wedding invite", "wedding QR photo sharing", "Hindu wedding website", "Nikah invitation website", "The Digital Moments"],
  openGraph: { type: "website", title: site.name, description: `${site.tagline} Wedding websites, cinematic video invitations and QR memory sharing.`, siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#FBF3F0" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: `+${site.whatsappNumber}`,
  sameAs: [site.instagramUrl],
  areaServed: "IN",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <GoogleTagManager gtmId={site.googleTagId} />
      {/* GA4 event channel: page views come from the GTM container, so this one only carries click events */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} strategy="afterInteractive" />
      <Script id="ga4-events" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.gaMeasurementId}',{send_page_view:false});`}
      </Script>
      <body className="is-loading">
        <noscript><style>{`.loader{display:none!important}body.is-loading{overflow:auto}`}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionRoot>
          <SmoothScroll>
            <PreviewProvider>
              <Loader />
              <Cursor />
              {children}
            </PreviewProvider>
          </SmoothScroll>
        </MotionRoot>
        <Analytics />
      </body>
    </html>
  );
}
