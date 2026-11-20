"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/app/brand";

export function AuthScreen({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight">{isSignUp ? "Create an account" : "Sign in"}</h1>
        <form onSubmit={go} className="space-y-3">
          {isSignUp && <Input placeholder="Full name" />}
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" className="w-full">
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account? " : "No account? "}
          <Link href={isSignUp ? "/sign-in" : "/sign-up"} className="text-foreground underline underline-offset-4">
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
