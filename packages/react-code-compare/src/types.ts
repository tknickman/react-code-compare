import { MouseEvent } from "react";
import { VirtualizerOptions } from "@tanstack/react-virtual";
import { ReactCodeCompareStylesOverride } from "./styles";
import { DiffMethod, LineInformation } from "./compute-lines";

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type AdditionalVirtualizerOptions = Omit<
  PartialKeys<
    VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>,
    "observeElementRect" | "observeElementOffset" | "scrollToFn"
  >,
  "count" | "getScrollElement"
>;

export interface ReactCodeCompareProps {
  // Old value to compare.
  oldValue: string;
  // New value to compare.
  newValue: string;
  // Enable/Disable split view.
  splitView?: boolean;
  // Set line Offset
  linesOffset?: number;
  // Enable/Disable word diff.
  disableWordDiff?: boolean;
  // JsDiff text diff method from https://github.com/kpdecker/jsdiff/tree/v4.0.1#api
  compareMethod?: DiffMethod;
  // Number of unmodified lines surrounding each line diff.
  extraLinesSurroundingDiff?: number;
  // Show/hide line number.
  hideLineNumbers?: boolean;
  // Show only diff between the two values.
  showDiffOnly?: boolean;
  // Render prop to format final string before displaying them in the UI.
  renderContent?: (source: string) => JSX.Element;
  // Render prop to format code fold message.
  codeFoldMessageRenderer?: (
    totalFoldedLines: number,
    leftStartLineNumber: number,
    rightStartLineNumber: number
  ) => JSX.Element;
  // Event handler for line number click.
  onLineNumberClick?: (
    lineId: string,
    event: MouseEvent<HTMLTableCellElement>
  ) => void;
  onDiffExpand?: (expandedBlocks: number[]) => void;
  // Array of line ids to highlight lines.
  highlightLines?: string[];
  // Style overrides.
  styles?: ReactCodeCompareStylesOverride;
  // Use dark theme.
  useDarkTheme?: boolean;
  // Title for left column
  leftTitle?: string | JSX.Element;
  // Title for left column
  rightTitle?: string | JSX.Element;
  useVirtual?: boolean;
  parentRef?: React.RefObject<HTMLDivElement>;
  virtualizerOptions?: AdditionalVirtualizerOptions;
}

export type VirtualTableProps = Pick<
  ReactCodeCompareProps,
  | "hideLineNumbers"
  | "useVirtual"
  | "parentRef"
  | "codeFoldMessageRenderer"
  | "splitView"
>;

export type SkippedLineIndicatorProps = Pick<
  ReactCodeCompareProps,
  "hideLineNumbers" | "codeFoldMessageRenderer" | "splitView"
>;

export type SHORT_PREFIX = "L" | "R";

export type LineDiffViewOptions = Pick<
  ReactCodeCompareProps,
  "hideLineNumbers" | "splitView" | "renderContent"
>;

export type LineAdditionalOptions = {
  // Number of unmodified lines surrounding each line diff.
  additionalLineNumber?: number;
  additionalPrefix?: SHORT_PREFIX;
};

export type LineProps = {
  additionalOptions?: LineAdditionalOptions;
  diffViewOptions: LineDiffViewOptions;
};

export type OnBlockClickProxy = (
  id: number
) => (e: MouseEvent<HTMLAnchorElement>) => void;
export type OnLineNumberClickProxy = (
  id: string
) => (e: MouseEvent<HTMLTableCellElement>) => void;

export interface ReactCodeCompareState {
  // Array holding the expanded code folding.
  expandedBlocks?: number[];
}

export type SkippedRowData = {
  type: "skipped";
  data: {
    num: number;
    blockNumber: number;
    leftBlockLineNumber: number;
    rightBlockLineNumber: number;
  };
};

export type RowData = {
  type: "split" | "unified";
  data: {
    order?: "left" | "right";
    line: LineInformation;
    index: number;
  };
};

export type AllRowData = Array<SkippedRowData | RowData>;
