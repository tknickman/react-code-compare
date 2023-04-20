import { MouseEvent } from 'react';
import { VirtualizerOptions } from '@tanstack/react-virtual';
import { ReactCodeCompareStylesOverride } from './styles.js';
import { DiffMethod, LineInformation } from './compute-lines.js';
import 'create-emotion';

type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type AdditionalVirtualizerOptions = Omit<PartialKeys<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>, "observeElementRect" | "observeElementOffset" | "scrollToFn">, "count" | "getScrollElement">;
interface ReactCodeCompareProps {
    oldValue: string;
    newValue: string;
    splitView?: boolean;
    linesOffset?: number;
    disableWordDiff?: boolean;
    compareMethod?: DiffMethod;
    extraLinesSurroundingDiff?: number;
    hideLineNumbers?: boolean;
    showDiffOnly?: boolean;
    renderContent?: (source: string) => JSX.Element;
    codeFoldMessageRenderer?: (totalFoldedLines: number, leftStartLineNumber: number, rightStartLineNumber: number) => JSX.Element;
    onLineNumberClick?: (lineId: string, event: MouseEvent<HTMLTableCellElement>) => void;
    onDiffExpand?: (expandedBlocks: number[]) => void;
    highlightLines?: string[];
    styles?: ReactCodeCompareStylesOverride;
    useDarkTheme?: boolean;
    leftTitle?: string | JSX.Element;
    rightTitle?: string | JSX.Element;
    useVirtual?: boolean;
    parentRef?: React.RefObject<HTMLDivElement>;
    virtualizerOptions?: AdditionalVirtualizerOptions;
}
type VirtualTableProps = Pick<ReactCodeCompareProps, "hideLineNumbers" | "useVirtual" | "parentRef" | "codeFoldMessageRenderer" | "splitView">;
type SkippedLineIndicatorProps = Pick<ReactCodeCompareProps, "hideLineNumbers" | "codeFoldMessageRenderer" | "splitView">;
type SHORT_PREFIX = "L" | "R";
type LineDiffViewOptions = Pick<ReactCodeCompareProps, "hideLineNumbers" | "splitView" | "renderContent">;
type LineAdditionalOptions = {
    additionalLineNumber?: number;
    additionalPrefix?: SHORT_PREFIX;
};
type LineProps = {
    additionalOptions?: LineAdditionalOptions;
    diffViewOptions: LineDiffViewOptions;
};
type OnBlockClickProxy = (id: number) => (e: MouseEvent<HTMLAnchorElement>) => void;
type OnLineNumberClickProxy = (id: string) => (e: MouseEvent<HTMLTableCellElement>) => void;
interface ReactCodeCompareState {
    expandedBlocks?: number[];
}
type SkippedRowData = {
    type: "skipped";
    data: {
        num: number;
        blockNumber: number;
        leftBlockLineNumber: number;
        rightBlockLineNumber: number;
    };
};
type RowData = {
    type: "split" | "unified";
    data: {
        order?: "left" | "right";
        line: LineInformation;
        index: number;
    };
};
type AllRowData = Array<SkippedRowData | RowData>;

export { AdditionalVirtualizerOptions, AllRowData, LineAdditionalOptions, LineDiffViewOptions, LineProps, OnBlockClickProxy, OnLineNumberClickProxy, PartialKeys, ReactCodeCompareProps, ReactCodeCompareState, RowData, SHORT_PREFIX, SkippedLineIndicatorProps, SkippedRowData, VirtualTableProps };
