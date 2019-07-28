import React from "react";
import "./cell.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants.js";

import { parseId, parseShipLength } from "../../helpers/index.js";

const Cell = ({ onClick, value, cellData, onHovering, placeShip }) => {
  const { isShot, isShip, id, player } = cellData;

  const isHit = isShip && isShot;
  const isBlank = !isShip && isShot;

  const [{ isOver, canDrop, coord, itemType }, drop] = useDrop({
    accept: [ItemTypes.LINKOR, ItemTypes.BOAT],
    canDrop: () => {
      return onHovering(id, player, ItemTypes.LINKOR);
    },
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
        value
          ? () => {}
          : () => {
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
  value: false,
  cellData: {
    isShip: false,
    isShot: false,
    couldDrop: false,
    player: -1,
    id: -1
  },
  onHovering: () => false,
  placeShip: () => {}
};

const Overlay = ({ color, coord, shipLength }) => {
  const [y, x] = coord;

  console.log(coord);
  console.log(shipLength);

  const displacement = 10 - x - shipLength;

  const squareHoverStyles = {
    opacity: 0.5,
    position: "absolute",
    top: 0,
    left: displacement < 0 ? displacement * 30 : 0,
    backgroundColor: color,
    width: `${30 * shipLength}px`,
    height: "100%",
    zIndex: 1
  };

  return <div style={squareHoverStyles} />;
};

export default Cell;
