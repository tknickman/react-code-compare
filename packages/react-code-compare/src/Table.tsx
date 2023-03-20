import cn from "classnames";
import { ReactCodeCompareStyles } from "./styles";
import { SkippedLinesIndicator } from "./SkippedLine";
import {
  VirtualTableProps,
  LineDiffViewOptions,
  OnBlockClickProxy,
  OnLineNumberClickProxy,
  AllRowData,
} from "./types";
import { InlineView } from "./InlineView";
import { SplitView } from "./SplitView";

export function Table({
  title,
  items,
  styles,
  splitView,
  hideLineNumbers,
  onBlockClickProxy,
  codeFoldMessageRenderer,
  highlightLines,
  onLineNumberClickProxy,
  diffViewOptions,
}: VirtualTableProps & {
  title: React.ReactNode;
  items: AllRowData;
  styles: ReactCodeCompareStyles;
  highlightLines: string[];
  diffViewOptions: LineDiffViewOptions;
  onLineNumberClickProxy: OnLineNumberClickProxy;
  onBlockClickProxy: OnBlockClickProxy;
}) {
  return (
    <table
      className={cn(styles.diffContainer, {
        [styles.splitView]: splitView,
      })}
    >
      <tbody>
        {title}
        {items.map((item, idx) => {
          if (item.type === "skipped") {
            return (
              <SkippedLinesIndicator
                key={idx}
                splitView={splitView}
                onBlockClickProxy={onBlockClickProxy}
                codeFoldMessageRenderer={codeFoldMessageRenderer}
                hideLineNumbers={hideLineNumbers}
                styles={styles}
                num={item.data.num}
                blockNumber={item.data.blockNumber}
                leftBlockLineNumber={item.data.leftBlockLineNumber}
                rightBlockLineNumber={item.data.rightBlockLineNumber}
              />
            );
          }
          if (item.type === "split") {
            return (
              <SplitView
                key={idx}
                lineInformation={item.data.line}
                styles={styles}
                highlightLines={highlightLines}
                onLineNumberClickProxy={onLineNumberClickProxy}
                diffViewOptions={diffViewOptions}
              />
            );
          }
          if (item.type === "unified") {
            return (
              <InlineView
                key={idx}
                lineInformation={item.data.line}
                styles={styles}
                highlightLines={highlightLines}
                onLineNumberClickProxy={onLineNumberClickProxy}
                diffViewOptions={diffViewOptions}
              />
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
}
