import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, PageShell, Section } from "@/components/app/page-placeholder";

const platforms = ["X", "LinkedIn", "Instagram", "Reddit"];

export default function ConnectPage() {
  return (
    <PageShell>
      <PageHeader title="Connect socials" description="Sign in to the platforms your agent should search." />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {platforms.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-xl border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-muted" />
                <p className="font-medium">{name}</p>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          ))}
        </div>
        <Section title="Browser session">
          <EmptyState message="Select a platform to connect." className="min-h-[420px]" />
        </Section>
      </div>
    </PageShell>
  );
}
