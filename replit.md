# CEO Darlington Fashion House

## Overview
A React-based fashion e-commerce website for CEO Darlington Fashion House Ltd. The site features a curated collection of premium fashion wears and accessories.

## Tech Stack
- React 19
- TypeScript
- Vite (build tool)
- React Router DOM (routing)
- Lucide React (icons)
- Tailwind CSS (via CDN)

## Project Structure
- `index.html` - Main HTML entry point
- `index.tsx` - React application entry point
- `App.tsx` - Main application component with routing
- `ShopContext.tsx` - Shop context for state management
- `components/` - Reusable UI components
- `pages/` - Page components
- `constants.tsx` - Application constants
- `types.ts` - TypeScript type definitions

## Development
The application runs on port 5000 using Vite's development server.

## Build
Run `npm run build` to create a production build in the `dist` directory.

## Configuration
- `vite.config.ts` - Vite configuration (includes Gemini API key environment variable support)
- `tsconfig.json` - TypeScript configuration
