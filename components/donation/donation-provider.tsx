"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DonationInitiativeId } from "@/lib/site-config";

export type DonationContextValue = {
  openDonation: (initiative?: DonationInitiativeId) => void;
  closeDonation: () => void;
  isOpen: boolean;
  presetInitiative: DonationInitiativeId | null;
  /** Bumps when a new donation session starts (resets dialog state via remount). */
  sessionId: number;
};

const DonationContext = createContext<DonationContextValue | null>(null);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [presetInitiative, setPreset] =
    useState<DonationInitiativeId | null>(null);

  const [sessionId, setSessionId] = useState(0);

  const openDonation = useCallback((initiative?: DonationInitiativeId) => {
    setPreset(initiative ?? null);
    setSessionId((s) => s + 1);
    setOpen(true);
  }, []);

  const closeDonation = useCallback(() => {
    setOpen(false);
    setPreset(null);
  }, []);

  const value = useMemo(
    () => ({
      openDonation,
      closeDonation,
      isOpen,
      presetInitiative,
      sessionId,
    }),
    [closeDonation, isOpen, openDonation, presetInitiative, sessionId],
  );

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) {
    throw new Error("useDonation must be used within DonationProvider");
  }
  return ctx;
}
