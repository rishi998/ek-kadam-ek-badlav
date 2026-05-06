"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/site-config";
import { buildQuickWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={buildQuickWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${SITE.name} at ${SITE.phoneDisplay}`}
      className="fixed bottom-[calc(9.25rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-[90] grid size-14 place-items-center rounded-full bg-[#22C55E] text-white ring-[3px] ring-white/90 animate-whatsapp-pulse sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:right-[calc(1.25rem+env(safe-area-inset-right))] lg:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
      initial={reduce ? false : { scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <MessageCircle className="size-7" aria-hidden />
    </motion.a>
  );
}
