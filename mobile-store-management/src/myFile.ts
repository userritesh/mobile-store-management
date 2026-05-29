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
