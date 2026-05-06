import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronRight, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/utils";

interface Post {
  id: string;
  title: string;
  date: string;
  readTime: string;
}

export const LatestPosts = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const modules = import.meta.glob("../../content/blog/*.md", { query: '?raw', import: 'default' });
      const paths = Object.keys(modules);
      
      const postPromises = paths.map(async (path) => {
        const rawContent = await modules[path]() as string;
        const id = path.split("/").pop()?.replace(".md", "") || path;
        
        const frontmatterMatch = rawContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
        const metadata: Record<string, string> = {};
        if (frontmatterMatch) {
          frontmatterMatch[1].split("\n").forEach(line => {
            const [key, ...value] = line.split(":");
            if (key && value.length > 0) metadata[key.trim()] = value.join(":").trim();
          });
        }

        if (metadata.draft === "true") return null;

        const dateObj = metadata.date?.includes("/") 
          ? new Date(metadata.date.split("/").reverse().join("-")) 
          : new Date(metadata.date || "");

        return {
          id,
          title: metadata.title || id.replace(/-/g, " "),
          date: dateObj.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
            day: '2-digit', month: 'short', year: 'numeric'
          }),
          readTime: metadata.read_time || (language === 'es' ? "5 min" : "5 min"),
          rawDate: dateObj
        };
      });

      const allPosts = await Promise.all(postPromises);
      const sorted = allPosts
        .filter((p): p is any => p !== null)
        .sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
        .slice(0, 3);
      
      setPosts(sorted);
    };

    loadPosts();
  }, [language]);

  return (
    <Section className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <Reveal>
          <div className="space-y-2">
            <span className="text-indigo-500 font-mono text-xs uppercase tracking-[0.3em] block text-center md:text-left">
              {t("blog.label") || "Journal // Insights"}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center md:text-left">
              {t("blog.title")}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="hidden md:block">
          <a 
            href="blog/" 
            className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            {t("blog.view_others")}
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-6">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.1} y={20}>
            <motion.a
              href={`blog/?post=${post.id}`}
              className={cn(
                // Mobile: Simple list item
                "flex flex-col md:glass-panel p-6 md:p-8 rounded-[2rem] border-b md:border border-white/5 md:h-[220px] group transition-all duration-500 relative overflow-hidden",
                "last:border-b-0 md:last:border-b"
              )}
              whileHover={{ y: -8 }}
            >
              {/* Subtle background glow (desktop only) */}
              <div className="hidden md:block absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/5 blur-[40px] group-hover:bg-indigo-500/10 transition-colors duration-500" />
              
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="text-[10px] font-mono text-indigo-400/80 uppercase tracking-widest md:bg-indigo-500/5 md:px-2.5 md:py-1 md:rounded-full md:border md:border-indigo-500/10">
                  {post.date}
                </div>
                <div className="text-slate-500 group-hover:text-indigo-400 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <h3 className="text-xl font-display font-bold mb-4 leading-tight group-hover:text-slate-50 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <div className="mt-auto flex items-center gap-4 pt-4 md:border-t md:border-white/5">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                  <Clock size={10} /> {post.readTime}
                </div>
                <div className="h-1 w-1 rounded-full bg-white/10" />
                <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {(t("blog.read_more") || "Read more").replace(/\s/g, "_")}
                </div>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4} className="md:hidden mt-12 text-center">
        <a 
          href="blog/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-white transition-colors uppercase tracking-widest py-3 px-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10"
        >
          {t("blog.view_others")}
          <ChevronRight size={14} />
        </a>
      </Reveal>
    </Section>
  );
};
