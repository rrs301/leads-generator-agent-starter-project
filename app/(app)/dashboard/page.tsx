import { AddBusinessDialog } from "@/components/app/add-business-dialog";
import { EmptyState, PageHeader, PageShell, Section } from "@/components/app/page-placeholder";
import { LeadsTableEmpty } from "@/components/app/leads-table-empty";

const stats = ["Leads found", "Hot leads", "Emails found", "Replies"];

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHeader title="Dashboard" description="Overview of what your agent has found.">
        <AddBusinessDialog />
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((label) => (
          <div key={label} className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-muted-foreground">—</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Leads this week" className="lg:col-span-2">
          <EmptyState message="No activity yet." className="min-h-56" />
        </Section>
        <Section title="Lead sources">
          <EmptyState message="No sources yet." className="min-h-56" />
        </Section>
      </div>

      <Section title="Recent leads">
        <LeadsTableEmpty />
      </Section>
    </PageShell>
  );
}
