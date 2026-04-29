import React, { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Rss,
  CloudUpload,
  Menu,
  X
} from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage, LanguageProvider } from "../i18n/LanguageContext";
import { Magnetic } from "../components/ui/Magnetic";

interface MainLayoutProps {
  children: ReactNode;
}

const LayoutContent = ({ children }: MainLayoutProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = ["about", "skills", "experience", "blog", "contact"];

  return (
    <div id="top" className="min-h-screen selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[60] glass-panel !border-x-0 !border-t-0 !rounded-none backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group cursor-pointer relative z-[70]" onClick={() => setIsMenuOpen(false)}>
            <div className="relative flex items-center gap-2 font-display font-bold text-xl tracking-tight">
              <span className="text-indigo-500 transition-transform group-hover:-translate-x-0.5">[</span>
              <span className="relative text-slate-100">
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
            {navItems.map((item) => (
              <a 
                key={item}
                href={`/${item}/`} 
                className="hover:text-slate-50 hover:bg-white/5 px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 group relative"
              >
                {item === 'blog' ? <Rss size={14} className="group-hover:rotate-12 transition-transform" /> : null}
                {t(`nav.${item}`)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-900/80 border border-white/5 rounded-full p-1 shadow-inner">
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

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors relative z-[70]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-[100dvh] z-[50] bg-slate-950/98 backdrop-blur-3xl md:hidden flex flex-col pt-24 px-6 gap-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item}
                  href={`/${item}/`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-bold text-slate-100 hover:text-indigo-400 flex items-center gap-4 group"
                >
                  <span className="text-indigo-500/40 group-hover:text-indigo-500 transition-colors text-base font-mono">0{i+1}</span>
                  {t(`nav.${item}`)}
                </motion.a>
              ))}
            </div>

            <div className="h-[1px] w-full bg-white/10" />

            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{t("footer.language")}</span>
              <div className="flex items-center gap-2">
                {['en', 'es'].map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang as 'en' | 'es')}
                    className={cn(
                      "flex-1 py-4 text-xs font-bold rounded-2xl border transition-all uppercase",
                      language === lang 
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]" 
                        : "bg-white/5 border-white/5 text-slate-400"
                    )}
                  >
                    {lang === 'en' ? 'English' : 'Español'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-8">
              <div className="h-[1px] w-full bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <a href="https://github.com/posesco" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/posesco/" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
                <a 
                  href="/blog/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-widest"
                >
                  Blog <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {children}
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
            <a href="/about/" className="hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">{t("nav.about")}</a>
            <a href="/contact/" className="hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]">{t("nav.contact")}</a>
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
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
};
