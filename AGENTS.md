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
- Keep public pages at top-level and the signed-in app under the client-only `_authenticated` route gate; server rendering cannot read browser auth storage.
- Use Cloud Auth built-in accounts only, with no profile tables or application data queries; v1 is an auth-only shell.
- Maintain one root auth subscriber and clear Query cache before sign-out; this prevents stale protected state.
- Keep reusable React components in PascalCase files under `src/components/fitplan`, with route files using TanStack naming conventions; routing relies on filenames.
- Define visual roles in global semantic tokens and use the shared Button for actions; page styles remain theme-consistent.
