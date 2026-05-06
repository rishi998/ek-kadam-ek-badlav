"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck2, ClipboardList, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Fill the form",
    desc: "Tell us what you’re donating and where to pick it up — it takes a minute.",
    icon: ClipboardList,
  },
  {
    title: "Schedule pickup",
    desc: "We confirm on WhatsApp and align a pickup window that works for you.",
    icon: CalendarCheck2,
  },
  {
    title: "Create impact",
    desc: "Your items reach families with care — food, learning, and warmth.",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-[min(10rem,calc(8rem+env(safe-area-inset-top)))] overflow-hidden bg-gradient-to-b from-white via-brand-section/50 to-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_10%,rgba(255,138,30,0.05),transparent_55%),radial-gradient(800px_circle_at_90%_30%,rgba(15,139,141,0.1),transparent_52%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-saffron">
            How it works
          </p>
          <h2 className="font-heading mt-4 text-[clamp(1.85rem,3.8vw,2.65rem)] font-extrabold tracking-[-0.02em] text-brand-text">
            A premium pickup experience — simple, human, fast.
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute left-[calc(16px+1.25rem)] top-10 hidden h-[calc(100%-5rem)] w-px bg-gradient-to-b from-brand-teal/45 via-brand-saffron/30 to-transparent md:block" />
          <div className="grid gap-6 md:gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{
                    duration: reduce ? 0 : 0.5,
                    delay: reduce ? 0 : i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-8"
                >
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <div className="relative">
                      <div className="grid size-14 place-items-center rounded-2xl border border-white/80 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
                        <Icon className="size-7 text-brand-text" aria-hidden />
                      </div>
                      <div className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-gradient-to-br from-brand-saffron to-accent-warm text-xs font-extrabold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06),0_16px_40px_-24px_rgba(0,0,0,0.08)]">
                    <h3 className="font-heading text-xl font-bold text-brand-text">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-brand-text-muted">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
