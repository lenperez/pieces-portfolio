# Dark mode

## What it looks like
- Page background: deep navy-black (not pure black), body text a soft off-white, secondary text a muted blue-gray.
- UX title bars: stay royal/navy blue with white text, slightly brightened so they read against the dark page.
- UI title bars: keep their lighter blue, so UX vs UI stays distinguishable.
- Header: dark navy surface; its scroll shadow becomes a subtle lighter edge instead of a dark shadow.
- Logo: follows the title-bar blue (already linked), so it brightens with them.
- Portfolio images: shown on a slightly raised dark card so screenshots with transparent cut-outs stay legible.
- Contact form fields: dark inputs with light placeholder text and a blue focus ring.
- Enlarged-image view: darker backdrop, circular close button in light-on-dark.

## Behavior
- On first visit the site follows the browser/OS light or dark setting, and switches live if that setting changes.
- A sun/moon toggle button sits in the header (right side on desktop/tablet, next to the hamburger on phones).
- Choosing a mode with the toggle is remembered on that device; it overrides the browser setting.
- No flash of the wrong theme on page load.

## Technical details
- Replace the stock `.dark` token block in `src/styles.css` with a custom navy palette (background, foreground, muted, card, border, input, primary, ui-title, ring).
- Inline script in `__root.tsx` head reads `localStorage.theme` or `prefers-color-scheme` and sets `.dark` on `<html>` before paint; `suppressHydrationWarning` on html.
- `useTheme` hook: state synced in `useEffect`, listens to `matchMedia` change when no stored choice; toggle writes localStorage.
- `ThemeToggle` component (lucide Sun/Moon, aria-label) added to the header and mobile bar.
- Verify both themes at 1280 and 393 with Playwright; add a small test that a stored choice overrides the system preference.
