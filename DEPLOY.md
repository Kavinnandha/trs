# Deployment Guide (Vercel + MongoDB)

The app runs on [Vercel](https://vercel.com) with [MongoDB](https://www.mongodb.com/atlas)
for data and [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) for media uploads.

## Prerequisites

- A MongoDB database (MongoDB Atlas free tier works) and its connection string.
- A Vercel project linked to this repo.
- A Vercel Blob store (Vercel dashboard → Storage → Create → Blob).

## Environment variables

Set these in the Vercel project (Settings → Environment Variables) and, for local
dev, in a `.env.local` file. See `.env.example` for the full list.

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name (optional, defaults to `trs`) |
| `AUTH_SECRET` | JWT signing secret — `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email (used by the seed) |
| `ADMIN_PASSWORD` | Admin login password (used by the seed) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token — auto-injected on Vercel; needed locally for uploads |

> On Vercel, connecting the Blob store to the project injects `BLOB_READ_WRITE_TOKEN`
> automatically. For local uploads, copy it from the store's `.env.local` tab.

## Deploy

Push to the connected branch (or run `vercel --prod`). Vercel runs `next build`
and serves the app. No extra build step is required.

## Seed the database

Run once after setting `MONGODB_URI` (and `ADMIN_*`) in `.env.local`:

```bash
pnpm db:seed
```

This upserts the admin user, sample properties and updates, and creates unique
indexes on `properties.slug`, `updates.slug` and `users.email`. It is idempotent,
so it is safe to re-run. To seed a remote database, point `MONGODB_URI` at it.

## Local development

```bash
cp .env.example .env.local   # fill in MONGODB_URI, AUTH_SECRET, ADMIN_*, BLOB token
pnpm install
pnpm db:seed                 # optional: load sample data
pnpm dev
```

Admin panel at `/admin` — log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Troubleshooting

| Error | Fix |
|-------|-----|
| `MONGODB_URI is not set` | Add `MONGODB_URI` to `.env.local` / Vercel env vars |
| `AUTH_SECRET is not set` | Add `AUTH_SECRET` to `.env.local` / Vercel env vars |
| Uploads fail locally | Set `BLOB_READ_WRITE_TOKEN` in `.env.local` |
| Login fails after seed | Confirm `ADMIN_EMAIL`/`ADMIN_PASSWORD` match what you seeded |
