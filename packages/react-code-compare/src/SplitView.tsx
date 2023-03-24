import { LineInformation } from "./compute-lines";
import { Row } from "./Row";
import { ReactCodeCompareStyles } from "./styles";
import { LineNumberPrefix } from "./constants";
import { LineDiffViewOptions, OnLineNumberClickProxy } from "./types";
import { Line } from "./Line";

export function SplitView({
  lineInformation,
  styles,
  highlightLines,
  onLineNumberClickProxy,
  diffViewOptions,
  rowIndex,
  rowRef,
}: {
  lineInformation: LineInformation;
  styles: ReactCodeCompareStyles;
  highlightLines: string[];
  onLineNumberClickProxy: OnLineNumberClickProxy;
  diffViewOptions: LineDiffViewOptions;
  rowIndex?: number;
  rowRef?: (node: HTMLTableRowElement) => void;
}): JSX.Element {
  const { left, right } = lineInformation;
  return (
    <Row styles={styles} rowRef={rowRef} index={rowIndex}>
      <Line
        line={left}
        prefix={LineNumberPrefix.LEFT}
        styles={styles}
        highlightLines={highlightLines}
        onLineNumberClickProxy={onLineNumberClickProxy}
        diffViewOptions={diffViewOptions}
        splitPosition="left"
      />
      <Line
        line={right}
        prefix={LineNumberPrefix.RIGHT}
        styles={styles}
        highlightLines={highlightLines}
        onLineNumberClickProxy={onLineNumberClickProxy}
        diffViewOptions={diffViewOptions}
        splitPosition="right"
      />
    </Row>
  );
}
