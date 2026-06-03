---
name: Static hosting constraints
description: The portfolio runs as a static Vite build on GitHub Pages — no server in production, so dynamic features need client-only third-party services.
---

# Static hosting constraints

In production the portfolio is a static Vite build on GitHub Pages. The repo's
`api-server` artifact does NOT deploy there. So anything needing a server must use a
client-only third-party service hardcoded in the frontend.

**Why:** GitHub Pages serves static files only; build-time env vars are awkward (would need GitHub Actions secrets wired into deploy.yml, which we can't edit — token lacks workflow scope).

**How to apply:**
- **Contact form:** uses FormSubmit AJAX (`https://formsubmit.co/ajax/<email>`) — zero account, no API key. One-time setup: the FIRST submission sends an activation email to the owner's inbox; they must click "Activate" once before messages are delivered. Email currently wired: jaychafekar312003@gmail.com.
- **Asset paths:** reference `public/` files with `import.meta.env.BASE_URL + 'file'` (base is `/` in prod but differs in the dev preview) — don't hardcode `/file`.
- **Analytics:** must be a script-based third-party service (GA4, GoatCounter, etc.); all require the owner's own account ID — cannot be set up without it.
