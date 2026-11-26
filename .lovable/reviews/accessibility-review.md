# Accessibility Review

## Rule
Every visitor must be able to reach and operate navigation, images, theme controls, résumé links, and contact fields without a mouse, with readable text and announced feedback.

## Findings before fixes
- **Critical: 1** — `src/routes/index.tsx`, enlarged-image view: a custom modal trapped Tab but did not isolate the page from assistive technology or outside focus. Replaced with Radix Dialog.
- **Warning** — `src/styles.css` and `src/routes/index.tsx`: dark-mode blue text, white-on-light-blue titles, form placeholders, and focus indicators needed stronger contrast. Separate text/surface tokens preserve blue title colors while improving readability.
- **Warning** — `src/routes/index.tsx`, header: Escape could leave focus on a hidden dropdown link; phone navigation removed the focused link without moving focus to the destination. Both now restore or move focus appropriately.
- **Warning** — `src/components/ContactForm.tsx`: invalid fields lacked error associations and feedback was not announced. Added required/invalid states, described errors, an alert, first-invalid-field focus, and a success status.
- **Warning** — `src/routes/index.tsx`: résumé buttons were below 44px high and new-window links did not announce their behavior. Increased target height and accessible names.
- **Info** — `src/routes/index.tsx`: image fade could hide the currently focused image button. Focused project rows now remain fully visible.

## Coverage (source reviewed)
- Main page and desktop/tablet/phone navigation: `src/routes/index.tsx`.
- Project image controls, all four project sections, About, résumé links, skip link, Contact footer: `src/routes/index.tsx`.
- Enlarged-image view: `src/components/EnlargedImage.tsx`.
- Contact validation, submission errors, busy and success states: `src/components/ContactForm.tsx`; submission delivery is unchanged.
- Theme control: `src/components/ThemeToggle.tsx`.
- Light/dark colors, focus styles, reduced-motion behavior: `src/styles.css`, `src/hooks/use-parallax.ts`.
- Root document language, error and not-found screens: `src/routes/__root.tsx`.
- Only one content route exists, `/`; its unique head metadata is present.
- No background jobs or database permissions were changed: they have no keyboard interface and are outside this presentation review.

## Limits
Automated WCAG scans and keyboard testing cannot certify ADA legal compliance. Screen-reader testing with real users and accessibility of text embedded inside portfolio screenshots and the linked résumé PDF still require specialist review.
## Verification
- Automated WCAG A/AA scans found zero violations across desktop (985px), tablet (834px), and phone (393px), both themes, open menus, open image dialog, and contact error states.
- Keyboard-only checks passed for skip link, both disclosure menus, phone menu, project destination focus, dialog Tab/Shift+Tab/Escape and return focus, and contact validation.
- All 16 regression tests passed. Normal-motion focused project rows remain visible; the 404 screen renders.
- Contact delivery was not triggered, to avoid sending a test message; validation and entry were checked with real form inputs.
