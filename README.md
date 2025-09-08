# Animated Portfolio

A modern, animated portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark/Light mode support
- ⚡ Fast performance with Next.js
- 📱 Fully responsive design
- 🎭 Smooth animations with Framer Motion
- ♿ Accessibility-first with Radix UI
- 🔍 SEO optimized
- 📝 TypeScript for type safety

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Icons:** Lucide React
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/animated-portfolio.git
   cd animated-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
animated-portfolio/
├── app/                 # Next.js app directory
│   ├── about/          # About page
│   ├── projects/       # Projects page
│   ├── contact/        # Contact page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── sections/      # Page sections
│   └── icons/         # Icon components
├── public/            # Static assets
├── lib/              # Utility functions
└── hooks/            # Custom React hooks
```

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use ESLint for code linting
   - Write meaningful component and function names
   - Add comments for complex logic

2. **Component Structure**
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Implement proper error boundaries
   - Follow accessibility guidelines

3. **Performance**
   - Use Next.js Image component for images
   - Implement proper code splitting
   - Optimize animations
   - Monitor bundle size

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## MCP (ReactBits) Integration

This project is configured to use the ReactBits MCP server for component discovery and assistance.

Setup:

1. Optionally create a `.env` with `GITHUB_TOKEN` to raise GitHub API limits.
2. Cursor will read `.cursorrules` and start the server automatically.
3. Or run the server manually:

```bash
pnpm mcp
```

Cursor configuration is in `.cursorrules`:

```json
{
  "mcpServers": {
    "reactbits": {
      "command": "pnpm",
      "args": ["mcp"],
      "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
    }
  }
}
```

Reference: ReactBits MCP getting started guide [`https://reactbits.dev/get-started/mcp`](https://reactbits.dev/get-started/mcp)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 