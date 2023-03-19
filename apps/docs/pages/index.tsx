import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DiffViewer from "../components/diff-view";
import ReactDiff from "react-code-compare";

export default function LargeExample() {
  const diffView = useRef<ReactDiff>(null);
  const [oldVal, setOldVal] = useState("");
  const [newVal, setNewVal] = useState("");
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

    // Later, you can stop observing
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
    if (diffView.current) {
      diffView.current.resetCodeBlocks();
    }
  };

  return (
    <main id="DiffContainer">
      <h1>Small Example</h1>
      <pre>Table Rows in Dom: {numTableRows}</pre>
      <button onClick={onFoldReset}>Reset</button>
      <DiffViewer oldVal={oldVal} newVal={newVal} reactDiffRef={diffView} />
    </main>
  );
}
