import { Hero } from "@/components/sections/Hero";
import { SaleBar } from "@/components/SaleBar";
import { Themes } from "@/components/sections/Themes";
import { Extras } from "@/components/sections/Extras";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact, WhatsAppFab } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <SaleBar />
      <main>
        <Hero />
        <Themes />
        <Extras />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
