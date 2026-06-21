"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isDemoAuthenticated } from "@/lib/demo-auth";

export function RequireDemoAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isDemoAuthenticated()) {
      setAllowed(true);
      return;
    }
    router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [pathname, router]);

  if (!allowed) return <main className="min-h-screen bg-background" aria-busy="true" />;
  return children;
}
