# Pair each project step with its own images from the PDF

Right now every project shows whole PDF pages in a stack below its text. Instead, each step (for example "Timeline Development") will show only the images that sit directly above that step's caption in the PDF.

## How it works

1. **Find each caption's column.** On every PDF page, read where each caption block starts and ends across the page (e.g. Synopsis / Heuristic / Competitive on page 2).
2. **Crop the image above it.** For each caption, cut out the area from below the project title bar down to just above the caption, using that column's width. Trim the empty margins so only the artwork is left. Export each crop at high resolution.
3. **Check every crop by eye** so that nothing is cut off and no crop includes part of the next column.
4. **Rebuild each project section** so every step is a row (or card) with its crop and its text next to each other, in the same order as the PDF.

## Mapping

```text
Purchasing Platform
  p2  Timeline Development | Heuristic | Competitive Analysis
  p3  Personas | Storymapping | Heat Mapping
  p4  (sitemap diagram, no caption) -> full-width image under Storymapping
  p5  Analytics | User Flow | Whiteboarding   (text from the PDF; I'll split my merged "Analytics & User Flow" step back into two)
  p5b Lo-Fi Wireframing | Hi-Fi Comps       (split back into two steps)
Grainger
  p6  Synopsis | Heuristic | Extrapolation & Simplification
  p7  (wireframe screens, no caption) -> full-width image after the last step
Press Ganey
  p8  Synopsis | Style Guide | Spec Docs
  p9  Dashboard Widgets | Community Pages
```

Pages without captions (4 and 7) will show as one wide image placed next to the step they relate to.

## Technical details

- Use `pdftotext -bbox` to get caption x/y positions per page. Use `pdftoppm` at about 200 dpi, then crop with PIL and trim the whitespace automatically.
- Save the crops to `src/assets/work/<project>-<step>.jpg` and delete the old full-page images.
- Add an `image` (or `images[]`) field to each step in `src/routes/index.tsx`. Show steps as alternating image/text rows on desktop and stacked on mobile, and click an image to see it larger.
