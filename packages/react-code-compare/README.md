# react-code-compare

A fast, flexible React diff viewer with built-in virtualization for large diffs.

A fork of [@praneshr's](https://github.com/praneshr) excellent [react-diff-viewer](https://github.com/praneshr/react-diff-viewer) that adds:

1. **Virtual table renderer** for large diffs, powered by [@tanstack/react-virtual](https://tanstack.com/virtual/v3) — only the visible rows are mounted, so diffs with thousands of lines stay smooth.
2. **Hooks and context API** (`useCodeCompare`) for more flexible rendering and programmatic control over the diff (expanding folds, scrolling to content, etc.).

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

`react` and `react-dom` (v17 or v18) are peer dependencies.

## Usage

```tsx
import DiffView from "react-code-compare";

export function Example() {
  return (
    <DiffView
      oldValue={"const a = 1;\nconst b = 2;"}
      newValue={"const a = 1;\nconst b = 3;"}
      splitView
    />
  );
}
```

### Large diffs (virtualized)

For large inputs, enable `useVirtual` and pass a `parentRef` pointing at the
scroll container. Only on-screen rows are rendered.

```tsx
import { useRef } from "react";
import DiffView from "react-code-compare";

export function LargeExample({ oldValue, newValue }) {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      <DiffView
        oldValue={oldValue}
        newValue={newValue}
        useVirtual
        parentRef={parentRef}
      />
    </div>
  );
}
```

## Props

| Prop                        | Type                                                          | Default       | Description                                                              |
| --------------------------- | ------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------ |
| `oldValue`                  | `string`                                                      | _(required)_  | Original value to compare.                                               |
| `newValue`                  | `string`                                                      | _(required)_  | New value to compare against.                                            |
| `splitView`                 | `boolean`                                                     | `true`        | Render side-by-side (split) instead of inline (unified).                 |
| `linesOffset`               | `number`                                                      | `0`           | Starting line number offset.                                             |
| `disableWordDiff`           | `boolean`                                                     | `false`       | Disable intra-line word diffing.                                         |
| `compareMethod`             | `DiffMethod`                                                  | `DiffMethod.CHARS` | jsdiff method used to compute the diff.                             |
| `extraLinesSurroundingDiff` | `number`                                                      | `3`           | Unmodified lines shown around each change.                               |
| `hideLineNumbers`           | `boolean`                                                     | `false`       | Hide the line-number gutters.                                            |
| `showDiffOnly`              | `boolean`                                                     | `true`        | Collapse unchanged regions, showing only diffs.                          |
| `renderContent`             | `(source: string) => JSX.Element`                             | —             | Render prop to format/highlight each line before display.                |
| `codeFoldMessageRenderer`   | `(total, leftStart, rightStart) => JSX.Element`               | —             | Render prop for the "skipped lines" fold message.                        |
| `onLineNumberClick`         | `(lineId: string, e) => void`                                 | —             | Called when a line number is clicked.                                    |
| `onDiffExpand`              | `(expandedBlocks: number[]) => void`                          | —             | Called when a folded block is expanded.                                  |
| `highlightLines`            | `string[]`                                                    | `[]`          | Line ids to highlight (e.g. `["L-20", "R-30"]`).                         |
| `styles`                    | `ReactCodeCompareStylesOverride`                              | —             | Style overrides.                                                         |
| `useDarkTheme`              | `boolean`                                                     | `false`       | Use the built-in dark theme.                                             |
| `leftTitle`                 | `string \| JSX.Element`                                       | —             | Header title for the left column.                                        |
| `rightTitle`                | `string \| JSX.Element`                                       | —             | Header title for the right column.                                       |
| `useVirtual`                | `boolean`                                                     | `false`       | Enable the virtualized renderer for large diffs.                         |
| `parentRef`                 | `React.RefObject<HTMLDivElement>`                             | —             | Scroll container ref, required when `useVirtual` is enabled.             |
| `virtualizerOptions`        | `AdditionalVirtualizerOptions`                                | —             | Extra options forwarded to `@tanstack/react-virtual`.                    |
| `xSpacer`                   | `boolean`                                                     | `false`       | Add horizontal spacing in the layout.                                    |

### `DiffMethod`

The diffing granularity, re-exported from [jsdiff](https://github.com/kpdecker/jsdiff/tree/v4.0.1#api):

```ts
import { DiffMethod } from "react-code-compare";

DiffMethod.CHARS;              // "diffChars"
DiffMethod.WORDS;              // "diffWords"
DiffMethod.WORDS_WITH_SPACE;   // "diffWordsWithSpace"
DiffMethod.LINES;              // "diffLines"
DiffMethod.TRIMMED_LINES;      // "diffTrimmedLines"
DiffMethod.SENTENCES;          // "diffSentences"
DiffMethod.CSS;                // "diffCss"
```

## Hooks & context

The default export wraps your diff in a `CodeCompareProvider`. To control the
diff programmatically from your own components, render the provider yourself and
use the `useCodeCompare` hook.

```tsx
import {
  CodeCompareProvider,
  ComparisonView,
  useCodeCompare,
} from "react-code-compare";

function Toolbar() {
  const { resetCodeBlocks, getIndex, expandedBlocks, virtualizer } =
    useCodeCompare();

  const scrollToMatch = (query: string) => {
    const index = getIndex(query);
    if (index >= 0) virtualizer?.scrollToIndex(index);
  };

  return (
    <button onClick={() => resetCodeBlocks()}>Collapse all</button>
  );
}

export function App({ oldValue, newValue }) {
  return (
    <CodeCompareProvider>
      <Toolbar />
      <ComparisonView oldValue={oldValue} newValue={newValue} useVirtual />
    </CodeCompareProvider>
  );
}
```

`useCodeCompare` exposes:

| Member             | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| `resetCodeBlocks()`| Collapse all expanded fold blocks. Returns `true` if anything changed. |
| `getIndex(content)`| Find the row index whose line contains `content` (for scroll-to).      |
| `expandedBlocks`   | Currently expanded fold block numbers.                                 |
| `setExpandedBlocks`| Setter for the expanded blocks.                                        |
| `virtualizer`      | The active `@tanstack/react-virtual` virtualizer (when `useVirtual`).  |
| `items`            | The computed row data backing the table.                               |

## Exports

```ts
import DiffView, {           // default — provider-wrapped diff component
  CodeCompareProvider,        // context provider
  ComparisonView,             // the diff component (no provider)
  useCodeCompare,             // hook for programmatic control
  DiffMethod,                 // diff granularity enum
  ReactCodeCompareStylesOverride, // style override type
} from "react-code-compare";
```

## License

MIT © [Tom Knickman](https://github.com/tknickman)
