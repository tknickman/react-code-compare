import Link from "next/link";
import DiffViewer from "../components/diff-view";

const OLD_VALUE = `function greet(name) {
  console.log("Hello, " + name);
  return name;
}

const user = "world";
greet(user);`;

const NEW_VALUE = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

const user = "world";
greet(user);`;

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "2rem 1.5rem 4rem",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ marginBottom: 0 }}>react-code-compare</h1>
      <p style={{ color: "#555", marginTop: ".25rem" }}>
        A fast, flexible React diff viewer with built-in virtualization for
        large diffs.
      </p>

      <h2>Install</h2>
      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          borderRadius: 6,
          overflowX: "auto",
        }}
      >
        <code>npm install react-code-compare</code>
      </pre>

      <h2>Usage</h2>
      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          borderRadius: 6,
          overflowX: "auto",
        }}
      >
        <code>{`import DiffView from "react-code-compare";

<DiffView oldValue={oldValue} newValue={newValue} splitView />`}</code>
      </pre>
      <p>
        See the{" "}
        <a
          href="https://github.com/tknickman/react-code-compare#readme"
          target="_blank"
          rel="noreferrer"
        >
          README
        </a>{" "}
        for the full props table and the hooks/context API.
      </p>

      <h2>Live example</h2>
      <DiffViewer oldVal={OLD_VALUE} newVal={NEW_VALUE} />

      <h2>More examples</h2>
      <ul>
        <li>
          <Link href="/small">Small diff</Link> — standard renderer with
          interactive controls (split/unified toggle, jump-to, fold reset).
        </li>
        <li>
          <Link href="/large">Large diff</Link> — the virtualized renderer over
          a multi-thousand-line diff.
        </li>
      </ul>
    </main>
  );
}
