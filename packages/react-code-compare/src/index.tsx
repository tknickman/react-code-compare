import { CodeCompare } from "./context";
import DiffViewer, { DiffMethod } from "./diff";
import { ReactDiffViewerProps } from "./types";
import { ReactDiffViewerStylesOverride } from "./styles";

export default function DiffView(props: ReactDiffViewerProps) {
  return (
    <CodeCompare>
      <DiffViewer {...props} />
    </CodeCompare>
  );
}

export { CodeCompare, useCodeCompare } from "./context";
export { ReactDiffViewerStylesOverride, DiffMethod, DiffViewer };
