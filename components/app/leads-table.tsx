import { Mail, MoreHorizontal } from "lucide-react";
import { leads } from "@/lib/mock-data";
import { PlatformIcon, ScoreBadge } from "@/components/app/brand";
import { cn } from "@/lib/utils";

const statusTone = {
  New: "text-sky-300 bg-sky-400/10",
  Contacted: "text-amber-300 bg-amber-400/10",
  Replied: "text-primary bg-primary/10",
};

export function LeadsTable({ limit }: { limit?: number }) {
  const rows = limit ? leads.slice(0, limit) : leads;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="px-4 py-3 font-medium">Lead</th>
            <th className="px-4 py-3 font-medium">Why Scout picked them</th>
            <th className="px-4 py-3 font-medium">Fit</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="hidden px-4 py-3 font-medium 2xl:table-cell">Email</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id} className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={l.platform} />
                  <div>
                    <p className="font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.role} · {l.company}
                    </p>
                  </div>
                </div>
              </td>
              <td className="max-w-56 truncate px-4 py-3 text-muted-foreground">{l.signal}</td>
              <td className="px-4 py-3">
                <ScoreBadge score={l.score} />
              </td>
              <td className="px-4 py-3">
                <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", statusTone[l.status])}>{l.status}</span>
              </td>
              <td className="hidden px-4 py-3 2xl:table-cell">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Mail className="size-3.5" />
                  {l.email.replace(/^(.{2}).*(@.*)$/, "$1•••$2")}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="More">
                  <MoreHorizontal className="size-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
