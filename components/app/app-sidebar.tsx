"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Plug, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/app/brand";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/connect", label: "Connect socials", icon: Plug },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r bg-sidebar p-4 md:flex">
      <Logo className="px-2 pb-6" />
      <nav className="flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              pathname === href && "bg-sidebar-accent text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
      <Link
        href="/sign-in"
        className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <LogOut className="size-4" /> Sign out
      </Link>
    </aside>
  );
}
