import React from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Terminal,
  Layers,
  Rss,
  Sparkles,
  Command
} from "lucide-react";
import { cn } from "./lib/utils";
import { Blog } from "./components/Blog";
import { useLanguage } from "./i18n/LanguageContext";

// UI Components
import { Section } from "./components/ui/Section";
import { Badge } from "./components/ui/Badge";
import { SkillCard } from "./components/ui/SkillCard";
import { Reveal } from "./components/ui/Reveal";

// Data
import { techStack, stats } from "./data/portfolio";

export default function App() {
  const { t, language, setLanguage } = useLanguage();
  const avatarUrl = "/avatar.png";

  const experiences = [
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
    }
  ];

  return (
    <div id="top" className="min-h-screen selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel !border-x-0 !border-t-0 !rounded-none backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative flex items-center gap-2 font-display font-bold text-xl tracking-tight">
              <span className="text-indigo-500 transition-transform group-hover:-translate-x-0.5">&lt;</span>
              <span className="relative">
                posesco
                <Sparkles 
                  size={10} 
                  className="absolute -top-1 -right-2 text-indigo-400 animate-pulse" 
                />
              </span>
              <span className="text-indigo-500 transition-transform group-hover:translate-x-0.5">/&gt;</span>
              <div className="hidden sm:flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">System Online</span>
              </div>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {["about", "skills", "experience", "blog", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 group"
              >
                {item === 'blog' && <Rss size={14} className="group-hover:rotate-12 transition-transform" />}
                {t(`nav.${item}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-900/80 border border-white/5 rounded-full p-1 shadow-inner">
              {['en', 'es'].map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setLanguage(lang as 'en' | 'es')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold rounded-full transition-all uppercase",
                    language === lang ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-white/5 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-1">
              <a href="https://github.com/posesco" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/posesco/" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-48 pb-32 flex flex-col items-center text-center overflow-visible">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-8">
            <Terminal size={14} />
            <span>{t("hero.status") || "chmod +x my-career.sh"}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-extrabold mb-8 tracking-tight leading-[1.1]">
            {t("hero.title")} <br />
            <span className="gradient-text italic px-2">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 group"
            >
              {t("hero.cta_primary")} 
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/posesco" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 glass-panel hover:bg-slate-800/80 font-bold rounded-2xl transition-all flex items-center gap-2"
            >
              <Github size={18} />
              {t("hero.cta_secondary")}
            </motion.a>
          </div>
        </Reveal>

        {/* Decorative elements */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />
      </Section>

      {/* Stats Section */}
      <div className="border-y border-white/5 bg-slate-950/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats(t).map((stat, i) => (
            <Reveal key={i} delay={i * 0.1} y={10} className="flex flex-col items-center md:items-start group">
              <div className="flex items-center gap-2 text-indigo-400 mb-2 group-hover:scale-110 transition-transform origin-left">
                <stat.icon size={18} />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
              <span className="text-3xl font-display font-bold text-slate-50">{stat.value}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {/* About Section */}
      <Section id="about">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <Reveal x={-20}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-6">
              <Command size={12} />
              <span>{t("about.label") || "Profile_Info"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">{t("about.title")}</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {t("about.p1")}
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              {t("about.p2")}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
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
            </div>
          </Reveal>
          
          <Reveal scale={0.95} className="relative">
            <div className="aspect-square rounded-[2rem] overflow-hidden glass-panel p-3 group">
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="Jesús David Posada Escobar" 
                  className="w-full h-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                  <Layers size={120} className="text-white/20 absolute" />
                  <Terminal size={80} className="text-white" />
                </div>
              )}
            </div>
            {/* Abstract visual decor */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 grid grid-cols-4 gap-2 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="bg-slate-950/30 relative">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t("skills.title")}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              {t("skills.subtitle")}
            </p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <SkillCard {...item} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{t("experience.title")}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-transparent mx-auto rounded-full" />
            </Reveal>
          </div>
          
          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <Reveal key={i} x={-20} delay={i * 0.1} className="relative pl-10 border-l-2 border-slate-900 group">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                
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

      {/* Blog Section */}
      <Section id="blog" className="bg-slate-950/30">
        <Blog />
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-24">
        <Reveal>
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
                <motion.a 
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={item.href} 
                  target={item.href.startsWith('mailto') ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group/item"
                >
                  <item.icon size={20} className="text-indigo-400 group-hover/item:scale-110 transition-transform" />
                  <span className="font-bold tracking-tight">{item.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Background flair */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-600/20 transition-colors" />
          </div>
        </Reveal>
      </Section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-display font-bold text-xl tracking-tight text-slate-200">
              jesusposada<span className="text-indigo-500">.</span>website
            </div>
            <div className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} Jesús David Posada Escobar.
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-slate-500 text-sm font-semibold">
            <a href="#about" className="hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">{t("nav.about")}</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">{t("nav.contact")}</a>
            <a href="https://github.com/posesco/posesco" target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 transition-all">
              {t("footer.source_code")} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
