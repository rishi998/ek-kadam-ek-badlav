"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeartHandshake, MapPin, MessageCircle } from "lucide-react";
import { useDonation } from "@/components/donation/donation-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site-config";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function AboutContact() {
  const reduce = useReducedMotion();
  const { openDonation } = useDonation();

  return (
    <section
      id="about"
      className="scroll-mt-[min(10rem,calc(8rem+env(safe-area-inset-top)))] bg-gradient-to-b from-brand-section/30 via-white to-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_28px_64px_-36px_rgba(0,0,0,0.1)]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/10 bg-brand-section px-3 py-1 text-xs font-semibold text-[#374151]">
              <HeartHandshake className="size-4 text-brand-saffron" aria-hidden />
              About us
            </div>
            <h2 className="font-heading mt-4 text-[clamp(1.6rem,3.2vw,2.25rem)] font-extrabold tracking-[-0.02em] text-brand-text">
              {SITE.name}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4b5563] sm:text-[17px]">
              We are an independent community initiative focused on{" "}
              <span className="font-semibold text-brand-text">food relief</span>
              ,{" "}
              <span className="font-semibold text-brand-text">education access</span>
              , and{" "}
              <span className="font-semibold text-brand-text">clothing support</span>{" "}
              for underprivileged families. Our model keeps the donor journey
              respectful: clear communication, verified coordination, and pickup
              at your convenience.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4b5563] sm:text-[17px]">
              <span className="font-semibold">Mission:</span> turn everyday
              generosity into sustained impact — one pickup at a time.
            </p>
          </motion.div>

          <motion.div
            id="contact"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              duration: 0.55,
              delay: reduce ? 0 : 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="scroll-mt-[min(10rem,calc(8rem+env(safe-area-inset-top)))] rounded-[2rem] border border-white bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_28px_64px_-36px_rgba(0,0,0,0.1)]"
          >
            <h3 className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-brand-text">
              Contact & pickup
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4b5563]">
              Prefer WhatsApp? So do we — it’s the fastest way to coordinate a
              pickup and confirm details.
            </p>

            <ul className="mt-6 space-y-3 text-[15px]">
              <li className="flex gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-black/[0.04] backdrop-blur-md">
                <MessageCircle
                  className="mt-0.5 size-5 text-brand-teal"
                  aria-hidden
                />
                <div>
                  <p className="font-semibold text-brand-text">WhatsApp</p>
                  <a
                    className="text-[#4b5563] underline decoration-brand-saffron/40 underline-offset-4"
                    href={buildQuickWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 {SITE.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-black/[0.04] backdrop-blur-md">
                <MapPin className="mt-0.5 size-5 text-brand-saffron" aria-hidden />
                <div>
                  <p className="font-semibold text-brand-text">Pickup</p>
                  <p className="text-[#4b5563]">
                    Doorstep collection after you submit the pickup form.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="cta"
                size="lg"
                onClick={() => openDonation()}
                className="h-11 flex-1 rounded-2xl text-[15px]"
              >
                Start a pickup request
              </Button>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ctaOutline", size: "lg" }),
                  "h-11 flex-1 rounded-2xl text-[15px]",
                )}
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
