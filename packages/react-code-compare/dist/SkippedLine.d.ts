import { SkippedLineIndicatorProps, OnBlockClickProxy } from './types.js';
import { ReactCodeCompareStyles } from './styles.js';
import 'react';
import '@tanstack/react-virtual';
import './compute-lines.js';
import 'create-emotion';

declare function SkippedLinesIndicator({ splitView, onBlockClickProxy, codeFoldMessageRenderer, hideLineNumbers, styles, num, blockNumber, leftBlockLineNumber, rightBlockLineNumber, rowIndex, rowRef, }: SkippedLineIndicatorProps & {
    onBlockClickProxy: OnBlockClickProxy;
    styles: ReactCodeCompareStyles;
    num: number;
    blockNumber: number;
    leftBlockLineNumber: number;
    rightBlockLineNumber: number;
    rowIndex?: number;
    rowRef?: (node: HTMLTableRowElement) => void;
}): JSX.Element;

export { SkippedLinesIndicator };
