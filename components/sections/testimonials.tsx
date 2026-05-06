"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

const people = [
  {
    name: "Ananya Sharma",
    role: "Donor · New Delhi",
    quote:
      "They made donating feel effortless — dignified communication, punctual pickup, and real transparency.",
    avatarClass:
      "from-brand-saffron/35 to-[#ff7a18]/25 text-brand-text ring-brand-saffron/25",
  },
  {
    name: "Rahul Verma",
    role: "Volunteer",
    quote:
      "This is what modern charity should feel like: respectful, organized, and deeply human.",
    avatarClass:
      "from-brand-green/30 to-brand-saffron/20 text-brand-text ring-brand-green/25",
  },
  {
    name: "Priya Nair",
    role: "Community partner",
    quote:
      "The team treated every book like a future — handled gently, sorted carefully, delivered with love.",
    avatarClass:
      "from-[#ffd89b]/50 to-brand-green/25 text-brand-text ring-brand-saffron/30",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % people.length);
    }, 6200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const p = people[i]!;

  return (
    <section className="scroll-mt-[min(10rem,calc(8rem+env(safe-area-inset-top)))] bg-gradient-to-b from-white to-brand-section/40 py-20 pb-24 sm:py-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-teal">
            Stories
          </p>
          <h2 className="font-heading mt-4 text-[clamp(1.85rem,3.8vw,2.65rem)] font-extrabold tracking-[-0.02em] text-brand-text">
            “Kindness spreads faster when trust is visible.”
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_28px_64px_-36px_rgba(0,0,0,0.1)] sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-saffron/10 via-transparent to-brand-teal/12" />
            <div className="relative">
              <Quote className="size-9 text-brand-saffron/70" aria-hidden />

              <AnimatePresence mode="wait">
                <motion.div
                  key={p.name}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                  className="mt-5"
                >
                  <p className="text-lg leading-relaxed text-[#374151] sm:text-xl">
                    “{p.quote}”
                  </p>
                  <div className="mt-7 flex items-center gap-4">
                    <div
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-base font-bold shadow-md ring-2 ring-white",
                        p.avatarClass,
                      )}
                      aria-hidden
                    >
                      {initials(p.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text">{p.name}</p>
                      <p className="text-sm text-[#4b5563]">{p.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  {people.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Show testimonial ${idx + 1}`}
                      className={cn(
                        "h-2.5 rounded-full transition-all",
                        idx === i
                          ? "w-10 bg-gradient-to-r from-brand-teal to-brand-saffron"
                          : "w-2.5 bg-black/12 hover:bg-black/22",
                      )}
                      onClick={() => setI(idx)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="size-10 rounded-xl border-brand-teal/20 shadow-[0_8px_24px_-14px_rgba(15,139,141,0.25)]"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setI((v) => (v - 1 + people.length) % people.length)
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="size-10 rounded-xl border-brand-teal/20 shadow-[0_8px_24px_-14px_rgba(15,139,141,0.25)]"
                    aria-label="Next testimonial"
                    onClick={() => setI((v) => (v + 1) % people.length)}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
