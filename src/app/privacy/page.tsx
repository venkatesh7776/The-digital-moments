import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = { title: "Privacy Policy", description: `How ${site.name} handles your information.` };

export default function Privacy() {
  return (
    <main className="section" style={{ paddingTop: 140 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" className="btn btn--ghost" style={{ marginBottom: 32 }}>← Back to {site.name}</Link>
        <h1 className="h1" style={{ marginBottom: 24 }}>Privacy Policy</h1>
        <div className="lead" style={{ display: "grid", gap: 16, maxWidth: "none" }}>
          <p>{site.name} respects your privacy. This website does not ask you to create an account and does not collect personal information through forms.</p>
          <p><b>Enquiries.</b> When you contact us on WhatsApp or Instagram, we receive the details you choose to share (such as your name, phone number and event details) and use them only to respond to you and deliver your project.</p>
          <p><b>Analytics.</b> We use privacy-friendly, cookie-free analytics to understand overall visits and which sections are useful. This data is aggregated and does not identify you.</p>
          <p><b>Client content.</b> Photos, names and event details you provide for your invitation or website are used only for your project and are never sold or shared with third parties.</p>
          <p><b>Live demos.</b> Theme demos open websites we have built; they are displayed inside this site for your convenience.</p>
          <p>Questions? <a href={whatsappLink("Hi! I have a question about your privacy policy.")} style={{ color: "var(--gold-deep)" }}>Message us on WhatsApp</a>.</p>
        </div>
      </div>
    </main>
  );
}
