import { LineInformation } from './compute-lines.js';
import { ReactCodeCompareStyles } from './styles.js';
import { OnLineNumberClickProxy, LineDiffViewOptions } from './types.js';
import 'create-emotion';
import 'react';
import '@tanstack/react-virtual';

declare function SplitView({ lineInformation, styles, highlightLines, onLineNumberClickProxy, diffViewOptions, rowIndex, rowRef, }: {
    lineInformation: LineInformation;
    styles: ReactCodeCompareStyles;
    highlightLines: string[];
    onLineNumberClickProxy: OnLineNumberClickProxy;
    diffViewOptions: LineDiffViewOptions;
    rowIndex?: number;
    rowRef?: (node: HTMLTableRowElement) => void;
}): JSX.Element;

export { SplitView };
