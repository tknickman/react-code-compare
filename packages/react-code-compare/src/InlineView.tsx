import { LineInformation, DiffType } from "./compute-lines";
import { Row } from "./Row";
import { ReactCodeCompareStyles } from "./styles";
import { LineNumberPrefix } from "./constants";
import { LineDiffViewOptions, OnLineNumberClickProxy, RowData } from "./types";
import { Line } from "./Line";

export function InlineView({
  lineInformation,
  order,
  styles,
  highlightLines,
  onLineNumberClickProxy,
  diffViewOptions,
  rowRef,
  rowIndex
}: {
  lineInformation: LineInformation;
  order?: RowData["data"]["order"];
  styles: ReactCodeCompareStyles;
  highlightLines: string[];
  onLineNumberClickProxy: OnLineNumberClickProxy;
  diffViewOptions: LineDiffViewOptions;
  rowRef?: (node: HTMLTableRowElement) => void;
  rowIndex?: number;
}): JSX.Element {
  const { left, right } = lineInformation;

  if (left.type === DiffType.REMOVED && right.type === DiffType.ADDED) {
    if (order === "left") {
      return (
        <Row styles={styles} rowRef={rowRef} index={rowIndex}>
          <Line
            line={left}
            prefix={LineNumberPrefix.LEFT}
            styles={styles}
            highlightLines={highlightLines}
            onLineNumberClickProxy={onLineNumberClickProxy}
            diffViewOptions={diffViewOptions}
          />
        </Row>
      );
    }

    if (order === "right") {
      return (
        <Row styles={styles} rowRef={rowRef} index={rowIndex}>
          <Line
            line={{ ...right, lineNumber: null }}
            prefix={LineNumberPrefix.RIGHT}
            styles={styles}
            highlightLines={highlightLines}
            onLineNumberClickProxy={onLineNumberClickProxy}
            additionalOptions={{
              additionalLineNumber: right.lineNumber,
            }}
            diffViewOptions={diffViewOptions}
          />
        </Row>
      );
    }
  }

  if (left.type === DiffType.REMOVED) {
    return (
      <Row styles={styles} rowRef={rowRef} index={rowIndex}>
        <Line
          line={left}
          prefix={LineNumberPrefix.LEFT}
          styles={styles}
          highlightLines={highlightLines}
          onLineNumberClickProxy={onLineNumberClickProxy}
          diffViewOptions={diffViewOptions}
        />
      </Row>
    );
  }
  if (left.type === DiffType.DEFAULT) {
    return (
      <Row styles={styles} rowRef={rowRef} index={rowIndex}>
        <Line
          line={left}
          prefix={LineNumberPrefix.LEFT}
          styles={styles}
          highlightLines={highlightLines}
          onLineNumberClickProxy={onLineNumberClickProxy}
          additionalOptions={{
            additionalLineNumber: right.lineNumber,
            additionalPrefix: LineNumberPrefix.RIGHT,
          }}
          diffViewOptions={diffViewOptions}
        />
      </Row>
    );
  }
  if (right.type === DiffType.ADDED) {
    return (
      <Row styles={styles} rowRef={rowRef} index={rowIndex}>
        <Line
          line={{ ...right, lineNumber: null }}
          prefix={LineNumberPrefix.RIGHT}
          styles={styles}
          highlightLines={highlightLines}
          onLineNumberClickProxy={onLineNumberClickProxy}
          additionalOptions={{
            additionalLineNumber: right.lineNumber,
          }}
          diffViewOptions={diffViewOptions}
        />
      </Row>
    );
  }
}
