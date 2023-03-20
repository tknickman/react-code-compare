import { LineInformation } from "./compute-lines";
import { Row } from "./Row";
import { ReactDiffViewerStyles } from "./styles";
import { LineNumberPrefix } from "./constants";
import { LineDiffViewOptions, OnLineNumberClickProxy } from "./types";
import { Line } from "./Line";

export function SplitView({
  lineInformation,
  styles,
  highlightLines,
  onLineNumberClickProxy,
  diffViewOptions,
}: {
  lineInformation: LineInformation;
  styles: ReactDiffViewerStyles;
  highlightLines: string[];
  onLineNumberClickProxy: OnLineNumberClickProxy;
  diffViewOptions: LineDiffViewOptions;
}): JSX.Element {
  const { left, right } = lineInformation;
  return (
    <Row styles={styles}>
      <Line
        line={left}
        prefix={LineNumberPrefix.LEFT}
        styles={styles}
        highlightLines={highlightLines}
        onLineNumberClickProxy={onLineNumberClickProxy}
        diffViewOptions={diffViewOptions}
      />
      <Line
        line={right}
        prefix={LineNumberPrefix.RIGHT}
        styles={styles}
        highlightLines={highlightLines}
        onLineNumberClickProxy={onLineNumberClickProxy}
        diffViewOptions={diffViewOptions}
      />
    </Row>
  );
}
