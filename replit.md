# Jay Chafekar – Portfolio

A personal developer portfolio for Jay Chafekar, showcasing projects, skills, certifications, and contact information.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, shadcn/ui
- Routing: wouter
- Dark mode: next-themes
- Icons: lucide-react, react-icons
- Build: Vite (static)

## Where things live

- `artifacts/portfolio/src/pages/Portfolio.tsx` — main portfolio page (all sections)
- `artifacts/portfolio/src/App.tsx` — router and theme provider setup
- `artifacts/portfolio/src/index.css` — theme variables and global styles

## Architecture decisions

- Presentation-first single-page app — no backend needed for the portfolio itself.
- All content is hardcoded in Portfolio.tsx (no CMS or API).
- framer-motion used for scroll-triggered reveal animations throughout.
- next-themes handles dark/light mode toggle with localStorage persistence.
- AI-generated avatar image used in the hero section.

## Product

A personal portfolio for Jay Chafekar — CS student at University of Westminster. Sections: Hero, About Me, Skills, Projects, Certifications, Contact.

## User preferences

- Portfolio owner: Jay Chafekar
- Email: chafekarjay12@gmail.com
- GitHub: https://github.com/Jaychafekar
- LinkedIn: https://www.linkedin.com/in/jay-chafekar

## Gotchas

- Google Fonts @import must be the very first line in index.css (before @import "tailwindcss")
- All CSS custom properties must use space-separated HSL values (no hsl() wrapper)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
