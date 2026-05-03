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
  { title: "Observability & Monitoring", icon: Eye, skills: ["Prometheus", "Grafana", "Elastic Stack", "Loki", "Tempo", "k6"] },
  { title: "IaC & Config Management", icon: Settings, skills: ["Terraform", "Ansible"] },
  { title: "Containerization", icon: Box, skills: ["Docker", "Podman", "Kubernetes", "Helm"] },
  { title: "CI/CD & Automation", icon: RefreshCw, skills: ["Jenkins", "GitLab CI/CD", "GitHub Actions", "Azure Pipelines", "n8n"] },
  { title: "Cloud Platforms", icon: Cloud, skills: ["AWS", "Azure"] },
  { title: "Databases & Caching", icon: Database, skills: ["MySQL", "MariaDB", "Redis"] },
  { title: "Web Servers", icon: Globe, skills: ["Nginx", "HAProxy", "WordPress"] },
  { title: "Programming", icon: Code, skills: ["Bash", "Python", "Go", "JavaScript", "PHP"] },
];

type TFunction = (path: string) => string;

export const stats = (t: TFunction) => [
  { label: t("stats.experience"), value: t("stats.experience_value"), icon: Activity },
  { label: t("stats.projects"), value: t("stats.projects_value"), icon: Cloud },
  { label: t("stats.automations"), value: t("stats.automations_value"), icon: Terminal },
  { label: t("stats.uptime"), value: t("stats.uptime_value"), icon: Cpu },
];
