# Graph Report - thornvine-main  (2026-09-22)

## Corpus Check
- 63 files · ~13,991 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 4, .css 2, .mdc 1)

## Summary
- 304 nodes · 256 edges · 54 communities (18 shown, 36 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `010191a9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- compilerOptions
- compilerOptions
- web/package.json
- scripts
- Supabase
- Changelog
- .oxlintrc.json
- main.tsx
- supabase.ts
- Changelog
- Writing Guidelines for Postgres References
- vite-env.d.ts
- tsconfig.json
- mcp.json
- GitHub Project board for development tracking
- Section Definitions
- GitHub Project development board
- Thornvine
- Supabase Postgres Best Practices
- Dev notes on every push
- Supabase via MCP only
- advanced-full-text-search.md
- advanced-jsonb-indexing.md
- conn-idle-timeout.md
- conn-limits.md
- conn-pooling.md
- conn-prepared-statements.md
- data-batch-inserts.md
- data-n-plus-one.md
- data-pagination.md
- data-upsert.md
- lock-advisory.md
- lock-deadlock-prevention.md
- lock-short-transactions.md
- lock-skip-locked.md
- monitor-explain-analyze.md
- monitor-pg-stat-statements.md
- monitor-vacuum-analyze.md
- query-composite-indexes.md
- query-covering-indexes.md
- query-index-types.md
- query-missing-indexes.md
- query-partial-indexes.md
- schema-constraints.md
- schema-data-types.md
- schema-foreign-key-indexes.md
- schema-lowercase-identifiers.md
- schema-partitioning.md
- schema-primary-keys.md
- security-privileges.md
- security-rls-basics.md
- security-rls-performance.md
- _template.md
- packages/README.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `compilerOptions` - 15 edges
3. `Section Definitions` - 9 edges
4. `scripts` - 8 edges
5. `Supabase` - 8 edges
6. `Writing Guidelines for Postgres References` - 7 edges
7. `GitHub Project development board` - 7 edges
8. `GitHub Project board for development tracking` - 7 edges
9. `Changelog` - 6 edges
10. `Key Principles` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (54 total, 36 thin omitted)

### Community 0 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 1 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 2 - "web/package.json"
Cohesion: 0.06
Nodes (31): dependencies, react, react-dom, @supabase/supabase-js, devDependencies, oxlint, @types/node, @types/react (+23 more)

### Community 3 - "scripts"
Cohesion: 0.12
Nodes (16): description, engines, node, pnpm, name, packageManager, private, scripts (+8 more)

### Community 4 - "Supabase"
Cohesion: 0.11
Nodes (15): Fix suggestion, Source, What happened, Skill Feedback, Steps, Core Principles, Debugging, Making and Committing Schema Changes (+7 more)

### Community 5 - "Changelog"
Cohesion: 0.12
Nodes (16): [1.2.0](https://github.com/supabase/agent-skills/compare/v1.1.1...v1.2.0) (2026-06-02), [1.3.0](https://github.com/supabase/agent-skills/compare/v1.2.0...v1.3.0) (2026-06-05), [1.4.0](https://github.com/supabase/agent-skills/compare/v1.3.0...v1.4.0) (2026-07-10), [1.5.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.4.0...supabase-postgres-best-practices-v1.5.0) (2026-07-30), [1.6.0](https://github.com/supabase/agent-skills/compare/supabase-postgres-best-practices-v1.5.0...supabase-postgres-best-practices-v1.6.0) (2026-07-30), Bug Fixes, Bug Fixes, Bug Fixes (+8 more)

### Community 6 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 7 - "main.tsx"
Cohesion: 0.33
Nodes (4): App(), apps_web_src_index, react, react-dom

### Community 8 - "supabase.ts"
Cohesion: 0.40
Nodes (4): Database, Json, supabase, @supabase/supabase-js

### Community 9 - "Changelog"
Cohesion: 0.12
Nodes (15): [0.1.3](https://github.com/supabase/agent-skills/compare/v0.1.2...v0.1.3) (2026-06-02), [0.1.4](https://github.com/supabase/agent-skills/compare/v0.1.3...v0.1.4) (2026-06-05), [0.1.5](https://github.com/supabase/agent-skills/compare/v0.1.4...v0.1.5) (2026-07-10), [0.1.6](https://github.com/supabase/agent-skills/compare/v0.1.5...supabase-v0.1.6) (2026-07-30), [0.1.7](https://github.com/supabase/agent-skills/compare/v0.1.6...supabase-v0.1.7) (2026-08-12), Bug Fixes, Bug Fixes, Bug Fixes (+7 more)

### Community 10 - "Writing Guidelines for Postgres References"
Cohesion: 0.12
Nodes (15): 1. Concrete Transformation Patterns, 2. Error-First Structure, 3. Quantified Impact, 4. Self-Contained Examples, 5. Semantic Naming, Code Example Standards, Comments, Impact Level Guidelines (+7 more)

### Community 14 - "GitHub Project board for development tracking"
Cohesion: 0.13
Nodes (12): Changes, Context, Follow-ups, GitHub Project board for development tracking, How to verify, Risks / notes, Summary, Changes (+4 more)

### Community 15 - "Section Definitions"
Cohesion: 0.20
Nodes (9): 1. Query Performance (query), 2. Connection Management (conn), 3. Security & RLS (security), 4. Schema Design (schema), 5. Concurrency & Locking (lock), 6. Data Access Patterns (data), 7. Monitoring & Diagnostics (monitor), 8. Advanced Features (advanced) (+1 more)

### Community 16 - "GitHub Project development board"
Cohesion: 0.22
Nodes (8): CLI workflow, Coordination with Dev notes, GitHub Project development board, Issue / draft body template, Project, Required on every commit / push, Status field, Thorough description requirements

### Community 17 - "Thornvine"
Cohesion: 0.29
Nodes (6): Prerequisites, Scripts, Setup, Structure, Supabase, Thornvine

### Community 18 - "Supabase Postgres Best Practices"
Cohesion: 0.33
Nodes (5): How to Use, References, Rule Categories by Priority, Supabase Postgres Best Practices, When to Apply

### Community 19 - "Dev notes on every push"
Cohesion: 0.40
Nodes (4): Commit message shape, Dev note template, Dev notes on every push, Required on every commit / push

### Community 20 - "Supabase via MCP only"
Cohesion: 0.40
Nodes (4): Companion skills, Local project layout, Rules, Supabase via MCP only

## Knowledge Gaps
- **197 isolated node(s):** `supabase`, `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components` (+192 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 244 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@supabase/supabase-js` connect `supabase.ts` to `web/package.json`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `supabase`, `$schema`, `plugins` to the rest of the system?**
  _197 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Supabase` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._