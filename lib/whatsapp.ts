import { SITE } from "@/lib/site-config";

export type DonationFormPayload = {
  name: string;
  phone: string;
  initiative: string;
  items: string;
  address: string;
  pickupDate: string;
  notes: string;
};

export function buildDonationWhatsAppUrl(data: DonationFormPayload): string {
  const text = `Hello ${SITE.name},

I want to donate.

Name: ${data.name}
Phone: ${data.phone}
Initiative: ${data.initiative}
Items: ${data.items}
Address: ${data.address}
Pickup Date: ${data.pickupDate}
Notes: ${data.notes || "—"}

Please contact me for pickup.`;

  return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(text)}`;
}

export function buildQuickWhatsAppUrl(message?: string): string {
  const text =
    message ??
    `Hello ${SITE.name}, I'd like to learn more about donating food, books, or clothes and scheduling a pickup.`;
  return `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(text)}`;
}
