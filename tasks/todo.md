# Development Plan & Todos

- [x] Create implementation plan (Analog/Arty 3D theme)
- [x] Bootstrap Next.js 15 App Router project (`npx create-next-app`)
- [x] Install three.js, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gray-matter`, `next-mdx-remote`
- [x] Implement global visual styles (Analog grain, colors, typography)
- [x] Build 3D Hero component with `Suspense` and dynamic loading
- [x] Build Timeline/About page layout
- [x] Implement MDX support for Blog (next-mdx-remote, gray-matter, sample post)
- [x] Assemble Home, Projects, and Writing pages
- [x] Final polishing (responsive grid, footer, clean build)

## Portfolio Update — 13-Task Implementation (2026-03-16)

- [x] Task 1 — HeroScene: Replace useFrame auto-rotation with OrbitControls (draggable, clamped); cursor: grab; reduce floatIntensity; move spheres inward
- [x] Task 2 — Hero: Update label "Engineering" → "Economics"; rewrite subline to "Technology is the new leverage…"
- [x] Task 3 — Writing: Add 2 more placeholder Substack cards (Coming Soon) + "Read all on Substack →" CTA
- [x] Task 4 — Writing: Delete content/posts/on-craft.mdx; replace "Notes" section with "Research & Papers" placeholder grid (5 draft cards)
- [x] Task 5 — Footer & Nav: Update social links (LinkedIn, GitHub, Substack) to real URLs
- [x] Task 6 — Footer: Add obfuscated email as span composition
- [x] Task 7 — TagBadge: New component with color map for tech tags
- [x] Task 8 — Projects: Fullscreen overlay (ProjectOverlay.tsx) with AnimatePresence + layoutId
- [x] Task 9 — Projects: Correct technology stacks for all 3 projects
- [x] Task 10 — Nav: Remove CV link; clean up external handling
- [x] Task 11 — Impressum: New /impressum page + Footer link
- [x] Task 12 — About: Timeline animation → whileInView + sequential stagger (scroll-triggered)
- [x] Task 13 — About: Correct timeline content (6 entries, no "M&A Analyst & AI Engineer")

## Result
Clean production build — 8 routes, all statically pre-rendered:
- `/` — Hero + 3D scene
- `/about` — Bio + corrected animated timeline
- `/projects` — Project cards with overlay + colored tags
- `/writing` — Substack cards + Research placeholders
- `/impressum` — Legal page
- `/_not-found` — 404
- `/writing/[slug]` — MDX post detail (0 posts currently)
