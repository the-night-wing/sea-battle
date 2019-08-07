import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { ItemTypes } from "../constants.js";

import Cell from "../cell";

const AddDrag = ({ shipType, children }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes[shipType] },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });
  return <div ref={drag}>{children}</div>;
};

const cellData = {
  isShip: true,
  isShot: false,
  player: -1,
  id: -1
};

const createShip = length => {
  const ship = [];

  for (let i = 0; i < length; i++) {
    ship[i] = <Cell value cellData={cellData} />;
  }

  let shipType = "";

  if (length === 1) shipType = "PATROL_BOAT";
  if (length === 2) shipType = "DESTROYER";
  if (length === 3) shipType = "CRUISER";
  if (length === 4) shipType = "BATTLESHIP";

  const customShip = (
    <AddDrag shipType={shipType}>
      <div style={styles}>{ship}</div>
    </AddDrag>
  );

  return customShip;
};

const styles = { display: "flex", flexDirection: "row" };

const Battleship = createShip(4);

const Cruiser = createShip(3);

const Destroyer = createShip(2);

const PatrolBoat = createShip(1);

export { Battleship, Cruiser, Destroyer, PatrolBoat };
