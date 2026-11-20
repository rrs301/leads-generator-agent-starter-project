import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, PageShell, Section } from "@/components/app/page-placeholder";
import { LeadsTableEmpty } from "@/components/app/leads-table-empty";

export default function LeadsPage() {
  return (
    <PageShell>
      <PageHeader title="Leads" description="Every lead your agent found, scored by fit.">
        <Button variant="outline" className="gap-2">
          <Filter /> Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <Download /> Export
        </Button>
      </PageHeader>
      <Section>
        <LeadsTableEmpty />
      </Section>
    </PageShell>
  );
}
