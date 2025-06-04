import React, { useState } from "react";
import SudokuCell from "./SudokuCell";
import { generateSudokuPuzzle } from "../utils/SudokuUtils";

function SudokuBoard() {
  const { puzzle, solution } = generateSudokuPuzzle();

  const [board, setBoard] = useState(puzzle);

  const [locked, setLocked] = useState(puzzle.map((val) => val !== null));

  const handleCellChange = (index, val) => {
    const numVal = val === "" ? null : Number(val);

    const newBoard = [...board];
    newBoard[index] = numVal;

    const isCorrect = numVal === solution[index];

    const newLocked = [...locked];
    newLocked[index] = isCorrect || puzzle[index] !== null;

    setBoard(newBoard);
    setLocked(newLocked);
  };

  const cells = [];

  for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;

    const cellClass = [
      "cell-wrapper",
      row % 3 === 0 ? "border-top" : "",
      col % 3 === 0 ? "border-left" : "",
      row === 8 ? "border-bottom" : "",
      col === 8 ? "border-right" : "",
    ].join(" ");

    cells.push(
      <div key={i} className={cellClass}>
        <SudokuCell
          value={board[i]}
          readonly={locked[i]}
          onChange={(val) => handleCellChange(i, val)}
        />
      </div>
    );
  }

  return <div className="sudoku-board">{cells}</div>;
}

export default SudokuBoard;
