import React from "react";
import { motion } from "motion/react";
import { Command, Layers, Terminal } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal, RevealItem } from "../ui/Reveal";

export const About = () => {
  const { t } = useLanguage();
  const avatarUrl = "/avatar.jpg";

  return (
    <Section id="about">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <Reveal x={-20} staggerChildren={0.1}>
          <RevealItem>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-6">
              <Command size={12} />
              <span>{t("about.label") || "Profile_Info"}</span>
            </div>
          </RevealItem>
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">{t("about.title")}</h2>
          </RevealItem>
          <RevealItem>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {t("about.p1")}
            </p>
          </RevealItem>
          <RevealItem>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              {t("about.p2")}
            </p>
          </RevealItem>
          <RevealItem className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 group hover:border-indigo-500/30 transition-colors">
              <h4 className="font-display font-bold text-slate-50 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {t("about.methodologies")}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Agile, Scrum, SRE, DevOps</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 group hover:border-indigo-500/30 transition-colors">
              <h4 className="font-display font-bold text-slate-50 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                {t("about.languages")}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{t("about.languages_list")}</p>
            </div>
          </RevealItem>
        </Reveal>
        
        <Reveal scale={0.95} blur className="relative">
          <motion.div 
            whileHover={{ rotateY: 10, rotateX: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="aspect-square rounded-[2rem] overflow-hidden glass-panel p-3 group perspective-1000"
          >
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt="Jesús David Posada Escobar" 
                className="w-full h-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div className={`${avatarUrl ? "hidden" : ""} w-full h-full rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center`}>
              <Layers size={120} className="text-white/20 absolute" />
              <Terminal size={80} className="text-white" />
            </div>
          </motion.div>
          {/* Abstract visual decor */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 grid grid-cols-4 gap-2 opacity-30">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-indigo-400 rounded-full" 
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
