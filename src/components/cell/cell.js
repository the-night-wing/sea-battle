import React from "react";

import "./cell.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants.js";

import { parseId, parseShipLength } from "../../helpers/index.js";

import Overlay from "../overlay";

const Cell = ({ onClick, value, cellData, canDropShip, placeShip }) => {
  const { isShot, isShip, id, player } = cellData;

  const isHit = isShip && isShot;
  const isBlank = !isShip && isShot;

  const [{ isOver, canDrop, coord, itemType }, drop] = useDrop({
    accept: [ItemTypes.LINKOR, ItemTypes.BOAT],
    canDrop: () => canDropShip(id, player, ItemTypes.LINKOR),
    drop: () => placeShip(id, player),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      coord: monitor.getInitialClientOffset(),
      itemType: monitor.getItemType()
    })
  });

  return (
    <div
      ref={drop}
      className={`cell
                            ${value ? "not-clickable" : "clickable"} 
                            ${isHit ? "hit" : null} 
                            ${isBlank ? "blank" : null}
                            ${isShip ? "ship" : null}`}
      onClick={
        // value
        //   ? () => {}
        //   :
        () => {
          onClick(id, isShip, player);
        }
      }
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

Cell.defaultProps = {
  onClick: () => {},
  value: false,
  cellData: {
    isShip: false,
    isShot: false,
    player: -1,
    id: -1
  },
  canDropShip: () => false,
  placeShip: () => {}
};

export default Cell;
