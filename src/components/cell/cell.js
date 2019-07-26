import React, { Component } from "react";
import "./cell.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants.js";
import { onHover } from "../checking/checking.js";

const Cell = ({ onClick, value, cellData, onHovering, placeShip }) => {
  const { isShot, isShip, canDrop: couldDrop, id, player } = cellData;

  const isHit = isShip && isShot;
  const isBlank = !isShip && isShot;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.LINKOR,
    canDrop: () => {
      
      return onHovering(id, player, ItemTypes.LINKOR);
    },
    drop: () => placeShip(id, player),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
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
      {/* {canDrop && <Overlay color="yellow" />} */}
      {/* {isOver && <Overlay color="yellow" />} */}
      {/* {!value && couldDrop && <Overlay color="green" />} */}
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

const Overlay = ({ color }) => {
  const squareHoverStyles = {
    opacity: 0.5,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: color,
    // width: "120px",
    width: "100%",
    height: "100%",
    zIndex: 1
  };

  return <div style={squareHoverStyles} />;
};

export default Cell;
