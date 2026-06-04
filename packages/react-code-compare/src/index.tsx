import { CodeCompare as CodeCompareProvider, useCodeCompare } from "./context";
import { ComparisonView } from "./diff";
import { DiffMethod } from "./compute-lines";
import { ReactCodeCompareProps } from "./types";
import { ReactCodeCompareStylesOverride } from "./styles";

export default function DiffView(props: ReactCodeCompareProps) {
  return (
    <CodeCompareProvider>
      <ComparisonView {...props} />
    </CodeCompareProvider>
  );
}
export { CodeCompareProvider, useCodeCompare} 
export { ReactCodeCompareStylesOverride, DiffMethod, ComparisonView };
