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
    slug: "aura-real-estate",
    title: "AURA REAL ESTATE",
    tagline: "High-fidelity 3D architectural exploration and luxury property acquisition platform powered by Next.js 16, React Three Fiber, and Sanity CMS.",
    category: "3D WEBGL & REAL ESTATE PLATFORM",
    year: "2026",
    role: "Lead Full-Stack & 3D WebGL Engineer",
    client: "Aura Architecture Group",
    liveUrl: "https://aura-real-estate-two.vercel.app",
    githubUrl: "https://github.com/asad1git/Aura-Real-Estate",
    tags: [
      "Next.js 16",
      "React 19",
      "Three.js",
      "@react-three/fiber",
      "Sanity CMS",
      "GSAP",
      "Lenis",
      "Tailwind CSS",
    ],
    overview:
      "Aura Real Estate redefines luxury property discovery by merging procedural 3D WebGL architectural visualization with headless CMS content management. Users can explore residences through orbitable 3D viewports, examine architectural blueprints, and schedule private viewings within an immersive, high-framerate interface.",
    problem:
      "Conventional real estate portals rely on static photography and flat 2D carousels that fail to convey dimensional depth, material textures, and natural lighting. Furthermore, heavy 3D graphical assets typically degrade mobile browser responsiveness and inflate initial load times.",
    product:
      "An ultra-performant web application built on Next.js 16 App Router and React 19, incorporating React Three Fiber and Three.js postprocessing for GPU-accelerated spatial rendering. Content is decoupled via Sanity CMS with real-time editorial previews, while Lenis and GSAP provide smooth inertial scrolling across all viewports.",
    architectureNodes: [
      { id: "client", label: "Next.js App Router", sublabel: "React 19 / Server Components", category: "client" },
      { id: "webgl", label: "WebGL Canvas", sublabel: "Three.js / R3F / Drei", category: "client" },
      { id: "motion", label: "Animation Engine", sublabel: "GSAP / Lenis Scroll", category: "client" },
      { id: "cms", label: "Sanity Headless CMS", sublabel: "GROQ API / Asset Pipeline", category: "integration" },
      { id: "cdn", label: "Edge Delivery", sublabel: "Vercel Global Edge Network", category: "service" },
      { id: "inquiry", label: "Lead Pipeline", sublabel: "Server Actions / Webhooks", category: "service" },
    ],
    architectureEdges: [
      { from: "client", to: "webgl", label: "3D Scene Mount" },
      { from: "client", to: "motion", label: "Scroll Coordinate Sync" },
      { from: "client", to: "cms", label: "Cached GROQ Queries" },
      { from: "cdn", to: "client", label: "Edge SSR & ISR" },
      { from: "client", to: "inquiry", label: "Encrypted Lead Submissions" },
    ],
    interfaceHighlights: [
      "Interactive 3D viewport featuring orbit controls, dynamic camera tweens, and realistic environmental reflections.",
      "Inertial kinetic scrolling powered by Lenis, perfectly synchronized with GSAP reveal choreography.",
      "Responsive editorial typography and dark-mode aesthetic built with modern Tailwind CSS and Geist typography.",
    ],
    engineeringHighlights: [
      "Optimized 3D geometry buffers and progressive texture streaming to maintain 60 FPS on mobile GPUs.",
      "Incremental Static Regeneration (ISR) and React Server Components reducing client JS payload by over 55%.",
      "Structured Sanity schemas enabling non-technical curators to update property listings, floor plans, and amenities dynamically.",
    ],
    results: [
      "De-escalated initial load latency to sub-second TTFB on Vercel Edge infrastructure.",
      "100% responsive WebGL canvas supporting touch orbit and pinch-zoom across iOS and Android.",
      "Zero layout shift (CLS < 0.01) despite complex 3D asset hydrations.",
    ],
    nextSteps: [
      "Integrate WebXR support for spatial walkthroughs on Apple Vision Pro and Meta Quest devices.",
      "Add interactive sun-position simulation for realistic diurnal shadow studies on properties.",
    ],
  },
  {
    id: "02",
    slug: "novvalms",
    title: "NOVVA LMS",
    tagline: "AI-powered enterprise learning management ecosystem engineered with an Express/MongoDB backend and a modular React/Vite client.",
    category: "AI-POWERED EDTECH PLATFORM",
    year: "2026",
    role: "Full-Stack Architect & Product Engineer",
    client: "Educational Institutions",
    githubUrl: "https://github.com/asad1git/NovvaLMS",
    tags: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT Auth",
      "RBAC",
      "Tailwind CSS",
    ],
    overview:
      "Novva LMS is a modern learning management system architected to streamline educational delivery through intelligent course orchestration, granular role-based permissions, and foundations for an AI retrieval-augmented generation (RAG) study assistant.",
    problem:
      "Enterprise education systems often suffer from clunky monolithic architectures, slow course navigation, convoluted user provisioning, and an absence of contextual AI tools to aid student comprehension.",
    product:
      "A high-throughput monorepo architecture featuring an Express/MongoDB REST API and an agile React/Vite frontend. The platform implements secure JWT authentication, tiered role-based access control (Admin, Instructor, Student), automated administrative provisioning scripts, and planned AI tutoring assistants.",
    architectureNodes: [
      { id: "frontend", label: "React Client", sublabel: "Vite / Tailwind CSS", category: "client" },
      { id: "api", label: "Express Server", sublabel: "Node.js REST API", category: "service" },
      { id: "auth", label: "Auth Middleware", sublabel: "JWT / Argon2 / RBAC", category: "service" },
      { id: "db", label: "Persistent Storage", sublabel: "MongoDB / Mongoose", category: "data" },
      { id: "ai", label: "AI RAG Engine", sublabel: "Vector Embeddings / LLM (Planned)", category: "integration" },
      { id: "admin", label: "Seeding & Provisioning", sublabel: "CLI Automated Seeders", category: "service" },
    ],
    architectureEdges: [
      { from: "frontend", to: "api", label: "HTTPS / REST Payloads" },
      { from: "api", to: "auth", label: "Token Inspection & Role Verification" },
      { from: "api", to: "db", label: "Mongoose Query Pipelines" },
      { from: "admin", to: "db", label: "Automated Admin Ingestion" },
      { from: "api", to: "ai", label: "Course Context Embeddings" },
    ],
    interfaceHighlights: [
      "Clean, distraction-free dashboard tailored to separate student, instructor, and administrative personas.",
      "Instant optimistic state transitions across authentication, profile settings, and syllabus views.",
      "Fully responsive component hierarchy built with lightweight Tailwind utility patterns.",
    ],
    engineeringHighlights: [
      "Strict separation of concerns across controllers, middleware, models, routes, and services.",
      "Centralized error-handling middleware with structured JSON telemetry and security guards against injection attacks.",
      "Comprehensive test and health verification endpoints (`/api/health`) for automated uptime monitoring.",
    ],
    results: [
      "Production-grade foundation delivered across Sprint 1 & Sprint 2 specifications.",
      "Sub-20ms database read latency with indexed Mongoose query patterns.",
      "Decoupled monorepo architecture facilitating rapid CI/CD build cycles for both frontend and backend services.",
    ],
    nextSteps: [
      "Deploy the vector embedding pipeline for PDF syllabus indexing and conversational RAG student query answering.",
      "Build dynamic quiz generator module utilizing automated LLM evaluation.",
    ],
  },
  {
    id: "03",
    slug: "pakvista-cicd",
    title: "PAKVISTA DEVOPS CI/CD",
    tagline: "Multi-stage automated DevOps infrastructure featuring Docker containerization and multi-branch GitHub Actions workflows across dev, staging, and production.",
    category: "CLOUD DEVOPS & AUTOMATED CI/CD",
    year: "2026",
    role: "DevOps & Automation Engineer",
    githubUrl: "https://github.com/asad1git/pakvista-cicd",
    tags: [
      "Docker",
      "GitHub Actions",
      "CI/CD Pipelines",
      "DevOps",
      "Branch Protection",
      "Nginx",
      "Linux",
    ],
    overview:
      "PakVista CI/CD provides continuous integration and deployment pipelines for a collaborative regional tourism platform. The infrastructure enforces strict branch promotion rules, automated container builds, linting validation, and zero-downtime deployment pipelines across isolated developer environments.",
    problem:
      "Disparate team contributions across feature branches frequently caused build regressions, dependency collisions, and manual deployment delays when promoting code from development to production targets.",
    product:
      "An automated DevOps pipeline standardizing software delivery through containerized Docker runtimes and distinct GitHub Actions workflows (`ci-dev`, `ci-staging`, `ci-prod`, `cd-dev`, `cd-staging`, `cd-prod`). Incorporates automated testing, branch protection barriers, and immutable build artifacts.",
    architectureNodes: [
      { id: "devs", label: "Feature Branches", sublabel: "Git Collaborative Flow", category: "client" },
      { id: "gha", label: "GitHub Actions Engine", sublabel: "Matrix Runner Runners", category: "service" },
      { id: "docker", label: "Docker Daemon", sublabel: "Multi-stage Dockerfile", category: "service" },
      { id: "staging", label: "Staging Target", sublabel: "Pre-production Validation", category: "integration" },
      { id: "prod", label: "Production Target", sublabel: "High-Availability Deployment", category: "integration" },
    ],
    architectureEdges: [
      { from: "devs", to: "gha", label: "Pull Request & Push Triggers" },
      { from: "gha", to: "docker", label: "Container Build & Image Tagging" },
      { from: "docker", to: "staging", label: "Automated CD on Staging Branch" },
      { from: "docker", to: "prod", label: "Approved Release CD on Main Branch" },
    ],
    interfaceHighlights: [
      "Clear status badge indicators for build, test, and container deployment pipelines.",
      "Structured GitHub Actions workflow output logs facilitating rapid triage of deployment failures.",
      "Standardized commit convention and branch topology enforcing clean Git histories.",
    ],
    engineeringHighlights: [
      "Multi-environment deployment separation preventing accidental staging leaks into production.",
      "Optimized Docker layer caching significantly accelerating runner execution times.",
      "Automated linting and vulnerability scanning prior to image containerization.",
    ],
    results: [
      "Eliminated manual release steps through 100% automated delivery pipelines.",
      "Maintained zero-downtime rollouts across coordinated team merges.",
      "Successfully integrated contributions from multiple distributed team members with zero Git conflicts.",
    ],
    nextSteps: [
      "Incorporate automated performance budget auditing (Lighthouse CI) on every pull request.",
      "Implement canary release routing with automated rollback triggers.",
    ],
  },
  {
    id: "04",
    slug: "calculatorhub",
    title: "CALCULATORHUB",
    tagline: "Full-stack mathematical computation and utility suite integrating JWT user authentication, persistent calculation logs, and multi-domain tools.",
    category: "FULL-STACK UTILITY PLATFORM",
    year: "2025",
    role: "Full-Stack Engineer",
    githubUrl: "https://github.com/asad1git/CalculatorHub-by-AR-Asad",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT Auth",
    ],
    overview:
      "CalculatorHub is a full-stack web application delivering multi-domain computation tools (financial, algebraic, unit conversion, health metrics) paired with authenticated user sessions that record and synchronize calculation histories across devices.",
    problem:
      "Most online calculation utilities are fragmented single-page tools littered with ads, lacking user accounts, calculation audit trails, or cross-device synchronizations.",
    product:
      "A consolidated utility platform built with Next.js, Express, and MongoDB. Users register and authenticate via secure JWT sessions, perform complex calculations with instant mathematical validation, and store persistent computation histories.",
    architectureNodes: [
      { id: "client", label: "Next.js UI", sublabel: "Tailwind CSS / Client Components", category: "client" },
      { id: "api", label: "Express API", sublabel: "Node.js REST Gateway", category: "service" },
      { id: "auth", label: "JWT Auth Service", sublabel: "Bcrypt / Token Verification", category: "service" },
      { id: "engine", label: "Calculation Engine", sublabel: "Deterministic Math Library", category: "service" },
      { id: "db", label: "MongoDB Datastore", sublabel: "User Accounts & History Records", category: "data" },
    ],
    architectureEdges: [
      { from: "client", to: "api", label: "REST Queries & Actions" },
      { from: "api", to: "auth", label: "Token Verification" },
      { from: "api", to: "engine", label: "Expression Evaluation" },
      { from: "api", to: "db", label: "Persist Record Log" },
    ],
    interfaceHighlights: [
      "Modular dashboard enabling quick switching between specialized calculation modules.",
      "History sidebar displaying past computation expressions and results with one-click re-calculation.",
      "Tactile numeric keypads and keyboard shortcuts supporting rapid calculation inputs.",
    ],
    engineeringHighlights: [
      "Deterministic computation engine preventing floating-point precision inaccuracies.",
      "Secure password hashing via bcrypt and stateless JWT session management.",
      "Indexed MongoDB history collections allowing instant pagination of thousands of past calculations.",
    ],
    results: [
      "Fully responsive full-stack utility accessible across desktop and mobile viewports.",
      "Zero-latency calculation updates handled client-side with asynchronous backend synchronization.",
    ],
    nextSteps: [
      "Add export options for financial calculations (CSV, PDF summary reports).",
      "Implement formula graphing capability using interactive HTML5 canvas charts.",
    ],
  },
  {
    id: "05",
    slug: "portfolio-ar",
    title: "ASAD / SYSTEM (PORTFOLIO)",
    tagline: "High-performance retro cyber-terminal portfolio featuring general-relativistic 3D Black Hole physics and a 360° accretion vortex.",
    category: "3D CYBER-TERMINAL PORTFOLIO",
    year: "2026",
    role: "Systems & Creative Developer",
    liveUrl: "https://portfolio-ar-lilac.vercel.app",
    githubUrl: "https://github.com/asad1git/PortfolioByArAsad",
    tags: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "WebGL GLSL",
      "GSAP",
      "Zustand",
      "Tailwind CSS",
    ],
    overview:
      "The official portfolio of Abdul Rahman Asad, conceptualized as an authentic 90s monochrome-and-neon retro terminal operating system. Incorporates custom Three.js WebGL simulations, an interactive 3D constellation of technical competencies, and an omnidirectional accretion vortex that consumes ambient particle fields into an event horizon.",
    problem:
      "Typical portfolio sites rely on generic template structures that fail to demonstrate deep technical mastery of computer graphics, mathematics, performance optimization, and architectural rigor.",
    product:
      "A bespoke Next.js App Router application built around custom WebGL scenes. Features a pitch-black opaque event horizon, a dual-layer pulsating photon ring, a Doppler-beamed accretion disk with Gargantua-style gravitational lensing arches, and a mathematical line-of-sight perspective correction guaranteeing zero-offset particle infall into the singularity.",
    architectureNodes: [
      { id: "router", label: "Next.js App Router", sublabel: "Static Prerendering / SSR", category: "client" },
      { id: "blackhole", label: "Relativistic Black Hole", sublabel: "Custom Shaders & Lensing Arches", category: "client" },
      { id: "vortex", label: "360° Accretion Vortex", sublabel: "Typed Float32Array / Keplerian Spiral", category: "client" },
      { id: "timeline", label: "GSAP Animation Engine", sublabel: "ScrollTrigger & Lenis Physics", category: "client" },
      { id: "state", label: "Zustand Global State", sublabel: "Reactive Telemetry & Audio/HUD", category: "service" },
      { id: "edge", label: "Vercel Edge Platform", sublabel: "Automated Git Deployments", category: "integration" },
    ],
    architectureEdges: [
      { from: "router", to: "blackhole", label: "Canvas Initialization" },
      { from: "router", to: "vortex", label: "Particle Buffer Synchronization" },
      { from: "timeline", to: "router", label: "Scroll Coordinate Dispatch" },
      { from: "state", to: "router", label: "Telemetry & Terminal Mode" },
      { from: "edge", to: "router", label: "Global Edge Content Delivery" },
    ],
    interfaceHighlights: [
      "Authentic monochrome aesthetic with neon green (`#B6FF3B`) accents adhering to a strict 90/10 visual balance.",
      "Real-time system telemetry displaying live UTC time, coordinates, audio synth feedback, and interactive terminal boots.",
      "Keyboard-accessible interactive case studies and technology constellation visualizer.",
    ],
    engineeringHighlights: [
      "Hardware-accelerated TypedArray calculations processing thousands of particle coordinates every frame without garbage collection pauses.",
      "Line-of-sight perspective correction eliminating camera-depth foreshortening during gravitational particle infall.",
      "Lighthouse 95+ score with zero layout shifts and progressive asset hydration.",
    ],
    results: [
      "Deployed to production on Vercel Edge with zero downtime.",
      "Flawless 60 FPS animation performance across modern mobile and desktop browsers.",
      "Showcases full-stack, DevOps, and creative 3D engineering in a unified aesthetic.",
    ],
    nextSteps: [
      "Add interactive shader parameter controls allowing visitors to adjust black hole mass and spin (Kerr metric).",
      "Implement a fully functional interactive in-browser bash terminal CLI emulator.",
    ],
  },
];
