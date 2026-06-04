import { useState, useEffect } from "react";
import axios from "axios";
import DiffViewer from "../components/diff-view";
import { useCodeCompare } from "react-code-compare";

export default function LargeExample() {
  const { resetCodeBlocks, virtualizer } = useCodeCompare();
  const [oldVal, setOldVal] = useState("");
  const [jumpTo, setJumpTo] = useState(0);
  const [newVal, setNewVal] = useState("");
  const [diffExpanded, setDiffExpanded] = useState(0);
  const [isSplit, setIsSplit] = useState(true);
  const [numTableRows, setNumTableRows] = useState<number | undefined>();

  useEffect(() => {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("DiffContainer");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll("tr");
      setNumTableRows(elements.length);
    });

    if (targetNode) {
      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.time("Received values");
    console.time("Old file fetch");
    axios
      .get("/api/small/old")
      .then((res) => {
        setOldVal(res.data);
      })
      .finally(() => {
        console.timeEnd("Old file fetch");
      });
    console.time("New file fetch");
    axios
      .get("/api/small/new")
      .then((res) => {
        setNewVal(res.data);
      })
      .finally(() => {
        console.timeEnd("New file fetch");
      });
  }, []);

  const onFoldReset = () => {
    resetCodeBlocks();
  };

  return (
    <main id="DiffContainer">
      <h1>Small Example</h1>
      <pre>Table Rows in Dom: {numTableRows}</pre>
      <pre>Diff Expanded: {diffExpanded}</pre>
      <button onClick={onFoldReset}>Reset</button>
      <button
        onClick={() =>
          virtualizer &&
          virtualizer.scrollToIndex(jumpTo, {
            align: "start",
          })
        }
      >
        Jump to {jumpTo}
      </button>
      <input
        onChange={(e) => setJumpTo(Number(e.target.value))}
        value={jumpTo}
      />
      <button
        onClick={() => setIsSplit((prevVal) => !prevVal)}
      >{`Toggle View (${isSplit ? "split" : "unified"})`}</button>
      <hr />
      <DiffViewer
        oldVal={oldVal}
        newVal={newVal}
        isSplit={isSplit}
        onDiffExpand={() => setDiffExpanded((prevVal) => prevVal + 1)}
      />
    </main>
  );
}
