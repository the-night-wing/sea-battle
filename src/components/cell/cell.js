import React, { Component } from "react";
import "./cell.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants.js";
import { onHover } from "../checking/checking.js";

// export default class Cell extends Component {

// const onHover = id => {
//   console.log("HOvering");
//   if (id < 55) return true;
// };

const Cell = ({ onClick, value, cellData, onHovering, placeShip }) => {
  console.log(`${onHovering};;;;; value : ${value}`);

  // static defaultProps = {
  //     value : null,
  //     cellData : {
  //         isShip : false,
  //         isShot : false,
  //         player : -1,
  //         id : -1
  //     }
  // }

  // state = {
  //     value : this.props.value,
  //     isShip : this.props.cellData["isShip"],
  //     isShot : this.props.cellData["isShot"],
  //     player : this.props.cellData["player"],
  //     id: this.props.cellData["id"]
  // }

  // checkData = () => {

  //     const { isShip, isShot, player } = this.state;

  //     console.log(` Is Ship ? ${isShip}`);
  //     console.log(` Is Shot ? ${isShot}`);
  //     console.log(` Which player ? ${[player]}`);

  // }

  // componentDidUpdate(prevProps){
  //     if( this.props.cellData !== prevProps.cellData){

  //     }
  // }

  // render() {

  // const {isShot, isShip, value, id, player} = this.state;
  const { isShot, isShip, canDrop: couldDrop, id, player } = cellData;
  // console.log(this.props);
  // console.log(`player in Cell : ${player}`);
  // console.log(`id in Cell : ${id}`);
  const isHit = isShip && isShot;
  const isBlank = !isShip && isShot;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.LINKOR,
    // canDrop: () => onHovering(id, player),
    canDrop: () => onHover(id),
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
      {/* {isOver && <Overlay color="yellow" />} */}
      {!value && canDrop && <Overlay color="green" />}
    </div>
  );
  // }
};

Cell.defaultProps = {
  value: false,
  cellData: {
    isShip: false,
    isShot: false,
    couldDrop: false,
    player: -1,
    id: -1,
    onHovering: () => false,
    placeShip: () => {}
  }
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
