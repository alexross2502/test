import sudoku from "sudoku";

// Сгенерировать пазл и решение
const puzzle = sudoku.makepuzzle();
const solution = sudoku.solvepuzzle(puzzle);

// Преобразовать в значения от 1 до 9 (null → '.')
const puzzleGrid = puzzle.map((v) => (v === null ? "." : v + 1));
const solutionGrid = solution.map((v) => v + 1);

// Функция для печати матрицы
function printGrid(grid) {
  for (let i = 0; i < 9; i++) {
    const row = grid
      .slice(i * 9, i * 9 + 9)
      .map((v) => (v === "." ? "." : v.toString()))
      .join(" ");
    console.log(row);
  }
}

// Вывод
console.log("\n🧩 Пазл:");
printGrid(puzzleGrid);

console.log("\n✅ Решение:");
printGrid(solutionGrid);
