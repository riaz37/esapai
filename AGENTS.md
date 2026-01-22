# AGENTS.md - Coding Guidelines for ESAP AI

This document provides comprehensive guidelines for agentic coding assistants working on the ESAP AI project. It covers build/lint/test commands, code style conventions, and development practices.

## 🚀 Build, Lint, and Test Commands

### Development
- **Start dev server**: `pnpm dev`
- **Start dev server with Turbopack**: `pnpm dev:turbo`

### Production Builds
- **Build for production**: `pnpm build`
- **Build with Turbopack**: `pnpm build:turbo`
- **Build with bundle analysis**: `pnpm build:analyze`
- **Start production server**: `pnpm start`

### Code Quality
- **Run ESLint**: `pnpm lint`
- **Type check**: `npx tsc --noEmit` (TypeScript strict mode enabled)

### Testing
**Note**: No test framework is currently configured. When adding tests:
- Use Vitest for unit/component testing
- Use Playwright for E2E testing
- Run single test: `pnpm test -- <test-file-path>`
- Run tests in watch mode: `pnpm test -- --watch`

## 📝 Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled with all strict checks
- **Target**: ES2017
- **JSX**: React JSX transform (`react-jsx`)
- **Module resolution**: Bundler (supports path aliases)
- **Path aliases**: `@/*` maps to project root

### Import Organization
```typescript
// 1. React imports first
import React from "react";

// 2. Third-party libraries (alphabetical)
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";

// 3. Local imports (use path aliases)
//   a. Types
import type { Product } from "@/types/product";
//   b. Utils/libraries
import { cn } from "@/lib/utils";
//   c. Components (relative to current file or @/components/*)
//   d. Hooks
import { useProductContent } from "@/lib/hooks/use-product-content";

// 4. Type-only imports use `import type`
import type { ComponentProps } from "react";
```

### Component Structure
```typescript
"use client"; // Add for client components

import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  // Props interface with JSDoc comments
  /** Description of the prop */
  title: string;
  className?: string;
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ title, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("base-classes", className)}
      {...props}
    >
      {title}
    </div>
  );
});

ComponentName.displayName = "ComponentName";
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (`Button.tsx`, `SectionHeader.tsx`)
- **Hooks**: camelCase with `use` prefix (`useProductContent.ts`)
- **Utils**: camelCase (`formatDate.ts`, `cn.ts`)
- **Types**: PascalCase with descriptive names (`ProductHeroProps.ts`)
- **Directories**: kebab-case (`product-hero`, `case-studies`)

#### Variables and Functions
- **Components**: PascalCase (`ProductCard`, `ServiceHero`)
- **Functions**: camelCase (`handleSubmit`, `formatCurrency`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Custom hooks**: camelCase with `use` prefix (`useIntersectionAnimation`)
- **Event handlers**: camelCase with `handle`/`on` prefix (`handleClick`, `onSubmit`)

#### TypeScript Types
- **Interfaces**: PascalCase with descriptive names (`ProductHeroProps`)
- **Types**: PascalCase (`AnimationConfig`, `ButtonVariant`)
- **Generic type params**: Single uppercase letter (`T`, `U`, `V`)

### Styling Conventions

#### Tailwind CSS
- **Class ordering**: Follow Tailwind's recommended order (layout → spacing → colors → etc.)
- **Responsive prefixes**: Use mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- **Custom utilities**: Use `cn()` utility for conditional classes
- **Dark mode**: Not implemented (single theme design)

#### Class Variance Authority (CVA)
```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes transition-all duration-500",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-500 text-black",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        lg: "px-4 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);
```

### Animation Guidelines

#### GSAP Usage
```typescript
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const AnimatedComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return <div ref={containerRef}>Content</div>;
};
```

#### Motion/Framer Motion
```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Error Handling
```typescript
// API calls
try {
  const response = await fetch("/api/data");
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();
} catch (error) {
  console.error("API Error:", error);
  // Handle error appropriately
}

// Component error boundaries
class ErrorBoundary extends React.Component {
  // Implementation following React best practices
}
```

### Performance Best Practices

#### Code Splitting
```typescript
// Dynamic imports for large components
const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <div>Loading...</div>,
});

// Route-based splitting (automatic with Next.js App Router)
```

#### Image Optimization
```typescript
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // With blurDataURL
/>
```

#### Three.js Components
```typescript
// Use lazy loading for 3D components
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false, // Disable SSR for Three.js
});

<Suspense fallback={<div>Loading 3D scene...</div>}>
  <ThreeScene />
</Suspense>
```

### Component Organization

#### File Structure
```
components/
├── features/          # Feature-specific components
│   ├── home/
│   │   ├── hero/
│   │   ├── sections/
│   │   └── components/
│   └── navigation/
├── ui/                # Reusable UI components (shadcn/ui style)
├── shared/            # Cross-feature shared components
├── three/             # Three.js specific components
└── providers/         # React context providers
```

#### Component Categories
- **Pages**: Full page components in `app/` directory
- **Features**: Feature-specific components in `components/features/`
- **UI**: Reusable primitives in `components/ui/`
- **Shared**: Cross-cutting components in `components/shared/`

### Type Definitions

#### Props Interfaces
```typescript
interface ComponentProps {
  /** Required prop with description */
  title: string;
  /** Optional prop */
  subtitle?: string;
  /** Union type for variants */
  variant?: "primary" | "secondary";
  /** Event handlers */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Children */
  children: ReactNode;
}
```

#### Type Organization
- Keep types close to their usage
- Export from `types/` directory for shared types
- Use `import type` for type-only imports

### SEO and Metadata
```typescript
// Page metadata
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO",
  openGraph: {
    title: "Open Graph Title",
    description: "Open Graph Description",
  },
};

// Structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // ... structured data properties
};
```

### Accessibility (a11y)
- Use semantic HTML elements
- Provide meaningful `alt` text for images
- Ensure keyboard navigation support
- Use ARIA attributes when necessary
- Support `prefers-reduced-motion`

### Security Best Practices
- Never expose secrets in client-side code
- Use environment variables appropriately (`NEXT_PUBLIC_` only for safe values)
- Sanitize user inputs
- Implement proper CORS policies
- Use Content Security Policy (CSP) headers

### Git Workflow
- Feature branches from `development`
- Commit messages: `type(scope): description`
  - `feat:` new features
  - `fix:` bug fixes
  - `docs:` documentation
  - `style:` formatting
  - `refactor:` code restructuring
  - `test:` testing
  - `chore:` maintenance

### Environment Variables
```env
# Server-side only (no NEXT_PUBLIC_)
ARCJET_KEY=secret
SANITY_API_READ_TOKEN=secret

# Client-side safe (NEXT_PUBLIC_)
NEXT_PUBLIC_SANITY_PROJECT_ID=public-id
NEXT_PUBLIC_GA_ID=public-id
```

### Third-party Integrations

#### Sanity CMS
```typescript
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

#### Google Analytics
```typescript
// Use the GoogleAnalyticsProvider component
<GoogleAnalyticsProvider gaId={gaId} />
```

#### Web3Forms (Contact)
```typescript
const response = await fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    access_key: process.env.WEB3FORMS_ACCESS_KEY,
    // form data
  }),
});
```

## 🧪 Testing Guidelines (Future Implementation)

### Unit Tests
```typescript
// Use Vitest with React Testing Library
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### Component Tests
- Test user interactions
- Test prop variations
- Test accessibility
- Mock external dependencies

### E2E Tests (Playwright)
```typescript
// Basic E2E test
test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("ESAP AI");
});
```

## 🔍 Code Review Checklist

- [ ] TypeScript types are correct and complete
- [ ] ESLint passes without errors
- [ ] Components follow the established patterns
- [ ] Accessibility considerations included
- [ ] Performance optimizations applied where needed
- [ ] Security best practices followed
- [ ] Tests added/updated (when testing is implemented)
- [ ] Documentation updated if needed

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Three.js Docs](https://threejs.org/docs/)
- [Sanity Documentation](https://www.sanity.io/docs)

---

**Last updated**: January 22, 2026
**Project version**: ESAP AI v0.1.0</content>
<parameter name="filePath">/Users/riazulislam/Developer/work/esapai/AGENTS.md