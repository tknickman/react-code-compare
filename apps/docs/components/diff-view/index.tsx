import { useEffect, useRef } from "react";
import {
  DiffViewer,
  ReactDiffViewerStylesOverride,
  DiffMethod,
} from "react-code-compare";

import styles from "./styles.module.css";

export const splitViewStyles: ReactDiffViewerStylesOverride = {
  diffContainer: {
    maxWidth: "100%",
  },
  contentText: {
    overflowWrap: "anywhere",
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
      <DiffViewer
        splitView={isSplit}
        showDiffOnly={true}
        compareMethod={DiffMethod.LINES}
        oldValue={oldVal}
        newValue={newVal}
        styles={splitViewStyles}
        onDiffExpand={onDiffExpand}
        parentRef={diffView}
        useVirtual
      />
    </div>
  );
}
