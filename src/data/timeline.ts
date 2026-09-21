export interface TimelineEntry {
  id: string;
  year: string;
  quarter?: string;
  title: string;
  roleOrCategory: string;
  summary: string;
  tags: string[];
  isMilestone?: boolean;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "log-2026-a",
    year: "2026",
    quarter: "Q1 — PRESENT",
    title: "AURA 3D REAL ESTATE & NOVVA LMS",
    roleOrCategory: "3D WebGL & Full-Stack Systems",
    summary: "Engineered immersive 3D architectural platform using Next.js 16, React 19, Three.js, and Sanity CMS; architected AI-powered LMS monorepo with Express, MongoDB, and React/Vite.",
    tags: ["Next.js 16", "React 19", "Three.js", "Sanity CMS", "Node.js", "MongoDB"],
    isMilestone: true,
  },
  {
    id: "log-2026-b",
    year: "2026",
    quarter: "Q1",
    title: "MULTI-STAGE DEVOPS & CI/CD PIPELINES",
    roleOrCategory: "Cloud DevOps & Automation",
    summary: "Standardized multi-environment continuous integration and delivery pipelines with Docker containerization and automated GitHub Actions workflows (PakVista & TaskFlow).",
    tags: ["Docker", "GitHub Actions", "CI/CD", "DevOps", "Linux"],
  },
  {
    id: "log-2025-a",
    year: "2025",
    quarter: "Q3 — Q4",
    title: "CALCULATORHUB & CYBER-TERMINAL SYSTEMS",
    roleOrCategory: "Full-Stack & Creative Development",
    summary: "Engineered CalculatorHub full-stack suite with JWT auth and persistent calculation storage; launched retro cyber-terminal portfolio featuring general-relativistic black hole simulations.",
    tags: ["Next.js", "Express", "MongoDB", "Three.js", "WebGL", "GSAP"],
    isMilestone: true,
  },
  {
    id: "log-2024",
    year: "2024",
    quarter: "FOUNDATIONAL",
    title: "SYSTEM FOUNDATIONS & COMPONENT ARCHITECTURE",
    roleOrCategory: "Full-Stack Software Engineering",
    summary: "Deep specialization into TypeScript type systems, asynchronous event architectures, distributed state, and relational and document schema design.",
    tags: ["TypeScript", "React", "Node.js", "Data Structures", "Tailwind CSS"],
  },
];
