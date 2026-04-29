import React from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Rss,
  CloudUpload
} from "lucide-react";
import { cn } from "./lib/utils";
import { Blog } from "./components/Blog";
import { useLanguage } from "./i18n/LanguageContext";

// UI Components
import { Magnetic } from "./components/ui/Magnetic";

// Sections
import { Hero } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div id="top" className="min-h-screen selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel !border-x-0 !border-t-0 !rounded-none backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative flex items-center gap-2 font-display font-bold text-xl tracking-tight">
              <span className="text-indigo-500 transition-transform group-hover:-translate-x-0.5">[</span>
              <span className="relative">
                posesco
                <CloudUpload 
                  size={10} 
                  className="absolute -top-1 -right-2 text-indigo-400 animate-pulse" 
                />
              </span>
              <span className="text-indigo-500 transition-transform group-hover:translate-x-0.5">]</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-400 bg-slate-950/20 p-1 rounded-full border border-white/5">
            {["about", "skills", "experience", "blog", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="hover:text-slate-50 hover:bg-white/5 px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 group relative"
              >
                {item === 'blog' ? <Rss size={14} className="group-hover:rotate-12 transition-transform" /> : null}
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
              <Magnetic strength={0.2}>
                <a href="https://github.com/posesco" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                  <Github size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="https://www.linkedin.com/in/posesco/" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-indigo-400 transition-colors">
                  <Linkedin size={18} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <div id="blog" className="bg-slate-950/30 py-24 px-6 max-w-7xl mx-auto">
          <Blog />
        </div>
        <Contact />
      </main>

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
            <Magnetic strength={0.2}>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/posesco/posesco" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-indigo-400 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 transition-all"
              >
                {t("footer.source_code")} <ExternalLink size={14} />
              </motion.a>
            </Magnetic>
          </div>
        </div>
      </footer>
    </div>
  );
}
