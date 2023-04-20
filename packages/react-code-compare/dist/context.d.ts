import * as react from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Virtualizer } from '@tanstack/react-virtual';
import { ReactCodeCompareState, AllRowData } from './types.js';
import './styles.js';
import 'create-emotion';
import './compute-lines.js';

declare const CodeCompareContext: react.Context<{
    resetCodeBlocks: () => boolean;
    getIndex: (content: string) => number;
    expandedBlocks: ReactCodeCompareState["expandedBlocks"];
    setExpandedBlocks: Dispatch<SetStateAction<ReactCodeCompareState["expandedBlocks"]>>;
    virtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
    setVirtualizer: Dispatch<SetStateAction<Virtualizer<HTMLDivElement, HTMLTableRowElement>>>;
    items: AllRowData;
    setItems: Dispatch<SetStateAction<AllRowData>>;
}>;
declare function CodeCompare({ children }: {
    children: React.ReactNode;
}): JSX.Element;
declare function useCodeCompare(): {
    resetCodeBlocks: () => boolean;
    getIndex: (content: string) => number;
    expandedBlocks: number[];
    setExpandedBlocks: Dispatch<SetStateAction<number[]>>;
    virtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
    setVirtualizer: Dispatch<SetStateAction<Virtualizer<HTMLDivElement, HTMLTableRowElement>>>;
    items: AllRowData;
    setItems: Dispatch<SetStateAction<AllRowData>>;
};

export { CodeCompare, CodeCompareContext, useCodeCompare };
