# Lerna Monorepo Starter

## Requirements

- npm >=7. It starts support workspace. Node v16 shipped with npm v8, recommended.
- lerna =6. v7 has bootstrap and other commands deprecated.
- Others. Check `package.json` engines.

## Initialization

1. `npx lerna@6 clean --yes`
2. `npx lerna@6 bootstrap --force-local`

## Run locally

1. `npx lerna@6 run build`
2. `cd apps/<app_name>`
3. `npm run start`

## Build

1. `npx nx graph`. Check dependency graph, make sure there are no circular dependencies
2. `npx lerna@6 run build`

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
