import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { tiles } from "../../../data";
import Cube from "../Tile";
import clsx from "clsx";
import styles from "./GameBoard.module.css";

const shufflePicks = (arr) => {
  let newTiles = arr.slice();
  const randomNumber = Math.random() * 40 + 1;
  for (let i = 0; i < randomNumber; i++) {
    const lastElement = newTiles.pop();
    newTiles.unshift(lastElement);
  }
  newTiles.forEach((item) => {
    item.status = "hidden";
  });
  return newTiles;
};

const GameBoard = () => {
  const getPicks = useMemo(() => {
    return shufflePicks(tiles);
  }, []);
  const resetGame = () => {
    setAllPicks(shufflePicks(tiles));
  };
  const [allPicks, setAllPicks] = useState(getPicks);
  const [currentPicks, setCurrentPicks] = useState([]);
  const [score, setScore] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const statusTimeoutRef = useRef();
  const resetRef = useRef();
  const resetCurrentTilesHandlers = () => {
    resetRef.current = setTimeout(() => {
      setCurrentPicks([]);
    }, 700);
  };

  const changeTileStatus = useCallback((id, status) => {
    setAllPicks((prevState) => {
      let cards = prevState.slice();
      const changedCards = cards.map((item) => {
        if (item.id === id) {
          item.status = status;
        }
        return item;
      });
      return changedCards;
    });
  }, []);

  const pickColorHandler = (item) => {
    if (currentPicks.length < 2) {
      changeTileStatus(item.id, "open");
      setPlayCount((prevState) => prevState + 1);
      setCurrentPicks((prevState) => {
        return [...prevState, item];
      });
    }
  };

  useEffect(() => {
    statusTimeoutRef.current = setTimeout(() => {
      if (currentPicks.length === 2) {
        //check if the two picks matches
        if (currentPicks[0].color === currentPicks[1].color) {
          currentPicks.map((item) => changeTileStatus(item.id, "matched"));
          setScore((prevState) => prevState + 1);
        } else {
          currentPicks.map((item) => changeTileStatus(item.id, "closed"));
        }
        resetCurrentTilesHandlers();
      }
    }, 1500);
    return () => {
      clearTimeout(resetRef.current);
      clearTimeout(statusTimeoutRef.current);
    };
  }, [currentPicks, changeTileStatus]);

  return (
    <div className="w-100 p-2 container">
      <div className="row">
        {allPicks.map((item) => (
          <Cube key={item.id} item={item} onClick={pickColorHandler} />
        ))}
      </div>
      <Dashboard score={score} playCount={playCount} onResetGame={resetGame} />
    </div>
  );
};

export default GameBoard;

const Dashboard = ({ score, playCount, onResetGame }) => {
 return (<div className="row p-2">
    <span className={clsx(styles.score, "col-7")}>Score: {score}</span>
    <span className={clsx(styles.reset, "col-5")} onClick={onResetGame}>
      Reset
    </span>
    <span className={clsx(styles.status, "col")}>
      Game Status: {playCount === 36 ? "Game Over" : "...in progress"}
    </span>
  </div>);
};
