import { LineInformation } from "./compute-lines";
import { Row } from "./Row";
import { ReactCodeCompareStyles } from "./styles";
import { LineNumberPrefix } from "./constants";
import { LineDiffViewOptions, OnLineNumberClickProxy } from "./types";
import { Line } from "./Line";

export function SplitView({
  lineInformation,
  styles,
  xSpacer,
  highlightLines,
  onLineNumberClickProxy,
  diffViewOptions,
  rowIndex,
  rowRef,
}: {
  lineInformation: LineInformation;
  styles: ReactCodeCompareStyles;
  xSpacer: boolean;
  highlightLines: string[];
  onLineNumberClickProxy: OnLineNumberClickProxy;
  diffViewOptions: LineDiffViewOptions;
  rowIndex?: number;
  rowRef?: (node: HTMLTableRowElement) => void;
}): JSX.Element {
  const { left, right } = lineInformation;
  return (
    <Row styles={styles} rowRef={rowRef} index={rowIndex}>
      {xSpacer && <td className={styles.xOuterSpacer} />}
      <Line
        line={left}
        prefix={LineNumberPrefix.LEFT}
        styles={styles}
        highlightLines={highlightLines}
        onLineNumberClickProxy={onLineNumberClickProxy}
        diffViewOptions={diffViewOptions}
        splitPosition="left"
      />
      {xSpacer && <td className={styles.xCenterSpacer} />}
      <Line
        line={right}
        prefix={LineNumberPrefix.RIGHT}
        styles={styles}
        highlightLines={highlightLines}
        onLineNumberClickProxy={onLineNumberClickProxy}
        diffViewOptions={diffViewOptions}
        splitPosition="right"
      />
      {xSpacer && <td className={styles.xOuterSpacer} />}
    </Row>
  );
}
