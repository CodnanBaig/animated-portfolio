# Animated Portfolio - Developer Context

This is a modern, animated portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. It features a responsive design with dark/light mode support, smooth animations, and accessible UI components.

## Project Overview

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Project Structure

```
animated-portfolio/
├── app/                 # Next.js app directory (pages and layouts)
│   ├── about/          # About page
│   ├── projects/       # Projects page
│   ├── contact/        # Contact page
│   └── layout.tsx      # Root layout with theme provider
├── components/         # React components
│   ├── ui/            # Reusable UI components (from shadcn/ui)
│   ├── sections/      # Page sections (hero, about, projects, etc.)
│   ├── nav-bar.tsx    # Navigation bar component
│   └── footer.tsx     # Footer component
├── public/            # Static assets (images, icons)
├── lib/               # Utility functions (cn helper)
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── ...
```

## Key Technologies & Libraries

- **Next.js**: React framework for production with SSR/SSG
- **TypeScript**: For type safety throughout the project
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Accessible UI components built with Radix UI and Tailwind CSS
- **Framer Motion**: Production-ready motion library for React
- **next-themes**: Theme provider for Next.js applications
- **React Hook Form**: Performant, flexible forms with easy validation
- **Zod**: TypeScript-first schema declaration and validation library
- **Lucide React**: Beautiful & consistent icon toolkit

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use ESLint for code linting (`npm run lint`)
   - Write meaningful component and function names
   - Add comments for complex logic

2. **Component Structure**
   - Keep components small and focused
   - Use TypeScript interfaces for props (defined in `types/index.ts`)
   - Implement proper error boundaries
   - Follow accessibility guidelines

3. **Styling**
   - Use Tailwind CSS classes for styling
   - Leverage `cn()` utility for conditional class merging
   - Define custom colors in `tailwind.config.ts`
   - Use CSS variables for theming (defined in `app/globals.css`)

4. **Performance**
   - Use Next.js Image component for images
   - Implement proper code splitting
   - Optimize animations
   - Monitor bundle size

## Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Files and Patterns

1. **Theme Management**:
   - `components/theme-provider.tsx` wraps the app with `next-themes`
   - Uses CSS variables for theme colors defined in `app/globals.css`
   - Default theme is set to "dark" in `app/layout.tsx`

2. **Component Utilities**:
   - `lib/utils.ts` contains `cn()` helper for merging Tailwind classes
   - Component props are typed using interfaces defined in `types/index.ts`

3. **Navigation**:
   - `components/nav-bar.tsx` handles site navigation
   - Navigation items are defined as `NavItem` types

4. **Layout**:
   - `app/layout.tsx` defines the root layout with metadata and theme provider
   - Includes global CSS and font configurations

## Common Patterns

1. **Component Props**:
   - Components extend `BaseProps` which includes `className` and `children`
   - Complex components have dedicated TypeScript interfaces in `types/index.ts`

2. **Styling**:
   - Class names are conditionally applied using `cn()` utility
   - Theme-aware colors are defined in Tailwind config and used as `bg-background`, `text-foreground`, etc.

3. **Animations**:
   - Framer Motion is used for page transitions and component animations
   - Components can implement custom animations using Framer Motion primitives

When working on this project, prioritize:
- Maintaining type safety with TypeScript
- Following the established component structure and styling patterns
- Ensuring accessibility in UI components
- Optimizing performance for production builds