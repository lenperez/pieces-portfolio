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

- Keep project title bars CSS-sticky within their project sections, using the observed header height as their offset so navigation resizing never causes overlap.
- Use dedicated semantic UI title color tokens for UI project bars so their appearance can change independently of UX titles and other primary-colored surfaces.
- Render the monochrome header logo as an asset mask with the primary color token so it stays synchronized with UX title bars.
- Theme: .dark class on <html> set pre-paint by an inline script in __root.tsx (localStorage 'theme' overrides prefers-color-scheme); ThemeToggle keeps it in sync — avoids a flash of the wrong theme.
- Portfolio display order is separate from navigation categories; preserve retained project numbers after removals and allow explicit banner overrides so requested identities are not renumbered.
- About is an in-page section between the portfolio and Contact; render reference-image content as accessible text so it adapts to small screens and themes.
