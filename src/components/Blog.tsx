import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronRight, Linkedin, Twitter, Mail, Link, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { useLanguage } from "../i18n/LanguageContext";

// UI Components
import { Badge } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";

import remarkGfm from "remark-gfm";

// Lazy load heavy markdown components
const ReactMarkdown = lazy(() => import("react-markdown"));

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string;
  readTime?: string;
  draft: boolean;
}

const parseMarkdown = (id: string, rawContent: string, lang: string): Post | null => {
  const frontmatterMatch = rawContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  let metadata: Record<string, string> = {};
  let content = rawContent;

  if (frontmatterMatch) {
    const yaml = frontmatterMatch[1];
    content = frontmatterMatch[2];
    
    yaml.split("\n").forEach(line => {
      const [key, ...value] = line.split(":");
      if (key && value.length > 0) {
        metadata[key.trim()] = value.join(":").trim();
      }
    });
  }

  const draft = metadata.draft === "true";
  if (draft) return null;

  const title = metadata.title || id.replace(/-/g, " ");
  
  // Parse DD/MM/YYYY or YYYY-MM-DD
  let dateObj: Date;
  if (metadata.date && metadata.date.includes("/")) {
    const [day, month, year] = metadata.date.split("/").map(Number);
    dateObj = new Date(year, month - 1, day);
  } else {
    dateObj = metadata.date ? new Date(metadata.date) : new Date();
  }

  const date = dateObj.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const contentLines = content.trim().split("\n");
  const firstParagraph = contentLines.find(l => l.trim() && !l.startsWith("#"));
  const excerpt = firstParagraph ? firstParagraph.substring(0, 150) + "..." : "No description";
  
  const tags = metadata.tags;
  const readTime = metadata.read_time || (lang === 'es' ? "5 min de lectura" : "5 min read");

  return { id, title, date, excerpt, content, tags, readTime, draft };
};

const ShareButtons = ({ title, id }: { title: string; id: string }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  // Preparar para MPA: usar URL absoluta del post si existe slug
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?post=${id}` 
    : "";

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10"
    },
    {
      name: "X",
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      color: "hover:text-white hover:bg-white/10"
    },
    {
      name: "Email",
      icon: <Mail size={18} />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-indigo-400 hover:bg-indigo-400/10"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 py-8 border-t border-white/5 mt-12">
      <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">{t("blog.share")}</div>
      <div className="flex items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "p-3 rounded-xl bg-slate-900 border border-white/5 transition-all text-slate-400",
              link.color
            )}
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className={cn(
            "p-3 rounded-xl bg-slate-900 border border-white/5 transition-all text-slate-400",
            copied ? "text-green-400 bg-green-400/10 border-green-400/20" : "hover:text-indigo-400 hover:bg-indigo-400/10"
          )}
          title="Copy Link"
        >
          {copied ? <Check size={18} /> : <Link size={18} />}
        </button>
      </div>
    </div>
  );
};

export const Blog = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const modules = import.meta.glob("../content/blog/*.md", { query: '?raw', import: 'default' });
      
      const paths = Object.keys(modules);
      const postPromises = paths.map(async (path) => {
        const content = await modules[path]() as string;
        const id = path.split("/").pop()?.replace(".md", "") || path;
        return parseMarkdown(id, content, language);
      });
      
      const allPosts = await Promise.all(postPromises);
      const filteredPosts = allPosts.filter((post): post is Post => post !== null);
      
      setPosts(filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
    };

    loadPosts();
  }, [language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="text-center mb-20">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{t("blog.title")}</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  {t("blog.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    onClick={() => setSelectedPost(post)}
                    className="glass-panel p-8 rounded-3xl cursor-pointer group flex flex-col h-full border-white/5 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4 text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-6">
                      <span className="flex items-center gap-1.5 bg-indigo-500/10 px-2 py-1 rounded">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded text-slate-400">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-400 text-lg leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-bold text-indigo-400 group-hover:gap-3 transition-all">
                        {t("blog.read_more")} 
                        <ChevronRight size={18} className="transition-transform" />
                      </div>
                      {post.tags && (
                        <Badge variant="slate" className="text-[9px]">{post.tags.split(',')[0]}</Badge>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 font-bold transition-all mb-12 group"
            >
              <div className="p-2 rounded-xl bg-slate-900 border border-white/5 group-hover:border-indigo-500/30 transition-all">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              {t("blog.back")}
            </button>

            <article className="glass-panel rounded-[2.5rem] p-8 md:p-16 border-white/5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-10">
                <span className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/5 rounded">
                  <Calendar size={14} /> {selectedPost.date}
                </span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/30 rounded text-slate-400">
                  <Clock size={14} /> {selectedPost.readTime}
                </span>
                {selectedPost.tags && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/5 rounded text-purple-400">
                    <BookOpen size={14} /> {selectedPost.tags}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-12 tracking-tight leading-tight">
                {selectedPost.title}
              </h1>
              
              <div className="markdown-body text-lg leading-[1.8]">
                <Suspense fallback={<div className="h-40 w-full animate-pulse bg-white/5 rounded-2xl" />}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {selectedPost.content}
                  </ReactMarkdown>
                </Suspense>
              </div>

              <ShareButtons title={selectedPost.title} id={selectedPost.id} />

              <div className="mt-20 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-display font-extrabold text-2xl shadow-lg shadow-indigo-600/20">
                    J
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-slate-50">Jesús David Posada</div>
                    <div className="text-sm font-mono text-indigo-400 uppercase tracking-wider">DevOps Engineer | SRE</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-8 py-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all text-sm font-bold tracking-tight text-indigo-400 shadow-xl shadow-indigo-600/5"
                >
                  {t("blog.view_others")}
                </button>
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
