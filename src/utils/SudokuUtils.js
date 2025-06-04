import sudoku from "sudoku";

export function generateSudokuPuzzle() {
  const puzzleRaw = sudoku.makepuzzle();
  const solutionRaw = sudoku.solvepuzzle(puzzleRaw);

  const puzzle = puzzleRaw.map((v) => (v === null ? null : v + 1));
  const solution = solutionRaw.map((v) => v + 1);

  return { puzzle, solution };
}
