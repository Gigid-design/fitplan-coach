import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";
import { routes } from "@/App";
// Match routes without rendering: the pages hit Supabase and the stylesheet
// network, which the jsdom test run lacks.
describe("App routing", () => {
  const leaf = (path: string) => matchRoutes(routes, path)?.at(-1)?.route;
  it("matches a page for / instead of falling back to not found", () => {
    expect(leaf("/")?.path).toBe("/");
  });
  it("routes /app, /login and /signup client-side", () => {
    expect(leaf("/app")?.path).toBe("/app");
    expect(leaf("/login")?.path).toBe("/login");
    expect(leaf("/signup")?.path).toBe("/signup");
  });
  it("keeps the /sign-in, /sign-up and /auth aliases", () => {
    expect(leaf("/sign-in")?.path).toBe("/sign-in");
    expect(leaf("/sign-up")?.path).toBe("/sign-up");
    expect(leaf("/auth")?.path).toBe("/auth");
  });
  it("falls back to the not-found page for unknown deep links", () => {
    expect(leaf("/nope/deep")?.path).toBe("*");
  });
});
