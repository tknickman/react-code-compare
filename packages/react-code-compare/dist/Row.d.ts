import { Ref } from 'react';
import { ReactCodeCompareStyles } from './styles.js';
import 'create-emotion';

declare function Row({ className, styles, children, index, rowRef, }: {
    className?: string;
    styles: ReactCodeCompareStyles;
    children: React.ReactNode;
    index?: number;
    rowRef?: Ref<HTMLTableRowElement>;
}): JSX.Element;

export { Row };
