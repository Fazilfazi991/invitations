"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginDemoUser } from "@/lib/demo-auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = loginDemoUser(email, password);
    if (!result.ok) return setError(result.message || "Unable to log in.");
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next || "/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <Card className="w-full max-w-md p-6">
        <Link href="/" className="font-serif text-4xl font-bold text-primary">Jashnly♥</Link>
        <h1 className="mt-6 font-serif text-4xl font-bold">Organizer login</h1>
        <p className="mt-2 text-sm text-muted">Sign in to create and manage your events.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm font-semibold"><span>Email</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Password</span><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {error && <p className="rounded-xl bg-primary-soft p-3 text-sm font-semibold text-primary">{error}</p>}
          <Button className="w-full" type="submit">Login</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">No account? <Link href="/register" className="font-semibold text-primary">Create one</Link></p>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">Demo login only. Backend authentication will be added later.</p>
      </Card>
    </main>
  );
}
