import React from "react";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants.js";

import "./overlay.css";

const OverlaySlow = ({ color, coord, shipLength }) => {
  const x = coord[1];

  const displacement = 10 - x - shipLength;

  const squareHoverStyles = {
    opacity: 0.5,
    position: "absolute",
    top: 0,
    left: displacement * 30,
    backgroundColor: color,
    width: `${30 * shipLength}px`,
    height: "100%",
    zIndex: 10
  };

  return displacement < 0 ? (
    <div style={squareHoverStyles} />
  ) : (
    <>
      <div
        style={{
          ...squareHoverStyles,
          left: 0,
          width: `30px`
        }}
      />
      <OverlayToHide color={color} shipLength={shipLength} />
    </>
  );
};

const Overlay = React.memo(OverlaySlow);

export default Overlay;

const OverlayToHide = ({ color, shipLength }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [
      ItemTypes.BATTLESHIP,
      ItemTypes.CRUISER,
      ItemTypes.DESTROYER,
      ItemTypes.PATROL_BOAT
    ],
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  });

  const squareHoverStyles = {
    opacity: 0.5,
    position: "absolute",
    top: 0,
    backgroundColor: color,
    left: 30,
    width: `${30 * (shipLength - 1)}px`,
    height: "100%",
    zIndex: 10
  };

  return !isOver ? <div ref={drop} style={squareHoverStyles} /> : null;
};
