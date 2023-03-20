import { useVirtualizer } from "@tanstack/react-virtual";
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

export function VirtualTable({
  title,
  items,
  styles,
  parentRef,
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
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 27,
    overscan: 10,
  });

  const vItems = virtualizer.getVirtualItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <table
      className={cn(styles.diffContainer, {
        [styles.splitView]: splitView,
      })}
      style={{
        height: virtualizer.getTotalSize(),
        width: "100%",
        position: "relative",
      }}
    >
      <tbody
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${vItems[0].start}px)`,
        }}
      >
        {title}
        {vItems.map((virtualItem) => {
          const node = items[virtualItem.index];
          if (node.type === "skipped") {
            return (
              <SkippedLinesIndicator
                key={virtualItem.key}
                splitView={splitView}
                onBlockClickProxy={onBlockClickProxy}
                codeFoldMessageRenderer={codeFoldMessageRenderer}
                hideLineNumbers={hideLineNumbers}
                styles={styles}
                num={node.data.num}
                blockNumber={node.data.blockNumber}
                leftBlockLineNumber={node.data.leftBlockLineNumber}
                rightBlockLineNumber={node.data.rightBlockLineNumber}
              />
            );
          }
          if (node.type === "split") {
            return (
              <SplitView
                key={virtualItem.key}
                lineInformation={node.data.line}
                styles={styles}
                highlightLines={highlightLines}
                onLineNumberClickProxy={onLineNumberClickProxy}
                diffViewOptions={diffViewOptions}
              />
            );
          }
          if (node.type === "unified") {
            return (
              <InlineView
                key={virtualItem.key}
                lineInformation={node.data.line}
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
