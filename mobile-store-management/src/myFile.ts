/*
  Change summary for modified project files:

  README.md
    - Use: informs developers what was added and how to start the Docker + GraphQL system.
    - Change: documented the new Docker, frontend/backend, and storage improvements.
    - Implementation: update README to include project change summary and run command.

  docker-compose.yml
    - Use: defines the container orchestration for backend, frontend, and database.
    - Change: added Docker support for local development and deployment.
    - Implementation: use `docker compose up --build` to start all services together.

  Dockerfile.frontend
    - Use: builds the Angular frontend into a production container image.
    - Change: added frontend Docker build instructions.
    - Implementation: builds the Angular app for nginx serving inside Docker.


    nginx.conf
    - Use: configures nginx to serve the built Angular frontend and route traffic.
    - Change: added reverse proxy / static asset configuration for the frontend container.
    - Implementation: use nginx as the web server for the frontend image and map incoming HTTP requests to the Angular app.

  mobile_mgmt/Dockerfile
    - Use: builds the Django backend in a container.
    - Change: added backend Docker build instructions including Python dependencies.
    - Implementation: install Python packages, configure Django, and run the app in a container.

  mobile_mgmt/.env
    - Use: stores environment variables used by Django and Docker compose.
    - Change: added an env file to configure database connection, debug mode, hosts, and security flags.
    - Implementation: set variables such as DJANGO_DEBUG, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, DJANGO_ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, DJANGO_SECURE_SSL_REDIRECT, and DJANGO_CSRF_TRUSTED_ORIGINS.

  angular.json
    - Use: controls Angular production build size limits.
    - Change: raised budgets to support heavier dependencies like Apollo, Bootstrap, and GraphQL.
    - Implementation: modify production budget settings so builds do not fail on larger bundles.

  mobile_mgmt/mobile_mgmt/settings.py
    - Use: configures Django environment, CORS, database, and Graphene GraphQL.
    - Change: made DEBUG and hosts environment-driven, added PostgreSQL fallback, registered Graphene.
    - Implementation steps:
        1. import os and define env helper functions.
        2. set DEBUG from DJANGO_DEBUG env var.
        3. build ALLOWED_HOSTS and CORS_ALLOWED_ORIGINS from env vars.
        4. choose PostgreSQL if POSTGRES_DB exists or fallback to SQLite.
        5. enable Graphene schema and secure proxy/SSL settings.

  mobile_mgmt/mobile_mgmt/urls.py
    - Use: exposes backend GraphQL endpoint at /graphql/.
    - Change: added GraphQLView and route mapping.
    - Implementation: import GraphQLView and add path('graphql/', GraphQLView.as_view(graphiql=True)).

  package.json
    - Use: installs frontend GraphQL/Apollo, IndexedDB helper support, and any TanStack libraries used for data handling.
    - Change: added @apollo/client, apollo-angular, graphql, and idb dependencies.
    - Implementation: add required client libraries for GraphQL queries and persistent storage.
    - Note: TanStack refers to a suite of frontend libraries such as TanStack Query and TanStack Table; it is used for efficient data fetching, caching, and rich table/UI data handling.

  package-lock.json
    - Use: locks the exact npm package versions after dependency changes.
    - Change: updated to record package tree and dev metadata.
    - Implementation: regenerate after package install so npm reproducibly installs the same versions.

  src/app/app.component.ts
    - Use: application bootstrap step to restore authentication state.
    - Change: added ngOnInit() call to load token from storage.
    - Implementation: call AuthService.loadTokenFromStorage() during startup.

  src/app/app.module.ts
    - Use: module setup for Apollo, HTTP interceptors, and global providers.
    - Change: imported ApolloModule and registered AuthInterceptor.
    - Implementation: add ApolloModule to imports and AuthInterceptor to providers.

  src/app/core/services/auth.service.ts
    - Use: central token management for auth persistence.
    - Change: added methods to save, retrieve, clear, and load tokens with local/session storage and IndexedDB.
    - Implementation: use StorageService for browser storage and IndexedDbService for long-term persistence.

  src/app/core/services/auth.interceptor.ts
    - Use: automatically attach Authorization header to outgoing HTTP requests.
    - Change: created an HttpInterceptor that reads token from AuthService.
    - Implementation: clone requests with Authorization Bearer header when token exists.

  src/app/core/services/graphql.service.ts
    - Use: configure the Apollo client and attach auth headers to GraphQL requests.
    - Change: set GraphQL endpoint and combine auth context with HttpLink.
    - Implementation: create Apollo client with authLink.concat(http) and InMemoryCache.

  src/app/features/store/pages/product-list/product-list.component.ts
    - Use: loads store products and handles item selection/cart actions.
    - Change: refactored product fetch to use route params and service subscribe logic.
    - Implementation: get route id, call service getAllProductsById(id), and update item list.

  src/app/shared/storage.service.ts
    - Use: safe wrapper around sessionStorage and localStorage.
    - Change: added JSON serialization, browser detection, and in-memory fallback.
    - Implementation: use storage when available, otherwise fallback to Map-based memory.

  src/app/shared/indexeddb.service.ts
    - Use: persistent browser storage for long-lived data like keep-alive auth tokens.
    - Change: added IndexedDB openDB helper and get/set/remove methods.
    - Implementation: define DB and object store, then expose async storage operations.

  tsconfig.json
    - Use: TypeScript compile options for the Angular app.
    - Change: enabled skipLibCheck to ignore type errors in external libraries.
    - Implementation: add skipLibCheck to compilerOptions to reduce build issues from dependency types.

  web-search-guidance
    - Use: find the latest documentation, examples, and implementation patterns.
    - Change: added guidance for what to search and why.
    - Implementation: use official docs and targeted queries to implement Docker, Django + Graphene, Apollo/GraphQL, IndexedDB, and TanStack correctly.
    - Recommended searches:
        * "Docker Compose Angular Django setup"
        * "Graphene Django GraphQL endpoint setup"
        * "Apollo Angular GraphQL client setup"
        * "IndexedDB Angular idb usage"
        * "TanStack Query vs React Query" or "TanStack Table usage"
        * "CORS Django Angular configuration"
*/

/* PROJECT FLOW (brief)
  1. Setup
    - Create and activate virtualenv, install `requirements.txt`.
    - Run `python manage.py migrate` and `python manage.py createsuperuser`.

  2. Start services
    - Dev: `python manage.py runserver` for backend and `ng serve` for frontend.
    - Docker: `docker compose up --build` (if using docker-compose).

  3. Authentication
    - Client POSTs credentials to `/accounts/login`.
    - Server returns short-lived JWT (access token) and sets a rotated refresh token in an HttpOnly cookie.

  4. Making API requests
    - Client includes `Authorization: Bearer <access_token>` header.
    - `JWTAuthentication` decodes token, sets `request.user`.
    - Views (DRF viewsets) run permission checks; `HasPermission` consults `rbac.UserRole` and `RolePermission`.

  5. Token lifecycle
    - Access token expires; client calls `/accounts/refresh` to rotate refresh token and obtain a new access token.
    - Logout revokes refresh tokens and clears the cookie.

  6. Admin / RBAC
    - Use Django admin to create users and assign `Role` entries (e.g., Admin, Client).
    - Admin actions create roles and set `is_staff` for admin UI access.

  7. CRUD operations
    - Client calls viewset endpoints (e.g., `/api/products/`), serializers validate and `perform_create`/`perform_update` run.
    - Responses use the standardized `success_response` payload: `{isSuccess, message, data}`.

  8. Media & files
    - Configure `MEDIA_URL` and `MEDIA_ROOT` in settings and serve during development.

  9. Developer checks
    - Create Admin and Client users, assign roles, test login and role-restricted endpoints.
 */

/* DETAILED BEHAVIORAL FLOWS
   (Append this documentation — does NOT modify runtime code.)

1) Typical API request → DB roundtrip

   Client JSON Request
       {
         "name": "iPhone 14",
         "brand": "Apple",
         "price": 799.99
       }
         ↓
       DRF ViewSet receives request
         ↓
       Serializer (e.g., ProductSerializer)
         ↓
       Validation (field types, required, custom validators)
         ↓
       Serializer.create() / Model(**validated_data)
         ↓
       Model instance saved → Database (INSERT)

   DB (SELECT/INSERT/UPDATE) completes
         ↓
       ORM returns Model instance
         ↓
       Serializer(instance) —> dict
         ↓
       ViewSet wraps in standardized payload
         ↓
       HTTP JSON Response


2) Authentication & Permission check (per request)

   Client includes: `Authorization: Bearer <access_token>` header
         ↓
       DRF `JWTAuthentication` extracts and decodes token
         ↓
       `request.user` is set (User instance)
         ↓
       Permission class `HasPermission` runs
         - Loads permission keys from `rbac.UserRole` → `Role` → `RolePermission`
         - Checks whether requested view/action key is allowed
         ↓
       If allowed: view logic runs (serializer/DB). If denied: 403 returned.


3) Admin creates user and assigns role (admin UI flow)

   Admin signs in to Django admin (`/admin/`) with superuser credentials
         ↓
       Admin → Users → Add user (or select existing)
         ↓
       Either use `UserRoleInline` add Role, or select the user and run admin action:
         - "Assign Admin role and grant admin access" (creates `Role(name='Admin')`, creates `UserRole`, sets `is_staff=True`)
         - "Assign Client role" (creates `Role(name='Client')`, creates `UserRole`)
         ↓
       DB changes: `auth_user` row created/updated; `rbac_userrole` row created


4) New user access (frontend user panel flow)

   - User opens frontend app and navigates to Login.
   - User submits credentials → frontend POST /accounts/login
   - Backend authenticates, issues access JWT and sets refresh cookie.
   - Frontend stores access token (in memory / safe storage) and optionally persists refresh behavior.
   - Frontend requests protected data (e.g., /api/mobile/) with `Authorization` header.
   - Backend authenticates token, resolves roles and permissions, and returns authorized data.
   - Frontend renders user panel; UI elements / routes guarded using permission checks (frontend `PermissionService`).


5) Logging and audit (recommended minimal flow)

   - On important actions (login, create/update/delete critical models):
       * Log user id, role(s), endpoint, request payload (redact secrets), timestamp, IP
       * Store either in central logging (stdout/ELK) or DB audit table depending on compliance needs

   Example (pseudo):
     log.info({user: user.id, roles: roles, action: 'product.create', id: product.id})

End of appended behavioral flows.
*/

/* RBAC FLOW (detailed)
  Purpose: Describe how Role-Based Access Control is modeled, enforced,
  and propagated through login, tokens, and request-time checks.

1) Models and storage
  - `Role`: named role (e.g., Admin, Client, Seller).
  - `Permission`: atomic permission keys (e.g., `product.create`).
  - `RolePermission`: mapping role -> permission.
  - `UserRole`: mapping user -> role.
  Stored in `rbac` app tables and editable from Django admin.

2) Bootstrap / seeding
  - Run seed command (e.g., `python manage.py seed_rbac`) to create
    initial `Permission` and `Role` entries used by the app.

3) Assigning roles to users (authoritative source)
  - Admin creates/edits `UserRole` rows via admin UI or admin actions.
  - Roles assigned are persisted in DB (`rbac_userrole`).

4) Login and token composition
  - On login the server collects effective permission keys for the user
    by following `UserRole -> Role -> RolePermission`.
  - The access JWT MAY include a claim with permission keys (recommended
    for performance) or a short-lived claim referencing a server-side cache.
  - A refresh token (opaque) is stored hashed in `accounts.RefreshToken`.

5) Request-time auth & enforcement
  - Client sends `Authorization: Bearer <access_token>` header.
  - `JWTAuthentication` validates token and sets `request.user`.
  - Permission class `HasPermission` runs and obtains the required keys
    declared by the view (e.g., `permission_required` mapping).
  - `HasPermission` compares required keys against the user's keys (from
    token, cache, or DB). If matched, request proceeds; otherwise 403.

6) Caching and invalidation
  - Cache user permissions in Redis to avoid DB lookups on each request.
  - When role or permission data changes, invalidate caches for affected
    users (signals or management command) so subsequent requests re-evaluate.

7) Role changes vs issued tokens
  - Access tokens are short-lived — role changes won't affect already-issued
    tokens until they expire. Options:
     a) Keep short TTL and rely on refresh rotation.
     b) Include `roles_version` or `last_role_change` in JWT and reject
       tokens with stale version on the server.

8) Frontend behavior
  - After login the frontend reads roles/permissions from the login payload
    or `/accounts/me` and keeps them in `PermissionService`.
  - UI elements, routes and actions use permission guards/directives to
    hide/disable unauthorized functionality (but server remains authoritative).

9) Audit and monitoring
  - Log role assignment changes, permission edits, and critical operations.
  - Optionally record who changed what and when for auditing.

10) Example (create product)
   - Seed `permission='product.create'` and attach to `Role(name='Seller')`.
   - Admin assigns `Seller` to Alice (`UserRole(user=Alice, role=Seller)`).
   - Alice logs in; token includes `product.create` claim.
   - Alice POSTs `/api/products/` → `HasPermission` checks `product.create` → allowed.

End RBAC FLOW.
*/

    /* ADDITIONAL CHANGES (added by RBAC implementation)
     - src/app/core/auth/models.ts: added `User` and `TokenResponse` interfaces used by frontend auth.
     - src/app/core/auth/auth.service.ts: Signals-based `AuthService` (login/refresh/logout), in-memory token and permission storage.
     - src/app/core/auth/auth.interceptor.ts: HTTP interceptor attaching `Authorization` header and handling refresh-on-401.
     - src/app/core/permission/permission.service.ts: permission helpers with wildcard (`*`) support and hasAny/hasAll APIs.
     - src/app/core/guards/permission.guard.ts: `PermissionGuard` implementing `CanLoad`/`CanActivate` reading `data.permissions`.
     - src/app/core/directives/has-permission.directive.ts: structural directive `*hasPermission` for button/action-level control.
     - src/app/core/menu/menu.service.ts: menu tree with permission keys and runtime filtering.
     - src/app/core/ui/sidebar/sidebar.component.ts: standalone `SidebarComponent` rendering permission-filtered menu.
     - src/app/core/state/auth.signal.ts, permission.signal.ts: small Signal wrappers for auth/permission reactive state.
     - src/app/permissions.ts: centralized permission key constants.
     - FRONTEND_RBAC_ARCHITECTURE.md: new document describing Angular folder structure, state strategy, and RBAC integration.

     - mobile_mgmt/requirements.txt: added `PyJWT[crypto]`, `django-redis`, `redis` for JWT and caching support.
     - mobile_mgmt/accounts/ (new app):
       - models.py: `RefreshToken` model for storing refresh token hashes and device info.
       - utils/jwt.py: helpers to create/decode JWTs using keys from settings.
       - serializers.py: `LoginSerializer`, `UserSerializer`, token response serializer.
       - views.py: `LoginView`, `RefreshView`, `LogoutView`, `MeView` (refresh token rotation, set HttpOnly cookie).
       - urls.py: auth endpoints `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/me`.
       - authentication.py: `JWTAuthentication` for DRF (decodes access token and authenticates user).
       - permissions.py: `HasPermission` DRF permission class checking token perms or cached DB perms.

     - mobile_mgmt/rbac/ (new app):
       - models.py: `Role`, `Permission`, `RolePermission`, `UserRole` mapping tables.
       - admin.py: register RBAC models in Django admin.
       - serializers.py, views.py, urls.py: admin-protected viewsets for roles and permissions.
       - management/commands/seed_rbac.py: seeds default permissions and roles.

     - mobile_mgmt/mobile_mgmt/settings.py: registered `accounts` and `rbac` apps, added JWT and Redis settings, and registered `accounts.authentication.JWTAuthentication` in `REST_FRAMEWORK`.
     - mobile_mgmt/inventory/views.py: updated `ProductViewSet` to use `HasPermission` and `permission_required` mapping for CRUD actions.

     - Database: ran `python manage.py makemigrations accounts rbac`, `python manage.py migrate`, and `python manage.py seed_rbac` to apply migrations and seed default RBAC data.

    Notes: All entries appended (no existing lines modified). Brief descriptions only; let me know if you want expanded notes per file or to include line links.
    */
