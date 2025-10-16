# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application
- `npm run dev` - Start development server with hot reloading using Node.js --watch
- The server runs on port 3000 by default (configurable via `PORT` environment variable)

### Code Quality
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint with automatic fixes
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting without making changes

### Database Operations
- `npm run db:generate` - Generate database migrations using Drizzle Kit
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio for database management

## Architecture Overview

### Tech Stack
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js with security middleware (Helmet, CORS)
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **Authentication**: JWT tokens with HTTP-only cookies
- **Validation**: Zod schemas
- **Logging**: Winston with file and console transports

### Project Structure
The codebase follows a modular architecture with clear separation of concerns:

```
src/
├── config/         # Configuration files (database, logger)
├── controllers/    # Request handlers and business logic
├── models/         # Database schemas (Drizzle ORM)
├── routes/         # API route definitions
├── services/       # Business logic and data operations
├── utils/          # Utility functions (JWT, cookies, formatting)
├── validations/    # Zod validation schemas
├── app.js          # Express app configuration
├── server.js       # Server startup
└── index.js        # Entry point
```

### Import Path Aliases
The project uses import aliases defined in package.json for cleaner imports:
- `#config/*` → `./src/configs/*`
- `#controllers/*` → `./src/controllers/*`
- `#middleware/*` → `./src/middleware/*`
- `#models/*` → `./src/models/*`
- `#routes/*` → `./src/routes/*`
- `#services/*` → `./src/services/*`
- `#utils/*` → `./src/utils/*`
- `#validations/*` → `./src/validations/*`

### Authentication Flow
- User registration via `/api/auth/sign-up`
- Password hashing using bcrypt (salt rounds: 10)
- JWT tokens stored in HTTP-only cookies with 15-minute expiration
- Token contains user ID, email, and role for authorization

### Database Layer
- Uses Drizzle ORM with PostgreSQL (Neon serverless)
- Database configuration in `src/config/database.js`
- Models define table schemas (currently: users table)
- Migrations managed through Drizzle Kit

### Logging Strategy
- Winston logger with different transports based on environment
- File logging: `logs/error.log` (errors only) and `logs/combined.log` (all levels)
- Console logging in non-production environments
- Request logging via Morgan middleware

### Code Style
- ESLint configuration with recommended rules
- Prettier for code formatting
- 2-space indentation, single quotes, semicolons required
- Arrow functions preferred, no unused variables (except with `_` prefix)