"use client";

import { useState } from "react";
import { JOIN } from "@/lib/content";
import { SITE, FORM_ENDPOINT } from "@/lib/config";

export default function JoinForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", vehicle: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", { method: FORM_ENDPOINT ? "form" : "mailto" });
    }
    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        setSent(true);
        return;
      } catch {
        /* fall through to mailto */
      }
    }
    const subject = encodeURIComponent("New YETI Tire Club inquiry");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nVehicle: ${form.vehicle}\n\n${form.message}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputCls =
    "w-full rounded-xl border border-paper-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none";

  if (sent) {
    return (
      <div className="card p-8 text-center" role="status">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-lg font-semibold text-ink-900">{JOIN.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" noValidate>
      <p className="mb-5 text-[15px] text-ink-600">{JOIN.formLead}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink-600">{JOIN.fields.name}</label>
          <input id="name" name="name" required value={form.name} onChange={update("name")} className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-600">{JOIN.fields.email}</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={update("email")} className={inputCls} autoComplete="email" />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="vehicle" className="mb-1.5 block text-xs font-medium text-ink-600">{JOIN.fields.vehicle}</label>
        <input id="vehicle" name="vehicle" value={form.vehicle} onChange={update("vehicle")} className={inputCls} placeholder="e.g. 2021 Subaru WRX" />
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-ink-600">{JOIN.fields.message}</label>
        <textarea id="message" name="message" rows={3} value={form.message} onChange={update("message")} className={inputCls} />
      </div>
      <button type="submit" className="btn-primary mt-6 w-full">{JOIN.fields.submit}</button>
    </form>
  );
}
