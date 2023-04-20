export { CodeCompare as CodeCompareProvider, useCodeCompare } from './context.js';
export { ComparisonView } from './diff.js';
export { DiffMethod } from './compute-lines.js';
import { ReactCodeCompareProps } from './types.js';
export { ReactCodeCompareStylesOverride } from './styles.js';
import 'react';
import '@tanstack/react-virtual';
import 'create-emotion';

declare function DiffView(props: ReactCodeCompareProps): JSX.Element;

export { DiffView as default };
