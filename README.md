# CodeChat — Next.js + Supabase Chat (Dark coding UI)

A modern, Telegram-like chat app built with Next.js (App Router), Supabase (Auth, Postgres, Realtime, Storage), and TailwindCSS. The UI uses a dark, coding-style theme (monospaced fonts, neon accent).

---

## Features
- Magic-link sign-in and anonymous sign-in (Supabase Auth)
- Real-time messages (Supabase Realtime)
- Message persistence in Postgres
- Attachment uploads to Supabase Storage (bucket: `attachments`)
- Dark coding-style UI with monospaced font

---

## Quick setup

### Prerequisites
- Node 18+ / npm
- Supabase account (free tier OK)
- Vercel account (for deployment)

### Local setup

1. Clone / create project and paste files from this repo.

2. Install dependencies:
```bash
npm install
