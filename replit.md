# Certificate Management System

## Overview

This is a full-stack certificate management application built with React, Express, TypeScript, and PostgreSQL. The system allows users to generate professional certificates, store them in a database, and manage them through a comprehensive dashboard. It features a modern UI built with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reload with Vite integration

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless driver for PostgreSQL

### API Layer
- **REST API**: Express.js routes for certificate CRUD operations
- **Endpoints**:
  - `GET /api/certificates` - List all certificates with optional filtering
  - `GET /api/certificates/:id` - Get specific certificate
  - `POST /api/certificates` - Create new certificate
- **Validation**: Shared Zod schemas ensure consistent data validation

### Frontend Components
- **Pages**: Landing, Certificate Generation, Dashboard, 404
- **UI Components**: Complete shadcn/ui component library
- **Certificate Template**: Custom PDF-ready certificate design
- **Navigation**: Responsive navigation with mobile support

### PDF Generation
- **Library**: html2canvas + jsPDF for client-side PDF generation
- **Template**: Custom certificate template with professional styling
- **Download**: Direct download functionality for generated certificates

## Data Flow

1. **Certificate Creation**:
   - User fills form with certificate details
   - Form validation using Zod schemas
   - Preview generation with certificate template
   - PDF generation and download
   - Data persistence to PostgreSQL database

2. **Certificate Management**:
   - Dashboard displays all certificates in table format
   - Search and filter functionality by student name and course
   - Real-time data fetching with TanStack Query
   - Responsive design for mobile and desktop

3. **Data Persistence**:
   - Certificate data stored in PostgreSQL
   - Drizzle ORM handles type-safe database operations
   - Shared schemas between frontend and backend
   - Automatic timestamp tracking

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form state management
- **zod**: Runtime type validation
- **html2canvas**: HTML to canvas conversion
- **jspdf**: PDF generation

### UI Dependencies
- **@radix-ui/***: Headless UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution
- **esbuild**: Fast JavaScript bundler

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Server**: Express server with Vite middleware for HMR
- **Database**: Requires `DATABASE_URL` environment variable
- **Port**: Configurable, defaults to Express server port

### Production Build
- **Frontend**: `vite build` creates optimized static assets
- **Backend**: `esbuild` bundles server code for Node.js
- **Assets**: Static files served from `dist/public`
- **Database**: PostgreSQL connection via `DATABASE_URL`

### Environment Configuration
- **Required**: `DATABASE_URL` for PostgreSQL connection
- **Optional**: `NODE_ENV` for environment-specific behavior
- **Database Migrations**: `npm run db:push` for schema updates

### Architecture Decisions

**Database Choice**: PostgreSQL was chosen for its reliability, ACID compliance, and excellent TypeScript support through Drizzle ORM. This provides strong data consistency for certificate records.

**ORM Selection**: Drizzle ORM offers type safety, zero-runtime overhead, and excellent developer experience compared to alternatives like Prisma or TypeORM.

**PDF Generation**: Client-side PDF generation was chosen to reduce server load and provide immediate download capability, though this requires modern browser support.

**UI Framework**: shadcn/ui provides a complete component system with excellent accessibility and customization options while maintaining consistent design.

**State Management**: TanStack Query handles server state efficiently with caching, background refetching, and optimistic updates, reducing the need for additional state management libraries.

## Recent Changes

### January 31, 2025
- ✓ Built complete certificate management system with React frontend
- ✓ Created professional certificate template with PDF generation (html2canvas + jsPDF)
- ✓ Implemented admin dashboard with search, filtering, and certificate management
- ✓ Added Spanish language support throughout the application
- ✓ Set up responsive design for mobile and desktop compatibility
- ✓ Configured in-memory storage for immediate functionality
- → Database connection pending: Supabase DATABASE_URL authentication needs verification