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
    id: "log-2025",
    year: "2025",
    quarter: "Q1 — PRESENT",
    title: "KAAM SYSTEM ARCHITECTURE",
    roleOrCategory: "Mobile & Backend Development",
    summary: "Architected dual-sided React Native and Expo applications with spatial indexing, real-time messaging, and transaction flows.",
    tags: ["React Native", "Expo", "Node.js", "PostgreSQL", "Socket.io"],
    isMilestone: true,
  },
  {
    id: "log-2024-b",
    year: "2024",
    quarter: "Q3 — Q4",
    title: "ENTERPRISE LEARNING INFRASTRUCTURE",
    roleOrCategory: "Frontend Systems / Next.js",
    summary: "Engineered core modules for Novva LMS, focusing on low-bandwidth performance optimization, streaming assessments, and standardizing frontend components.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: "log-2024-a",
    year: "2024",
    quarter: "Q1 — Q2",
    title: "CREATIVE ENGINEERING & MOTION LABS",
    roleOrCategory: "WebGL & Interaction Design",
    summary: "Developed experimental web visualizers and micro-interactions utilizing Three.js and GSAP for high-fidelity interactive interfaces.",
    tags: ["Three.js", "GSAP", "GLSL", "Canvas API"],
  },
  {
    id: "log-2023",
    year: "2023",
    quarter: "FOUNDATIONAL",
    title: "SYSTEM FOUNDATIONS",
    roleOrCategory: "Full-Stack Software Engineering",
    summary: "Deep specialization into TypeScript type systems, asynchronous event pipelines, distributed state, and relational schema modeling.",
    tags: ["TypeScript", "React", "Node.js", "Data Structures"],
    isMilestone: true,
  },
];
