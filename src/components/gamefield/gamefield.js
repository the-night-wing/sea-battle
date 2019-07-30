import React from "react";

import "./gamefield.css";

import Cell from "../cell";

const fillWithCells = (cellsData, canDropShip, placeShip, onCellClick) => {
  if (cellsData.length > 1) {
    const cells = [];
    const rows = [];

    for (let i = 0; i < 11; i++) {
      cells[i] = i === 0 ? [null] : [<Cell value={i} />];
      for (let k = 1; k < 11; k++) {
        cells[i][k] =
          i === 0 ? (
            <Cell value={k} />
          ) : (
            <Cell
              cellData={cellsData[i - 1][k - 1]}
              onClick={onCellClick}
              canDropShip={canDropShip}
              placeShip={placeShip}
            />
          );
      }
      rows[i] = <div className="row">{cells[i]}</div>;
    }
    return <div className="battlefield">{rows}</div>;
  } else return <h1>ZHOPA</h1>;
};

const GameField = ({
  shipsData,
  shotsData,
  endturn,
  label,
  onCellClick,
  className,
  canDropShip,
  placeShip
}) => {
  const PlayersBattleField = fillWithCells(shipsData, canDropShip, placeShip);
  const OpponentsBattleField = fillWithCells(
    shotsData,
    () => {},
    () => {},
    onCellClick
  );

  return (
    <div className={`gamefield ${className}`}>
      <h1>{label}</h1>
      <div>
        <h1>Opponent's Field</h1>
        {OpponentsBattleField}
      </div>
      <button className="endturn" onClick={endturn}>
        End Turn
      </button>
      <div>
        <h1>Your Field</h1>
        {PlayersBattleField}
      </div>
    </div>
  );
};

export default GameField;
