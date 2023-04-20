import { LineInformation } from './compute-lines.js';
import { ReactCodeCompareStyles } from './styles.js';
import { RowData, OnLineNumberClickProxy, LineDiffViewOptions } from './types.js';
import 'create-emotion';
import 'react';
import '@tanstack/react-virtual';

declare function InlineView({ lineInformation, order, styles, highlightLines, onLineNumberClickProxy, diffViewOptions, rowRef, rowIndex }: {
    lineInformation: LineInformation;
    order?: RowData["data"]["order"];
    styles: ReactCodeCompareStyles;
    highlightLines: string[];
    onLineNumberClickProxy: OnLineNumberClickProxy;
    diffViewOptions: LineDiffViewOptions;
    rowRef?: (node: HTMLTableRowElement) => void;
    rowIndex?: number;
}): JSX.Element;

export { InlineView };
