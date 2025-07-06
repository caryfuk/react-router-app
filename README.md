# React Router Claude template

A modern React 19 application template built with React Router 7, featuring strict TypeScript, automated linting, and vertical slice architecture.

## Tech Stack

- **React 19** with React Router 7
- **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **Zod** for runtime type validation
- **Biome** for linting and formatting
- **Husky** for pre-commit hooks

## Development Setup

```bash
npm install
npm run dev
```

Application runs at `http://localhost:5173`

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run typecheck  # TypeScript type checking
npm run lint       # Lint and fix with Biome
npm run format     # Format code with Biome
```

## Code Quality

- **Strict TypeScript**: Zero `any` types, explicit return types
- **Automated linting**: Pre-commit hooks with Husky + lint-staged
- **Zod validation**: All external data validated at boundaries
- **Vertical slice architecture**: Features organized by domain

## Architecture

```
src/
├── features/          # Feature modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       └── schemas/
└── shared/           # Shared utilities
    ├── components/
    ├── hooks/
    └── utils/
```

## Contributing

All commits are automatically linted and formatted. Follow the patterns in `CLAUDE.md` for consistency.
