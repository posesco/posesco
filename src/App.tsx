import React from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Eye, 
  Settings, 
  Box, 
  RefreshCw, 
  Cloud, 
  Database, 
  Globe, 
  Code,
  Terminal,
  Cpu,
  Layers,
  Activity,
  Rss,
  Sparkles
} from "lucide-react";
import { cn } from "./lib/utils";
import { Blog } from "./components/Blog";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
}

const Section = ({ children, className, id }: SectionProps) => (
  <section id={id} className={cn("py-20 px-6 max-w-7xl mx-auto", className)}>
    {children}
  </section>
);

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const Badge = ({ children, className }: BadgeProps) => (
  <span className={cn("px-3 py-1 text-xs font-medium rounded-full bg-slate-800 border border-slate-700 text-slate-300", className)}>
    {children}
  </span>
);

interface SkillCardProps {
  title: string;
  icon: any;
  skills: string[];
  key?: React.Key;
}

const SkillCard = ({ title, icon: Icon, skills }: SkillCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-6 rounded-2xl"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill}>{skill}</Badge>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const techStack = [
    { title: "Observability & Monitoring", icon: Eye, skills: ["Prometheus", "Grafana", "ELK", "Datadog"] },
    { title: "IaC & Config Management", icon: Settings, skills: ["Terraform", "Ansible", "CloudFormation"] },
    { title: "Containerization", icon: Box, skills: ["Docker", "Kubernetes", "Helm"] },
    { title: "CI/CD & Automation", icon: RefreshCw, skills: ["Jenkins", "GitLab CI", "GitHub Actions"] },
    { title: "Cloud Platforms", icon: Cloud, skills: ["AWS", "Azure", "GCP"] },
    { title: "Databases & Caching", icon: Database, skills: ["PostgreSQL", "MongoDB", "Redis"] },
    { title: "Web Servers", icon: Globe, skills: ["Nginx", "Apache"] },
    { title: "Programming", icon: Code, skills: ["Python", "Go", "Bash"] },
  ];

  const experiences = [
    {
      role: "DevOps Engineer | SRE",
      company: "Professional Space",
      period: "Present",
      description: "Specializing in observability, automation, and infrastructure as code to ensure high availability and scalability of critical systems.",
      tags: ["Kubernetes", "Terraform", "Prometheus", "AWS"]
    },
    {
      role: "Automation Specialist",
      company: "Tech Solutions",
      period: "Previous",
      description: "Implemented CI/CD pipelines and automated infrastructure provisioning, reducing deployment times by 40%.",
      tags: ["Jenkins", "Ansible", "Python"]
    }
  ];

  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <span className="font-mono font-bold text-xl tracking-tighter flex items-center gap-1">
              <span className="text-indigo-500/80 transition-transform group-hover:-translate-x-0.5">[</span>
              <span className="relative">
                posesco
                <Sparkles 
                  size={10} 
                  className="absolute -top-1 -right-2 text-indigo-400 animate-pulse" 
                />
              </span>
              <span className="text-indigo-500/80 transition-transform group-hover:translate-x-0.5">]</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20 ml-1 font-sans uppercase tracking-widest leading-none">
                ia
              </span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-slate-50 transition-colors">About</a>
            <a href="#skills" className="hover:text-slate-50 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-slate-50 transition-colors">Experience</a>
            <a href="#blog" className="hover:text-slate-50 transition-colors flex items-center gap-1.5">
              <Rss size={14} /> Blog
            </a>
            <a href="#contact" className="hover:text-slate-50 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/posesco" target="_blank" rel="noreferrer" className="p-2 hover:text-indigo-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/posesco" target="_blank" rel="noreferrer" className="p-2 hover:text-indigo-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-40 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <Badge className="mb-6 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1.5">
            Available for new opportunities
          </Badge> */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Jesús David <span className="gradient-text">Posada Escobar</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            DevOps Engineer & SRE Specialist focused on building resilient, 
            automated, and observable cloud infrastructures.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
            >
              Get in touch <ChevronRight size={18} />
            </a>
            <a 
              href="https://github.com/posesco" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 glass-panel hover:bg-slate-800 font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              View GitHub <Github size={18} />
            </a>
          </div>
        </motion.div>

        {/* Floating elements for visual flair */}
        <div className="absolute top-1/4 left-10 opacity-10 blur-3xl bg-indigo-500 w-64 h-64 rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-10 opacity-10 blur-3xl bg-purple-500 w-64 h-64 rounded-full -z-10 animate-pulse delay-1000" />
      </Section>

      {/* Stats/Highlight Section */}
      <div className="border-y border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Experience", value: "5+ Years", icon: Activity },
            { label: "Cloud Projects", value: "20+", icon: Cloud },
            { label: "Automations", value: "100+", icon: Terminal },
            { label: "Uptime Focus", value: "99.9%", icon: Cpu },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center md:items-start"
            >
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <stat.icon size={16} />
                <span className="text-sm font-mono uppercase tracking-widest">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-slate-50">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I am a passionate DevOps Engineer and SRE with a deep focus on observability 
              and automation. My mission is to bridge the gap between development and 
              operations by implementing robust CI/CD pipelines and scalable infrastructure.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              With expertise in cloud-native technologies and a strong background in 
              Linux systems, I help organizations achieve high availability and 
              operational excellence through modern SRE practices.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="font-semibold mb-1">Methodologies</h4>
                <p className="text-sm text-slate-500">Agile, Scrum, SRE, DevOps</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <h4 className="font-semibold mb-1">Languages</h4>
                <p className="text-sm text-slate-500">Spanish, English</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-panel p-2">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                <Layers size={120} className="text-white/20 absolute" />
                <Terminal size={80} className="text-white" />
              </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="bg-slate-950/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical Stack</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive set of tools and technologies I use to build and 
            maintain modern infrastructure.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((item, i) => (
            <SkillCard key={i} {...item} />
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l border-slate-800"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-50">{exp.role}</h3>
                  <span className="text-sm font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{exp.period}</span>
                </div>
                <div className="text-indigo-300 font-medium mb-4">{exp.company}</div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <Badge key={tag} className="bg-slate-900 border-slate-800">{tag}</Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Blog Section */}
      <Section id="blog" className="bg-slate-950/50">
        <Blog />
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-20">
        <div className="glass-panel rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's build something stable</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            I'm always open to discussing new projects, automation challenges, 
            or SRE opportunities. Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:posesco@gmail.com" 
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <Mail className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>Email Me</span>
            </a>
            <a 
              href="https://github.com/posesco" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <Github className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/posesco" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <Linkedin className="text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Jesús David Posada Escobar. Built with React & Tailwind.
          </div>
          <div className="flex items-center gap-6 text-slate-500 text-sm">
            <a href="https://github.com/posesco/posesco" target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
              Source Code <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
