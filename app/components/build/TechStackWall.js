'use client';

import React, { useState } from 'react';
import { useSound } from '../SoundProvider';

/**
 * TechStackWall — Animated Technology Wall organized by Engineering Categories
 *
 * Categories: Frontend, Backend, AI, Cloud, Database, Tools
 * Each tech is rendered as a glowing capsule.
 * Hovering reveals years of experience and a short description.
 */
const TECH_CATEGORIES = [
  {
    name: 'Frontend Engineering',
    id: 'frontend',
    items: [
      { name: 'React 19', years: '4+ Yrs Exp', desc: 'Concurrent UI rendering, server actions & hooks architecture' },
      { name: 'Next.js 16', years: '3+ Yrs Exp', desc: 'App router, Turbopack, SSR, static generation & API routes' },
      { name: 'TypeScript', years: '4+ Yrs Exp', desc: 'Strict type safety, generics, interfaces & compiler AST' },
      { name: 'TailwindCSS', years: '4+ Yrs Exp', desc: 'Utility-first tokens, container queries & custom design systems' },
      { name: 'GSAP 3', years: '3+ Yrs Exp', desc: 'High-performance WebGL & DOM timeline animations' },
      { name: 'Redux Toolkit', years: '3+ Yrs Exp', desc: 'Deterministic state management & RTK Query caching' },
    ],
  },
  {
    name: 'Backend & Systems',
    id: 'backend',
    items: [
      { name: 'Node.js', years: '4+ Yrs Exp', desc: 'Asynchronous event loop, worker threads & cluster REST APIs' },
      { name: 'Python 3', years: '4+ Yrs Exp', desc: 'FastAPI microservices, concurrency & data processing pipelines' },
      { name: 'GraphQL', years: '3+ Yrs Exp', desc: 'Apollo server schema federation & sub-second resolvers' },
      { name: 'gRPC / Protobuf', years: '2+ Yrs Exp', desc: 'High-speed binary RPC serialization for microservices' },
      { name: 'WebSockets', years: '3+ Yrs Exp', desc: 'Real-time bidirectional event streaming & telemetry' },
    ],
  },
  {
    name: 'AI & ML Engineering',
    id: 'ai',
    items: [
      { name: 'OpenAI API', years: '2+ Yrs Exp', desc: 'GPT-4o fine-tuning, structured outputs & tool calling' },
      { name: 'LangChain / LlamaIndex', years: '2+ Yrs Exp', desc: 'Agentic workflows, RAG orchestration & prompt chains' },
      { name: 'Vector DBs (Pinecone/Qdrant)', years: '2+ Yrs Exp', desc: 'Semantic similarity search & embeddings indexing' },
      { name: 'PyTorch / HuggingFace', years: '2+ Yrs Exp', desc: 'Open-source transformer inference & quantizing models' },
    ],
  },
  {
    name: 'Cloud & Infrastructure',
    id: 'cloud',
    items: [
      { name: 'AWS (ECS/Lambda/S3)', years: '3+ Yrs Exp', desc: 'Serverless compute, container orchestration & cloud storage' },
      { name: 'Docker & Kubernetes', years: '3+ Yrs Exp', desc: 'Containerization, multi-stage builds & K8s pod scaling' },
      { name: 'Vercel Enterprise', years: '4+ Yrs Exp', desc: 'Edge network deployment, preview pipelines & serverless' },
      { name: 'CI/CD (GitHub Actions)', years: '3+ Yrs Exp', desc: 'Automated test suites, linting & zero-downtime deploys' },
    ],
  },
  {
    name: 'Databases & Caching',
    id: 'database',
    items: [
      { name: 'PostgreSQL / Supabase', years: '4+ Yrs Exp', desc: 'ACID relational schemas, JSONB, indexing & pgvector' },
      { name: 'Redis Cluster', years: '3+ Yrs Exp', desc: 'In-memory pub/sub, caching layers & session stores' },
      { name: 'Prisma ORM / Drizzle', years: '3+ Yrs Exp', desc: 'Type-safe database query builders & schema migrations' },
      { name: 'MongoDB', years: '3+ Yrs Exp', desc: 'Document store sharding & aggregation pipelines' },
    ],
  },
  {
    name: 'Tooling & Environment',
    id: 'tools',
    items: [
      { name: 'Git & GitHub Enterprise', years: '4+ Yrs Exp', desc: 'Distributed version control, branching strategies & PR reviews' },
      { name: 'Linux / POSIX Shell', years: '4+ Yrs Exp', desc: 'Bash/Zsh scripting, sysadmin CLI & server configuration' },
      { name: 'Jest / Playwright', years: '3+ Yrs Exp', desc: 'Automated end-to-end testing & unit test coverage' },
      { name: 'Postman / Swagger', years: '4+ Yrs Exp', desc: 'API contract documentation & automated endpoint testing' },
    ],
  },
];

export default function TechStackWall() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { playHover } = useSound();

  return (
    <div className="w-full mb-24 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-widest uppercase text-[#00F0FF]">
            02 // TECHNOLOGY_WALL
          </span>
          <span className="h-[1px] w-16 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>
        <span className="font-mono text-xs text-neutral-500 uppercase">
          HOVER CAPSULE FOR TELEMETRY & YEARS
        </span>
      </div>

      {/* Dynamic Hover Status Banner */}
      <div className="w-full p-4 mb-8 rounded-2xl bg-neutral-900/80 border border-[#00F0FF]/30 backdrop-blur-xl flex items-center justify-between transition-all duration-300">
        {hoveredItem ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-white font-bold text-sm">{hoveredItem.name}</span>
              <span className="px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF]">
                {hoveredItem.years}
              </span>
            </div>
            <span className="text-neutral-300 truncate max-w-xl">
              {hoveredItem.desc}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-600" />
            <span>SYSTEM READY // HOVER ANY CAPSULE ABOVE TO INSPECT METRICS</span>
          </div>
        )}
      </div>

      {/* Grid of Categories & Glowing Capsules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TECH_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-2xl bg-neutral-950/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-[#00F0FF]/30 transition-colors"
          >
            {/* Category Title */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#00F0FF]">
                {'// ' + cat.name}
              </h4>
              <span className="font-mono text-[11px] text-neutral-500">
                [{cat.items.length} MODS]
              </span>
            </div>

            {/* Capsules Grid */}
            <div className="flex flex-wrap gap-2.5">
              {cat.items.map((tech, i) => (
                <div
                  key={i}
                  onMouseEnter={() => {
                    playHover();
                    setHoveredItem(tech);
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative px-3.5 py-2 rounded-xl bg-neutral-900/80 border border-white/10 font-mono text-xs text-neutral-300 transition-all duration-300 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] cursor-default"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{tech.name}</span>
                    <span className="text-[10px] text-[#00F0FF]/80 group-hover:text-[#00F0FF]">
                      • {tech.years.split(' ')[0]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
