"use client";

import { useState } from "react";
import { ArrowUpRight, Pause, Play, Radar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessBrain, sources, stats, weekly } from "@/lib/mock-data";
import { LeadsTable } from "@/components/app/leads-table";
import { PlatformIcon } from "@/components/app/brand";

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - (v / max) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 32" className="h-8 w-24" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function DashboardView({ business = businessBrain.url }: { business?: string }) {
  const [running, setRunning] = useState(false);
  const max = Math.max(...weekly.map((w) => w.value));

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400" /> {business} · analyzed
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Lead command center</h1>
          <p className="text-sm text-muted-foreground">Scout knows your business. Here&apos;s what it found this week.</p>
        </div>
        <Button size="lg" onClick={() => setRunning((r) => !r)} className={running ? "h-11 gap-2 px-4" : "h-11 gap-2 px-4 glow-primary"} variant={running ? "outline" : "default"}>
          {running ? (
            <>
              <Pause /> Pause agent
            </>
          ) : (
            <>
              <Play /> Start generating leads
            </>
          )}
        </Button>
      </div>

      {running && (
        <div className="flex animate-rise items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          <span className="relative grid size-7 place-items-center">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-primary/40" />
            <Radar className="relative size-4 text-primary" />
          </span>
          <span>
            <span className="font-medium text-primary">Scout is hunting…</span>{" "}
            <span className="text-muted-foreground">searching X, LinkedIn and Reddit for “{businessBrain.keywords[0]}” conversations</span>
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card/80 p-4 backdrop-blur">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <div>
                <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
                <p className="flex items-center gap-0.5 text-xs text-primary">
                  <ArrowUpRight className="size-3" /> {s.delta}
                </p>
              </div>
              <Sparkline data={s.spark} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card/80 p-5 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-medium">Leads this week</p>
              <p className="text-xs text-muted-foreground">1,056 new leads discovered</p>
            </div>
            <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="flex h-44 items-end gap-3">
            {weekly.map((w, i) => (
              <div key={w.day} className="group flex h-full flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">{w.value}</span>
                  <div
                    className={`w-full rounded-md transition-all group-hover:bg-primary ${i === 3 ? "bg-primary" : "bg-primary/25"}`}
                    style={{ height: `${(w.value / max) * 85}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card/80 p-5">
          <p className="font-medium">Lead sources</p>
          <p className="mb-5 text-xs text-muted-foreground">Where Scout finds them</p>
          <div className="space-y-4">
            {sources.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <PlatformIcon platform={s.platform} />
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{s.label}</span>
                    <span className="text-muted-foreground">{s.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary/80" style={{ width: `${s.value * 2.4}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads */}
      <div className="rounded-xl border bg-card/80">
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <p className="flex items-center gap-2 font-medium">
              <Sparkles className="size-4 text-primary" /> Fresh leads
            </p>
            <p className="text-xs text-muted-foreground">Ranked by how well they fit your business</p>
          </div>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <LeadsTable limit={5} />
      </div>
    </div>
  );
}
