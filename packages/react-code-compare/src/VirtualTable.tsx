import { useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import cn from "classnames";
import { useCodeCompare } from "./context";
import { ReactCodeCompareStyles } from "./styles";
import { SkippedLinesIndicator } from "./SkippedLine";
import {
  VirtualTableProps,
  LineDiffViewOptions,
  OnBlockClickProxy,
  OnLineNumberClickProxy,
  AllRowData,
  AdditionalVirtualizerOptions,
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
  virtualizerOptions,
}: VirtualTableProps & {
  title: React.ReactNode;
  items: AllRowData;
  styles: ReactCodeCompareStyles;
  highlightLines: string[];
  diffViewOptions: LineDiffViewOptions;
  onLineNumberClickProxy: OnLineNumberClickProxy;
  onBlockClickProxy: OnBlockClickProxy;
  virtualizerOptions?: AdditionalVirtualizerOptions;
}) {
  const { setVirtualizer } = useCodeCompare();
  // TODO: parent should be a generic
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: items.length,
    getScrollElement: () => parentRef.current,
    ...(virtualizerOptions || ({} as AdditionalVirtualizerOptions)),
  });

  useEffect(() => {
    setVirtualizer(virtualizer);
  }, [virtualizer]);

  useEffect(() => {
    virtualizer.measure();
  }, [splitView]);

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
      {splitView ? (
        <colgroup>
          <col span={3} className="left" />
          <col span={3} className="right" />
        </colgroup>
      ) : undefined}
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
          const item = items[virtualItem.index];

          if (item.type === "skipped") {
            return (
              <SkippedLinesIndicator
                key={virtualItem.key}
                splitView={splitView}
                onBlockClickProxy={onBlockClickProxy}
                codeFoldMessageRenderer={codeFoldMessageRenderer}
                hideLineNumbers={hideLineNumbers}
                styles={styles}
                num={item.data.num}
                blockNumber={item.data.blockNumber}
                leftBlockLineNumber={item.data.leftBlockLineNumber}
                rightBlockLineNumber={item.data.rightBlockLineNumber}
                rowRef={virtualizer.measureElement}
                rowIndex={virtualItem.index}
              />
            );
          }
          if (item.type === "split") {
            return (
              <SplitView
                key={virtualItem.key}
                lineInformation={item.data.line}
                styles={styles}
                highlightLines={highlightLines}
                onLineNumberClickProxy={onLineNumberClickProxy}
                diffViewOptions={diffViewOptions}
                rowRef={virtualizer.measureElement}
                rowIndex={virtualItem.index}
              />
            );
          }
          if (item.type === "unified") {
            return (
              <InlineView
                key={virtualItem.key}
                lineInformation={item.data.line}
                order={item.data.order}
                styles={styles}
                highlightLines={highlightLines}
                onLineNumberClickProxy={onLineNumberClickProxy}
                diffViewOptions={diffViewOptions}
                rowRef={virtualizer.measureElement}
                rowIndex={virtualItem.index}
              />
            );
          }
          return null;
        })}
      </tbody>
    </table>
  );
}
