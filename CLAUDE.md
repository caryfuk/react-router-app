# CLAUDE.md

## Core Development Philosophy

### KISS (Keep It Simple, Stupid)
Simplicity should be a key goal in design. Choose straightforward solutions over complex ones whenever possible. Simple solutions are easier to understand, maintain, and debug.

### YAGNI (You Aren't Gonna Need It)
Avoid building functionality on speculation. Implement features only when they are needed, not when you anticipate they might be useful in the future.

### Component-First Architecture
Build with reusable, composable components. Each component should have a single, clear responsibility and be self-contained with its own styles, tests, and logic co-located.

### Performance by Default
With React 19's compiler, manual optimizations are largely unnecessary. Focus on clean, readable code and let the compiler handle performance optimizations.

### Design Principles (MUST FOLLOW)
- **Vertical Slice Architecture**: MUST organize by features, not layers
- **Composition Over Inheritance**: MUST use React's composition model
- **Fail Fast**: MUST validate inputs early with Zod, throw errors immediately

## 🤖 AI Assistant Guidelines

### Context Awareness
- When implementing features, always check existing patterns first
- Prefer composition over inheritance in all designs
- Use existing utilities before creating new ones
- Check for similar functionality in other domains/features

### Common Pitfalls to Avoid
- Creating duplicate functionality
- Overwriting existing tests
- Modifying core frameworks without explicit instruction
- Adding dependencies without checking existing alternatives

### Workflow Patterns
- Prefferably create tests BEFORE implementation (TDD)
- Use "think hard" for architecture decisions
- Break complex tasks into smaller, testable units
- Validate understanding before implementation

## 🚀 React 19 Key Features

### Automatic Optimizations
- **React Compiler**: Eliminates need for `useMemo`, `useCallback`, and `React.memo`
- Let the compiler handle performance - write clean, readable code

### Core Features
- **Server Components**: Use for data fetching and static content
- **Actions**: Handle async operations with built-in pending states
- **use() API**: Simplified data fetching and context consumption
- **Document Metadata**: Native support for SEO tags
- **Enhanced Suspense**: Better loading states and error boundaries

### React 19 TypeScript Integration (MANDATORY)
- **MUST use `ReactElement` instead of `JSX.Element`** for return types
- **MUST import `ReactElement` from 'react'** explicitly
- **NEVER use `JSX.Element` namespace** - use React types directly

```typescript
// ✅ CORRECT: Modern React 19 typing
import { ReactElement } from 'react';

function MyComponent(): ReactElement {
  return <div>Content</div>;
}

const renderHelper = (): ReactElement | null => {
  return condition ? <span>Helper</span> : null;
};

// ❌ FORBIDDEN: Legacy JSX namespace
function MyComponent(): JSX.Element {  // Cannot find namespace 'JSX'
  return <div>Content</div>;
}
```

## 🏗️ Project Structure (Vertical Slice Architecture)

```
app/
├── components/            # Shared UI components (MUST have prop documentation)
├── hooks/                # Shared custom hooks (MUST have usage examples)
├── utils/                # Helper functions (MUST have JSDoc with examples)
├── types/                # Shared TypeScript types
├── lib/                  # Third-party library configurations
├── features/              # Feature-based modules
│   └── [feature]/
│       ├── components/    # Feature components
│       ├── hooks/         # Feature-specific hooks
│       ├── api/           # API integration (MUST document endpoints)
│       ├── schemas/       # Zod validation schemas (MUST document validation rules)
│       ├── types/         # TypeScript types (MUST document complex types)
│       └── index.ts       # Public API (MUST have @module documentation)
└── routes/               # React Router routes
```

## 📁 Absolute Import System (MANDATORY)

### MUST Use Absolute Imports
- **NEVER use relative imports** beyond the current directory level
- **ALWAYS use absolute imports** for cross-feature dependencies
- **MUST use specific path aliases** for better organization

### Path Aliases Configuration
```typescript
// Available path aliases (configured in tsconfig.json)
import { Component } from '~/components/Component';                    // Legacy alias
import { Component } from '@/components/Component';                    // Shared components
import { FeatureComponent } from '@/features/auth/components/Button';  // Feature components
import { useCustomHook } from '@/hooks/useCustomHook';               // Shared hooks
import { useFeatureHook } from '@/features/auth/hooks/useAuth';       // Feature hooks
import { utilities } from '@/utils/helpers';                         // Shared utilities
import { featureUtils } from '@/features/auth/utils/helpers';         // Feature utilities
import { ApiTypes } from '@/types/api';                              // Shared types
import { FeatureTypes } from '@/features/auth/types/common';          // Feature types
import { config } from '@/lib/config';                               // Library configs
```

### Import Hierarchy (STRICT ORDER)
1. **External libraries** (React, third-party packages)
2. **Internal absolute imports** (using @ aliases)
3. **Relative imports** (only for same-directory files)

```typescript
// ✅ CORRECT: Proper import order
import { ReactElement } from 'react';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ApiResponse } from '@/types/api';

import { LocalHelper } from './LocalHelper';
import { ComponentStyles } from './Component.styles';

// ❌ FORBIDDEN: Relative imports for cross-feature dependencies
import { Button } from '../../components/Button';
import { useAuth } from '../../../features/auth/hooks/useAuth';
```

### Path Alias Guidelines (MANDATORY)
- **`~/*`**: Legacy alias for general app directory access
- **`@/*`**: General app directory access (preferred)
- **`@/components/*`**: Shared UI components
- **`@/features/*`**: Feature-specific modules
- **`@/hooks/*`**: Shared custom React hooks
- **`@/utils/*`**: Shared helper functions and utilities
- **`@/types/*`**: Shared TypeScript type definitions
- **`@/lib/*`**: Third-party library configurations

### FORBIDDEN Import Patterns
- **NEVER use `../../../` style imports** for cross-feature access
- **NEVER use relative imports** to access shared utilities/components
- **NEVER use relative imports** to access other features
- **NEVER mix relative and absolute imports** for the same module type

## 🎯 TypeScript Configuration (STRICT REQUIREMENTS) Assume strict requirements even if project settings are looser

### MUST follow These Compiler Options
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "allowJs": false
  }
}
```

### MANDATORY Type Requirements
- **NEVER use `any` type** - use `unknown` if type is truly unknown
- **MUST have explicit return types** for all functions and components
- **MUST use proper generic constraints** for reusable components
- **MUST use type inference from Zod schemas** using `z.infer<typeof schema>`
- **NEVER use `@ts-ignore`** or `@ts-expect-error` - fix the type issue properly

### Type Safety Hierarchy (STRICT ORDER)
1. **Specific Types**: Always prefer specific types when possible
2. **Generic Constraints**: Use generic constraints for reusable code
3. **Unknown**: Use `unknown` for truly unknown data that will be validated
4. **Never `any`**: The only exception is library declaration merging (must be commented)

### Branded Type Safety (MANDATORY)
- **MUST use Schema.parse() to convert plain types to branded types**
- **NEVER assume external data matches branded types**
- **Always validate at system boundaries**

```typescript
// ✅ CORRECT: Convert plain types to branded types
const cvId = CVIdSchema.parse(numericId);

// ❌ FORBIDDEN: Assuming type without validation
const cvId: CVId = numericId; // Type assertion without validation
```

### ExactOptionalPropertyTypes Compliance (MANDATORY)
- **MUST handle `undefined` vs `null` properly** in API interfaces
- **MUST use conditional spreads** instead of passing `undefined` to optional props
- **MUST convert `undefined` to `null`** for API body types

```typescript
// ✅ CORRECT: Handle exactOptionalPropertyTypes properly
const apiCall = async (data?: string) => {
  return fetch('/api', {
    method: 'POST',
    body: data ? JSON.stringify({ data }) : null,  // null, not undefined
  });
};

// Conditional prop spreading for optional properties
<Input
  label="Email"
  error={errors.email?.message}
  {...(showHelper ? { helperText: "Enter valid email" } : {})}  // Conditional spread
/>

// ❌ FORBIDDEN: Passing undefined to optional properties
<Input
  label="Email"
  error={errors.email?.message}
  helperText={showHelper ? "Enter valid email" : undefined}  // undefined not allowed
/>
```

## ⚡ React 19 Power Features

### Instant UI Patterns
- Use Suspense boundaries for ALL async operations
- Leverage Server Components for data fetching
- Use the new Actions API for form handling
- Let React Compiler handle optimization

### Component Templates
```typescript
// Quick component with all states
export function FeatureComponent(): ReactElement {
  const { data, isLoading, error } = useQuery({
    queryKey: ['feature'],
    queryFn: fetchFeature
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorBoundary error={error} />;
  if (!data) return <EmptyState />;

  return <FeatureContent data={data} />;
}

## 🛡️ Data Validation with Zod (MANDATORY FOR ALL EXTERNAL DATA)

### MUST Follow These Validation Rules
- **MUST validate ALL external data**: API responses, form inputs, URL params, environment variables
- **MUST use branded types**: For all IDs and domain-specific values
- **MUST fail fast**: Validate at system boundaries, throw errors immediately
- **MUST use type inference**: Always derive TypeScript types from Zod schemas
- **NEVER trust external data** without validation
- **MUST validate before using** any data from outside the application

### Schema Example (MANDATORY PATTERNS)
```typescript
import { z } from 'zod';

// MUST use branded types for ALL IDs
const UserIdSchema = z.string().uuid().brand<'UserId'>();
type UserId = z.infer<typeof UserIdSchema>;

// MUST include validation for ALL fields
export const userSchema = z.object({
  id: UserIdSchema,
  email: z.string().email(),
  username: z.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  age: z.number().min(18).max(100),
  role: z.enum(['admin', 'user', 'guest']),
  metadata: z.object({
    lastLogin: z.string().datetime(),
    preferences: z.record(z.unknown()).optional(),
  }),
});

export type User = z.infer<typeof userSchema>;

// MUST validate ALL API responses
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().optional(),
    timestamp: z.string().datetime(),
  });
```

## 🧪 Testing Strategy (MANDATORY REQUIREMENTS)

We don't do any testing at this moment.

## 💅 Code Style & Quality

### Linting Stack (MANDATORY)
- **biomejs/biome** for both formatting and linting
- **Pre-commit validation** must pass before any commit

### Biome Integration (MANDATORY)
- **Complete Coverage**: All files MUST pass biomejs/biome linting with zero warnings

## 🎨 Component Guidelines (STRICT REQUIREMENTS)

### MANDATORY TypeScript Requirements
```typescript
// ✅ REQUIRED: Explicit types, clear props, separate interface definition
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'medium',
  onClick,
  children,
  disabled = false,
}) => {
  // Implementation
};

// ❌ FORBIDDEN: Inline prop types
const Button = ({ variant, onClick, children }: { variant: string; onClick: () => void; children: React.ReactNode }) => {
  // Implementation
};

// ❌ FORBIDDEN: Implicit types, loose typing
const Button = ({ variant, onClick, children }: any) => {
  // Implementation
};
```

### Component Integration (STRICT REQUIREMENTS)
- **MUST verify actual prop names** before using components
- **MUST use exact callback parameter types** from component interfaces
- **NEVER assume prop names match semantic expectations**
- **MUST import proper types** for callback parameters

```typescript
// ✅ CORRECT: Verify component interface and use exact prop names
import { EducationList } from './EducationList';
import { EducationSummary } from './schemas';

<EducationList
  cvId={cvId}
  onSelectEducation={(education: EducationSummary) => handleEdit(education.id)}
  onCreateEducation={() => handleCreate()}
  showCreateButton={showActions}  // Not showAddButton
  showActions={showActions}
/>

// ❌ FORBIDDEN: Assuming prop names without verification
<EducationList
  cvId={cvId}
  onEditEducation={(education) => handleEdit(education.id)}  // Wrong prop name
  onAddEducation={() => handleCreate()}  // Wrong prop name
  showAddButton={showActions}  // Wrong prop name
/>
```

### MUST Follow Component Best Practices
- **MAXIMUM 200 lines** per component file
- **MUST follow single responsibility** principle
- **MUST define separate prop interfaces** - NEVER use inline prop types
- **MUST validate props** with Zod when accepting external data
- **MUST implement error boundaries** for all feature modules
- **MUST handle ALL states**: loading, error, empty, and success
- **NEVER return null** without explicit empty state handling
- **MUST include ARIA labels** for accessibility

### Component Props Requirements (MANDATORY)
- **MUST define props interface separately** from component definition
- **MUST use PascalCase naming** for props interfaces (e.g., `ButtonProps`, `HeaderProps`)
- **MUST place props interface** immediately before component definition
- **MUST export props interface** if component is exported for reuse
- **NEVER use inline prop type definitions** in component parameters

```typescript
// ✅ CORRECT: Separate props interface
interface WelcomeProps {
  title: string;
  subtitle?: string;
  onAction: (action: string) => void;
}

export function Welcome({ title, subtitle, onAction }: WelcomeProps): ReactElement {
  // Implementation
}

// ❌ FORBIDDEN: Inline prop types
export function Welcome({ title, subtitle, onAction }: { 
  title: string; 
  subtitle?: string; 
  onAction: (action: string) => void;
}): ReactElement {
  // Implementation
}
```

## 🔄 State Management (STRICT HIERARCHY)

### MUST Follow This State Hierarchy
1. **Local State**: `useState` ONLY for component-specific state
2. **Context**: For cross-component state within a single feature
4. **Global State**: Zustand ONLY when truly needed app-wide
5. **URL State**: MUST use search params for shareable state

## 🔐 Security Requirements (MANDATORY)

### Input Validation (MUST IMPLEMENT ALL)
- **MUST sanitize ALL user inputs** with Zod before processing
- **MUST validate file uploads**: type, size, and content
- **MUST prevent XSS** with proper escaping
- **MUST implement CSP headers** in production
- **NEVER use dangerouslySetInnerHTML** without sanitization

### API Security
- **MUST validate ALL API responses** with Zod schemas
- **MUST handle errors gracefully** without exposing internals
- **NEVER log sensitive data** (passwords, tokens, PII)

## 🚀 Performance Guidelines

### React 19 Optimizations
- **Trust the compiler** - avoid manual memoization
- **Use Suspense** for data fetching boundaries
- **Implement code splitting** at route level
- **Lazy load** heavy components

## ⚠️ CRITICAL GUIDELINES (MUST FOLLOW ALL)

1. **ENFORCE strict TypeScript** - ZERO compromises on type safety
2. **VALIDATE everything with Zod** - As much as possible
3. **MINIMUM 80% test coverage** - NO EXCEPTIONS
4. **MAXIMUM 200 lines per component** - Split if larger
6. **MAXIMUM cognitive complexity of 15** - Refactor if higher
7. **MUST handle ALL states** - Loading, error, empty, and success
8. **MUST use semantic commits** - feat:, fix:, docs:, refactor:, test:
9. **MUST pass ALL automated checks** - Before ANY merge

## 📦 npm Scripts

```json
{
  "scripts": {
    "build": "react-router build",
		"dev": "react-router dev",
		"start": "react-router-serve ./build/server/index.js",
		"typecheck": "react-router typegen && tsc",
		"lint": "biome check --write",
		"format": "biome format --write"
  }
}
```

## 📋 Pre-commit Checklist (MUST COMPLETE ALL)

- [ ] TypeScript compiles with ZERO errors
- [ ] Zod schemas validate ALL external data
- [ ] Biome passes with ZERO warnings
- [ ] ALL states handled (loading, error, empty, success)
- [ ] Accessibility requirements met (ARIA labels, keyboard nav)
- [ ] ZERO console.log statements
- [ ] Component props are fully documented
- [ ] Complex logic has explanatory comments
- [ ] TODOs include issue numbers
- [ ] Component files under 200 lines
- [ ] Cognitive complexity under 15 for all functions

### FORBIDDEN Practices
- **NEVER use `any` type** (except library declaration merging with comments)
- **NEVER ignore TypeScript errors**
- **NEVER trust external data without validation**
- **NEVER exceed complexity limits**
- **NEVER use `JSX.Element`** - use `ReactElement` instead
- **NEVER pass `undefined` to optional props** - use conditional spreads
- **NEVER assume component prop names** - verify interfaces first
- **NEVER use inline prop type definitions** - always define separate interfaces
- **NEVER use `global`** - use `globalThis` for cross-platform compatibility
- **NEVER omit config files from TypeScript projects** - include ALL .ts files
