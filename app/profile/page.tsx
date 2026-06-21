"use client";

import { useRouter } from "next/navigation";
import { Gift, HelpCircle, LogOut, Settings, UserRound, WalletCards } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/shared";
import { useAuth } from "@/components/auth/AuthProvider";

const menu = [
  { label: "My Events", icon: UserRound },
  { label: "Invite & Earn", icon: Gift },
  { label: "Profile Settings", icon: Settings },
  { label: "Payment History", icon: WalletCards },
  { label: "Help & Support", icon: HelpCircle },
  { label: "Logout", icon: LogOut },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() || "A";

  async function logout() {
    await signOut();
    router.replace("/");
  }

  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="avatar" />
      <Section>
        <div className="text-center"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-primary-soft font-serif text-5xl text-primary">{initial}</div><h1 className="mt-4 font-serif text-4xl font-bold">{user?.name || "Organizer"}</h1><p className="text-muted">{user?.email}</p></div>
        <Card className="mt-8 overflow-hidden">{menu.map(({ label, icon: Icon }) => label === "Logout" ? <button key={label} onClick={logout} className="flex w-full items-center gap-4 border-b border-border p-4 text-left last:border-0"><Icon className="h-5 w-5 text-primary" /><span className="font-semibold">{label}</span></button> : <div key={label} className="flex items-center gap-4 border-b border-border p-4 last:border-0"><Icon className="h-5 w-5 text-primary" /><span className="font-semibold">{label}</span></div>)}</Card>
      </Section>
      <BottomNav />
    </main>
  );
}
