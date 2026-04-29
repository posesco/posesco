import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Reveal } from "../ui/Reveal";
import { stats } from "../../data/portfolio";

export const Stats = () => {
  const { t } = useLanguage();

  return (
    <div className="border-y border-white/5 bg-slate-950/40 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats(t).map((stat, i) => (
          <Reveal key={i} delay={i * 0.1} y={10} className="flex flex-col items-center md:items-start group">
            <div className="flex items-center gap-2 text-indigo-400 mb-2 group-hover:translate-x-1 transition-transform duration-300">
              <stat.icon size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{stat.label}</span>
            </div>
            <span className="text-3xl font-display font-bold text-slate-50">{stat.value}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
