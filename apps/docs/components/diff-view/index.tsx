import { useEffect } from "react";
import ReactDiff, {
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
}: {
  oldVal: string;
  newVal: string;
}) {
  useEffect(() => {
    if (newVal !== "" && oldVal !== "") {
      console.timeEnd('Received values')
    }
  }, [newVal, oldVal]);

  return (
    <div className={styles.container}>
      <ReactDiff
        showDiffOnly={true}
        compareMethod={DiffMethod.LINES}
        oldValue={oldVal}
        newValue={newVal}
        styles={splitViewStyles}
      />
    </div>
  );
}
