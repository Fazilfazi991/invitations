import { RequireDemoAuth } from "@/components/auth/RequireDemoAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <RequireDemoAuth>{children}</RequireDemoAuth>;
}
