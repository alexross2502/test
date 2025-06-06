import React, { useRef, useEffect, useState } from "react";

function SudokuCell({
  value,
  readonly,
  correctValue,
  onChange,
  index,
  sameNumbersHandler,
  selectedNumber,
  selectedLines,
}) {
  useEffect(() => {
    document.activeElement.blur();
  }, [readonly]);

  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e) => {
    if (readonly) return;

    const val = e.target.value;

    if (/^[1-9]?$/.test(val)) {
      onChange(val);
      if (val === "" || Number(val) === correctValue) {
        setIsInvalid(false);
      } else {
        setIsInvalid(true);
        document.activeElement.blur();
      }
    }
  };

  const handleFocus = () => {
    if (!readonly && value !== "") {
      sameNumbersHandler(index, null);
      setIsInvalid(false);
      onChange("");
    }
    if (readonly) {
      sameNumbersHandler(index, value);
    }
  };

  return (
    <input
      type="text"
      className={`sudoku-cell ${readonly ? "locked correct" : ""} ${
        isInvalid ? "incorrect" : ""
      } ${selectedNumber === value ? "selectedNumber" : ""} ${
        selectedLines.include(index) ? "selectedLines" : ""
      }`}
      value={value ?? ""}
      onChange={handleChange}
      readOnly={readonly}
      onFocus={handleFocus}
      tabIndex={readonly ? -1 : 0}
    />
  );
}

export default SudokuCell;
