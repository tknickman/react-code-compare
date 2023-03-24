import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Virtualizer } from "@tanstack/react-virtual";
import { ReactCodeCompareState, AllRowData } from "./types";
import { DiffInformation } from "./compute-lines";

function checkLineContent(
  line: DiffInformation["value"],
  content: string
): boolean {
  if (!line) {
    return false;
  }
  if (Array.isArray(line)) {
    return line.some((l) => checkLineContent(l.value, content));
  }
  return line.trim().includes(content);
}

export const CodeCompareContext = createContext<{
  resetCodeBlocks: () => boolean;
  getIndex: (content: string) => number;
  expandedBlocks: ReactCodeCompareState["expandedBlocks"];
  setExpandedBlocks: Dispatch<
    SetStateAction<ReactCodeCompareState["expandedBlocks"]>
  >;
  virtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  setVirtualizer: Dispatch<
    SetStateAction<Virtualizer<HTMLDivElement, HTMLTableRowElement>>
  >;
  items: AllRowData;
  setItems: Dispatch<SetStateAction<AllRowData>>;
}>(null);

export function CodeCompare({ children }: { children: React.ReactNode }) {
  const [expandedBlocks, setExpandedBlocks] = useState<
    ReactCodeCompareState["expandedBlocks"]
  >([]);
  const [items, setItems] = useState<AllRowData>([]);
  const [virtualizer, setVirtualizer] =
    useState<Virtualizer<HTMLDivElement, HTMLTableRowElement>>(undefined);

  const resetCodeBlocks = (): boolean => {
    if (expandedBlocks.length > 0) {
      setExpandedBlocks([]);
      return true;
    }
    return false;
  };

  const getIndex = (content: string) =>
    items.findIndex((item) => {
      if (item.type === "skipped") {
        return false;
      }
      const { left, right } = item.data.line;
      if (left && checkLineContent(left.value, content)) {
        return true;
      }
      if (right && checkLineContent(right.value, content)) {
        return true;
      }
      return false;
    });

  return (
    <CodeCompareContext.Provider
      value={{
        // methods
        resetCodeBlocks,
        getIndex,
        // values
        expandedBlocks,
        virtualizer,
        items,
        // setters
        setExpandedBlocks,
        setVirtualizer,
        setItems,
      }}
    >
      {children}
    </CodeCompareContext.Provider>
  );
}

export function useCodeCompare() {
  const context = useContext(CodeCompareContext);
  if (context === undefined) {
    throw new Error("useCodeCompare must be used within a CodeCompareProvider");
  }
  return context;
}
