export const SITE = {
  name: "EK KADAM EK BADLAV",
  tagline: "Connect through kindness.",
  description:
    "Helping underprivileged communities through food relief, book donations, and clothing donations—with doorstep pickup across our service areas.",
  phoneDisplay: "9910789276",
  /** WhatsApp / wa.me uses country code without + */
  whatsappE164: "919910789276",
  /** Replace with your Instagram handle when ready */
  instagramUrl: "https://www.instagram.com/",
} as const;

export type DonationInitiativeId = "food" | "books" | "clothes" | "general";

export const INITIATIVES: Record<
  DonationInitiativeId,
  { label: string; short: string }
> = {
  food: { label: "Zero Hunger Fund", short: "Food donation" },
  books: { label: "Share the Shelf", short: "Book donation" },
  clothes: { label: "Warm Hearts Collective", short: "Clothing donation" },
  general: { label: "General support", short: "General" },
};
