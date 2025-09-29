<div align="center">
  <img src="public/photo%20for%20profile.png" alt="Rishabh Kumar Kannaujiya" width="120" style="border-radius:9999px" />

  <h2>Rishabh Kumar Kannaujiya</h2>
  <p><strong>AI/ML Developer</strong> • Full‑Stack Engineer • Problem Solver</p>

  <a href="#live-demo"><img src="https://img.shields.io/badge/Live%20Demo-Visit-0ea5e9?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/></a>
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/TanStack%20Query-5-ef4444?style=for-the-badge" alt="TanStack Query"/>
  <img src="https://img.shields.io/badge/Radix%20UI-Primitives-111827?style=for-the-badge" alt="Radix UI"/>
  <img src="https://img.shields.io/badge/Drizzle%20ORM-Postgres-0f766e?style=for-the-badge" alt="Drizzle ORM"/>
  <img src="https://img.shields.io/badge/Framer%20Motion-11-8b5cf6?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
</div>

---

## About Me

Hi, I’m <strong>Rishabh</strong> — an AI/ML Developer who enjoys shipping polished, performant products. I work across the stack: training and deploying ML models, building interactive user interfaces, and crafting reliable backends. I value clarity, accessibility, and delightful micro‑interactions.

- **Interests**: Generative AI, model deployment, data tooling, product engineering
- **Strengths**: Pragmatic problem solving, clean abstractions, UX polish, iterative delivery
- **Currently**: Exploring production‑ready ML workflows and AI‑assisted interfaces

## Live Demo

- App: <a id="live-demo" href="https://your-live-demo-link" target="_blank">Visit the live site</a>
- Video Walkthrough: <a href="https://your-demo-video" target="_blank">Watch a quick tour</a>

> Replace the links above with your live deployment and demo video.

## Portfolio Highlights

- **Smooth, modern UI** with animations, page transitions, and tasteful motion
- **Responsive design** that looks great on mobile, tablet, and desktop
- **Accessible navigation** and keyboard‑friendly components
- **Fast** development via Vite + TypeScript; **reliable** data via TanStack Query
- **Contact form** with full validation and server handling

### Pages

- 🏠 <strong>Home</strong>: Hero intro and quick CTAs
- 👤 <strong>Profile</strong>: Bio, education, experience, achievements
- 🧰 <strong>Projects</strong>: Work samples with descriptions and links
- 🧩 <strong>Skills</strong>: Technical stack and proficiency overview
- 🌱 <strong>Extracurricular</strong>: Activities and interests
- ✉️ <strong>Contact</strong>: Validated form + social links

## Tech Stack

### Frontend
- React 18 + TypeScript
- Wouter (lightweight routing)
- Radix UI primitives + Tailwind CSS
- Framer Motion / GSAP for animation
- TanStack Query for data fetching and caching

### Backend
- Node.js + Express (TypeScript, ESM)
- Zod for schema validation
- Contact endpoint at `POST /api/contact`

### Data
- PostgreSQL (Neon) via Drizzle ORM
- Drizzle Kit for schema migrations

## Preview

<div align="center">
  <img src="public/grain.webp" alt="Background grain" width="600" />
  <br/>
  <em>Subtle textures, clean typography, and motion‑driven interactions.</em>
</div>

You can also add GIFs or screenshots here to showcase flows and animations.

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
npm install
# Optional: set up database before first run (see Environment)
npm run dev
```

### Scripts

```bash
npm run dev     # Start dev server (Express + Vite)
npm run build   # Build client and server
npm run start   # Run production build
npm run check   # Type check
npm run db:push # Push Drizzle schema changes
```

## Environment

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgres://user:password@host:5432/dbname"  # Neon or any Postgres
NODE_ENV="development"                                   # or production
PORT=5000
```

> The app runs without a DB by using in‑memory storage for dev, but configure `DATABASE_URL` to enable Postgres + Drizzle.

## API

### POST /api/contact

Request body (validated with Zod):

```json
{
  "firstName": "Rishabh",
  "lastName": "Kannaujiya",
  "email": "you@example.com",
  "subject": "Hello",
  "message": "I would love to collaborate on...",
  "privacy": true
}
```

On success:

```json
{ "success": true, "message": "Message received successfully! We'll get back to you soon." }
```

## Project Structure

```text
client/
  src/
    pages/          # Home, Profile, Projects, Skills, Extracurricular, Contact
    components/     # Navigation, Layout, Footer, animations, UI primitives
    lib/            # Query client, utilities
    hooks/          # use-toast, use-mobile, etc.
server/
  index.ts         # Express app bootstrap
  routes.ts        # API routes (contact)
shared/
  schema.ts        # Shared types and schemas
public/            # Static assets
```

## Deployment

Production build outputs:

- Client: `dist/public`
- Server: `dist/index.js`

Deploy to any Node‑capable host (e.g., Vercel, Railway, Render). Ensure `PORT` is set and the server serves static files from `dist/public`.

## Contact

- Email: <a href="mailto:your.email@example.com">your.email@example.com</a>
- LinkedIn: <a href="https://www.linkedin.com/in/your-profile" target="_blank">linkedin.com/in/your-profile</a>
- GitHub: <a href="https://github.com/your-username" target="_blank">github.com/your-username</a>
- X/Twitter: <a href="https://x.com/your-handle" target="_blank">@your-handle</a>

> Replace the placeholders above with your actual links.

## License

This project is released under the MIT License. See `LICENSE` for details.

---

<details>
  <summary>Credits & Notes</summary>
  <ul>
    <li>Built with React, Vite, and Express</li>
    <li>UI built with Tailwind + Radix primitives</li>
    <li>Animations via Framer Motion / GSAP</li>
  </ul>
</details>
