import cn from "classnames";
import { ReactCodeCompareStyles } from "./styles";
import { DiffType, DiffInformation } from "./compute-lines";
import { SHORT_PREFIX, LineProps, OnLineNumberClickProxy } from "./types";

const renderWordDiff = (
  diffArray: DiffInformation[],
  styles: ReactCodeCompareStyles,
  renderer?: (chunk: string) => JSX.Element
): JSX.Element[] =>
  diffArray.map(
    (wordDiff, i): JSX.Element => (
      <span
        key={i}
        className={cn(styles.wordDiff, {
          [styles.wordAdded]: wordDiff.type === DiffType.ADDED,
          [styles.wordRemoved]: wordDiff.type === DiffType.REMOVED,
        })}
      >
        {renderer
          ? renderer(wordDiff.value as string)
          : (wordDiff.value as string)}
      </span>
    )
  );

export function Line({
  line,
  prefix,
  styles,
  highlightLines,
  onLineNumberClickProxy,
  additionalOptions = {},
  diffViewOptions,
}: LineProps & {
  line: DiffInformation;
  prefix: SHORT_PREFIX;
  styles: ReactCodeCompareStyles;
  highlightLines: string[];
  onLineNumberClickProxy: OnLineNumberClickProxy;
  additionalLineNumber?: number;
  additionalPrefix?: SHORT_PREFIX;
}): JSX.Element {
  const { lineNumber, type, value } = line;
  const { additionalLineNumber, additionalPrefix } = additionalOptions;
  const { renderContent, hideLineNumbers, splitView } = diffViewOptions;

  const lineNumberTemplate = `${prefix}-${lineNumber}`;
  const additionalLineNumberTemplate = `${additionalPrefix}-${additionalLineNumber}`;
  const highlightLine =
    highlightLines.includes(lineNumberTemplate) ||
    highlightLines.includes(additionalLineNumberTemplate);
  const added = type === DiffType.ADDED;
  const removed = type === DiffType.REMOVED;
  let content;
  if (Array.isArray(value)) {
    content = renderWordDiff(value, styles, renderContent);
  } else if (renderContent) {
    content = renderContent(value);
  } else {
    content = value;
  }

  return (
    <>
      {!hideLineNumbers && (
        <td
          onClick={lineNumber && onLineNumberClickProxy(lineNumberTemplate)}
          className={cn(styles.gutter, {
            [styles.emptyGutter]: !lineNumber,
            [styles.diffAdded]: added,
            [styles.diffRemoved]: removed,
            [styles.highlightedGutter]: highlightLine,
          })}
        >
          <pre className={styles.lineNumber}>{lineNumber}</pre>
        </td>
      )}
      {!splitView && !hideLineNumbers && (
        <td
          onClick={
            additionalLineNumber &&
            onLineNumberClickProxy(additionalLineNumberTemplate)
          }
          className={cn(styles.gutter, {
            [styles.emptyGutter]: !additionalLineNumber,
            [styles.diffAdded]: added,
            [styles.diffRemoved]: removed,
            [styles.highlightedGutter]: highlightLine,
          })}
        >
          <pre className={styles.lineNumber}>{additionalLineNumber}</pre>
        </td>
      )}
      <td
        className={cn(styles.marker, {
          [styles.emptyLine]: !content,
          [styles.diffAdded]: added,
          [styles.diffRemoved]: removed,
          [styles.highlightedLine]: highlightLine,
        })}
      >
        <pre>
          {added && "+"}
          {removed && "-"}
        </pre>
      </td>
      <td
        className={cn(styles.content, {
          [styles.emptyLine]: !content,
          [styles.diffAdded]: added,
          [styles.diffRemoved]: removed,
          [styles.highlightedLine]: highlightLine,
        })}
      >
        <pre className={styles.contentText}>{content}</pre>
      </td>
    </>
  );
}
