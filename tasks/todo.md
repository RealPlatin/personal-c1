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

## Result
Clean production build — 6 routes, all statically pre-rendered. Structure:
- `/` — Hero + recent writing feed
- `/about` — Bio + animated timeline
- `/projects` — Project card grid
- `/writing` — MDX post listing
- `/writing/[slug]` — MDX post detail
- Components: `Nav`, `Hero`, `HeroScene` (R3F), `Footer`
