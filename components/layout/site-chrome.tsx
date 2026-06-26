"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const publicInnerRoutes = ["/categories", "/vendors"];

function shouldShowSiteHeader(pathname: string) {
  return publicInnerRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeader = shouldShowSiteHeader(pathname);

  useStaleChunkRecovery();

  return (
    <>
      {showHeader && <SiteHeader />}
      {children}
    </>
  );
}

function useStaleChunkRecovery() {
  useEffect(() => {
    const reloadKey = "occazn_chunk_reload_attempted";
    const isChunkFailure = (reason: unknown) => {
      const message = reason instanceof Error ? reason.message : String(reason);
      return /ChunkLoadError|Loading chunk \d+ failed|_next\/static\/chunks/i.test(message);
    };
    const recover = (reason: unknown) => {
      if (!isChunkFailure(reason) || window.sessionStorage.getItem(reloadKey) === "true") return;
      window.sessionStorage.setItem(reloadKey, "true");
      window.location.reload();
    };
    const resetReloadGuard = window.setTimeout(() => window.sessionStorage.removeItem(reloadKey), 5000);
    const handleError = (event: ErrorEvent) => recover(event.error ?? event.message);
    const handleRejection = (event: PromiseRejectionEvent) => recover(event.reason);

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.clearTimeout(resetReloadGuard);
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="inline-flex w-[122px] shrink-0 items-center xl:w-[144px]" aria-label="occazn home">
          <img src="/brand/occazn-logo-clean.webp" alt="occazn" className="h-9 w-auto object-contain xl:h-11" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-muted lg:flex" aria-label="Primary navigation">
          <Link className="transition hover:text-primary" href="/categories">Event Types</Link>
          <Link className="transition hover:text-primary" href="/vendors">Vendors</Link>
          <Link className="transition hover:text-primary" href="/#how-it-works">How It Works</Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="inline-flex h-10 items-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Log in
          </Link>
          <Link
            href="/create-event"
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark"
          >
            Create Event
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/create-event"
            className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-soft"
          >
            Create
          </Link>
          <Link
            href="/"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-primary"
            aria-label="Open home navigation"
          >
            <Menu className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
