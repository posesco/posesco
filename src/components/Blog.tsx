import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

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

// Helper to extract frontmatter, title and excerpt from markdown content
const parseMarkdown = (id: string, rawContent: string): Post => {
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

  const title = metadata.title || id.replace(/-/g, " ");
  const date = metadata.date || new Date().toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Extract a better excerpt: skip the first H1 if it exists in the content
  const contentLines = content.trim().split("\n");
  const firstParagraph = contentLines.find(l => l.trim() && !l.startsWith("#"));
  const excerpt = firstParagraph ? firstParagraph.substring(0, 150) + "..." : "Sin descripción";
  
  const tags = metadata.tags;
  const readTime = metadata.read_time || "5 min read";
  const draft = metadata.draft === "true";

  return { id, title, date, excerpt, content, tags, readTime, draft };
};

export const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      // Vite's import.meta.glob to load all markdown files in the blog directory
      const modules = import.meta.glob("../content/blog/*.md", { query: '?raw', import: 'default' });
      
      const loadedPosts: Post[] = [];
      for (const path in modules) {
        const content = await modules[path]() as string;
        const id = path.split("/").pop()?.replace(".md", "") || path;
        const post = parseMarkdown(id, content);
        
        if (post.draft) continue;
        
        loadedPosts.push(post);
      }
      
      setPosts(loadedPosts);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Blog & Noticias</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Artículos sobre DevOps, SRE, automatización y las últimas tendencias en infraestructura cloud.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedPost(post)}
                  className="glass-panel p-6 rounded-2xl cursor-pointer group transition-all hover:border-indigo-500/50"
                >
                  <div className="flex items-center gap-4 text-xs font-mono text-indigo-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
                    Leer más <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-12 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Volver al blog
            </button>

            <article className="prose prose-invert prose-indigo max-w-none">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono text-indigo-400 mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} /> {selectedPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} /> {selectedPost.readTime}
                </span>
                {selectedPost.tags && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} /> {selectedPost.tags}
                  </span>
                )}
              </div>
              
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedPost.content}
                </ReactMarkdown>
              </div>
            </article>

            <div className="mt-20 pt-10 border-t border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xl">
                  J
                </div>
                <div>
                  <div className="font-bold">Jesús David Posada</div>
                  <div className="text-sm text-slate-500">DevOps Engineer | SRE</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-sm font-semibold"
              >
                Ver otros posts
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
