import cn from "classnames";
import { SkippedLineIndicatorProps, OnBlockClickProxy } from "./types";
import { ReactCodeCompareStyles } from "./styles";
import { Row } from "./Row";

export function SkippedLinesIndicator({
  splitView,
  onBlockClickProxy,
  codeFoldMessageRenderer,
  hideLineNumbers,
  styles,
  // data
  num,
  blockNumber,
  leftBlockLineNumber,
  rightBlockLineNumber,
}: SkippedLineIndicatorProps & {
  onBlockClickProxy: OnBlockClickProxy;
  styles: ReactCodeCompareStyles;
  num: number;
  blockNumber: number;
  leftBlockLineNumber: number;
  rightBlockLineNumber: number;
}): JSX.Element {
  const message = codeFoldMessageRenderer ? (
    codeFoldMessageRenderer(num, leftBlockLineNumber, rightBlockLineNumber)
  ) : (
    <pre className={styles.codeFoldContent}>Expand {num} lines ...</pre>
  );
  const content = (
    <td>
      <a onClick={onBlockClickProxy(blockNumber)} tabIndex={0}>
        {message}
      </a>
    </td>
  );
  const isUnifiedViewWithoutLineNumbers = !splitView && !hideLineNumbers;

  return (
    <Row className={styles.codeFold} styles={styles}>
      {!hideLineNumbers && <td className={styles.codeFoldGutter} />}
      <td
        className={cn({
          [styles.codeFoldGutter]: isUnifiedViewWithoutLineNumbers,
        })}
      />

      {/* Swap columns only for unified view without line numbers */}
      {isUnifiedViewWithoutLineNumbers ? (
        <>
          <td />
          {content}
        </>
      ) : (
        <>
          {content}
          <td />
        </>
      )}
      <td />
      <td />
    </Row>
  );
}
