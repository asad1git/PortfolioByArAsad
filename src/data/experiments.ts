export interface Experiment {
  id: string;
  codename: string;
  title: string;
  status: "ACTIVE R&D" | "PROTOTYPE" | "CONCEPT" | "BENCHMARK";
  description: string;
  category: string;
  technologies: string[];
  isPlaceholder: boolean;
  actionLabel: string;
}

export const experiments: Experiment[] = [
  {
    id: "exp-01",
    codename: "SYS-VOICE-01",
    title: "VOICEOS",
    status: "PROTOTYPE",
    category: "Speech & Audio",
    description: "An exploratory browser-based voice interface translating speech intents into structured programmatic actions with local latency buffering.",
    technologies: ["Web Audio API", "Transformers.js", "TypeScript"],
    isPlaceholder: true,
    actionLabel: "INSPECT SPEC",
  },
  {
    id: "exp-02",
    codename: "SYS-AITOOLS-02",
    title: "AI TOOLS",
    status: "ACTIVE R&D",
    category: "Developer Tooling",
    description: "Autonomous code modification primitives and AST inspection pipelines driving localized coding assistants.",
    technologies: ["Node.js", "AST", "Babel", "LLM APIs"],
    isPlaceholder: true,
    actionLabel: "INSPECT SPEC",
  },
  {
    id: "exp-03",
    codename: "SYS-MOTION-03",
    title: "MOTION LAB",
    status: "BENCHMARK",
    category: "Computer Graphics",
    description: "Physics-driven kinetic typography engine using Verlet integration and WebGL compute shaders.",
    technologies: ["Three.js", "GLSL", "GSAP"],
    isPlaceholder: true,
    actionLabel: "INSPECT SPEC",
  },
  {
    id: "exp-04",
    codename: "SYS-UISYS-04",
    title: "UI SYSTEMS",
    status: "CONCEPT",
    category: "Design Architecture",
    description: "Constraint-based generative layout generator creating responsive editorial grids from unstructured JSON datasets.",
    technologies: ["React", "CSS Grid", "Canvas API"],
    isPlaceholder: true,
    actionLabel: "INSPECT SPEC",
  },
];
