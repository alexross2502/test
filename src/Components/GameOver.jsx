import React from "react";

export default function GameOver({ status }) {
  return (
    <div className="gameOver">
      {status ? <span>Вы выиграли!</span> : <span>Вы проиграли!</span>}
      <span>Сейчас начнется новая игра</span>
    </div>
  );
}
