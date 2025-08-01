# Certificate Generator

## Overview

This is a certificate generation application built with React, Express, and TypeScript. The system allows users to generate professional certificates and download them as PDF files. It features a modern UI built with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a simple client-server architecture focused on certificate generation:

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
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reload with Vite integration

## Key Components

### API Layer
- **REST API**: Express.js routes for certificate validation
- **Endpoints**:
  - `POST /api/certificates/validate` - Validate certificate data and generate ID
- **Validation**: Shared Zod schemas ensure consistent data validation

### Frontend Components
- **Pages**: Landing, Certificate Generation, 404
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


   - No data persistence - certificates are generated on-demand

## External Dependencies

### Core Dependencies
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
- **Port**: Configurable, defaults to Express server port

### Production Build
- **Frontend**: `vite build` creates optimized static assets
- **Backend**: `esbuild` bundles server code for Node.js
- **Assets**: Static files served from `dist/public`

### Environment Configuration
- **Optional**: `NODE_ENV` for environment-specific behavior

### Architecture Decisions

**No Database**: The application is designed as a simple certificate generator without data persistence, making it lightweight and easy to deploy without database setup.

**PDF Generation**: Client-side PDF generation was chosen to reduce server load and provide immediate download capability, though this requires modern browser support.

**UI Framework**: shadcn/ui provides a complete component system with excellent accessibility and customization options while maintaining consistent design.

**State Management**: Simple React state management for form handling and preview generation, with TanStack Query for any server communication.

## Recent Changes

### February 1, 2025
- ✓ Removed all database functionality and storage layers
- ✓ Simplified to certificate generation only - no data persistence
- ✓ Removed dashboard and certificate management features
- ✓ Updated navigation to focus on certificate generation
- ✓ Streamlined API to validation endpoint only
- ✓ Updated dependencies to remove database-related packages
- ✓ Simplified deployment without database requirements