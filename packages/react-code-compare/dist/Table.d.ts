import { ReactCodeCompareStyles } from './styles.js';
import { VirtualTableProps, AllRowData, LineDiffViewOptions, OnLineNumberClickProxy, OnBlockClickProxy } from './types.js';
import 'create-emotion';
import 'react';
import '@tanstack/react-virtual';
import './compute-lines.js';

declare function Table({ title, items, styles, splitView, hideLineNumbers, onBlockClickProxy, codeFoldMessageRenderer, highlightLines, onLineNumberClickProxy, diffViewOptions, }: VirtualTableProps & {
    title: React.ReactNode;
    items: AllRowData;
    styles: ReactCodeCompareStyles;
    highlightLines: string[];
    diffViewOptions: LineDiffViewOptions;
    onLineNumberClickProxy: OnLineNumberClickProxy;
    onBlockClickProxy: OnBlockClickProxy;
}): JSX.Element;

export { Table };
