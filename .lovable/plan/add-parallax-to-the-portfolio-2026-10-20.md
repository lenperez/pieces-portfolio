# Add parallax to the portfolio

Give the page a gentle sense of depth while scrolling, without changing the layout, the sticky blue title bars, or the enlarge view.

## What you will see

1. **Opening page:** the big "PIECES" title drifts up a little slower than the page and fades slightly as you scroll away, while the smaller lines below move at normal speed.
2. **Project pictures:** each step's picture floats a little slower than its description beside it, so the pictures seem to sit on a layer behind the text. The movement is small (about 40px at most) so nothing overlaps.
3. **Phones:** the effect is softer (about half as strong) to keep scrolling smooth.
4. **Reduced motion:** visitors whose device asks for less motion see no parallax at all.

The blue title bars, header, dropdowns, Contact page and the enlarge overlay stay exactly as they are.

## Technical details

- New hook `src/hooks/use-parallax.ts`: one passive scroll listener + `requestAnimationFrame`; elements opt in via `data-parallax="<speed>"`. For each, compute offset from its center relative to the viewport center, clamp to ±40px, write `transform: translate3d(0, y, 0)`. Skip entirely when `prefers-reduced-motion: reduce`; halve speed below 768px.
- In `src/routes/index.tsx`: add `data-parallax` to the hero `h1` (speed ~0.3, plus opacity fade via a CSS var) and to the wrapper around each step's image button (speed ~0.12). Transform the wrapper, not the button, so the hover scrim and click target stay aligned.
- Add `will-change: transform` only on parallax elements in `src/styles.css`.
- Verify with Playwright at 1280x1800 and 393x852: images shift on scroll, title bars still stick, enlarge still opens and fits.
