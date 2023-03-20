import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { ReactCodeCompareState } from "./types";

export const CodeCompareContext = createContext<{
  resetCodeBlocks: () => boolean;
  expandedBlocks: ReactCodeCompareState["expandedBlocks"];
  setExpandedBlocks: Dispatch<
    SetStateAction<ReactCodeCompareState["expandedBlocks"]>
  >;
}>(null);

export function CodeCompare({ children }: { children: React.ReactNode }) {
  const [expandedBlocks, setExpandedBlocks] = useState<
    ReactCodeCompareState["expandedBlocks"]
  >([]);

  const resetCodeBlocks = (): boolean => {
    if (expandedBlocks.length > 0) {
      setExpandedBlocks([]);
      return true;
    }
    return false;
  };

  return (
    <CodeCompareContext.Provider
      value={{
        // methods
        resetCodeBlocks,
        // values
        expandedBlocks,
        // setters
        setExpandedBlocks,
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
