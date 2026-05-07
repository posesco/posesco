import React from "react";
import { motion } from "motion/react";
import { Terminal, ChevronRight, ArrowDown, Github } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Magnetic } from "../ui/Magnetic";
import { DataCenterBackground } from "../ui/DataCenterBackground";

// Typewriter via CSS — single element, no per-letter JS animation
const Typewriter = ({ text, delay = 0.8 }: { text: string; delay?: number }) => (
  <span
    key={text}
    className="inline-block overflow-hidden whitespace-nowrap"
    style={{
      width: `${text.length}ch`,
      animation: `typewriter-reveal ${text.length * 0.04}s steps(${text.length}) forwards`,
      animationDelay: `${delay}s`,
      opacity: 0,
    }}
  >
    {text}
    <style>{`
      @keyframes typewriter-reveal {
        from { width: 0; opacity: 1; }
        to   { width: ${text.length}ch; opacity: 1; }
      }
    `}</style>
  </span>
);

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full overflow-hidden">
      <DataCenterBackground />
      
      <Section className="pt-28 md:pt-48 pb-32 flex flex-col items-center text-center overflow-visible relative z-10">
        <Reveal blur y={40}>
          {/* <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-8"
          >
            <Terminal size={14} className="animate-pulse" />
            <Typewriter text={t("hero.status") || "grant read TO them ON my_career.sh"} />
          </motion.div> */}
          
          <h1 className="text-5xl md:text-8xl font-display font-extrabold mb-8 tracking-tight leading-[1.1]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {t("hero.title")}
            </motion.span>
            <br />
            <motion.span 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="gradient-text italic px-2"
            >
              {t("hero.subtitle")}
            </motion.span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("hero.description")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-5">
            <Magnetic strength={0.1}>
              <motion.a 
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                href="contact/" 
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {t("hero.cta_primary")} 
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </Magnetic>
            
            <Magnetic strength={0.1}>
              <motion.a 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/posesco" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 glass-panel hover:bg-slate-800/80 font-bold rounded-2xl transition-all flex items-center gap-2 border-white/10"
              >
                <Github size={18} />
                {t("hero.cta_secondary")}
              </motion.a>
            </Magnetic>
          </div>
        </Reveal>
{/* 
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-20 text-slate-500"
        >
          <ArrowDown size={20} />
        </motion.div> */}
      </Section>
    </div>
  );
};
