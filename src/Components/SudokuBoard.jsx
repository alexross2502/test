import React from "react";
import { useState } from "react";
import SudokuCell from "./SudokuCell";
import { generateSudokuPuzzle } from "../utils/SudokuUtils";
const { puzzle, solution } = generateSudokuPuzzle();

function SudokuBoard() {
  const [userValues, setUserValues] = useState(Array(81).fill(""));

  const handleCellChange = (index, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newValues = [...userValues];
      newValues[index] = value;
      setUserValues(newValues);
    }
  };

  const cells = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const index = row * 9 + col;
      const key = `${row}-${col}`;

      const cellClass = [
        "cell-wrapper",
        row % 3 === 0 ? "border-top" : "",
        col % 3 === 0 ? "border-left" : "",
        row === 8 ? "border-bottom" : "",
        col === 8 ? "border-right" : "",
      ].join(" ");

      const cellValue = puzzle[index];
      const isReadOnly = cellValue !== null;

      const userInputValue = userValues[index];

      let validationState = null;

      if (!isReadOnly && userInputValue !== "") {
        validationState =
          Number(userInputValue) === solution[index] ? "correct" : "incorrect";
      }

      cells.push(
        <div key={key} className={cellClass}>
          <SudokuCell
            value={isReadOnly ? cellValue.toString() : userInputValue}
            readonly={isReadOnly}
            validationState={validationState}
            onChange={(val) => handleCellChange(index, val)}
          />
        </div>
      );
    }
  }

  return <div className="sudoku-board">{cells}</div>;
}

export default SudokuBoard;
