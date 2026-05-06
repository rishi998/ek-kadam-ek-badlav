import Image from "next/image";
import Link from "next/link";
import { AtSign, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const quick = [
  { href: "#home", label: "Home" },
  { href: "#initiatives", label: "Initiatives" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#impact", label: "Impact" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pb-28 pt-14 text-neutral-100 sm:pb-16 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/ngo-logo.png"
                alt={`${SITE.name} logo`}
                width={240}
                height={264}
                className="h-16 w-auto max-h-20 max-w-[min(88vw,260px)] object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-300">
              {SITE.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={buildQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80]",
                )}
              >
                <MessageCircle className="size-4" aria-hidden />
                Chat on WhatsApp
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:border-white/40 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <AtSign className="size-4" aria-hidden />
                Instagram
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div>
              <p className="text-sm font-semibold text-white">Quick links</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {quick.map((q) => (
                  <li key={q.href}>
                    <Link
                      href={q.href}
                      className="text-neutral-300 underline-offset-4 transition-colors hover:text-white focus-visible:rounded focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                    >
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Contact</p>
              <ul className="mt-3 space-y-2 text-[15px] text-neutral-300">
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-[#5EEAD4]" aria-hidden />
                  <a
                    href={`tel:+91${SITE.phoneDisplay}`}
                    className="text-neutral-200 underline-offset-4 transition-colors hover:text-white focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                  >
                    +91 {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-neutral-200 underline-offset-4 transition-colors hover:text-white focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                    href={buildQuickWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 shrink-0 text-[#4ADE80]" aria-hidden />
                    WhatsApp pickup desk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-neutral-300">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Built for trust, accessibility, and kinder communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
