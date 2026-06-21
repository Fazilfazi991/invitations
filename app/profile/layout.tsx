import { RequireDemoAuth } from "@/components/auth/RequireDemoAuth";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <RequireDemoAuth>{children}</RequireDemoAuth>;
}
