# Contact: full-page section with a mail form

## What you'll see
- The navy Contact section fills the whole screen below the header (like the opening page).
- Left: your email and phone, as now. Right: a form with Name, Email, Message and a "Send" button, white lines on navy to match the site.
- After sending: a "Thanks — message received" note replaces the form. Errors (empty fields, bad email) show under each field.

## Where messages go
- Every message is saved in Lovable Cloud (turned on as part of this), viewable under Cloud → Database → contact messages.
- Email alerts to lenperez@gmail.com need a domain you own and verify; until then messages are stored but not emailed. I'll check whether one is set up and wire alerts if so.

## Technical details
- Enable Lovable Cloud; table `contact_submissions` (name, email, message, created_at), RLS on, no public read.
- Server function validates with zod (lengths limits), simple rate limit, inserts with server credentials.
- Section: `min-h-[calc(100svh-4.25rem)]`, flex-centered, two-column grid on md+, stacked on phone.
- Verify with one test submission, then delete that test row.
