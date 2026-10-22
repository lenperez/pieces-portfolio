import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { contactSchema, sendContact } from "@/lib/contact.functions";

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
      <div className="border border-primary-foreground/40 p-8">
        <div className="font-display text-3xl font-light">Thanks — message received.</div>
        <p className="mt-3 opacity-80">I'll get back to you soon.</p>
      </div>
    );

  const field =
    "mt-2 block w-full border-0 border-b border-primary-foreground/50 bg-transparent px-0 py-2 text-lg font-light text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground focus:outline-none";
  const label = "sr-only";
  const err = (k: keyof Errors) =>
    errors[k] && <p className="mt-1 text-sm text-primary-foreground underline decoration-dotted">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <label className="block">
        <span className={label}>Name</span>
        <input name="name" placeholder="Name" maxLength={100} className={field} autoComplete="name" />
        {err("name")}
      </label>
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" placeholder="Email" type="email" maxLength={255} className={field} autoComplete="email" />
        {err("email")}
      </label>
      <label className="block">
        <span className={label}>Message</span>
        <textarea name="message" placeholder="Message" rows={5} maxLength={2000} className={`${field} resize-none`} />
        {err("message")}
      </label>
      {err("form")}
      <button
        type="submit"
        disabled={busy}
        className="border border-primary-foreground px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-primary-foreground hover:text-primary disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
