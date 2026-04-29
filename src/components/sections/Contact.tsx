import React from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Magnetic } from "../ui/Magnetic";

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <Section id="contact" className="mb-24">
      <Reveal blur y={40}>
        <div className="glass-panel rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-80" />
          
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 tracking-tighter">{t("contact.title")}</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("contact.description")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
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
                  target={item.href.startsWith('mailto') ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group/item"
                >
                  <item.icon size={20} className="text-indigo-400 group-hover/item:scale-110 group-hover/item:rotate-12 transition-transform" />
                  <span className="font-bold tracking-tight">{item.label}</span>
                </motion.a>
              </Magnetic>
            ))}
          </div>

          {/* Background flair */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-600/20 transition-colors" />
        </div>
      </Reveal>
    </Section>
  );
};
