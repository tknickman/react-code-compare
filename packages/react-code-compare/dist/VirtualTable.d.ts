import { ReactCodeCompareStyles } from './styles.js';
import { VirtualTableProps, AllRowData, LineDiffViewOptions, OnLineNumberClickProxy, OnBlockClickProxy, AdditionalVirtualizerOptions } from './types.js';
import 'create-emotion';
import 'react';
import '@tanstack/react-virtual';
import './compute-lines.js';

declare function VirtualTable({ title, items, rowsKey, styles, parentRef, splitView, hideLineNumbers, onBlockClickProxy, codeFoldMessageRenderer, highlightLines, onLineNumberClickProxy, diffViewOptions, virtualizerOptions, }: VirtualTableProps & {
    title: React.ReactNode;
    items: AllRowData;
    rowsKey: string;
    styles: ReactCodeCompareStyles;
    highlightLines: string[];
    diffViewOptions: LineDiffViewOptions;
    onLineNumberClickProxy: OnLineNumberClickProxy;
    onBlockClickProxy: OnBlockClickProxy;
    virtualizerOptions?: AdditionalVirtualizerOptions;
}): JSX.Element;

export { VirtualTable };
