"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (password.length < 6) return setError("Use at least 6 characters for the demo password.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    const result = await signUp({ name, email, password });
    if (result.error) return setError(result.error);
    if (result.confirmationRequired) {
      setConfirmation("Check your email to confirm the account, then return to login.");
      return;
    }
    router.replace("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-offWhite via-white to-brand-light/40 px-5 py-10">
      <Card className="w-full max-w-md p-6">
        <BrandLogo imageClassName="h-14" />
        <h1 className="mt-6 font-serif text-4xl font-bold">Create organizer account</h1>
        <p className="mt-2 text-sm text-muted">Create and manage celebration pages from one place.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm font-semibold"><span>Name</span><Input value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Email</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Password</span><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Confirm password</span><Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></label>
          {error && <p className="rounded-xl bg-primary-soft p-3 text-sm font-semibold text-primary">{error}</p>}
          {confirmation && <p className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{confirmation}</p>}
          <Button className="w-full" type="submit">Create account</Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted">Already registered? <Link href="/login" className="font-semibold text-primary">Login</Link></p>
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">Authentication is provided by Supabase. Email confirmation follows your project settings.</p>
      </Card>
    </main>
  );
}
