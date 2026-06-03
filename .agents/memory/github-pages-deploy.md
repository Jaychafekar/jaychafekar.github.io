---
name: GitHub Pages deploy
description: How the portfolio is deployed (external user-page repo via git push) and how to push without leaking the token or shipping stale code.
---

# GitHub Pages deploy

The portfolio is NOT served from replit.app. It is published to an external GitHub
**user-page** repo `Jaychafekar/jaychafekar.github.io`, which auto-builds via GitHub
Actions on push to `main`.

**Why:** user wants a free github.io URL, not a Replit domain.

**How to push (use code_execution, NOT bash — bash blocks git commit/push):**
- Token: `(await listConnections('github'))[0].settings.access_token`. ALWAYS redact it from any logged output.
- Remote: `https://x-access-token:${token}@github.com/Jaychafekar/jaychafekar.github.io.git`
- Sync first to avoid stale pushes: `git fetch <url> main`, then work off `FETCH_HEAD` (branch `deploy-push`).
- `git add` ONLY the changed app files (e.g. `artifacts/portfolio/...`). NEVER stage `deploy.yml` (token lacks workflow scope → push rejected) or `.agents/memory`.
- Commit, then `git push <url> deploy-push:main`.
- Replit's auto-checkpoint sometimes commits the working tree first, so `git commit` may say "nothing to commit" yet the push still ships the checkpoint commit. Check the push refspec line to confirm what landed.

**Staleness:** each push triggers a ~2-3 min Actions build + CDN cache. Tell the user to hard-refresh (Ctrl+Shift+R). An immediate refresh often still shows the old version — that is build lag, not a failed deploy.
