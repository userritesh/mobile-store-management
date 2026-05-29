# MobileStoreManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project change summary

This project now includes additional modern deployment and data layers:

- `CHANGELOG.md` documents the recent architecture and security improvements.
- Docker support has been added for the backend, frontend, and database.
- GraphQL support has been added to the Django backend and Angular frontend.
- Token storage now uses browser storage and IndexedDB for safer persistence.

For full details, see `CHANGELOG.md`.

## Docker and GraphQL

This project now includes a Docker-based backend and frontend setup with GraphQL support.

- `docker-compose.yml` starts PostgreSQL, Django backend, and Angular frontend.
- Backend GraphQL endpoint is available at `http://localhost:8000/graphql/`.
- Frontend client is built and served by nginx in the container.

To run:

```bash
docker compose up --build
```

Then open `http://localhost:4200` in your browser.
