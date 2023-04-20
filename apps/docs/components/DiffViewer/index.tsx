import ReactDiff, {
  ReactCodeCompareStylesOverride,
  DiffMethod,
} from "react-code-compare";

import styles from "./styles.module.css";

export default function DiffView({
  oldVal,
  newVal,
  splitView = false,
}: {
  oldVal: string;
  newVal: string;
  splitView?: boolean;
}) {
  return (
    <div className={styles.container}>
      <ReactDiff
        showDiffOnly={true}
        splitView={splitView}
        compareMethod={DiffMethod.LINES}
        oldValue={oldVal}
        newValue={newVal}
        useDarkTheme
      />
    </div>
  );
}