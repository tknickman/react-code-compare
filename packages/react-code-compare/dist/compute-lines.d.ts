declare enum DiffType {
    DEFAULT = 0,
    ADDED = 1,
    REMOVED = 2
}
declare enum DiffMethod {
    CHARS = "diffChars",
    WORDS = "diffWords",
    WORDS_WITH_SPACE = "diffWordsWithSpace",
    LINES = "diffLines",
    TRIMMED_LINES = "diffTrimmedLines",
    SENTENCES = "diffSentences",
    CSS = "diffCss"
}
interface DiffInformation {
    value?: string | DiffInformation[];
    lineNumber?: number;
    type?: DiffType;
}
interface LineInformation {
    left?: DiffInformation;
    right?: DiffInformation;
}
interface ComputedLineInformation {
    lineInformation: LineInformation[];
    diffLines: number[];
}
interface ComputedDiffInformation {
    left?: DiffInformation[];
    right?: DiffInformation[];
}
interface JsDiffChangeObject {
    added?: boolean;
    removed?: boolean;
    value?: string;
}
/**
 * [TODO]: Think about moving common left and right value assignment to a
 * common place. Better readability?
 *
 * Computes line wise information based in the js diff information passed. Each
 * line contains information about left and right section. Left side denotes
 * deletion and right side denotes addition.
 *
 * @param oldString Old string to compare.
 * @param newString New string to compare with old string.
 * @param disableWordDiff Flag to enable/disable word diff.
 * @param compareMethod JsDiff text diff method from https://github.com/kpdecker/jsdiff/tree/v4.0.1#api
 * @param linesOffset line number to start counting from
 */
declare const computeLineInformation: (oldString: string, newString: string, disableWordDiff?: boolean, compareMethod?: string, linesOffset?: number) => ComputedLineInformation;

export { ComputedDiffInformation, ComputedLineInformation, DiffInformation, DiffMethod, DiffType, JsDiffChangeObject, LineInformation, computeLineInformation };
