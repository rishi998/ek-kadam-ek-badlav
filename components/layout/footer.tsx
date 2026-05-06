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
    <footer className="border-t border-brand-teal/10 bg-gradient-to-b from-brand-section/50 to-background pb-28 pt-14 sm:pb-16 lg:pb-14">
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
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-brand-text-muted">
              {SITE.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={buildQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(34,197,94,0.55)] hover:brightness-105",
                )}
              >
                <MessageCircle className="size-4" aria-hidden />
                Chat on WhatsApp
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-brand-teal/25 bg-white px-4 py-2 text-sm font-semibold text-brand-text shadow-[0_8px_28px_-18px_rgba(15,139,141,0.2)] backdrop-blur-md hover:bg-brand-mint/30"
              >
                <AtSign className="size-4" aria-hidden />
                Instagram
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div>
              <p className="text-sm font-semibold text-brand-text">Quick links</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {quick.map((q) => (
                  <li key={q.href}>
                    <Link
                      href={q.href}
                      className="text-brand-text-muted hover:text-brand-text"
                    >
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-text">Contact</p>
              <ul className="mt-3 space-y-2 text-[15px] text-brand-text-muted">
                <li className="flex items-center gap-2">
                  <Phone className="size-4 text-brand-teal" aria-hidden />
                  <a href={`tel:+91${SITE.phoneDisplay}`} className="hover:text-brand-text">
                    +91 {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 hover:text-brand-text"
                    href={buildQuickWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 text-[#25D366]" aria-hidden />
                    WhatsApp pickup desk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/[0.06] pt-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Built for trust, accessibility, and kinder communities.
          </p>
        </div>
      </div>
    </footer>
  );
}
