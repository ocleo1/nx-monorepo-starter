# Nx Monorepo Starter

Nx monorepo using workspaces, but different from official demo

1. using `apps` and `libs`
2. extending `tsconfig.base.json`

See

- https://nx.dev/getting-started/tutorials/npm-workspaces-tutorial
- https://nx.dev/getting-started/tutorials/react-monorepo-tutorial

## Requirements

1. `package.json` engines
2. only `devDependencies` in root `package.json`

## Build

`npx nx graph`. Check dependency graph, make sure there are no circular dependencies

### Production

`npx nx run-many -t build`

### Development

`npx nx run-many -t build:dev`

### CSS

If webpack is not bundling css from node_modules, see below

- https://stackoverflow.com/a/67649823/6277806
- https://stackoverflow.com/a/56602748/6277806

## Run

### Production

1. `npx nx run @example-app/hello:build --graph`
2. `npx nx build @example-app/hello` or `npx nx run @example-app/hello:build`
3. `npx nx serve @example-app/hello` or `npx nx run @example-app/hello:serve`

### Development

1. `npx nx run-many -t build:dev`
2. `npx nx run @example-app/hello:build:dev --graph`
3. `npx nx watch:serve @example-lib/components` or `npx nx run @example-lib/components:watch:serve` and other libs
4. open another terminal. `npx nx watch:serve @example-app/hello` or `npx nx run @example-app/hello:watch:serve`

## Architecture

### Concept

- `apps`, applications' entry
- `libs`, applications' module

See [Applications and libraries](https://nx.dev/more-concepts/applications-and-libraries)

### Libraries

```
libs
|_<module_name>
  |_src
  | |_components           /* optional, module common components */
  | |_constants            /* optional, module common constants */
  | |_pages
  | | |_Page1
  | |   |_components       /* page components */
  | |   |_constants        /* optional, page constants */
  | |   |_context.ts       /* optional, page context */
  | |   |_error.ts         /* optional, page error catch */
  | |   |_index.tsx        /* page entry */
  | |   |_slice.ts         /* optional, page slice */
  | |   |_thunks.ts        /* optional, page thunks */
  | |_slice.ts             /* optional, module common slice */
  | |_index.ts             /* module entry */
  | |_routes.tsx           /* module routes */
  | |_reducer.ts           /* module reducer */
  |_styles                 /* module styles */
  |_package.json
  |_tsconfig-cjs.json      /* transpile cjs */
  |_tsconfig.json          /* transpile esm */
```
