import React, { useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import Mistakes from "./Mistakes";
import GameOver from "./GameOver";

function Main() {
  const [count, setCount] = useState(2);
  const [isWon, setIsWon] = useState(false);
  const [gameStatus, setGameStatus] = useState(null);

  useEffect(() => {
    if (count === 0 || isWon) {
      setGameStatus(isWon ? true : false);

      const reloadTimeout = setTimeout(() => {
        window.location.reload();
      }, 3000);

      return () => clearTimeout(reloadTimeout);
    }
  }, [count, isWon]);

  return (
    <div>
      <Mistakes count={count} />
      <SudokuBoard setCount={setCount} setIsWon={setIsWon} />
      {(count === 0 || isWon) && <GameOver status={gameStatus} />}
    </div>
  );
}

export default Main;
