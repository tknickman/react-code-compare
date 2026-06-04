# docs

The demo / development app for [`react-code-compare`](../../packages/react-code-compare). A [Next.js](https://nextjs.org) (Pages Router) app that renders sample diffs so you can exercise both the standard and virtualized renderers.

## Getting started

From the monorepo root:

```bash
pnpm install
pnpm dev
```

Or run just this app:

```bash
pnpm --filter docs dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Pages

- [`/small`](http://localhost:3000/small) — a small diff (standard renderer).
- [`/large`](http://localhost:3000/large) — a large diff (virtualized renderer).

Each page fetches its `old`/`new` values from the local fixture API at
`/api/[size]/[version]` (e.g. `/api/large/old`), which serves the JSON files in
[`diffs/`](./diffs). `size` and `version` are validated against an allowlist.

## Editing

The diff component is wired up in [`components/diff-view`](./components/diff-view).
Page entries live in [`pages/`](./pages). Edits hot-reload automatically.
