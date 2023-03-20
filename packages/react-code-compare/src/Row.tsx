import { Ref } from "react";
import cn from "classnames";
import { ReactCodeCompareStyles } from "./styles";

export function Row({
  className,
  styles,
  children,
  ref,
}: {
  className?: string;
  styles: ReactCodeCompareStyles;
  children: React.ReactNode;
  ref?: Ref<HTMLTableRowElement>;
}) {
  return (
    <tr className={cn(styles.line, className)} ref={ref}>
      {children}
    </tr>
  );
}
