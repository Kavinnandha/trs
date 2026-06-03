# TRS Realty — Coimbatore Real Estate Platform

A modern, Tamil-Nadu-styled real estate website **and** admin panel for a Coimbatore
land/property broker. Public visitors browse title-verified land, houses, villas,
apartments and commercial listings; the owner manages everything from a private admin
panel. Built to run on **Vercel** with **MongoDB** and **Vercel Blob**.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, RSC, Server Actions) |
| Runtime / deploy | [Vercel](https://vercel.com) |
| Database | **MongoDB** via the official `mongodb` driver |
| Image storage | **Vercel Blob** (public store; uploaded via `/api/upload`) |
| Auth | Credentials login → signed **JWT** session cookie (`jose`) + PBKDF2 password hashing |
| Styling | Tailwind CSS v4, shadcn/ui, framer-motion |
| Validation | Zod |

## Architecture

```
 Browser ──────────►   Next.js App Router (Vercel)
   │  public pages      (site)/  → Home, Properties, Property, Updates, About,
   │  (RSC, read DB)             Contact   ── read ──►  MongoDB
   │                     /admin/* → login, dashboard, CRUD  ── write ──► MongoDB
   │  enquiry form ─────► Server Action ──► MongoDB (enquiries)
   │  /admin gate ──────► middleware.ts (JWT check) + requireAdmin() in layout
   └──────────────────►  /api/upload  ── put ──►  Vercel Blob (public URL)
```

Key directories:

- `src/app/(site)/` — public pages (own Navbar/Footer layout)
- `src/app/admin/login/` — login (no shell) · `src/app/admin/(dash)/` — auth-guarded admin shell + pages
- `src/app/api/upload/` — image upload to Vercel Blob
- `src/db/` — `schema.ts` (document types), `index.ts` (Mongo client + collections), `queries.ts`
- `src/lib/` — `auth.ts`, `session.ts` (jose), `password.ts` (PBKDF2), `site.ts` (brand/contact), `format.ts`, `slug.ts`
- `src/components/` — `PropertyCard`, `anim/` (Reveal, CountUp, Marquee), `motifs/` (kolam, mandala, gopuram, lotus), `admin/`, `forms/`

## Local development

```bash
cp .env.example .env.local   # fill in MONGODB_URI, AUTH_SECRET, ADMIN_*, BLOB token
pnpm install
pnpm db:seed                 # admin user + Coimbatore sample listings/updates
pnpm dev                     # http://localhost:3000
```

Environment variables (see `.env.example`):

```
MONGODB_URI=mongodb+srv://...
MONGODB_DB=trs                 # optional, defaults to "trs"
AUTH_SECRET=<random>
ADMIN_EMAIL=admin@trsrealty.in
ADMIN_PASSWORD=Coimbatore@123
BLOB_READ_WRITE_TOKEN=...      # needed for local uploads
```

Admin panel: **http://localhost:3000/admin** → sign in with the credentials above.

## Scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Next dev server |
| `pnpm build` | Next production build |
| `pnpm lint` | ESLint |
| `pnpm db:seed` | Seed admin + sample data into MongoDB (idempotent) |

## Deploying to Vercel

See [DEPLOY.md](DEPLOY.md). In short: link the repo to Vercel, create a Blob store,
set the environment variables (`MONGODB_URI`, `AUTH_SECRET`, `ADMIN_*`), then push.
Run `pnpm db:seed` once against your database to create the admin user.

## Admin panel

- **Dashboard** — counts + recent enquiries
- **Properties** — full CRUD; type-aware fields (land → dimensions/zoning, houses → beds/baths),
  multi-image upload (drag cover first), featured & status toggles
- **Updates** — news / market / announcement posts with markdown body, cover image, publish toggle
- **Enquiries** — inbox for contact + per-property leads; filter and set status (new/contacted/closed),
  one-click call / WhatsApp / email

> Change the admin password by updating `ADMIN_PASSWORD` and re-running `pnpm db:seed`.
