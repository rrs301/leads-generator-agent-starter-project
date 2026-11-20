import { cn } from "@/lib/utils";

/** Page title row with optional actions on the right. */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  );
}

/** Bordered section with a title and an empty body. */
export function Section({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-xl border bg-card", className)}>
      {title && <h2 className="border-b px-4 py-3 text-sm font-medium">{title}</h2>}
      {children}
    </section>
  );
}

/** Muted "nothing here yet" message used inside sections. */
export function EmptyState({ message, className }: { message: string; className?: string }) {
  return (
    <div className={cn("grid min-h-40 place-items-center p-6 text-sm text-muted-foreground", className)}>
      {message}
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl space-y-6 p-6 lg:p-8">{children}</div>;
}
