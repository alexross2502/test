import React from "react";

export default function ValidationIcon({ isValid }) {
  if (isValid === null || isValid === undefined) return null;

  return (
    <span
      className={`icon ${isValid ? "checkmark" : "crossmark"}`}
      role="img"
      aria-label={isValid ? "correct" : "incorrect"}
      style={{ fontSize: "80px", userSelect: "none", marginLeft: 8 }}
    >
      {isValid ? "✅" : "❌"}
    </span>
  );
}
