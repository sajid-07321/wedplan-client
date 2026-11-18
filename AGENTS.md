<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wedplan-client

Single-package Next.js 16 (App Router) app — not a monorepo. No CI workflows, no test runner.

## Commands (use npm; `package-lock.json` is the lockfile)

- `npm run dev` — dev server (also regenerates the block above)
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier, but **only** `**/*.{ts,tsx}` (css/md/json are not covered)
- `npm run build`

Verify with `npm run lint && npm run typecheck`; run `npm run format` before committing — Prettier is not wired into ESLint, so formatting is only enforced if you run it. There is no `test` script.

## Layout and conventions

- Path alias `@/*` → repo root (see `tsconfig.json`).
- `app/` = routes; `app/api/` = route handlers; `components/ui` = shadcn components; `lib/` = shared code; `hooks/` is empty but reserved by shadcn aliases (`components.json`).
- Tailwind v4 is CSS-first: no `tailwind.config`, theme lives in `app/globals.css`.
- `cn` is a real npm dependency, re-exported from `lib/utils.ts` (not clsx + tailwind-merge).
- Add shadcn components with `npx shadcn@latest add <component>` (style `base-nova`).
- Prettier style: no semicolons, double quotes, LF, tailwindcss class sorting. Match it in hand-written code.

## Auth (better-auth + MongoDB) — partially wired

- Server config: `lib/auth.ts`; client: `lib/auth-client.ts`; HTTP handler: `app/api/auth/[...all]/route.ts` (catch-all — don't hand-write additional auth API routes).
- `.env` (gitignored) defines `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URL`.
- Verified gotchas:
  - `lib/auth.ts` hardcodes `mongodb://localhost:27017/database`; `MONGODB_URL` is currently unused.
  - Google OAuth reads `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`, which are not in `.env`.
  - `lib/auth-client.ts` reads `process.env.BETTER_AUTH_URL` in browser code; Next only exposes `NEXT_PUBLIC_*` vars to client bundles, so it is `undefined` client-side.
