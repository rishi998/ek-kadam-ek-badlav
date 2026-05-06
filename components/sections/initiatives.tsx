"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Heart, Shirt, UtensilsCrossed } from "lucide-react";
import { useDonation } from "@/components/donation/donation-provider";
import { Button } from "@/components/ui/button";
import type { DonationInitiativeId } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const cards: {
  id: DonationInitiativeId;
  title: string;
  desc: string;
  cta: string;
  icon: typeof UtensilsCrossed;
  topGradient: string;
  cornerAccent: string;
  hoverGlow: string;
}[] = [
  {
    id: "food",
    title: "Zero Hunger Fund",
    desc: "Support food relief efforts and help feed families in need.",
    cta: "Donate Food",
    icon: UtensilsCrossed,
    topGradient:
      "from-[#FF8A1E]/45 via-[#FFB36B]/35 to-[#FFF5ED]",
    cornerAccent:
      "after:from-brand-saffron/90 after:to-accent-warm/80",
    hoverGlow:
      "group-hover:border-black/[0.07] group-hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]",
  },
  {
    id: "books",
    title: "Share the Shelf",
    desc: "Donate books to empower education and shape brighter futures.",
    cta: "Donate Books",
    icon: BookOpen,
    topGradient:
      "from-[#0F8B8D]/35 via-brand-mint/95 to-white",
    cornerAccent:
      "after:from-brand-teal after:to-brand-teal-secondary",
    hoverGlow:
      "group-hover:border-brand-teal/15 group-hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]",
  },
  {
    id: "clothes",
    title: "Warm Hearts Collective",
    desc: "Provide clothing support for vulnerable communities.",
    cta: "Donate Clothes",
    icon: Shirt,
    topGradient:
      "from-[#FF8A65]/40 via-[#FFEAE0] to-[#FFF8F3]",
    cornerAccent: "after:from-[#FF9A7A] after:to-brand-saffron",
    hoverGlow:
      "group-hover:border-black/[0.07] group-hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.06)]",
  },
];

export function Initiatives() {
  const reduce = useReducedMotion();
  const { openDonation } = useDonation();

  return (
    <section
      id="initiatives"
      className="scroll-mt-[min(8.5rem,calc(6rem+env(safe-area-inset-top)))] bg-gradient-to-b from-background via-brand-section/80 to-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-saffron">
            Initiatives
          </p>
          <h2 className="font-heading mt-4 text-[clamp(1.85rem,3.8vw,2.65rem)] font-extrabold tracking-[-0.02em] text-brand-text">
            Give what you can. We’ll handle the rest.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#4b5563] sm:text-[17px]">
            Choose an initiative — then share pickup details in under a minute.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.id}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: reduce ? 0 : 0.55,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -14,
                        scale: 1.025,
                        rotate: -0.6,
                        transition: { duration: 0.22 },
                      }
                }
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06),0_20px_48px_-28px_rgba(0,0,0,0.08)] transition-[box-shadow,transform,border-color] duration-300",
                  c.hoverGlow,
                  "after:pointer-events-none after:absolute after:right-0 after:top-0 after:h-20 after:w-20 after:rounded-bl-[100%] after:bg-gradient-to-br after:opacity-80",
                  c.cornerAccent,
                )}
              >
                <div
                  className={cn(
                    "relative h-36 bg-gradient-to-br p-6",
                    c.topGradient,
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-white/80 p-3 shadow-md ring-1 ring-white/90 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <Icon className="size-8 text-brand-text" aria-hidden />
                    </div>
                    <Heart className="size-6 text-brand-saffron/75" aria-hidden />
                  </div>
                </div>

                <div className="relative space-y-3 px-6 pb-6 pt-5">
                  <h3 className="font-heading text-xl font-bold text-brand-text">
                    {c.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-brand-text-muted">
                    {c.desc}
                  </p>
                  <Button
                    type="button"
                    variant="cta"
                    size="lg"
                    onClick={() => openDonation(c.id)}
                    className="mt-2 w-full rounded-full text-[15px]"
                  >
                    {c.cta}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
