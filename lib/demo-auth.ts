export type DemoUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export const DEMO_USER_KEY = "jashnly_demo_user";
export const DEMO_SESSION_KEY = "jashnly_demo_session";
const DEMO_PASSWORD_KEY = "jashnly_demo_password";

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(DEMO_USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function getDemoSession() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(DEMO_SESSION_KEY);
}

export function isDemoAuthenticated() {
  return Boolean(getDemoUser() && getDemoSession());
}

export function registerDemoUser(data: { name: string; email: string; password: string }) {
  const user: DemoUser = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  window.localStorage.setItem(DEMO_PASSWORD_KEY, data.password);
  window.localStorage.setItem(DEMO_SESSION_KEY, user.id);
  return user;
}

export function loginDemoUser(email: string, password: string) {
  const user = getDemoUser();
  if (!user) return { ok: false, message: "No demo account found. Create one first." };
  if (user.email !== email.trim().toLowerCase() || window.localStorage.getItem(DEMO_PASSWORD_KEY) !== password) {
    return { ok: false, message: "Email or password is incorrect." };
  }
  window.localStorage.setItem(DEMO_SESSION_KEY, user.id);
  return { ok: true, user };
}

export function logoutDemoUser() {
  if (typeof window !== "undefined") window.localStorage.removeItem(DEMO_SESSION_KEY);
}
