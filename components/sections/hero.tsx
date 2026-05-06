"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Truck,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDonation } from "@/components/donation/donation-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site-config";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Spec hero gradient + optional local photo at /public/images/hero.jpg
 * (add your curated asset — avoids remote hosts blocking the optimizer).
 */
function HeroBackdrop({ showPhoto }: { showPhoto: boolean }) {
  return (
    <div className="absolute inset-0 -z-20" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #FFFFFF 0%, #FFFDF9 38%, #F7FAF9 100%)",
        }}
      />
      {showPhoto ? (
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.32]"
            unoptimized
            priority={false}
          />
        </div>
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0F8B8D]/12 via-transparent to-[#FF8A1E]/10"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage: [
            "radial-gradient(90% 85% at 0% 20%, rgba(15,139,141,0.26), transparent 50%)",
            "radial-gradient(75% 70% at 100% 10%, rgba(255,179,107,0.45), transparent 48%)",
            "radial-gradient(55% 45% at 50% 100%, rgba(255,138,30,0.04), transparent 50%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const { openDonation } = useDonation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [heroPhoto, setHeroPhoto] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/images/hero.jpg", { method: "HEAD" })
      .then((r) => {
        if (!cancelled && r.ok) setHeroPhoto(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100dvh] max-w-[100vw] items-end overflow-x-hidden overflow-y-visible pb-12 pt-[max(6.75rem,calc(5.5rem+env(safe-area-inset-top)))] sm:pb-16 sm:pt-[max(7.5rem,calc(6rem+env(safe-area-inset-top)))] md:pb-20"
    >
      <HeroBackdrop showPhoto={heroPhoto} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#FFFDF9]/40 to-background" />
      <div className="absolute -left-28 top-28 -z-10 h-72 w-72 rounded-full bg-[#FF8A1E]/10 blur-3xl" />
      <div className="absolute -right-20 bottom-24 -z-10 h-96 w-96 rounded-full bg-[#0F8B8D]/18 blur-3xl" />

      {!reduce ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          aria-hidden
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/90"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 85}%`,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduce ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/90 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-brand-teal/10">
                <Image
                  src="/ngo-logo.png"
                  alt=""
                  width={200}
                  height={220}
                  priority
                  fetchPriority="high"
                  className="h-24 w-auto max-h-28 max-w-[min(72vw,200px)] object-contain sm:h-28"
                />
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-teal/12 bg-white px-3 py-1.5 text-xs font-semibold text-brand-text shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md sm:text-sm">
                <HeartHandshake className="size-4 text-brand-teal" aria-hidden />
                {SITE.tagline}
              </p>
            </motion.div>

            <motion.h1
              className="font-heading mt-6 max-w-4xl text-[clamp(2.5rem,6.5vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-brand-text"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduce ? 0 : 0.62,
                delay: reduce ? 0 : 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {SITE.name}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#4b5563] sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduce ? 0 : 0.58,
                delay: reduce ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Connect through kindness — donate food, books, and clothes. We
              pick up directly from your doorstep.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <a
                href={`tel:+91${SITE.phoneDisplay}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-brand-teal/15 bg-white px-4 py-2.5 text-[15px] font-bold text-brand-text shadow-[0_6px_20px_rgba(0,0,0,0.07)] backdrop-blur-md"
              >
                <Phone className="size-4 text-brand-teal" aria-hidden />
                +91 {SITE.phoneDisplay}
              </a>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button
                type="button"
                variant="cta"
                size="lg"
                onClick={() => openDonation()}
                className="h-12 w-full rounded-full px-8 text-base sm:w-auto sm:min-w-[11rem]"
              >
                Donate Now
              </Button>
              <a
                href={buildQuickWhatsAppUrl(
                  `Hello ${SITE.name}, I’d love to volunteer and support your programs.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ctaOutline", size: "lg" }),
                  "h-12 w-full rounded-full border-2 px-8 text-base font-semibold sm:w-auto",
                )}
              >
                Become a Volunteer
              </a>
            </motion.div>

            <motion.ul
              className="mt-7 flex flex-wrap gap-2"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduce ? 0 : 0.55,
                delay: reduce ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {[
                { icon: Truck, t: "Doorstep Pickup" },
                { icon: ShieldCheck, t: "Verified NGO" },
                { icon: Users2, t: "Community Driven" },
              ].map((b) => (
                <li
                  key={b.t}
                  className="inline-flex items-center gap-2 rounded-full border border-white/95 bg-white px-3.5 py-2 text-xs font-semibold text-brand-text shadow-[0_8px_28px_-16px_rgba(31,41,55,0.12)] sm:text-sm"
                >
                  <b.icon
                    className={cn(
                      "size-4 shrink-0",
                      b.t.includes("Doorstep") && "text-brand-saffron",
                      b.t.includes("Verified") && "text-brand-teal",
                      b.t.includes("Community") && "text-accent-warm",
                    )}
                    aria-hidden
                  />
                  {b.t}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="relative hidden lg:block"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: reduce ? 0 : 0.65,
              delay: reduce ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/95 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08),0_24px_56px_-32px_rgba(0,0,0,0.1)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DDF3E3]/90 via-white to-[#FFF5ED]" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FF8A1E]/6 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#0F8B8D]/10 blur-2xl" />
              <div className="relative space-y-4">
                <p className="text-sm font-bold text-brand-text">
                  When kindness shows up, change follows.
                </p>
                <p className="text-sm leading-relaxed text-brand-text-muted">
                  Your donation becomes meals, learning, and dignity — handled
                  with care from pickup to community delivery.
                </p>
                <div className="grid gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-black/[0.04] backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-brand-text-muted">Pickup window</span>
                    <span className="font-bold text-brand-text">
                      We message you
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-brand-text-muted">WhatsApp</span>
                    <span className="font-bold text-brand-text">
                      {SITE.phoneDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.6 }}
          aria-hidden
        >
          <motion.span
            className="inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-text-muted"
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{
              duration: 2.4,
              repeat: reduce ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll
            <ArrowDown className="size-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
