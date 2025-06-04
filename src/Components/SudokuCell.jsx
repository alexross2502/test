import React, { useState } from "react";

function SudokuCell({ value, readonly, validationState, onChange }) {
  const handleChange = (e) => {
    if (readonly) return;

    const input = e.target.value;
    if (/^[1-9]?$/.test(input)) {
      onChange(input);
    }
  };

  return (
    <input
      type="text"
      className={`sudoku-cell ${
        validationState === "correct"
          ? "correct"
          : validationState === "incorrect"
          ? "incorrect"
          : ""
      }`}
      value={value ?? ""}
      onChange={handleChange}
      readOnly={readonly}
      tabIndex={readonly ? -1 : 0}
    />
  );
}

export default SudokuCell;
