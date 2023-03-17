import { useState, useEffect } from "react";
import axios from "axios";
import DiffViewer from "../components/diff-view";

export default function LargeExample() {
  const [oldVal, setOldVal] = useState("");
  const [newVal, setNewVal] = useState("");

  useEffect(() => {
    console.time('Received values')
    console.time('Old file fetch');
    axios.get("/api/small/old").then((res) => {
      setOldVal(res.data);
    }).finally(() => {
      console.timeEnd('Old file fetch');
    });
    console.time('New file fetch');
    axios.get("/api/small/new").then((res) => {
      setNewVal(res.data);
    }).finally(() => {
      console.timeEnd('New file fetch');
    });
  }, []);

  return (
    <main>
      <h1>Small Example</h1>
      <DiffViewer oldVal={oldVal} newVal={newVal} />
    </main>
  );
}
