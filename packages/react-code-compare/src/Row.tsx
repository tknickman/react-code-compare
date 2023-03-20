import { Ref } from "react";
import cn from "classnames";
import { ReactDiffViewerStyles } from "./styles";

export function Row({
  className,
  styles,
  children,
  ref,
}: {
  className?: string;
  styles: ReactDiffViewerStyles;
  children: React.ReactNode;
  ref?: Ref<HTMLTableRowElement>;
}) {
  return (
    <tr className={cn(styles.line, className)} ref={ref}>
      {children}
    </tr>
  );
}
