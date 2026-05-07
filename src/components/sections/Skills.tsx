import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal, RevealItem } from "../ui/Reveal";
import { SkillCard } from "../ui/SkillCard";
import { techStack } from "../../data/portfolio";

export const Skills = () => {
  const { t } = useLanguage();

  return (
    <Section id="skills" className="bg-slate-950/30 relative">
      <div className="text-center mb-20">
        <Reveal blur>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t("skills.title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            {t("skills.subtitle")}
          </p>
        </Reveal>
      </div>
      <Reveal staggerChildren={0.05} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {techStack.map((item, i) => (
          <RevealItem key={i} className="h-full">
            <SkillCard {...item} />
          </RevealItem>
        ))}
      </Reveal>

      <Reveal delay={0.4} blur className="mt-20 flex justify-center">
        <div className="relative group">
          <span className="absolute -top-4 -left-4 text-blue-500/20 text-4xl font-serif">"</span>
          <blockquote className="text-slate-500 italic text-sm md:text-base max-w-prose px-8 py-2 text-center border-x border-blue-500/10">
            {t("skills.quote")}
            <footer className="text-xs mt-2 text-slate-600 not-italic font-mono uppercase tracking-widest">
              — {t("skills.quote_author")}
            </footer>
          </blockquote>
          <span className="absolute -bottom-4 -right-4 text-blue-500/20 text-4xl font-serif">"</span>
        </div>
      </Reveal>
    </Section>
  );
};
