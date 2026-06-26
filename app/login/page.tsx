"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = await signIn(email, password);
    if (result.error) return setError(result.error);
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next || "/dashboard");
  }

  useEffect(() => {
    if (loading || !user) return;
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next || "/dashboard");
  }, [loading, router, user]);

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-offWhite via-white to-brand-light/40 px-5 py-10">
      <Card className="w-full max-w-md p-6">
        <BrandLogo imageClassName="h-14" />
        <h1 className="mt-6 font-serif text-4xl font-bold">Organizer login</h1>
        <p className="mt-2 text-sm text-muted">Sign in to create and manage your events.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm font-semibold"><span>Email</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Password</span><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {error && <p className="rounded-xl bg-primary-soft p-3 text-sm font-semibold text-primary">{error}</p>}
          <Button className="w-full" type="submit">Login</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">No account? <Link href="/register" className="font-semibold text-primary">Create one</Link></p>
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">Accounts are secured by Supabase Auth.</p>
      </Card>
    </main>
  );
}
