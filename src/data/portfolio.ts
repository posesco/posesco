import { 
  Eye, 
  Settings, 
  Box, 
  RefreshCw, 
  Cloud, 
  Database, 
  Globe, 
  Code,
  Activity,
  Terminal,
  Cpu
} from "lucide-react";

export const techStack = [
  { title: "Observability & Monitoring", icon: Eye, skills: ["Prometheus", "Grafana", "ELK", "Datadog"] },
  { title: "IaC & Config Management", icon: Settings, skills: ["Terraform", "Ansible", "CloudFormation"] },
  { title: "Containerization", icon: Box, skills: ["Docker", "Kubernetes", "Helm"] },
  { title: "CI/CD & Automation", icon: RefreshCw, skills: ["Jenkins", "GitLab CI", "GitHub Actions"] },
  { title: "Cloud Platforms", icon: Cloud, skills: ["AWS", "Azure", "GCP"] },
  { title: "Databases & Caching", icon: Database, skills: ["PostgreSQL", "MongoDB", "Redis"] },
  { title: "Web Servers", icon: Globe, skills: ["Nginx", "Apache"] },
  { title: "Programming", icon: Code, skills: ["Python", "Go", "Bash"] },
];

export const stats = (t: any) => [
  { label: t("stats.experience"), value: t("stats.experience_value"), icon: Activity },
  { label: t("stats.projects"), value: t("stats.projects_value"), icon: Cloud },
  { label: t("stats.automations"), value: t("stats.automations_value"), icon: Terminal },
  { label: t("stats.uptime"), value: t("stats.uptime_value"), icon: Cpu },
];
