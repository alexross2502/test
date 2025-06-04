import React, { useState } from "react";

function SudokuCell({ value, readonly, onChange }) {
  return (
    <input
      type="text"
      className={`sudoku-cell ${readonly ? "locked correct" : ""}`}
      value={value ?? ""}
      onChange={(e) => {
        if (readonly) return;
        console.log(e);
        const val = e.target.value;
        if (/^[1-9]?$/.test(val)) {
          onChange(val);
        }
      }}
      readOnly={readonly}
      tabIndex={readonly ? -1 : 0}
    />
  );
}

export default SudokuCell;
