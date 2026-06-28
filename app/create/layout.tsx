import { RequireDemoAuth } from "@/components/auth/RequireDemoAuth";
import { BYPASS_AUTH_FOR_DEMO } from "@/lib/demo-bypass";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  // Temporary demo bypass - remove before production.
  if (BYPASS_AUTH_FOR_DEMO) return <>{children}</>;
  return <RequireDemoAuth>{children}</RequireDemoAuth>;
}
