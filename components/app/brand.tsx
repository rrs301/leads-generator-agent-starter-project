import { Camera, Globe, Radar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Platform } from "@/lib/mock-data";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground glow-primary">
        <Radar className="size-4.5" />
      </div>
      <span className="text-lg font-semibold tracking-tight">Scout</span>
    </div>
  );
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const platformMeta: Record<Platform, { label: string; className: string }> = {
  x: { label: "X", className: "bg-white text-black" },
  linkedin: { label: "LinkedIn", className: "bg-[#0a66c2] text-white" },
  instagram: { label: "Instagram", className: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white" },
  reddit: { label: "Reddit", className: "bg-[#ff4500] text-white" },
  web: { label: "Web", className: "bg-secondary text-foreground" },
};

export function PlatformIcon({ platform, size = "sm" }: { platform: Platform; size?: "sm" | "lg" }) {
  const meta = platformMeta[platform];
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-md font-bold",
        size === "sm" ? "size-6 text-[10px]" : "size-11 rounded-xl text-sm",
        meta.className
      )}
    >
      {platform === "x" && <XIcon />}
      {platform === "linkedin" && "in"}
      {platform === "instagram" && <Camera className="size-3.5" />}
      {platform === "reddit" && "r/"}
      {platform === "web" && <Globe className="size-3.5" />}
    </span>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-4">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 85
      ? "bg-primary/15 text-primary ring-primary/30"
      : score >= 70
        ? "bg-amber-400/10 text-amber-300 ring-amber-400/25"
        : "bg-sky-400/10 text-sky-300 ring-sky-400/25";
  const label = score >= 85 ? "Hot" : score >= 70 ? "Warm" : "Cool";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1", tone)}>
      <span className="size-1.5 rounded-full bg-current" />
      {label} · {score}
    </span>
  );
}
