import ReactDiff from "react-code-compare";

import oldJson from "../diffs/small/old.json";
import newJson from "../diffs/small/new.json";

export default function Examples() {
  return (
    <div>
      <h1>Basic Example</h1>
      <ReactDiff
        oldValue={JSON.stringify(oldJson, null, 2)}
        newValue={JSON.stringify(newJson, null, 2)}
      />
    </div>
  );
}
