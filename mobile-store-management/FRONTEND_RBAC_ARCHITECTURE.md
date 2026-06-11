Frontend RBAC Architecture (Angular 19)

Overview
- Purpose: an enterprise-grade folder layout and integration guide for permission-based RBAC, lazy-loading, and UI-level access control.
- State: use Angular Signals for auth/permission runtime state; adopt NgRx only when complex cross-feature flows or heavy side-effects are required.

Recommended folder structure (project `src/app`)

 - app/
   - app.routes.ts               # root routes, lazy-load entries with `data.permissions`
   - app.component.ts/html/scss  # shell, includes `<app-sidebar>` and `<router-outlet>`
   - core/                       # singleton services, interceptors, guards, directives
     - auth/
       - auth.service.ts         # login/refresh/logout, Signal storage for tokens/user
       - auth.interceptor.ts     # attach access token, refresh on 401
       - models.ts               # TokenResponse, User types
     - permission/
       - permission.service.ts   # hasPermission(), hasAny(), hasAll(), wildcard support
     - guards/
       - permission.guard.ts     # CanActivate/CanLoad reading `data.permissions`
     - directives/
       - has-permission.directive.ts  # `*hasPermission` structural directive
     - ui/
       - sidebar/                # standalone `SidebarComponent` rendering menu
     - menu/
       - menu.service.ts         # menu tree with `permission` field
     - state/
       - auth.signal.ts
       - permission.signal.ts
   - features/                    # lazy-loaded feature modules or standalone components
     - products/
       - products.routes.ts       # exported route config with `data.permissions`
       - pages/
         - products-list.component.ts
         - products-edit.component.ts
   - shared/
     - components/                # buttons, modals, data-table, header
     - utils/                     # common helpers (formatters, api wrappers)
   - permissions.ts               # centralized permission keys constants

Key design decisions
- Permission-first: use permission keys (e.g., `product.create`) rather than hardcoded role checks in the UI.
- Token contents: keep access token small (short TTL, include `perms` array or `permission_set_id`).
- Refresh token: HttpOnly Secure cookie containing opaque refresh token. Rotate on use and store hashed value server-side.
- Frontend storage: store access token in memory (Signals); persist minimal user data if needed. Use BroadcastChannel for multi-tab sync.
- Guards & route data: annotate lazy routes with `data: { permissions: ['product.view'] }` and protect with `PermissionGuard` using `CanLoad` + `CanActivate`.
- Button-level control: `*hasPermission="'product.create'"` or `*hasPermission="{keys:['product.create','product.edit'],mode:'any'}"`.
- Menu rendering: `MenuService` exposes a menu tree; `SidebarComponent` filters the menu via `PermissionService.hasPermission`.

State strategy
- Simple: Signals for `auth.accessToken`, `auth.user`, `auth.permissions`. Components read `computed()` permission signals.
- Complex: NgRx for global data (orders, cart, sync) combined with Signals for UI-level state. Keep auth as Signals and bridge to NgRx via selectors/effects when required.

Lazy-loading & standalone components
- Use `loadChildren` or `loadComponent` for feature lazy-loading. Always attach `data.permissions`.
- Use `standalone: true` for small UI components to reduce module coupling.

Permission caching & performance
- Cache user permissions server-side in Redis and return `permission_set_id` in token or login response when permission lists are large.
- Frontend should fetch permissions once at login/refresh and cache in memory with TTL. For immediate revocation, backend increments `token_version` forcing clients to re-authenticate or call refresh.

Security & best practices
- Always enforce permissions server-side for each protected endpoint. Frontend checks are only for UX.
- Use RS256 for JWTs with a JWKS endpoint if you plan to scale microservices.
- CSRF: use SameSite cookies + double-submit cookie pattern for refresh endpoint if needed.
- Rotate refresh tokens on use and detect reuse for session theft.

Integration with existing code
- The project contains `src/app/core/auth/*`, `permission/*`, `directives/*`, and `core/ui/sidebar/sidebar.component.ts` implemented as examples. Use these as the canonical integration points.

Developer notes and examples
- Route example (app.routes.ts):

  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(m => m.productsRoutes),
    data: { permissions: ['product.view'] },
    canLoad: [PermissionGuard],
  }

- Button directive usage:
  <button *hasPermission="'product.create'">Add Product</button>

Next steps / optional scaffolding
- Scaffold feature modules (products, orders) with example pages and use the `PermissionGuard` and `*hasPermission` directive.
- Add UI polish for `SidebarComponent` (icons, collapsible groups, search).

Contact me if you want me to scaffold full feature modules and integrate the sidebar into the existing `app.component`.
