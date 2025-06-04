import React, { useState, useRef } from "react";
import SudokuCell from "./SudokuCell";
import { generateSudokuPuzzle } from "../utils/SudokuUtils";
import ValidationIcon from "./ValidationIcon";
const { puzzle, solution } = generateSudokuPuzzle();
const correctSound = new Audio("/sounds/done.mp3");
const wrongSound = new Audio("/sounds/fail.mp3");

function SudokuBoard() {
  const [board, setBoard] = useState(puzzle);

  const [locked, setLocked] = useState(puzzle.map((val) => val !== null));
  const [isValid, setValid] = useState(null);
  const [isShake, setShake] = useState(false);

  const timeoutRef = useRef(null);

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
          correctValue={solution[i]}
          onChange={(val) => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            handleCellChange(i, val);
            if (Number(val) !== 0) {
              let valid = Number(val) === solution[i];
              setValid(valid);
              if (!valid) {
                wrongSound.currentTime = 0;
                wrongSound.play();
                setShake(true);
              }
              if (valid) {
                correctSound.currentTime = 0;
                correctSound.play();
              }
              timeoutRef.current = setTimeout(() => {
                setValid(null);
                setShake(false);
                timeoutRef.current = null;
              }, 2000);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={`sudoku-board ${isShake ? "shake" : ""}`}>{cells}</div>
      <ValidationIcon isValid={isValid} />
      {isValid !== null && <div className="overlay" />}
    </div>
  );
}

export default SudokuBoard;
