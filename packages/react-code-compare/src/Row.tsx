import { Ref } from "react";
import cn from "classnames";
import { ReactCodeCompareStyles } from "./styles";

export function Row({
  className,
  styles,
  children,
  index,
  rowRef,
}: {
  className?: string;
  styles: ReactCodeCompareStyles;
  children: React.ReactNode;
  index?: number;
  rowRef?: Ref<HTMLTableRowElement>;
}) {
  return (
    <tr className={cn(styles.line, className)} ref={rowRef} data-index={index}>
      {children}
    </tr>
  );
}
