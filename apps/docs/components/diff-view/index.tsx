import { useEffect, useRef } from "react";
import {
  ComparisonView,
  ReactCodeCompareStylesOverride,
  DiffMethod,
} from "react-code-compare";

import styles from "./styles.module.css";

export const splitViewStyles: ReactCodeCompareStylesOverride = {
  diffContainer: {
    maxWidth: '100%',
    pre: {
      lineHeight: '16px',
    },
  },
  contentText: {
    overflowWrap: 'anywhere',
  },
  codeFoldContent: {
    overflowWrap: "anywhere",
  },
  gutter: {
    '&:nth-child(even)': {
      backgroundColor: '#111111',
      borderLeft: '1px solid var(--accents-2)',
    },
  },
  marker: {
    '&:nth-child(odd)': {
      backgroundColor: '#111111',
    },
  },
  content: {
    width: '50%',
    '&:nth-child(even)': {
      backgroundColor: '#111111',
      '.hljs-string': {
        border: 'unset',
        '&:before': {
          content: 'unset',
        },
      },
    },
  },
};

export default function DiffView({
  oldVal,
  newVal,
  isSplit,
  onDiffExpand,
}: {
  oldVal: string;
  newVal: string;
  isSplit: boolean;
  onDiffExpand: (expandedBlocks: number[]) => void;
}) {
  const diffView = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (newVal !== "" && oldVal !== "") {
      console.timeEnd("Received values");
    }
  }, [newVal, oldVal]);

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>Header L</div>
          <div className={styles.headerRight}>Header R</div>
        </div>
      </div>
      <div className={styles.container} ref={diffView}>
        <ComparisonView
          splitView={isSplit}
          showDiffOnly={true}
          compareMethod={DiffMethod.LINES}
          oldValue={oldVal}
          newValue={newVal}
          styles={splitViewStyles}
          onDiffExpand={onDiffExpand}
          parentRef={diffView}
          useVirtual
          virtualizerOptions={{
            estimateSize: () => 20,
            overscan: 0,
          }}
        />
      </div>
    </>
  );
}
