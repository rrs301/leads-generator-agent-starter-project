import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const columns = ["Lead", "Why picked", "Fit", "Status", "Email"];

export function LeadsTableEmpty() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead key={c} className="px-4 text-xs text-muted-foreground">
              {c}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columns.length} className="h-40 text-center text-muted-foreground">
            No leads yet.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
