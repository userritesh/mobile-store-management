# Change Log

This document explains the recent codebase updates, including the files changed, why the changes were made, and what the changes do.

## Summary

The project was extended to support a more modern, secure architecture:

- Added Docker support for backend/frontend orchestration.
- Added GraphQL support on the Django backend.
- Added Angular Apollo client support for GraphQL.
- Added secure token handling with browser storage and IndexedDB.
- Added a proper HTTP interceptor for bearer token authorization.
- Updated Django settings for PostgreSQL, Graphene, CORS, and HTTPS-ready deployment.
- Added project documentation and startup guidance.

## Files and Changes

### `README.md`
- Added documentation for Docker and GraphQL setup.
- Added instructions for starting containers with Docker Compose.
- Added a change summary section for this project update.

### `CHANGELOG.md`
- New file documenting all major project changes, reasons, and affected files.

### `package.json`
- Added runtime dependencies for GraphQL and IndexedDB:
  - `@apollo/client`
  - `apollo-angular`
  - `graphql`
  - `idb`
- This enables Apollo GraphQL client support in the Angular frontend.

### `tsconfig.json`
- Added `skipLibCheck: true` to allow third-party type definitions (Apollo) to compile without blocking the build.
- This keeps the project build stable while using compatible GraphQL packages.

### `angular.json`
- Verified existing build configuration and budget behavior.
- The app can now build successfully after dependency updates.

### `mobile_mgmt/requirements.txt`
- New backend Python dependency manifest for Docker and GraphQL support.
- Includes Django, PostgreSQL driver, Django REST Framework, Graphene Django, CORS handling, and Gunicorn.

### `mobile_mgmt/Dockerfile`
- New Dockerfile for the Django backend.
- Installs Python dependencies and runs Django with Gunicorn.

### `Dockerfile.frontend`
- New Dockerfile for building and serving the Angular frontend with nginx.

### `docker-compose.yml`
- New Docker Compose service orchestration:
  - `backend`: Django service
  - `frontend`: Angular service served by nginx
  - `db`: PostgreSQL database
- Simplifies local development and deployment.

### `mobile_mgmt/.env`
- New environment file for the backend Docker service.
- Stores database credentials and HTTPS/CORS settings.

### `.dockerignore` and `mobile_mgmt/.dockerignore`
- New ignore files to reduce Docker build context and prevent sensitive files from being copied.

### `nginx.conf`
- New nginx configuration for frontend routing and proxying `/api/` and `/graphql/` to the backend.
- Enables SPA route fallback and API proxy support.

### `mobile_mgmt/mobile_mgmt/settings.py`
- Added support for environment-based configuration.
- Added Graphene/Django GraphQL support.
- Added PostgreSQL fallback with environment-driven `DATABASES`.
- Added CORS origin configuration and secure HTTPS-ready cookie settings.
- Added GraphQL schema configuration and proxy SSL header support.

### `mobile_mgmt/mobile_mgmt/urls.py`
- Added GraphQL endpoint route at `/graphql/`.
- Kept existing API routes under inventory app.

### `mobile_mgmt/inventory/schema.py`
- New GraphQL schema file with query types and a sample mutation.
- Exposes dashboard cards, stock categories, product categories, products, and selling items via GraphQL.

### `src/app/shared/storage.service.ts`
- Reworked storage helper for safe browser storage usage.
- Added browser detection and in-memory fallback.
- Added typed get/set methods and robust error handling.
- Keeps session storage as the default storage location.

### `src/app/shared/indexeddb.service.ts`
- New IndexedDB service for persistent client storage.
- Used for remember-me token persistence and rehydration across reloads.

### `src/app/core/services/auth.service.ts`
- Added a real token management API.
- `saveToken(token, rememberMe)` writes tokens to storage and optionally IndexedDB.
- `getToken()` reads from session or local storage.
- `loadTokenFromStorage()` restores tokens from IndexedDB into session storage.
- `clearToken()` removes tokens from all storage backends.

### `src/app/core/services/auth.interceptor.ts`
- New HTTP interceptor that injects `Authorization: Bearer <token>` into outgoing HTTP requests.
- Centralizes auth header management and avoids manual header setup in services.

### `src/app/core/services/graphql.service.ts`
- New Angular GraphQL client setup using Apollo.
- Establishes an Apollo client with auth headers and cache.
- Uses the token from `AuthService` for GraphQL requests.

### `src/app/app.component.ts`
- Added startup logic to restore persisted tokens from IndexedDB when the app initializes.
- Ensures the auth header is available after browser refresh.

### `src/app/app.module.ts`
- Registered the HTTP interceptor.
- Added Apollo modules for GraphQL support.
- Kept existing Angular module configuration intact.

### `src/app/features/store/pages/product-list/product-list.component.ts`
- Fixed a type issue by handling `null` return from storage access.
- Set a safe default string value for `titalname`.

## Why these changes were made

The goal was to move the project toward a modern, production-ready architecture:

- Use Docker for deterministic local development and consistent deployments.
- Use PostgreSQL in production instead of SQLite.
- Add GraphQL support for more flexible frontend data access.
- Use secure token storage patterns with session storage and IndexedDB.
- Centralize auth headers via an HTTP interceptor.
- Keep the existing Angular + Django app working while adding these improvements.

## Result

The application now has:

- A Dockerized frontend/backend stack.
- GraphQL endpoint in Django.
- Apollo GraphQL client setup in Angular.
- Secure token persistence with IndexedDB.
- Clear project documentation for the changes.
