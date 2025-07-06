# React Router app template

A modern React 19 frontend-only application built with React Router 7, featuring strict TypeScript, automated linting, and vertical slice architecture. No backend required - perfect for static hosting and external API integration.

## Tech Stack

- **React 19** with React Router 7 (SPA mode)
- **TypeScript** (strict mode with zero `any` types)
- **Tailwind CSS v4** for styling
- **Zod** for runtime type validation
- **Biome** for linting and formatting
- **Husky + lint-staged** for pre-commit hooks
- **Vite** for build tooling
- **PWA** with offline support and app-like experience

## Frontend-Only Architecture

This template is designed as a **frontend-only application** with no backend dependencies:

- **Static hosting ready** - Deploy to Vercel, Netlify, GitHub Pages, or any static host
- **External API integration** - Easily connect to REST APIs, GraphQL endpoints, or serverless functions
- **Client-side routing** - React Router 7 handles all navigation without server-side routing
- **Build outputs static files** - No server runtime required

Perfect for JAMstack applications, prototypes, or when using external services for backend functionality.

## PWA Features

This template includes **Progressive Web App (PWA)** capabilities out of the box:

- **Offline support** - Works without internet connection after first load
- **App-like experience** - Install on desktop/mobile like a native app
- **Automatic updates** - Service worker handles app updates seamlessly
- **Smart caching** - Optimized caching strategies for performance
- **Web App Manifest** - Proper PWA metadata and icons

The PWA is configured with:
- Service worker with Workbox for reliable offline functionality
- Automatic update notifications when new versions are available
- Optimized caching for static assets, images, and external resources
- SPA routing support for offline navigation

## Development Setup

```bash
npm install
npm run dev
```

Application runs at `http://localhost:5173`

## Project Structure

This project follows React Router 7 conventions with vertical slice architecture:

- **`app/`** - Main application directory (React Router 7 standard)
- **`app/routes/`** - File-based routing with React Router 7
- **`app/features/`** - Feature modules organized by domain
- **Path aliases** - Use `@/` for absolute imports (configured in tsconfig.json)
- **TypeScript** - Strict mode with zero `any` types allowed
- **Biome** - Unified linting and formatting
- **Pre-commit hooks** - Automatic linting and formatting on commit

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript type checking
npm run lint       # Lint and fix with Biome
npm run format     # Format code with Biome
```

## Code Quality

- **Strict TypeScript**: Zero `any` types, explicit return types, `exactOptionalPropertyTypes`
- **Automated linting**: Pre-commit hooks with Husky + lint-staged
- **Zod validation**: All external data validated at boundaries
- **Vertical slice architecture**: Features organized by domain, not technical layers
- **Path aliases**: Absolute imports using `@/*` for better organization
- **React 19 patterns**: Uses `ReactElement` instead of `JSX.Element`

## Architecture

```
app/
├── components/        # Shared UI components
├── features/          # Feature-based modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── utils/
├── hooks/            # Shared custom hooks
├── lib/              # Third-party library configurations
├── routes/           # React Router routes
│   └── home.tsx
├── types/            # Shared TypeScript types
├── utils/            # Shared helper functions
├── root.tsx          # Root component
└── routes.ts         # Route configuration
```

## Contributing

All commits are automatically linted and formatted. Follow the patterns in `CLAUDE.md` for consistency.
