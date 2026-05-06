import { cn } from "@/lib/utils";

type AdSlotProps = {
  variant?: "hero-below" | "inline" | "sidebar" | "sticky-mobile";
  className?: string;
};

/**
 * Premium placeholder zones for Google AdSense / sponsorships.
 * Replace inner content with your ad script when ready.
 */
export function AdSlot({ variant = "inline", className }: AdSlotProps) {
  const label = "Sponsored";

  return (
    <aside
      aria-label={`Advertisement: ${label}`}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-[0_12px_40px_-28px_rgba(15,139,141,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]",
        variant === "hero-below" && "min-h-[90px] sm:min-h-[100px]",
        variant === "inline" && "min-h-[100px] sm:min-h-[120px]",
        variant === "sidebar" && "min-h-[240px]",
        variant === "sticky-mobile" &&
          "fixed inset-x-0 bottom-0 z-40 rounded-none rounded-t-2xl border-x-0 border-b-0 border-t border-t-brand-teal/10 min-h-[64px] bg-[#FFFCFA] shadow-[0_-12px_40px_-16px_rgba(15,139,141,0.08)] lg:hidden",
        className,
      )}
      style={{
        paddingBottom:
          variant === "sticky-mobile"
            ? "max(env(safe-area-inset-bottom), 10px)"
            : undefined,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_-10%,rgba(255,138,30,0.04),transparent_55%),radial-gradient(600px_circle_at_95%_20%,rgba(15,139,141,0.06),transparent_50%)]" />
      <div className="relative flex h-full items-center justify-center px-4 py-4">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-brand-teal/70">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-[#4b5563]">
            Your AdSense slot — clean placement, premium frame.
          </p>
          <p className="mt-1 text-xs text-brand-text-muted">
            728×90 / responsive · Premium placement
          </p>
        </div>
      </div>
    </aside>
  );
}
