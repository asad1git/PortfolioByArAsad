export interface Technology {
  id: string;
  name: string;
  category: "Frontend" | "Mobile" | "Backend" | "Data & Systems" | "Motion & 3D" | "Intelligence" | "DevOps";
  usedIn: string[];
  status: "Core Stack" | "Active Production" | "System Primitive";
  description: string;
  connections: string[]; // ids of connected technologies
  coordinates: [number, number, number]; // 3D sphere positions [x, y, z]
}

export const technologies: Technology[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend",
    usedIn: ["Aura Real Estate", "Novva LMS", "Component Architecture"],
    status: "Core Stack",
    description: "Declarative component-driven UI architecture, concurrent rendering, and reactive state systems.",
    connections: ["nextjs", "typescript", "threejs"],
    coordinates: [-2.2, 1.4, 0.5],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    usedIn: ["Aura Real Estate", "CalculatorHub", "ASAD / SYSTEM"],
    status: "Core Stack",
    description: "App Router architecture, React Server Components, server actions, dynamic routing, and caching primitives.",
    connections: ["react", "typescript", "nodejs"],
    coordinates: [-1.2, 2.3, -0.6],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    usedIn: ["Aura Real Estate", "ASAD / SYSTEM", "All Core Codebases"],
    status: "Core Stack",
    description: "Strict end-to-end type safety, generic constraints, schema validations, and compile-time contract enforcement.",
    connections: ["react", "nextjs", "nodejs"],
    coordinates: [1.3, 2.1, 0.4],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    usedIn: ["Novva LMS API", "CalculatorHub", "REST & WebSocket Servers"],
    status: "Active Production",
    description: "Event-driven asynchronous I/O architectures, REST & WebSocket servers, and backend microservice pipelines.",
    connections: ["typescript", "mongodb", "docker"],
    coordinates: [2.3, 0.8, -0.7],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Data & Systems",
    usedIn: ["Novva LMS Datastore", "CalculatorHub History", "Mongoose Aggregations"],
    status: "Core Stack",
    description: "Document datastores, Mongoose schema modeling, aggregation pipelines, and high-concurrency read/write operations.",
    connections: ["nodejs", "docker"],
    coordinates: [2.1, -1.2, 0.6],
  },
  {
    id: "docker",
    name: "Docker & CI/CD",
    category: "DevOps",
    usedIn: ["PakVista CI/CD", "TaskFlow CI/CD", "GitHub Actions Pipelines"],
    status: "Active Production",
    description: "Multi-stage container builds, automated GitHub Actions workflows, branch protection rules, and isolated deployment environments.",
    connections: ["nodejs", "mongodb"],
    coordinates: [-1.5, -2.1, 0.8],
  },
  {
    id: "python",
    name: "Python",
    category: "Data & Systems",
    usedIn: ["Automation Scripts", "AI Tooling", "Data Pipelines"],
    status: "System Primitive",
    description: "Scripting, algorithm implementations, asynchronous APIs, and machine learning pipeline integrations.",
    connections: ["ai", "nodejs"],
    coordinates: [1.1, -2.2, -0.6],
  },
  {
    id: "ai",
    name: "AI & RAG",
    category: "Intelligence",
    usedIn: ["Novva LMS AI Engine", "Agentic Pipelines", "LLM Workflows"],
    status: "System Primitive",
    description: "LLM integration, structured function calling, vector embeddings, prompt engineering, and agent systems.",
    connections: ["python", "typescript", "nodejs"],
    coordinates: [0.2, -1.5, 2.0],
  },
  {
    id: "gsap",
    name: "GSAP & Lenis",
    category: "Motion & 3D",
    usedIn: ["Aura Real Estate", "ASAD / SYSTEM", "Inertial Scroll Choreography"],
    status: "Core Stack",
    description: "ScrollTrigger coordination, precision timelines, morphing, layout tweens, and smooth interaction orchestration.",
    connections: ["react", "threejs"],
    coordinates: [-0.6, 1.2, 2.1],
  },
  {
    id: "threejs",
    name: "Three.js / WebGL",
    category: "Motion & 3D",
    usedIn: ["Aura Real Estate 3D Viewport", "ASAD / SYSTEM Black Hole"],
    status: "Core Stack",
    description: "WebGL scene graph architecture, custom shaders, BufferGeometry particle simulations, and 3D UI layers.",
    connections: ["react", "gsap"],
    coordinates: [0.8, 1.4, 1.8],
  },
];
