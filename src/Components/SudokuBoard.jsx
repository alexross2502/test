import React, { useState, useRef, useEffect } from "react";
import SudokuCell from "./SudokuCell";
import { generateSudokuPuzzle } from "../utils/sudokuUtils";
import ValidationIcon from "./ValidationIcon";
import { linesUtil } from "../utils/linesUtil";

const { puzzle, solution } = generateSudokuPuzzle();
const correctSound = new Audio("/sounds/done.mp3");
const wrongSound = new Audio("/sounds/fail.mp3");

function SudokuBoard({ setCount, setIsWon }) {
  const [board, setBoard] = useState(puzzle);
  const [locked, setLocked] = useState(puzzle.map((val) => val !== null));
  const [isValid, setValid] = useState(null);
  const [isShake, setShake] = useState(false);
  const [blankCell, setBlankCell] = useState(
    puzzle.filter((item) => item === null).length
  );
  const [selectedNumber, setSelectedNumber] = useState(false);
  const [selectedLines, setSelectedLines] = useState([]);
  const timeoutRef = useRef(null);

  const sameNumbersHandler = (index, value) => {
    value !== null ? setSelectedNumber(value) : setSelectedNumber(false);
    value !== null ? setSelectedLines(linesUtil(index)) : setSelectedLines([])
  };

  useEffect(() => {
    if (blankCell === 0) {
      setIsWon(true);
    }
  }, [blankCell]);

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

  const renderBoard = (values, readOnly) => {
    return values.map((val, i) => {
      const row = Math.floor(i / 9);
      const col = i % 9;

      const cellClass = [
        "cell-wrapper",
        row % 3 === 0 ? "border-top" : "",
        col % 3 === 0 ? "border-left" : "",
        row === 8 ? "border-bottom" : "",
        col === 8 ? "border-right" : "",
      ].join(" ");

      return (
        <div key={i} className={cellClass}>
          <SudokuCell
            value={val}
            index={i}
            selectedNumber={selectedNumber}
            selectedLines={selectedLines}
            sameNumbersHandler={sameNumbersHandler}
            readonly={readOnly || locked[i]}
            correctValue={solution[i]}
            onChange={(inputVal) => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);

              handleCellChange(i, inputVal);

              if (inputVal === "") return;

              const isCorrect = Number(inputVal) === solution[i];
              setValid(isCorrect);

              if (isCorrect) {
                setBlankCell(blankCell - 1);
                correctSound.currentTime = 0;
                correctSound.play();
              } else {
                setCount((prev) => prev - 1);
                wrongSound.currentTime = 0;
                wrongSound.play();
                setShake(true);
              }

              timeoutRef.current = setTimeout(() => {
                setValid(null);
                setShake(false);
                timeoutRef.current = null;
              }, 1500);
            }}
          />
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
      {/* Основная доска */}
      <div className={`sudoku-board ${isShake ? "shake" : ""}`}>
        {renderBoard(board, false)}
      </div>

      {/* <div className="sudoku-board solved-board">
        {renderBoard(solution, true)}
      </div> */}

      {isValid === false && <ValidationIcon isValid={isValid} />}
      {isValid === false && <div className="overlay" />}
    </div>
  );
}

export default SudokuBoard;
