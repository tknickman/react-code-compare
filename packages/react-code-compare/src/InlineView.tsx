import { LineInformation, DiffType } from "./compute-lines";
import { Row } from "./Row";
import { ReactCodeCompareStyles } from "./styles";
import { LineNumberPrefix } from "./constants";
import { LineDiffViewOptions, OnLineNumberClickProxy } from "./types";
import { Line } from "./Line";

export function InlineView({
  lineInformation,
  styles,
  highlightLines,
  onLineNumberClickProxy,
  diffViewOptions,
}: {
  lineInformation: LineInformation;
  styles: ReactCodeCompareStyles;
  highlightLines: string[];
  onLineNumberClickProxy: OnLineNumberClickProxy;
  diffViewOptions: LineDiffViewOptions;
}): JSX.Element {
  const { left, right } = lineInformation;

  if (left.type === DiffType.REMOVED && right.type === DiffType.ADDED) {
    return (
      <>
        <Row styles={styles}>
          <Line
            line={left}
            prefix={LineNumberPrefix.LEFT}
            styles={styles}
            highlightLines={highlightLines}
            onLineNumberClickProxy={onLineNumberClickProxy}
            diffViewOptions={diffViewOptions}
          />
        </Row>
        <Row styles={styles}>
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
      </>
    );
  }

  if (left.type === DiffType.REMOVED) {
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
      </Row>
    );
  }
  if (left.type === DiffType.DEFAULT) {
    return (
      <Row styles={styles}>
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
      <Row styles={styles}>
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
