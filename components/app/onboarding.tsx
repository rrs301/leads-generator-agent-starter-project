"use client";

import { useEffect, useState } from "react";
import { AppWindow, ArrowRight, Check, FileText, Globe, Loader2, Sparkles, Target, Users, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { businessBrain, scanSteps } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "web", label: "Website", icon: Globe, placeholder: "https://yourcompany.com" },
  { id: "app", label: "App store", icon: AppWindow, placeholder: "https://apps.apple.com/app/…" },
  { id: "info", label: "Describe it", icon: FileText, placeholder: "" },
] as const;

/* Step 1 — ask for the business */
export function AddBusinessCard({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("web");
  const [value, setValue] = useState("");
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <div className="w-full max-w-lg animate-rise rounded-2xl border bg-card/95 p-6 shadow-2xl backdrop-blur-xl glow-primary sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-primary">Scout · your lead agent</p>
          <h2 className="text-xl font-semibold tracking-tight">Tell me about your business</h2>
        </div>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Drop your website or app link. I&apos;ll read it, understand what you sell and who buys it — then start hunting leads.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-1 rounded-lg bg-secondary p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium text-muted-foreground transition-all",
              tab === id && "bg-background text-foreground shadow-sm"
            )}
          >
            <Icon className="size-3.5" /> {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value || businessBrain.url);
        }}
        className="space-y-3"
      >
        {tab === "info" ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            placeholder="e.g. We build analytics software for SaaS startups. Our customers are founders and growth teams…"
            className="w-full resize-none rounded-lg border border-input bg-input/30 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
          />
        ) : (
          <div className="relative">
            <active.icon className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={active.placeholder} className="h-12 pl-10 text-sm" />
          </div>
        )}
        <Button type="submit" size="lg" className="h-12 w-full gap-2 text-sm font-semibold">
          Let Scout learn my business <ArrowRight />
        </Button>
      </form>
    </div>
  );
}

/* Step 2 — scanning animation */
export function ScanningCard({ url, onDone }: { url: string; onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > scanSteps.length) return;
    const t = setTimeout(() => (step === scanSteps.length ? onDone() : setStep(step + 1)), step === scanSteps.length ? 600 : 1100);
    return () => clearTimeout(t);
  }, [step, onDone]);

  const progress = Math.round((step / scanSteps.length) * 100);

  return (
    <div className="w-full max-w-lg animate-rise rounded-2xl border bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-6 flex items-center gap-5">
        {/* Radar */}
        <div className="relative size-20 shrink-0 rounded-full border border-primary/30 bg-primary/5">
          <div className="absolute inset-3 rounded-full border border-primary/20" />
          <div className="absolute inset-6 rounded-full border border-primary/20" />
          <div className="absolute inset-0 animate-radar rounded-full bg-[conic-gradient(from_0deg,transparent_70%,var(--primary))] opacity-60" />
          <div className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-primary" />
          <div className="absolute top-4 right-5 size-1.5 animate-pulse rounded-full bg-primary" />
          <div className="absolute bottom-5 left-4 size-1.5 animate-pulse rounded-full bg-primary [animation-delay:500ms]" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-primary">Agent at work</p>
          <h2 className="text-xl font-semibold tracking-tight">Scanning your business</h2>
          <p className="truncate font-mono text-xs text-muted-foreground">{url}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {scanSteps.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <div key={s} className={cn("flex items-center gap-3 text-sm transition-opacity", i > step && "opacity-35")}>
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full border",
                  done && "border-primary bg-primary text-primary-foreground",
                  current && "border-primary text-primary"
                )}
              >
                {done ? <Check className="size-3" /> : current ? <Loader2 className="size-3 animate-spin" /> : null}
              </span>
              <span className={cn(current && "font-medium")}>{s}</span>
              {done && <span className="ml-auto text-xs text-muted-foreground">done</span>}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
          <span>Understanding…</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

/* Step 3 — what the agent learned */
export function BusinessBrainCard({ url, onLaunch }: { url: string; onLaunch: () => void }) {
  const rows = [
    { icon: Users, label: "Who buys", items: businessBrain.audience },
    { icon: Target, label: "Buying signals", items: businessBrain.keywords },
    { icon: Swords, label: "Competitors", items: businessBrain.competitors },
  ];
  return (
    <div className="w-full max-w-lg animate-rise rounded-2xl border bg-card/95 p-6 shadow-2xl backdrop-blur-xl glow-primary sm:p-8">
      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-primary">
        <Check className="size-3.5" /> Business understood
      </div>
      <h2 className="text-xl font-semibold tracking-tight">{businessBrain.name}</h2>
      <p className="font-mono text-xs text-muted-foreground">{url}</p>
      <p className="mt-3 rounded-lg border bg-background/60 p-3 text-sm">“{businessBrain.pitch}”</p>

      <div className="mt-5 space-y-4">
        {rows.map(({ icon: Icon, label, items }, i) => (
          <div key={label} className="animate-rise" style={{ animationDelay: `${i * 120}ms` }}>
            <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="size-3.5" /> {label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((t) => (
                <span key={t} className="rounded-full border bg-secondary/60 px-2.5 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button size="lg" onClick={onLaunch} className="mt-6 h-12 w-full gap-2 text-sm font-semibold">
        Build my lead dashboard <ArrowRight />
      </Button>
    </div>
  );
}
