# Lexingo

A browser-first language learning workspace for building personal vocabulary lessons and practicing translations. Lexingo keeps learning data on the device, supports manual or assisted lesson creation, and provides an interactive study loop with tolerant answer scoring.

## Product capabilities

- Create, edit, search, and delete vocabulary lessons
- Translate new words automatically with a manual fallback
- Practice in both source-to-target and target-to-source directions
- Similarity-based answer evaluation: correct, almost correct, or wrong
- Circular repetition of missed words
- Per-word and per-session learning statistics
- Theme switching and responsive navigation
- Local-first persistence through IndexedDB
- Built-in demo lesson for a useful first visit

## Engineering highlights

- Next.js App Router with React 19 and TypeScript
- Feature-Sliced Design boundaries for pages, widgets, features, entities, and shared code
- IndexedDB abstraction through `idb`
- Radix UI primitives and SCSS modules
- Dynamic lesson routes and client-side learning state
- CI checks for linting and production builds

## Stack

Next.js 15, React 19, TypeScript, IndexedDB, Radix UI, SCSS Modules, Feature-Sliced Design, ESLint

## Local setup

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Learning data remains in the current browser profile. The app does not require an account or backend database.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |

## Data model

Lessons and their words are stored together in IndexedDB. A schema migration seeds a compact English vocabulary lesson without replacing user-created content. All later edits and learning statistics stay local to the device.
