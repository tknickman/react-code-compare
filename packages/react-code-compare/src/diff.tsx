import { MouseEvent } from "react";
import memoize from "memoize-one";
import {
  computeLineInformation,
  LineInformation,
  DiffType,
  DiffMethod,
} from "./compute-lines";
import computeStyles, {
  ReactDiffViewerStylesOverride,
  ReactDiffViewerStyles,
} from "./styles";
import { ReactDiffViewerProps } from "./types";
import { VirtualTable } from "./VirtualTable";
import { Table } from "./Table";
import { useCodeCompare } from "./context";

const defaultProps: ReactDiffViewerProps = {
  oldValue: "",
  newValue: "",
  splitView: true,
  highlightLines: [],
  disableWordDiff: false,
  compareMethod: DiffMethod.CHARS,
  styles: {},
  hideLineNumbers: false,
  extraLinesSurroundingDiff: 3,
  showDiffOnly: true,
  useDarkTheme: false,
  linesOffset: 0,
};

function DiffViewer(props: ReactDiffViewerProps) {
  const {
    oldValue = defaultProps.oldValue,
    newValue = defaultProps.newValue,
    splitView = defaultProps.splitView,
    highlightLines = defaultProps.highlightLines,
    disableWordDiff = defaultProps.disableWordDiff,
    compareMethod = defaultProps.compareMethod,
    styles: overrideStyles = defaultProps.styles,
    hideLineNumbers = defaultProps.hideLineNumbers,
    extraLinesSurroundingDiff = defaultProps.extraLinesSurroundingDiff,
    showDiffOnly = defaultProps.showDiffOnly,
    useDarkTheme = defaultProps.useDarkTheme,
    linesOffset = defaultProps.linesOffset,
    leftTitle,
    rightTitle,
    renderContent,
    onLineNumberClick,
    onDiffExpand,
    codeFoldMessageRenderer,
    useVirtual,
    parentRef,
  } = props;

  const { expandedBlocks, setExpandedBlocks } = useCodeCompare();

  const getStyles: (
    styles: ReactDiffViewerStylesOverride,
    isDark: boolean
  ) => ReactDiffViewerStyles = memoize(computeStyles);

  const styles = getStyles(overrideStyles, useDarkTheme);

  const onBlockExpand = (id: number): void => {
    setExpandedBlocks((prevState) => {
      const newState = [...prevState, id];
      if (onDiffExpand) {
        onDiffExpand(newState);
      }
      return newState;
    });
  };

  const onLineNumberClickProxy = (
    id: string
  ): ((e: MouseEvent<HTMLTableCellElement>) => void) => {
    if (onLineNumberClick) {
      return (e: MouseEvent<HTMLTableCellElement>): void =>
        onLineNumberClick(id, e);
    }
    return (): void => {};
  };

  const onBlockClickProxy =
    (id: number): ((e: MouseEvent<HTMLAnchorElement>) => void) =>
    (_: MouseEvent<HTMLAnchorElement>): void =>
      onBlockExpand(id);

  // instead of returning components here, we return the props for a component that we will use in render
  const getDiffRowData = () => {
    const { lineInformation, diffLines } = computeLineInformation(
      oldValue,
      newValue,
      disableWordDiff,
      compareMethod,
      linesOffset
    );
    const extraLines =
      extraLinesSurroundingDiff < 0 ? 0 : extraLinesSurroundingDiff;
    let skippedLines: number[] = [];

    return lineInformation.map((line: LineInformation, i: number) => {
      const diffBlockStart = diffLines[0];
      const currentPosition = diffBlockStart - i;
      if (showDiffOnly) {
        if (currentPosition === -extraLines) {
          skippedLines = [];
          diffLines.shift();
        }
        if (
          line.left.type === DiffType.DEFAULT &&
          (currentPosition > extraLines ||
            typeof diffBlockStart === "undefined") &&
          !expandedBlocks.includes(diffBlockStart)
        ) {
          skippedLines.push(i + 1);
          if (i === lineInformation.length - 1 && skippedLines.length > 1) {
            return {
              component: `SkippedLineIndicator`,
              type: "skipped",
              data: {
                num: skippedLines.length,
                blockNumber: diffBlockStart,
                leftBlockLineNumber: line.left.lineNumber,
                rightBlockLineNumber: line.right.lineNumber,
              },
            };
          }
          return null;
        }
      }

      if (currentPosition === extraLines && skippedLines.length > 0) {
        const { length } = skippedLines;
        skippedLines = [];
        return {
          component: `SkippedLineIndicator`,
          type: "skipped",
          data: {
            num: length,
            blockNumber: diffBlockStart,
            leftBlockLineNumber: line.left.lineNumber,
            rightBlockLineNumber: line.right.lineNumber,
          },
        };
      }

      if (splitView) {
        return {
          component: `Line`,
          type: "split",
          data: {
            line,
            index: i,
          },
        };
      }
      return {
        component: `Line`,
        type: "unified",
        data: {
          line,
          index: i,
        },
      };
    });
  };

  if (typeof oldValue !== "string" || typeof newValue !== "string") {
    throw Error('"oldValue" and "newValue" should be strings');
  }

  const nodeData = getDiffRowData().filter(Boolean);
  const colSpanOnSplitView = hideLineNumbers ? 2 : 3;
  const colSpanOnInlineView = hideLineNumbers ? 2 : 4;

  const title = (leftTitle || rightTitle) && (
    <tr>
      <td
        colSpan={splitView ? colSpanOnSplitView : colSpanOnInlineView}
        className={styles.titleBlock}
      >
        <pre className={styles.contentText}>{leftTitle}</pre>
      </td>
      {splitView && (
        <td colSpan={colSpanOnSplitView} className={styles.titleBlock}>
          <pre className={styles.contentText}>{rightTitle}</pre>
        </td>
      )}
    </tr>
  );

  const diffViewOptions = {
    splitView,
    hideLineNumbers,
    renderContent,
  };

  if (useVirtual && parentRef) {
    return (
      <VirtualTable
        title={title}
        items={nodeData}
        styles={styles}
        splitView={splitView}
        hideLineNumbers={hideLineNumbers}
        highlightLines={highlightLines}
        onBlockClickProxy={onBlockClickProxy}
        onLineNumberClickProxy={onLineNumberClickProxy}
        codeFoldMessageRenderer={codeFoldMessageRenderer}
        parentRef={parentRef}
        diffViewOptions={diffViewOptions}
      />
    );
  }

  return (
    <Table
      title={title}
      items={nodeData}
      styles={styles}
      splitView={splitView}
      hideLineNumbers={hideLineNumbers}
      highlightLines={highlightLines}
      onBlockClickProxy={onBlockClickProxy}
      onLineNumberClickProxy={onLineNumberClickProxy}
      codeFoldMessageRenderer={codeFoldMessageRenderer}
      diffViewOptions={diffViewOptions}
    />
  );
}

export default DiffViewer;
export { ReactDiffViewerStylesOverride, DiffMethod };
