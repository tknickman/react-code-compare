import { ReactCodeCompareProps } from './types.js';
import 'react';
import '@tanstack/react-virtual';
import './styles.js';
import 'create-emotion';
import './compute-lines.js';

declare function ComparisonView(props: ReactCodeCompareProps): JSX.Element;

export { ComparisonView };
