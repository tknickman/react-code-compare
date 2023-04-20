import { ReactCodeCompareStyles } from './styles.js';
import { DiffInformation } from './compute-lines.js';
import { LineProps, SHORT_PREFIX, OnLineNumberClickProxy } from './types.js';
import 'create-emotion';
import 'react';
import '@tanstack/react-virtual';

declare function Line({ line, prefix, styles, highlightLines, onLineNumberClickProxy, splitPosition, additionalOptions, diffViewOptions, }: LineProps & {
    line: DiffInformation;
    prefix: SHORT_PREFIX;
    styles: ReactCodeCompareStyles;
    highlightLines: string[];
    onLineNumberClickProxy: OnLineNumberClickProxy;
    splitPosition?: "left" | "right";
    additionalLineNumber?: number;
    additionalPrefix?: SHORT_PREFIX;
}): JSX.Element;

export { Line };
