import React from "react";

import "./cell.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants.js";

import { parseId, parseShipLength } from "../../helpers/index.js";

import Overlay from "../overlay";

const CellSlow = ({ onClick, value, cellData, canDropShip, placeShip }) => {
  const { isShot, isShip, id, player } = cellData;

  const isHit = isShip && isShot;
  const isBlank = !isShip && isShot;

  const onCellClick = () => {
    onClick(id, isShip, player);
  };

  const placeShipMemo = () => {
    placeShip(id, player, itemType);
  };

  const canDropShipMemo = () => {
    return canDropShip(id, player, itemType);
  };

  const [{ isOver, canDrop, itemType }, drop] = useDrop({
    accept: [
      ItemTypes.BATTLESHIP,
      ItemTypes.CRUISER,
      ItemTypes.DESTROYER,
      ItemTypes.PATROL_BOAT
    ],
    canDrop: canDropShipMemo,
    drop: placeShipMemo,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    })
  });

  return (
    <div
      ref={drop}
      className={`cell
                            ${value ? "not-clickable" : "clickable"} 
                            ${isHit ? "hit" : ""} 
                            ${isBlank ? "blank" : ""}
                            ${isShip ? "ship" : ""}`}
      onClick={onCellClick}
    >
      {value}
      {!value && isOver && (
        <Overlay
          color={`${canDrop ? "orange" : "red"}`}
          coord={parseId(id)}
          shipLength={parseShipLength(itemType)}
        />
      )}
    </div>
  );
};

const doNothing = () => {};

CellSlow.defaultProps = {
  onClick: doNothing,
  value: false,
  cellData: {
    isShip: false,
    isShot: false,
    player: -1,
    id: -1
  },
  canDropShip: doNothing,
  placeShip: doNothing
};

const Cell = React.memo(CellSlow);

export default Cell;
