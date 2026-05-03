import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Magnetic } from "../ui/Magnetic";
import { cn } from "../../lib/utils";

// Credentials from environment variables (never hardcoded in source)
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_PANDA_KEY as string;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_BAMBOO_ID as string;

// Simple in-memory rate limit: max 3 submissions per 10 minutes
const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };
const submissions: number[] = [];
const isRateLimited = () => {
  const now = Date.now();
  const recent = submissions.filter(t => now - t < RATE_LIMIT.windowMs);
  submissions.length = 0;
  submissions.push(...recent);
  if (recent.length >= RATE_LIMIT.max) return true;
  submissions.push(now);
  return false;
};

const sendToTelegram = async (name: string, email: string, message: string) => {
  // Fetch geo info — fails gracefully if blocked or unavailable
  let geo = "Unknown";
  try {
    const r = await fetch("https://ipapi.co/json/");
    if (r.ok) {
      const d = await r.json();
      geo = `${d.ip} · ${d.city}, ${d.region}, ${d.country_name}`;
    }
  } catch { /* ignore */ }

  const text = `📬 *New contact from portfolio*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n🌍 *Origin:* ${geo}\n\n💬 *Message:*\n${message}`;
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" }),
  });
  if (!res.ok) throw new Error("Telegram API error");
};

export const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields, humans don't
    if (data.get("website")) return;

    // Client-side rate limit
    if (isRateLimited()) { setStatus("error"); return; }

    setStatus("sending");
    try {
      await sendToTelegram(
        data.get("name") as string,
        data.get("email") as string,
        data.get("message") as string,
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" className="mb-24">
      <Reveal blur y={40}>
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-80" />

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 tracking-tighter">{t("contact.title")}</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">{t("contact.description")}</p>
          </div>

          {/* Contact links */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { icon: Mail, label: t("contact.email"), href: "mailto:posesco@gmail.com" },
              { icon: Github, label: t("contact.github"), href: "https://github.com/posesco" },
              { icon: Linkedin, label: t("contact.linkedin"), href: "https://www.linkedin.com/in/posesco/" }
            ].map((item, i) => (
              <Magnetic key={i} strength={0.15}>
                <motion.a
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group/item"
                >
                  <item.icon size={20} className="text-indigo-400 group-hover/item:scale-110 group-hover/item:rotate-12 transition-transform" />
                  <span className="font-bold tracking-tight">{item.label}</span>
                </motion.a>
              </Magnetic>
            ))}
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto">
            <div className="h-[1px] w-full bg-white/5 mb-12" />

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-12 text-center"
              >
                <CheckCircle size={48} className="text-green-400" />
                <p className="text-xl font-bold text-slate-50">{t("contact.form.success")}</p>
                <button onClick={() => setStatus("idle")} className="text-sm text-indigo-400 hover:underline">
                  {t("contact.form.send_another")}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot: visually hidden, bots fill it, humans don't */}
                <input name="website" type="text" tabIndex={-1} aria-hidden="true" className="hidden" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-slate-500">
                      {t("contact.form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t("contact.form.name_placeholder")}
                      className="bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-slate-500">
                      {t("contact.form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t("contact.form.email_placeholder")}
                      className="bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-slate-500">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t("contact.form.message_placeholder")}
                    className="bg-slate-900/60 border border-white/5 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    {t("contact.form.error")}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all",
                    "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20",
                    status === "sending" && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <Send size={18} className={status === "sending" ? "animate-pulse" : ""} />
                  {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
                </motion.button>
              </form>
            )}
          </div>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-600/20 transition-colors" />
        </div>
      </Reveal>
    </Section>
  );
};
