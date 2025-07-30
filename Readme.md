# Portfolio Website

## Overview

This is a modern React-based portfolio website designed to showcase a full-stack developer's skills, projects, and professional experience. The application is built using a full-stack architecture with React frontend, Express.js backend, and includes a contact form functionality. The website features a responsive design with modern UI components and smooth navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with proper error handling
- **Validation**: Zod schema validation for request/response data
- **Development**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL configured with Drizzle ORM
- **Database Connection**: Neon serverless PostgreSQL
- **Migrations**: Drizzle Kit for database schema management
- **Fallback Storage**: In-memory storage implementation for development
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple

## Key Components

### Page Structure
1. **Home Page**: Hero section with introduction and call-to-action buttons
2. **Profile Page**: Detailed personal information, education, and work experience
3. **Projects Page**: Portfolio showcase with filtering capabilities
4. **Skills Page**: Technical and soft skills visualization with progress bars
5. **Extracurricular Page**: Activities, volunteering, and personal interests
6. **Contact Page**: Contact form with validation and social media links

### UI Components
- **Navigation**: Fixed header with responsive mobile menu
- **Layout**: Consistent layout wrapper with header and footer
- **Footer**: Social links, quick navigation, and contact information
- **Forms**: Validated contact form with proper error handling
- **Toast Notifications**: User feedback for form submissions and actions

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode Support**: CSS variables for theme switching capability
- **Form Validation**: Client-side validation with Zod schemas
- **Loading States**: Proper loading and error states for async operations
- **SEO Optimization**: Meta tags and semantic HTML structure

## Data Flow

### Contact Form Flow
1. User fills out contact form with validation
2. Form data is validated client-side using Zod schema
3. Validated data is sent to `/api/contact` endpoint
4. Server validates the data again and logs the submission
5. Success/error response is sent back to client
6. Toast notification displays result to user

### Page Navigation
1. User clicks navigation links or buttons
2. Wouter handles client-side routing
3. Components are rendered within the Layout wrapper
4. Navigation state is maintained across page changes

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Library**: Radix UI components, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Database**: Drizzle ORM, Neon serverless PostgreSQL
- **Validation**: Zod for schema validation
- **HTTP Client**: TanStack Query for data fetching
- **Date Handling**: date-fns for date manipulation
- **Build Tools**: Vite, ESBuild, TypeScript

### Development Dependencies
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Development Server**: Express middleware integration with Vite
- **Type Checking**: TypeScript with strict configuration

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Static Assets**: Frontend assets are served from `dist/public`

### Environment Configuration
- **Development**: Uses Vite dev server with Express middleware
- **Production**: Serves built assets through Express static middleware
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Deployment Commands
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build both frontend and backend for production
- `npm run start`: Start production server
- `npm run db:push`: Push database schema changes

The application is designed to work seamlessly in Replit environment with proper development tooling and can be easily deployed to production environments that support Node.js and PostgreSQL.