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
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {t("skills.subtitle")}
          </p>
        </Reveal>
      </div>
      <Reveal staggerChildren={0.05} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {techStack.map((item, i) => (
          <RevealItem key={i}>
            <SkillCard {...item} />
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
};
