import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { contactSchema, sendContact } from "@/lib/contact.functions";
import { Button } from "@/components/ui/button";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

export function ContactForm() {
  const send = useServerFn(sendContact);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
      setErrors(errs);
      const firstInvalid = e.currentTarget.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${Object.keys(errs)[0]}"]`);
      firstInvalid?.focus();
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const r = await send({ data: parsed.data });
      if (r.ok) setDone(true);
      else setErrors({ form: r.error });
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div role="status" className="border border-primary-foreground/40 p-8">
        <div className="font-display text-3xl font-light">Thanks — message received.</div>
        <p className="mt-3 opacity-80">I'll get back to you soon.</p>
      </div>
    );

  const field =
    "mt-2 block w-full border-0 border-b border-primary-foreground/50 bg-transparent px-0 py-2 text-lg font-light text-primary-foreground placeholder:text-primary-foreground focus:border-primary-foreground";
  const label = "sr-only";
  const err = (k: keyof Errors) =>
    errors[k] && <p id={`contact-${k}-error`} className="mt-1 text-sm text-primary-foreground underline decoration-dotted">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} onChange={(event) => {
      const fieldName = (event.target as HTMLInputElement | HTMLTextAreaElement).name;
      if (fieldName === "name" || fieldName === "email" || fieldName === "message") {
        setErrors((previous) => { const next = { ...previous }; delete next[fieldName]; return next; });
      }
    }} noValidate aria-label="Contact Len Perez" aria-busy={busy} className="space-y-6">
      <label className="block">
        <span className={label}>Name</span>
        <input name="name" placeholder="Name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} maxLength={100} className={field} autoComplete="name" />
      </label>
      {err("name")}
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" placeholder="Email" type="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} maxLength={255} className={field} autoComplete="email" />
      </label>
      {err("email")}
      <label className="block">
        <span className={label}>Message</span>
        <textarea name="message" placeholder="Message" required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} rows={5} maxLength={2000} className={`${field} resize-none`} />
      </label>
      {err("message")}
      <div role="alert" className="sr-only">{Object.values(errors).join(". ")}</div>
      {err("form")}
      <Button
        variant="outline"
        type="submit"
        disabled={busy}
        className="h-auto min-h-11 border border-primary-foreground bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
