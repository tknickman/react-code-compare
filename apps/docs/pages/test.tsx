import React, { forwardRef } from "react";
import { FixedSizeList } from "react-window";

const generateItems = (numItems) =>
  Array(numItems)
    .fill(true)
    .map((_) => ({
      isActive: false,
      label: Math.random().toString(36).substr(2),
    }));

const ItemWrapper = ({ data, index, style, ...rest }) => {
  const { ItemRenderer, itemData } = data;
  return (
    <ItemRenderer index={index} style={style}>
      {itemData[index]}
    </ItemRenderer>
  );
};

const Row = ({ children, style }) => {
  return (
    <tr className="row" style={style}>
      {children}
    </tr>
  );
};

const innerElementType = forwardRef(({ children, ...rest }, ref) => (
  <table ref={ref} {...rest}>
    <tbody>{children}</tbody>
  </table>
));

const WindowedTable = ({ children, itemData, ...rest }) => {
  console.log(itemData);
  const data = { itemData, ItemRenderer: children };
  return (
    <FixedSizeList itemData={data} {...rest}>
      {ItemWrapper}
    </FixedSizeList>
  );
};

export default function Test() {
  const items = generateItems(1000).map(({ label }) => (
    <tr>
      <td>Row 1 {label}</td>
      <td>Row 2 {label}</td>
    </tr>
  ));

  return (
    <WindowedTable
      className="table"
      height={500}
      innerElementType={innerElementType}
      itemCount={items.length}
      itemSize={35}
      itemData={items}
      width={500}
    >
      {Row}
    </WindowedTable>
  );
}
