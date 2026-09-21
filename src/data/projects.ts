export interface ProjectArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  category: "client" | "service" | "data" | "integration";
}

export interface ProjectArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  overview: string;
  problem: string;
  product: string;
  architectureNodes: ProjectArchitectureNode[];
  architectureEdges: ProjectArchitectureEdge[];
  interfaceHighlights: string[];
  engineeringHighlights: string[];
  results: string[];
  nextSteps: string[];
}

export const projects: ProjectData[] = [
  {
    id: "01",
    slug: "kaam",
    title: "KAAM",
    tagline: "High-concurrency on-demand local services marketplace connecting verified professionals with customers in real time.",
    category: "LOCAL SERVICES MARKETPLACE",
    year: "2025",
    role: "Full Stack & Mobile Systems Engineer",
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Socket.io", "Stripe API"],
    overview:
      "Kaam is an on-demand service marketplace designed to solve localized technician and professional dispatching. It eliminates service friction through atomic booking flows, geofenced matching, and end-to-end encrypted messaging.",
    problem:
      "Informal local service markets are plagued by fragmented communication, unverified contractors, arbitrary pricing, and zero schedule guarantees. Users needed an intuitive consumer app, while service providers needed an enterprise dispatch pipeline.",
    product:
      "A dual-sided marketplace application built with React Native and Expo, backed by an event-driven Node.js API. The system manages provider availability, geolocation indexing, real-time bid negotiation, and escrow payments.",
    architectureNodes: [
      { id: "customer", label: "Customer App", sublabel: "React Native / Expo", category: "client" },
      { id: "provider", label: "Provider App", sublabel: "React Native / Expo", category: "client" },
      { id: "gateway", label: "API Gateway", sublabel: "Node.js / Express", category: "service" },
      { id: "auth", label: "Authentication", sublabel: "JWT / Session Store", category: "service" },
      { id: "db", label: "Primary Database", sublabel: "PostgreSQL / PostGIS", category: "data" },
      { id: "payments", label: "Payment Pipeline", sublabel: "Stripe Escrow Webhooks", category: "integration" },
      { id: "chat", label: "Realtime Chat", sublabel: "WebSockets / Redis PubSub", category: "service" },
      { id: "notifications", label: "Notifications", sublabel: "FCM / Push Service", category: "integration" },
    ],
    architectureEdges: [
      { from: "customer", to: "gateway", label: "HTTPS / WSS" },
      { from: "provider", to: "gateway", label: "HTTPS / WSS" },
      { from: "gateway", to: "auth", label: "Token Verification" },
      { from: "gateway", to: "db", label: "Spatial Queries" },
      { from: "gateway", to: "payments", label: "Intent Checkout" },
      { from: "gateway", to: "chat", label: "Message Dispatch" },
      { from: "gateway", to: "notifications", label: "Trigger Alert" },
    ],
    interfaceHighlights: [
      "Sub-100ms optimistic UI updates across checkout, messaging, and quote approval.",
      "Custom vector map visualizer highlighting provider proximity in real time.",
      "Ergonomic bottom-sheet task management optimized for single-handed mobile use.",
    ],
    engineeringHighlights: [
      "Spatial geo-indexing using PostGIS for millisecond-latency radius queries.",
      "Redis pub/sub channels backing low-latency bid negotiations between customer and technician.",
      "Atomic transaction locks guaranteeing idempotency on booking acceptance and payment capture.",
    ],
    results: [
      "Production-ready mobile codebase with shared business logic between customer and provider variants.",
      "Zero-downtime database migrations with automated schema validation.",
      "Consistent 60 FPS interaction profile on both iOS and Android targets.",
    ],
    nextSteps: [
      "Integration of automated route-optimization heuristics for multi-booking provider schedules.",
      "Offline-first sync engine for edge locations with spotty cellular coverage.",
    ],
  },
  {
    id: "02",
    slug: "novvalms",
    title: "NOVVA LMS",
    tagline: "Modular enterprise learning management platform built for low-bandwidth environments.",
    category: "EDTECH PLATFORM",
    year: "2024",
    role: "Frontend Architect & Product Engineer",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    overview:
      "Novva LMS is a responsive enterprise learning ecosystem built to standardize course delivery, compliance assessments, and real-time student telemetry with minimal bundle overhead.",
    problem:
      "Legacy education platforms suffer from bloated bundles, excessive client-side re-renders, and failure to load in low-bandwidth educational facilities.",
    product:
      "A fast Next.js learning platform featuring server-side rendering, streaming markdown assessments, dynamic video compression, and administrative telemetry dashboards.",
    architectureNodes: [
      { id: "student", label: "Web Portal", sublabel: "Next.js App Router", category: "client" },
      { id: "api", label: "Core API", sublabel: "Next.js Server Actions", category: "service" },
      { id: "auth", label: "Enterprise SSO", sublabel: "OAuth 2.0 / RBAC", category: "service" },
      { id: "db", label: "Relational DB", sublabel: "PostgreSQL", category: "data" },
      { id: "analytics", label: "Telemetry Log", sublabel: "Clickhouse / Stream", category: "data" },
    ],
    architectureEdges: [
      { from: "student", to: "api", label: "Server Actions" },
      { from: "api", to: "auth", label: "RBAC Guard" },
      { from: "api", to: "db", label: "Prisma ORM" },
      { from: "api", to: "analytics", label: "Event Stream" },
    ],
    interfaceHighlights: [
      "Keyboard-accessible lesson navigation complying with WCAG AAA standards.",
      "Instant offline caching for interactive coding problem sets.",
    ],
    engineeringHighlights: [
      "Selective React Server Component streaming reducing initial JS payload by over 60%.",
      "Granular role-based access control protecting enterprise course assets.",
    ],
    results: [
      "Standardized design system adopted across 4 institutional web portals.",
      "Robust audit compliance logging with cryptographic signature verification.",
    ],
    nextSteps: [
      "AI-driven grading assistant integrating LLM evaluation pipelines.",
    ],
  },
];
