import { RequireDemoAuth } from "@/components/auth/RequireDemoAuth";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <RequireDemoAuth>{children}</RequireDemoAuth>;
}
