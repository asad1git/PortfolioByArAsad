export interface Technology {
  id: string;
  name: string;
  category: "Frontend" | "Mobile" | "Backend" | "Data & Systems" | "Motion & 3D" | "Intelligence";
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
    usedIn: ["Web Applications", "Design Systems", "Component Architecture"],
    status: "Core Stack",
    description: "Declarative component-driven UI architecture, concurrent rendering, and reactive state systems.",
    connections: ["nextjs", "typescript", "react-native", "threejs"],
    coordinates: [-2.2, 1.4, 0.5],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    usedIn: ["Novva LMS", "ASAD / SYSTEM", "Web Applications"],
    status: "Core Stack",
    description: "App Router architecture, React Server Components, server actions, dynamic routing, and caching primitives.",
    connections: ["react", "typescript", "nodejs"],
    coordinates: [-1.2, 2.3, -0.6],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    usedIn: ["All Codebases", "Full-Stack Contracts", "Type Systems"],
    status: "Core Stack",
    description: "Strict end-to-end type safety, generic constraints, schema validations, and compile-time contract enforcement.",
    connections: ["react", "nextjs", "nodejs", "react-native"],
    coordinates: [1.3, 2.1, 0.4],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    usedIn: ["Kaam Backend API", "Microservices", "Real-Time Gateways"],
    status: "Active Production",
    description: "Event-driven asynchronous I/O architectures, REST & WebSocket servers, and backend microservice pipelines.",
    connections: ["typescript", "postgresql", "python"],
    coordinates: [2.3, 0.8, -0.7],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Data & Systems",
    usedIn: ["Kaam Database", "Novva LMS", "Relational Datastores"],
    status: "Core Stack",
    description: "ACID transactions, relational schema design, spatial indexing with PostGIS, and high-performance querying.",
    connections: ["nodejs", "python"],
    coordinates: [2.1, -1.2, 0.6],
  },
  {
    id: "react-native",
    name: "React Native",
    category: "Mobile",
    usedIn: ["Kaam Customer App", "Kaam Provider App"],
    status: "Active Production",
    description: "Cross-platform mobile applications, native bridge integration, gestures, and fluid 60 FPS mobile layouts.",
    connections: ["react", "expo", "typescript"],
    coordinates: [-2.4, -0.7, -0.5],
  },
  {
    id: "expo",
    name: "Expo",
    category: "Mobile",
    usedIn: ["Kaam Mobile Ecosystem", "Native Device Plugins"],
    status: "Active Production",
    description: "Managed native workflows, EAS build pipelines, push notification channels, and OTA deployment.",
    connections: ["react-native", "typescript"],
    coordinates: [-1.5, -2.1, 0.8],
  },
  {
    id: "python",
    name: "Python",
    category: "Data & Systems",
    usedIn: ["Automation Scripts", "AI Tooling", "Data Pipelines"],
    status: "System Primitive",
    description: "Scripting, algorithm implementations, asynchronous APIs, and machine learning pipeline integrations.",
    connections: ["ai", "postgresql", "nodejs"],
    coordinates: [1.1, -2.2, -0.6],
  },
  {
    id: "ai",
    name: "AI",
    category: "Intelligence",
    usedIn: ["Agentic Workflows", "LLM Pipelines", "Experiment Lab"],
    status: "System Primitive",
    description: "LLM integration, structured function calling, vector embeddings, prompt engineering, and agent systems.",
    connections: ["python", "typescript", "nodejs"],
    coordinates: [0.2, -1.5, 2.0],
  },
  {
    id: "gsap",
    name: "GSAP",
    category: "Motion & 3D",
    usedIn: ["ASAD / SYSTEM", "Interactive Experiences"],
    status: "Core Stack",
    description: "ScrollTrigger coordination, precision timelines, morphing, layout tweens, and smooth interaction orchestration.",
    connections: ["react", "threejs"],
    coordinates: [-0.6, 1.2, 2.1],
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "Motion & 3D",
    usedIn: ["ASAD / SYSTEM", "Interactive Visualizers"],
    status: "Core Stack",
    description: "WebGL scene graph architecture, custom shaders, BufferGeometry particle simulations, and 3D UI layers.",
    connections: ["react", "gsap"],
    coordinates: [0.8, 1.4, 1.8],
  },
];
