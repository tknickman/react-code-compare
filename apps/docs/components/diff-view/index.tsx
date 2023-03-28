import { useEffect, useRef } from "react";
import {
  ComparisonView,
  ReactCodeCompareStylesOverride,
  DiffMethod,
} from "react-code-compare";

import styles from "./styles.module.css";

const theme = "light";

export const splitViewStyles: ReactCodeCompareStylesOverride = {
  diffContainer: {
    maxWidth: "100%",
    pre: {
      lineHeight: "16px",
    },
  },
  contentText: {
    overflowWrap: "anywhere",
  },
  codeFoldContent: {
    overflowWrap: "anywhere",
  },
  // splitCellLeft: {
  //   backgroundColor: "blue",
  // },
  splitCellRight: {
    backgroundColor: "lightgray",
  },
  diffRemoved: {
    borderTop: `1px solid ${theme === "dark" ? "#4c0408" : "#ff3349"}`,
    borderBottom: `1px solid ${theme === "dark" ? "#4c0408" : "#ff3349"}`,
    ".hljs-string": {
      color: "var(--geist-foreground) !important",
    },
    "&:first-child": {
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
      position: "relative",
      overflow: "hidden",
      borderLeftStyle: "solid",
      borderColor: theme === "dark" ? "#4c0408" : "#ff3349",

      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: 5,
        height: "100%",
        backgroundColor: theme === "dark" ? "#ff2b3a" : "#fdb8c0",
      },
    },

    "&:nth-child(3)": {
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      borderRightStyle: "solid",
      borderColor: theme === "dark" ? "#4c0408" : "#ff3349",
    },
  },
  diffAdded: {
    borderTop: `1px solid ${theme === "dark" ? "#02492a" : "#37ea69"}`,
    borderBottom: `1px solid ${theme === "dark" ? "#02492a" : "#37ea69"}`,
    ".hljs-string": {
      color: "var(--geist-foreground) !important",
    },
    "&:nth-child(4)": {
      borderLeftStyle: "solid",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
      position: "relative",
      overflow: "hidden",
      borderColor: theme === "dark" ? "#02492a" : "#37ea69",

      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: 5,
        height: "100%",
        backgroundColor: theme === "dark" ? "#1f572d" : "#acf2bd",
      },
    },
    "&:last-child": {
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      borderRightStyle: "solid",
      borderColor: theme === "dark" ? "#02492a" : "#37ea69",
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
    <div className={styles.container} ref={diffView}>
      <ComparisonView
        splitView={isSplit}
        showDiffOnly={true}
        compareMethod={DiffMethod.WORDS_WITH_SPACE}
        oldValue={oldVal}
        newValue={newVal}
        styles={splitViewStyles}
        onDiffExpand={onDiffExpand}
        parentRef={diffView}
        useVirtual
        virtualizerOptions={{
          estimateSize: () => 20,
          overscan: 10,
        }}
      />
    </div>
  );
}
