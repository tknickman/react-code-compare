# react-code-compare

A fast, flexible React diff viewer with built-in virtualization for large diffs.

This is the monorepo for the [`react-code-compare`](./packages/react-code-compare) package — a fork of [@praneshr's](https://github.com/praneshr) excellent [react-diff-viewer](https://github.com/praneshr/react-diff-viewer) that adds:

1. A **virtual table renderer** for large diffs (powered by [@tanstack/react-virtual](https://tanstack.com/virtual/v3)).
2. **Hooks and a context API** for more flexible rendering and programmatic control.

## Install

```bash
npm install react-code-compare
# or
pnpm add react-code-compare
# or
yarn add react-code-compare
# or
bun add react-code-compare
```

See the [package README](./packages/react-code-compare/README.md) for full usage, props, and the hooks API.

## Repository layout

This is a [Turborepo](https://turborepo.com) monorepo managed with [pnpm](https://pnpm.io).

```
apps/
  docs/                     Next.js demo app with small & large diff examples
packages/
  react-code-compare/       The published npm package
  eslint-config-custom/     Shared ESLint config
  tsconfig/                 Shared TypeScript configs
```

## Development

Requires Node.js >= 16 and pnpm.

```bash
pnpm install      # install dependencies
pnpm dev          # run all packages/apps in watch mode (docs at http://localhost:3000)
pnpm build        # build everything
pnpm lint         # lint
pnpm format       # format with Prettier
```

The demo app under `apps/docs` renders both a small and a large diff so you can
compare the standard and virtualized renderers.

## License

MIT © [Tom Knickman](https://github.com/tknickman)
