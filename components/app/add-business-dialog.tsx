"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Globe, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { analyzeBusiness, analyzeSteps, type BusinessDetails, type BusinessInput } from "@/lib/analyze-business";
import { cn } from "@/lib/utils";

type Step = "form" | "scanning" | "review";

const STEP_MS = 900;

export function AddBusinessDialog({ onAdd }: { onAdd?: (business: BusinessDetails) => void }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [input, setInput] = useState<BusinessInput | null>(null);
  const [details, setDetails] = useState<BusinessDetails | null>(null);

  const reset = () => {
    setStep("form");
    setInput(null);
    setDetails(null);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setInput({
      name: String(data.get("name") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      description: String(data.get("description") ?? "").trim(),
    });
    setStep("scanning");
  };

  const handleScanDone = useCallback((result: BusinessDetails) => {
    setDetails(result);
    setStep("review");
  }, []);

  const handleConfirm = () => {
    if (details) onAdd?.(details);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button className="gap-2" />}>
        <Plus /> Add business
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {step === "form" && <BusinessForm initial={input} onSubmit={handleSubmit} />}
        {step === "scanning" && input && <ScanningStep input={input} onDone={handleScanDone} />}
        {step === "review" && details && (
          <ReviewStep details={details} onBack={() => setStep("form")} onConfirm={handleConfirm} />
        )}
      </DialogContent>
    </Dialog>
  );
}

/* Step 1 — basic info */
function BusinessForm({
  initial,
  onSubmit,
}: {
  initial: BusinessInput | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Add business</DialogTitle>
        <DialogDescription>Tell the agent what you sell so it can find the right leads.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-2">
        <Label htmlFor="business-name">Business name</Label>
        <Input id="business-name" name="name" placeholder="Acme Inc." defaultValue={initial?.name} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="business-website">Website</Label>
        <Input
          id="business-website"
          name="website"
          type="url"
          placeholder="https://acme.com"
          defaultValue={initial?.website}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="business-description">Description (optional)</Label>
        <Textarea
          id="business-description"
          name="description"
          placeholder="What you sell and who your customers are"
          defaultValue={initial?.description}
          rows={3}
        />
      </div>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
        <Button type="submit">Analyze website</Button>
      </DialogFooter>
    </form>
  );
}

/* Step 2 — crawling / checking progress */
function ScanningStep({ input, onDone }: { input: BusinessInput; onDone: (d: BusinessDetails) => void }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < analyzeSteps.length) {
      const t = setTimeout(() => setCurrent((c) => c + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    let cancelled = false;
    analyzeBusiness(input).then((d) => !cancelled && onDone(d));
    return () => {
      cancelled = true;
    };
  }, [current, input, onDone]);

  const percent = Math.round((current / analyzeSteps.length) * 100);

  return (
    <div className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Analyzing your business</DialogTitle>
        <DialogDescription className="flex items-center gap-1.5 truncate">
          <Globe className="size-3.5 shrink-0" /> {input.website}
        </DialogDescription>
      </DialogHeader>

      <Progress value={percent} />

      <ul className="grid gap-2.5">
        {analyzeSteps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2.5 text-sm",
                i > current && "text-muted-foreground/60"
              )}
            >
              <span className="grid size-4 place-items-center">
                {done ? (
                  <Check className="size-4 text-primary" />
                ) : active ? (
                  <Spinner />
                ) : (
                  <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                )}
              </span>
              {label}
            </li>
          );
        })}
      </ul>

      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
      </DialogFooter>
    </div>
  );
}

/* Step 3 — review details and confirm */
function ReviewStep({
  details,
  onBack,
  onConfirm,
}: {
  details: BusinessDetails;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="grid gap-4">
      <DialogHeader>
        <DialogTitle>{details.name}</DialogTitle>
        <DialogDescription className="flex items-center gap-1.5 truncate">
          <Globe className="size-3.5 shrink-0" /> {details.website}
        </DialogDescription>
      </DialogHeader>

      <DetailRow label="Summary">
        <p className="text-sm">{details.summary}</p>
      </DetailRow>
      <DetailRow label="Target audience">
        <Tags items={details.audience} />
      </DetailRow>
      <DetailRow label="Keywords">
        <Tags items={details.keywords} />
      </DetailRow>
      <DetailRow label="Competitors">
        <Tags items={details.competitors} />
      </DetailRow>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onConfirm} className="gap-2">
          <Plus /> Add business
        </Button>
      </DialogFooter>
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Badge key={t} variant="secondary">
          {t}
        </Badge>
      ))}
    </div>
  );
}
