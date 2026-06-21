"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getDemoUser, isDemoAuthenticated, loginDemoUser, logoutDemoUser, registerDemoUser } from "@/lib/demo-auth";

type AppUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  signUp: (data: { name: string; email: string; password: string }) => Promise<{ error?: string; confirmationRequired?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const localTestMode = process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true";

function mapUser(user: User): AppUser {
  return {
    id: user.id,
    name: String(user.user_metadata?.name || user.email?.split("@")[0] || "Organizer"),
    email: user.email || "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localTestMode) {
      const demo = getDemoUser();
      setUser(demo && isDemoAuthenticated() ? demo : null);
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user ? mapUser(data.user) : null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ? mapUser(session.user) : null);
      setLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async signUp(data) {
      if (localTestMode) {
        const registered = registerDemoUser(data);
        setUser(registered);
        return {};
      }
      const supabase = createSupabaseBrowserClient();
      const { data: result, error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: { name: data.name.trim() },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) return { error: error.message };
      if (result.session && result.user) setUser(mapUser(result.user));
      return { confirmationRequired: !result.session };
    },
    async signIn(email, password) {
      if (localTestMode) {
        const result = loginDemoUser(email, password);
        if (!result.ok) return { error: result.message };
        if (result.user) setUser(result.user);
        return {};
      }
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) return { error: error.message };
      if (data.user) setUser(mapUser(data.user));
      return {};
    },
    async signOut() {
      if (localTestMode) logoutDemoUser();
      else await createSupabaseBrowserClient().auth.signOut();
      setUser(null);
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
