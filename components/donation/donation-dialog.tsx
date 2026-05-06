"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Heart,
  Loader2,
  MessageCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { useDonation } from "./donation-provider";
import {
  INITIATIVES,
  SITE,
  type DonationInitiativeId,
} from "@/lib/site-config";
import {
  buildDonationWhatsAppUrl,
  buildQuickWhatsAppUrl,
  type DonationFormPayload,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-[15px] text-brand-text shadow-inner shadow-black/[0.02] outline-none transition-[box-shadow,border-color] placeholder:text-neutral-400 focus:border-brand-teal/40 focus:ring-2 focus:ring-brand-teal/20";

const labelClass = "text-sm font-medium text-neutral-700";

export function DonationDialog() {
  const { sessionId } = useDonation();
  return <DonationDialogSession key={sessionId} />;
}

function DonationDialogSession() {
  const reduce = useReducedMotion();
  const { isOpen, closeDonation, presetInitiative } = useDonation();
  const formId = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [initiative, setInitiative] = useState<DonationInitiativeId>(
    () => presetInitiative ?? "general",
  );
  const [items, setItems] = useState("");
  const [address, setAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!name.trim()) return "Please enter your full name.";
    if (!phone.trim()) return "Please enter your phone number.";
    if (!items.trim()) return "Please describe the items you’re donating.";
    if (!address.trim()) return "Please enter your pickup address.";
    if (!pickupDate.trim()) return "Please choose a preferred pickup date.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setSubmitting(true);
    const payload: DonationFormPayload = {
      name: name.trim(),
      phone: phone.trim(),
      initiative: INITIATIVES[initiative].label,
      items: items.trim(),
      address: address.trim(),
      pickupDate: pickupDate.trim(),
      notes: notes.trim(),
    };
    const url = buildDonationWhatsAppUrl(payload);
    await new Promise((r) => setTimeout(r, reduce ? 0 : 420));
    setSubmitting(false);
    setSuccess(true);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      closeDonation();
    }, reduce ? 800 : 2200);
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) closeDonation();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-[100] bg-neutral-950/45 backdrop-blur-md transition-opacity",
            "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          )}
        />
        <Dialog.Popup
          className={cn(
            "fixed z-[101] flex max-h-[min(92dvh,calc(100dvh-2rem))] w-[min(100vw-1.5rem,32rem)] flex-col overflow-hidden rounded-[1.35rem] border border-white/40 bg-white/90 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.08)] outline-none backdrop-blur-xl",
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
            "max-sm:bottom-3 max-sm:top-auto max-sm:left-1/2 max-sm:max-h-[92dvh] max-sm:w-[calc(100vw-1.25rem)] max-sm:-translate-x-1/2 max-sm:translate-y-0 max-sm:rounded-t-[1.75rem] max-sm:rounded-b-[1.35rem]",
          )}
        >
          <div className="relative border-b border-black/[0.06] bg-gradient-to-br from-brand-saffron/12 via-white to-brand-teal/10 px-5 pb-4 pt-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/80 px-2 py-1.5 shadow-sm">
                  <Image
                    src="/ngo-logo.png"
                    alt=""
                    width={120}
                    height={132}
                    className="h-16 w-auto max-w-[4.25rem] object-contain sm:h-[4.5rem] sm:max-w-[5rem]"
                  />
                </div>
                <div>
                  <Dialog.Title className="font-heading text-lg font-semibold tracking-tight text-brand-text md:text-xl">
                    Schedule a pickup
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-neutral-600">
                    {SITE.name} — we’ll coordinate on WhatsApp.
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close
                className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-black/[0.05] hover:text-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron"
                aria-label="Close donation form"
              >
                <X className="size-5" aria-hidden />
              </Dialog.Close>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="done"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  className="flex flex-col items-center gap-3 py-10 text-center"
                >
                  <motion.div
                    initial={reduce ? false : { scale: 0.85 }}
                    animate={reduce ? undefined : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                  >
                    <CheckCircle2
                      className="size-14 text-brand-teal"
                      aria-hidden
                    />
                  </motion.div>
                  <p className="font-heading text-xl font-semibold text-brand-text">
                    You’re amazing — thank you.
                  </p>
                  <p className="max-w-xs text-sm text-neutral-600">
                    WhatsApp should open with your pickup details. If it
                    didn’t, tap “WhatsApp” below.
                  </p>
                  <a
                    href={buildQuickWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "cta", size: "lg" }),
                      "mt-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 text-[15px]",
                    )}
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    WhatsApp {SITE.phoneDisplay}
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  id={formId}
                  onSubmit={handleSubmit}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  className="space-y-3.5"
                >
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label className={labelClass} htmlFor={`${formId}-name`}>
                        Full name
                      </label>
                      <input
                        id={`${formId}-name`}
                        name="name"
                        autoComplete="name"
                        className={inputClass}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className={labelClass} htmlFor={`${formId}-phone`}>
                        Phone number
                      </label>
                      <input
                        id={`${formId}-phone`}
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        className={inputClass}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor={`${formId}-initiative`}
                    >
                      Initiative
                    </label>
                    <select
                      id={`${formId}-initiative`}
                      name="initiative"
                      className={cn(inputClass, "appearance-none bg-white")}
                      value={initiative}
                      onChange={(e) =>
                        setInitiative(e.target.value as DonationInitiativeId)
                      }
                    >
                      {(Object.keys(INITIATIVES) as DonationInitiativeId[]).map(
                        (id) => (
                          <option key={id} value={id}>
                            {INITIATIVES[id].label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor={`${formId}-items`}>
                      Donation items
                    </label>
                    <textarea
                      id={`${formId}-items`}
                      name="items"
                      rows={3}
                      className={cn(inputClass, "min-h-[88px] resize-y")}
                      value={items}
                      onChange={(e) => setItems(e.target.value)}
                      placeholder="e.g. 5kg rice, winter jackets, textbooks…"
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor={`${formId}-address`}>
                      Pickup address
                    </label>
                    <textarea
                      id={`${formId}-address`}
                      name="address"
                      rows={3}
                      className={cn(inputClass, "min-h-[88px] resize-y")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House no., street, landmark, city, PIN"
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor={`${formId}-date`}>
                      Preferred pickup date
                    </label>
                    <input
                      id={`${formId}-date`}
                      name="pickupDate"
                      type="date"
                      className={inputClass}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor={`${formId}-notes`}>
                      Additional notes{" "}
                      <span className="font-normal text-neutral-500">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id={`${formId}-notes`}
                      name="notes"
                      rows={2}
                      className={cn(inputClass, "min-h-[72px] resize-y")}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Gate codes, preferred time windows…"
                    />
                  </div>

                  {error ? (
                    <p
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                      role="alert"
                    >
                      {error}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:items-center">
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="cta"
                      className="h-11 w-full gap-2 rounded-xl text-[15px] sm:flex-1"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Heart className="size-4" aria-hidden />
                          Submit pickup request
                        </>
                      )}
                    </Button>
                    <a
                      href={buildQuickWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ctaOutline", size: "default" }),
                        "h-11 w-full rounded-xl sm:flex-1 sm:justify-center",
                      )}
                    >
                      <MessageCircle className="size-4" aria-hidden />
                      WhatsApp direct
                    </a>
                  </div>
                  <p className="text-center text-xs text-neutral-500">
                    By submitting, you agree to connect on WhatsApp for pickup
                    coordination.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
