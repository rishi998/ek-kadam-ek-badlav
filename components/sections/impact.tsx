"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { HandHeart, Sparkles, UsersRound } from "lucide-react";
import { useRef, useState } from "react";

const stats = [
  { label: "Books donated", end: 500, suffix: "+" },
  { label: "Families helped", end: 200, suffix: "+" },
  { label: "Meals shared", end: 1000, suffix: "+" },
  { label: "Community Volunteers", end: 1200, suffix: "+" },
];

function Stat({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const ran = useRef(false);

  function start() {
    if (ran.current) return;
    ran.current = true;
    if (reduce) {
      setValue(end);
      return;
    }
    animate(0, end, {
      duration: 1.65,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
  }

  return (
    <motion.div
      viewport={{ once: true, amount: 0.35 }}
      onViewportEnter={start}
      className="relative overflow-hidden rounded-[1.5rem] border border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_20px_48px_-28px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-saffron/12 via-transparent to-brand-teal/14" />
      <div className="relative">
        <p className="font-heading text-[clamp(2rem,4.6vw,3rem)] font-extrabold tracking-tight text-brand-text">
          {value}
          {suffix}
        </p>
        <p className="mt-3 text-sm font-semibold text-[#4b5563]">{label}</p>
      </div>
    </motion.div>
  );
}

export function Impact() {
  return (
    <section
      id="impact"
      className="scroll-mt-[min(10rem,calc(8rem+env(safe-area-inset-top)))] bg-gradient-to-b from-white via-brand-section/30 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-teal">
              Impact
            </p>
            <h2 className="font-heading mt-4 text-[clamp(1.85rem,3.8vw,2.65rem)] font-extrabold tracking-[-0.02em] text-brand-text">
              Real help. Real reach. Real dignity.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4b5563] sm:text-[17px]">
              Every pickup is a promise — we treat your generosity with urgency,
              transparency, and deep respect for the communities we serve.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-gradient-to-br from-brand-mint/40 via-white to-[#FFF7F0] shadow-[0_8px_24px_rgba(0,0,0,0.08),0_32px_72px_-36px_rgba(0,0,0,0.11)]">
              <div className="relative aspect-[4/5] w-full">
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")",
                  }}
                  aria-hidden
                />
                <div className="relative flex h-full flex-col items-center justify-center gap-10 p-10">
                  <div className="grid size-24 place-items-center rounded-3xl bg-white/55 shadow-inner ring-1 ring-white/80 backdrop-blur-md">
                    <UsersRound
                      className="size-12 text-brand-saffron/85"
                      aria-hidden
                    />
                  </div>
                  <div className="flex gap-6">
                    <div className="grid size-16 place-items-center rounded-2xl bg-white/45 shadow-sm ring-1 ring-white/70 backdrop-blur-sm">
                      <HandHeart
                        className="size-8 text-brand-teal/90"
                        aria-hidden
                      />
                    </div>
                    <div className="grid size-16 place-items-center rounded-2xl bg-white/45 shadow-sm ring-1 ring-white/70 backdrop-blur-sm">
                      <Sparkles
                        className="size-8 text-brand-saffron/80"
                        aria-hidden
                      />
                    </div>
                  </div>
                  <p className="max-w-[16rem] text-center text-sm font-medium leading-relaxed text-neutral-700">
                    Community-first logistics — dignity in every pickup, clarity in every message.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-saffron/12 via-transparent to-brand-teal/12" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/95 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <p className="text-sm font-semibold text-brand-text">
                Built by neighbors. Sustained by donors like you.
              </p>
              <p className="mt-1 text-xs text-[#6b7280]">
                Figures shown are representative milestones as our impact grows.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
