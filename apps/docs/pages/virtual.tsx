import * as React from "react";
import { faker } from "@faker-js/faker";

import { useVirtualizer } from "@tanstack/react-virtual";

import styles from "./virtual.module.css";

const randomNumber = (min: number, max: number) =>
  faker.datatype.number({ min, max });

const sentences = new Array(10000)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

function RowVirtualizerDynamic() {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const count = sentences.length;
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div>
      <div
        ref={parentRef}
        className={styles.List}
        style={{
          height: 400,
          width: 400,
          overflowY: "auto",
          contain: "strict",
        }}
      >
        <table
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
              transform: `translateY(${items[0].start}px)`,
            }}
          >
            {items.map((virtualRow) => (
              <tr
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className={
                  virtualRow.index % 2
                    ? styles.ListItemOdd
                    : styles.ListItemEven
                }
              >
                  <div>{sentences[virtualRow.index]}</div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Demo() {
  return <RowVirtualizerDynamic />;
}
