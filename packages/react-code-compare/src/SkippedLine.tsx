import cn from "classnames";
import { SkippedLineIndicatorProps, OnBlockClickProxy } from "./types";
import { ReactCodeCompareStyles } from "./styles";
import { Row } from "./Row";

export function SkippedLinesIndicator({
  splitView,
  xSpacer,
  onBlockClickProxy,
  codeFoldMessageRenderer,
  hideLineNumbers,
  styles,
  num,
  blockNumber,
  leftBlockLineNumber,
  rightBlockLineNumber,
  rowIndex,
  rowRef,
}: SkippedLineIndicatorProps & {
  onBlockClickProxy: OnBlockClickProxy;
  styles: ReactCodeCompareStyles;
  xSpacer: boolean;
  num: number;
  blockNumber: number;
  leftBlockLineNumber: number;
  rightBlockLineNumber: number;
  rowIndex?: number;
  rowRef?: (node: HTMLTableRowElement) => void;
}): JSX.Element {
  const message = codeFoldMessageRenderer ? (
    codeFoldMessageRenderer(num, leftBlockLineNumber, rightBlockLineNumber)
  ) : (
    <pre className={styles.codeFoldContent}>{`Expand ${num} lines ...`}</pre>
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
    <Row className={styles.codeFold} styles={styles} rowRef={rowRef} index={rowIndex}>
      {xSpacer && <td className={styles.xSpacer} />}
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
      {xSpacer && <td className={styles.xSpacer} />}
    </Row>
  );
}
