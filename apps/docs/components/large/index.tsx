import ReactDiff from "react-code-compare";

import oldJson from "../../diffs/large/old.json";
import newJson from "../../diffs/large/new.json";

import styles from './styles.module.css'

export default function LargeDiff() {
  return (
    <div className={styles.container}>
      <ReactDiff
        oldValue={JSON.stringify(oldJson, null, 2)}
        newValue={JSON.stringify(newJson, null, 2)}
      />
    </div>
  );
}
