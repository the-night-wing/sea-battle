import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

import { ItemTypes } from "../constants.js";

import Cell from "../cell";

const AddDrag = ({ shipType, children }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes[shipType] },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return <div ref={drag}>{children}</div>;
};

const cellData = {
  isShip: true,
  isShot: false,
  player: -1,
  id: -1
};

const Battleship = () => {
  // const linkorImage = "http://127.0.0.1:8080/Linkor.png";
  const linkorImage = "http://127.0.0.1:8080/chess_knight.png";
  const ship = [];

  for (let i = 0; i < 4; i++) {
    ship[i] = <Cell value cellData={cellData} />;
  }

  return (
    <AddDrag shipType="BATTLESHIP">
      {/* <DragPreviewImage connect={preview} src={linkorImage} /> */}
      <div style={{ display: "flex", flexDirection: "row" }}>{ship}</div>
    </AddDrag>
  );
};

const Cruiser = () => {
  const linkorImage = "http://127.0.0.1:8080/chess_knight.png";
  const ship = [];

  for (let i = 0; i < 3; i++) {
    ship[i] = <Cell value cellData={cellData} />;
  }

  return (
    <AddDrag shipType="CRUISER">
      {/* <DragPreviewImage connect={preview} src={linkorImage} /> */}
      <div style={{ display: "flex", flexDirection: "row" }}>{ship}</div>
    </AddDrag>
  );
};

const Destroyer = () => {
  const linkorImage = "http://127.0.0.1:8080/chess_knight.png";
  const ship = [];

  for (let i = 0; i < 2; i++) {
    ship[i] = <Cell value cellData={cellData} />;
  }

  return (
    <AddDrag shipType="DESTROYER">
      {/* <DragPreviewImage connect={preview} src={linkorImage} /> */}
      <div style={{ display: "flex", flexDirection: "row" }}>{ship}</div>
    </AddDrag>
  );
};

const PatrolBoat = () => {
  const linkorImage = "http://127.0.0.1:8080/chess_knight.png";
  const ship = [];

  for (let i = 0; i < 1; i++) {
    ship[i] = <Cell value cellData={cellData} />;
  }

  return (
    <AddDrag shipType="PATROL_BOAT">
      {/* <DragPreviewImage connect={preview} src={linkorImage} /> */}
      <div style={{ display: "flex", flexDirection: "row" }}>{ship}</div>
    </AddDrag>
  );
};

export { Battleship, Cruiser, Destroyer, PatrolBoat };
