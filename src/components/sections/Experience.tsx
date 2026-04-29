import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Badge } from "../ui/Badge";

export const Experience = () => {
  const { t } = useLanguage();
  const experienceRef = useRef<HTMLDivElement>(null);

  // Scroll progress for experience timeline
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = useMemo(() => [
    {
      role: t("experience.roles.ing_sre.title"),
      company: t("experience.roles.ing_sre.company"),
      period: t("experience.present"),
      time_range: t("experience.roles.ing_sre.time_range"),
      description: t("experience.roles.ing_sre.description"),
      tags: t("experience.roles.ing_sre.tech_stack")
    },
    {
      role: t("experience.roles.wiedii_sysadmin.title"),
      company: t("experience.roles.wiedii_sysadmin.company"),
      period: t("experience.previous"),
      time_range: t("experience.roles.wiedii_sysadmin.time_range"),
      description: t("experience.roles.wiedii_sysadmin.description"),
      tags: t("experience.roles.wiedii_sysadmin.tech_stack")
    },
    {
      role: t("experience.roles.emsitel_sysadmin.title"),
      company: t("experience.roles.emsitel_sysadmin.company"),
      period: t("experience.previous"),
      time_range: t("experience.roles.emsitel_sysadmin.time_range"),
      description: t("experience.roles.emsitel_sysadmin.description"),
      tags: t("experience.roles.emsitel_sysadmin.tech_stack")
    },
    {
      role: t("experience.roles.applus_revisor.title"), 
      company: t("experience.roles.applus_revisor.company"),
      period: t("experience.previous"),
      time_range: t("experience.roles.applus_revisor.time_range"),
      description: t("experience.roles.applus_revisor.description"),
      tags: t("experience.roles.applus_revisor.tech_stack")
    }
  ], [t]);

  return (
    <Section id="experience">
      <div className="max-w-4xl mx-auto" ref={experienceRef}>
        <div className="text-center mb-20">
          <Reveal blur>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t("experience.title")}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-transparent mx-auto rounded-full" />
          </Reveal>
        </div>
        
        <div className="relative space-y-16">
          {/* Animated vertical line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent z-0"
          />
          
          {experiences.map((exp, i) => (
            <Reveal key={i} x={-20} delay={i * 0.1} className="relative pl-10 group">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute left-[-1px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10" 
              />
              
              <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl font-display font-bold text-slate-50 group-hover:text-indigo-400 transition-colors">{exp.role}</h3>
                <Badge variant="indigo" className="px-4 py-1.5">{exp.period}</Badge>
              </div>
              
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="text-indigo-300/80 font-bold text-lg tracking-tight uppercase">{exp.company}</div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{exp.time_range}</div>
              </div>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-3xl">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <Badge key={tag} variant="slate" className="bg-slate-900/60 border-white/5 py-1.5 px-4 group-hover:border-indigo-500/20 transition-colors">{tag}</Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};
