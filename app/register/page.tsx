"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerDemoUser } from "@/lib/demo-auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (password.length < 6) return setError("Use at least 6 characters for the demo password.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    registerDemoUser({ name, email, password });
    router.replace("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <Card className="w-full max-w-md p-6">
        <Link href="/" className="font-serif text-4xl font-bold text-primary">Jashnly♥</Link>
        <h1 className="mt-6 font-serif text-4xl font-bold">Create organizer account</h1>
        <p className="mt-2 text-sm text-muted">Create and manage celebration pages from one place.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm font-semibold"><span>Name</span><Input value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Email</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Password</span><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Confirm password</span><Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></label>
          {error && <p className="rounded-xl bg-primary-soft p-3 text-sm font-semibold text-primary">{error}</p>}
          <Button className="w-full" type="submit">Create account</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">Already registered? <Link href="/login" className="font-semibold text-primary">Login</Link></p>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">Demo login only. Your account is stored in this browser.</p>
      </Card>
    </main>
  );
}
