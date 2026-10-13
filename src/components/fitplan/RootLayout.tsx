import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet, useRouteError } from "react-router";
import { useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/components/fitplan/AuthContext";
import { Button } from "@/components/ui/button";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const queryClient = new QueryClient();

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">找不到頁面</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          你要找的頁面不存在，或已經移至其他位置。
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            回到首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RootErrorPage() {
  const error = useRouteError();
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "react_router_root_error_element" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">頁面無法載入</h1>
        <p className="mt-2 text-sm text-muted-foreground">目前發生問題，請重新整理或回到首頁。</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            再試一次
          </Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            回到首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

// One root auth subscriber for the whole app. Pages read it via useFitPlanAuth().
export function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    let revision = 0;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      revision += 1;
      setUser(session?.user ?? null);
      setLoading(false);
      if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
    });
    const initialRevision = revision;
    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (active && revision === initialRevision) {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <AuthContext.Provider value={{ user, loading }}>
        <Outlet />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
