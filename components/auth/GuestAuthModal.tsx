"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthProvider";

export function GuestAuthModal({
  open,
  onClose,
  nextPath,
}: {
  open: boolean;
  onClose: () => void;
  nextPath: string;
}) {
  const { signInWithGoogle, signUp } = useAuth();
  const [showEmail, setShowEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function google() {
    setBusy(true);
    const result = await signInWithGoogle(nextPath);
    if (result.error) setMessage(result.error);
    setBusy(false);
  }

  async function emailSignup(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const result = await signUp({ name, email, password });
    if (result.error) setMessage(result.error);
    else if (result.confirmationRequired) setMessage("Check your email to confirm your account. Your draft is still kept on this device.");
    else onClose();
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#171B33]/35 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-brand-light bg-gradient-to-br from-white via-brand-offWhite to-primary-soft p-5 shadow-[0_28px_80px_rgba(80,13,104,0.22)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-primary shadow-[0_14px_36px_rgba(108,23,133,0.14)]">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="mt-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#171B33]">Almost there ✨</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Create a free account to save your invitation, edit it anytime, and share it with your guests.
          </p>
          <p className="mt-3 rounded-2xl bg-white/75 px-4 py-3 text-xs font-medium text-[#6B7280]">
            Your progress is kept on this device until you save it.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <Button type="button" className="w-full" disabled={busy} onClick={google}>
            Continue with Google
          </Button>
          {!showEmail ? (
            <Button type="button" variant="outline" className="w-full border-brand-light text-primary" onClick={() => setShowEmail(true)}>
              <Mail className="h-4 w-4" />
              Sign up with email
            </Button>
          ) : (
            <form onSubmit={emailSignup} className="space-y-3 rounded-2xl border border-brand-light bg-white/75 p-3">
              <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required />
              <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" minLength={6} required />
              <Button type="submit" className="w-full" disabled={busy}>Create free account</Button>
            </form>
          )}
          {message && <p className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-primary">{message}</p>}
        </div>

        <div className="mt-5 flex flex-col items-center gap-3 text-sm">
          <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="font-semibold text-primary">
            Already have an account? Log in
          </Link>
          <button type="button" onClick={onClose} className="inline-flex items-center gap-2 font-semibold text-muted transition hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to editing
          </button>
        </div>
      </div>
    </div>
  );
}
