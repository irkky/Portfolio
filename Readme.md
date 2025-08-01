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

## Features

### 🎨 Dark Theme Support
- **Automatic Theme Detection**: Automatically detects user's system preference for light/dark mode
- **Manual Theme Toggle**: Users can manually switch between light and dark themes
- **Persistent Theme**: Theme preference is saved in localStorage
- **Smooth Transitions**: All theme changes include smooth color transitions
- **Comprehensive Dark Mode**: All components, pages, and sections support dark mode with proper contrast

### ✨ Enhanced Animations
- **Scroll-Triggered Animations**: Elements animate as they come into view
- **Multiple Animation Variants**: 
  - `fadeUp`: Elements fade in while moving up
  - `fadeIn`: Simple fade in effect
  - `scaleIn`: Elements scale in from 90% to 100%
  - `slideInLeft`: Elements slide in from the left
  - `slideInRight`: Elements slide in from the right
- **Staggered Animations**: Sequential animations with configurable delays
- **Smooth Transitions**: All animations use smooth easing functions
- **Performance Optimized**: Animations only trigger once when elements come into view

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

### 🚀 Modern Tech Stack
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Vite for fast development
- Wouter for routing

## Pages with Dark Theme & Animations

### Profile Page (`/profile`)
- **Dark Theme**: Full dark mode support with proper contrast
- **Animations**: 
  - Header section with fade-up animation
  - Profile image with scale-in effect and hover animations
  - Personal info cards with staggered slide-in animations
  - Experience timeline with sequential fade-up animations

### Skills Page (`/skills`)
- **Dark Theme**: All skill bars, tool cards, and soft skill cards support dark mode
- **Animations**:
  - Skill bars with progress animations
  - Tool cards with hover effects and staggered animations
  - Soft skill cards with gradient backgrounds that adapt to dark mode
  - Section headers with fade-up animations

### Activities Page (`/extracurricular`)
- **Dark Theme**: Activity cards and achievement badges support dark mode
- **Animations**:
  - Activity cards with hover lift effects and image scaling
  - Achievement badges with staggered animations
  - Background gradients that adapt to theme changes

## Theme Implementation

The dark theme is implemented using CSS custom properties and Tailwind's dark mode support:

```css
:root {
  --background: hsl(210, 40%, 98%);
  --foreground: hsl(215, 25%, 27%);
  /* ... other light theme variables */
}

.dark {
  --background: hsl(222, 84%, 5%);
  --foreground: hsl(210, 40%, 98%);
  /* ... other dark theme variables */
}
```

## Animation Implementation

Animations are built using Framer Motion with a custom `AnimatedSection` component:

```tsx
<AnimatedSection delay={0.2} variant="fadeUp">
  <YourContent />
</AnimatedSection>
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Theme Toggle

The theme toggle is located in the navigation bar and allows users to:
- Switch between light and dark themes
- Use system preference (default)
- Persist their choice across sessions

## Customization

### Adding New Animation Variants

To add new animation variants, modify the `AnimatedSection` component:

```tsx
const variants = {
  // ... existing variants
  yourNewVariant: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 }
  }
}
```

### Customizing Dark Mode Colors

Modify the CSS custom properties in `client/src/index.css`:

```css
.dark {
  --your-custom-color: hsl(your, values, here);
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Animations are optimized for 60fps
- Uses `transform` and `opacity` for smooth animations
- Animations only trigger once per element
- Lazy loading for better performance
