import { AdSlot } from "@/components/ads/ad-slot";
import { DonationDialog } from "@/components/donation/donation-dialog";
import { DonationProvider } from "@/components/donation/donation-provider";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutContact } from "@/components/sections/about-contact";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Impact } from "@/components/sections/impact";
import { Initiatives } from "@/components/sections/initiatives";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <DonationProvider>
      <Navbar />
      <main className="pb-28 lg:pb-0">
        <Hero />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <AdSlot variant="hero-below" className="my-12 sm:my-14" />
            </div>

            <Initiatives />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <AdSlot variant="inline" className="my-12 sm:my-14" />
            </div>

            <HowItWorks />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <AdSlot variant="inline" className="my-12 sm:my-14" />
            </div>

            <Impact />
            <Testimonials />
            <AboutContact />
          </div>

          <aside
            className="sticky top-[calc(8rem+env(safe-area-inset-top))] mt-10 hidden space-y-6 self-start px-4 pb-10 lg:block xl:px-0"
            aria-label="Sponsored"
          >
            <AdSlot variant="sidebar" />
            <AdSlot variant="sidebar" />
          </aside>
        </div>
      </main>

      <Footer />
      <DonationDialog />
      <FloatingWhatsApp />
      <AdSlot variant="sticky-mobile" />
    </DonationProvider>
  );
}
