import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import { RootLayout, NotFoundPage, RootErrorPage } from "./components/fitplan/RootLayout";
import { RequireAuth } from "./components/fitplan/RequireAuth";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { TrainerApp } from "./pages/TrainerApp";

// Client-side route table. Public pages sit at the top level; the signed-in
// shell is gated by <RequireAuth />, which reads browser auth storage.
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      // Aliases kept so older links and the /sign-in, /sign-up spellings still land.
      { path: "/sign-in", element: <Navigate to="/login" replace /> },
      { path: "/sign-up", element: <Navigate to="/signup" replace /> },
      { path: "/auth", element: <Navigate to="/login" replace /> },
      {
        element: <RequireAuth />,
        children: [{ path: "/app", element: <TrainerApp /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
