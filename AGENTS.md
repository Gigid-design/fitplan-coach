<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## FitPlan architecture
- Plain Vite + React single-page app (no SSR). `vite build` emits a static site into `dist/`; `vercel.json` rewrites every path to `index.html` so deep links such as `/app` resolve client-side.
- Routing is React Router (`src/App.tsx`). Public pages (`/`, `/login`, `/signup`) sit at the top level; the signed-in shell (`/app`) is wrapped by the client-only `RequireAuth` gate, which reads browser auth storage. `/sign-in`, `/sign-up` and `/auth` redirect to the canonical pages.
- Use Cloud Auth built-in accounts only, with no profile tables or application data queries; v1 is an auth-only shell.
- Maintain one root auth subscriber (`RootLayout`) and clear Query cache before sign-out; this prevents stale protected state.
- Keep reusable React components in PascalCase files under `src/components/fitplan` and page components under `src/pages`; per-page `<title>`/meta come from `pageHead()` applied with `usePageHead()`.
- Define visual roles in global semantic tokens and use the shared Button for actions; page styles remain theme-consistent.
