"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  Users2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDonation } from "@/components/donation/donation-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site-config";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#initiatives", label: "Initiatives" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#impact", label: "Impact" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDonation } = useDonation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const waPickup = buildQuickWhatsAppUrl(
    `Hello ${SITE.name}, I’d like to arrange a free doorstep pickup.`,
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex flex-col items-stretch gap-2 px-4 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-6 lg:px-8">
        {/* —— Utility strip —— */}
        <div className="pointer-events-auto mx-auto flex h-9 w-full max-w-7xl items-center justify-between rounded-full border border-brand-teal/15 bg-white/80 px-3 shadow-[0_8px_28px_-16px_rgba(15,139,141,0.2)] backdrop-blur-2xl sm:h-10 sm:px-4">
          <a
            href={waPickup}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-1.5 text-[11px] font-semibold text-brand-text sm:gap-2 sm:text-xs"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#25D366]/14 text-[#0F8B8D] sm:size-8">
              <MessageCircle className="size-3.5 sm:size-4" aria-hidden />
            </span>
            <span className="hidden truncate sm:inline">
              Free pickup available
            </span>
            <span className="sm:hidden" aria-hidden>
              Pickup
            </span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:+91${SITE.phoneDisplay}`}
              className="flex items-center gap-1 rounded-full bg-white/60 px-2 py-1 text-[11px] font-bold text-brand-text ring-1 ring-black/[0.04] sm:gap-1.5 sm:px-2.5 sm:text-xs"
            >
              <Phone className="size-3.5 shrink-0 text-brand-teal sm:size-4" />
              <span className="tabular-nums">{SITE.phoneDisplay}</span>
            </a>
            <span className="hidden items-center gap-1 rounded-full bg-white/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-text-muted ring-1 ring-black/[0.05] sm:flex sm:text-[11px]">
              <BadgeCheck className="size-3.5 text-brand-teal" aria-hidden />
              Verified NGO
            </span>
          </div>
        </div>

        {/* —— Main floating nav — anchored left with page grid —— */}
        <div className="pointer-events-auto mx-auto w-full max-w-7xl">
          <div
            className={cn(
              "nav-glass-shell flex w-full items-center gap-1.5 rounded-full border-2 px-1.5 py-1.5 backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow,transform] duration-300 sm:gap-3 sm:px-3 sm:py-2",
              scrolled && "nav-glass-shell-scrolled",
            )}
          >
            <Link
              href="#home"
              className={cn(
                "group/brand flex min-w-0 shrink-0 items-center gap-3 py-0.5 pl-1 pr-1 sm:pl-1.5",
                "rounded-md outline-none transition-transform duration-300 ease-out",
                "hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100",
                "focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron",
              )}
            >
              <Image
                src="/ngo-logo.png"
                alt=""
                width={104}
                height={114}
                priority
                fetchPriority="high"
                className="h-8 w-auto shrink-0 object-contain sm:h-10 md:h-11 md:max-h-[52px] lg:h-[52px]"
              />
              <span className="font-heading min-w-0 leading-[1.12]">
                <span className="block text-[10px] font-semibold tracking-[-0.04em] text-brand-text sm:text-[11px] md:text-xs md:tracking-[-0.03em]">
                  EK KADAM EK
                </span>
                <span className="mt-px block text-[10px] font-bold tracking-[0.06em] text-brand-saffron sm:text-[11px] md:text-xs md:tracking-[0.08em]">
                  BADLAV
                </span>
              </span>
            </Link>

            <nav
              className="ml-auto hidden items-center gap-0.5 lg:ml-0 lg:flex lg:flex-1 lg:justify-center"
              aria-label="Primary"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-full px-3 py-2 text-[13px] font-semibold text-brand-text-muted transition-colors duration-200 hover:text-brand-text"
                >
                  {item.label}
                  <span className="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-teal via-brand-teal-secondary to-brand-saffron transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
              <a
                href={`tel:+91${SITE.phoneDisplay}`}
                className={cn(
                  buttonVariants({ variant: "ctaOutline", size: "sm" }),
                  "hidden h-9 rounded-full px-3 text-[12px] xl:inline-flex",
                )}
              >
                <span className="mr-1" aria-hidden>
                  📞
                </span>
                Pickup support
              </a>
              <Button
                type="button"
                variant="cta"
                onClick={() => openDonation()}
                className="h-9 rounded-full px-4 text-[13px] sm:h-10 sm:px-5 sm:text-sm"
              >
                Donate Now
              </Button>
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full border border-black/[0.06] bg-white/70 text-brand-text shadow-sm lg:hidden"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-sheet"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-5" aria-hidden />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* —— Mobile bottom sheet —— */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[199] bg-neutral-950/35 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-nav-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="fixed inset-x-0 bottom-0 z-[200] max-h-[88dvh] overflow-hidden rounded-t-[1.75rem] border border-white/70 bg-[#FFFDF9]/96 shadow-[0_-24px_80px_-20px_rgba(15,139,141,0.12)] backdrop-blur-2xl lg:hidden"
              initial={
                reduce ? { y: 0 } : { y: "100%" }
              }
              animate={{ y: 0 }}
              exit={reduce ? { y: "100%" } : { y: "100%" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 420, damping: 34 }
              }
              style={{
                paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
              }}
            >
              <div className="flex justify-center pt-3 pb-2">
                <span className="h-1 w-10 rounded-full bg-black/10" />
              </div>
              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 pb-4">
                <p className="font-heading text-lg font-bold text-brand-text">
                  Menu
                </p>
                <button
                  type="button"
                  className="rounded-full p-2 text-brand-text-muted hover:bg-black/[0.05]"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-5" aria-hidden />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <nav className="max-h-[min(52vh,420px)] space-y-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.05 + i * 0.04,
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-2xl px-4 py-3.5 text-[16px] font-semibold text-brand-text hover:bg-white/70 active:bg-white/90"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-2 flex flex-wrap gap-2 px-2">
                  {[
                    { icon: Truck, t: "Doorstep Pickup" },
                    { icon: ShieldCheck, t: "Verified NGO" },
                    { icon: Users2, t: "Community Driven" },
                  ].map((b) => (
                    <span
                      key={b.t}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-text shadow-[0_6px_20px_-12px_rgba(15,139,141,0.35)] ring-1 ring-brand-teal/10"
                    >
                      <b.icon
                        className={cn(
                          "size-3.5",
                          b.t.includes("Doorstep") && "text-brand-saffron",
                          b.t.includes("Verified") && "text-brand-teal",
                          b.t.includes("Community") && "text-accent-warm",
                        )}
                        aria-hidden
                      />
                      {b.t}
                    </span>
                  ))}
                </div>
              </nav>
              <div className="space-y-2 border-t border-black/[0.06] bg-white/50 px-4 py-4 backdrop-blur-md">
                <Button
                  type="button"
                  variant="cta"
                  className="h-12 w-full rounded-2xl text-[15px]"
                  onClick={() => {
                    setMobileOpen(false);
                    openDonation();
                  }}
                >
                  Donate Now
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={waPickup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ctaOutline", size: "lg" }),
                      "inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 text-[13px]",
                    )}
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-11 rounded-xl border-brand-teal/25 bg-white text-[13px] font-semibold shadow-[0_6px_20px_-14px_rgba(15,139,141,0.25)]",
                    )}
                    onClick={() => {
                      setMobileOpen(false);
                      openDonation();
                    }}
                  >
                    Pickup form
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
