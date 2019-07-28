import React, { Component } from "react";

import { useDrag, DragPreviewImage } from "react-dnd";
import produce from "immer";

import "./game.css";

import GameField from "../gamefield";
import Cell from "../cell";
import Checking from "../checking/checking.js";

import {parseShipLength, parseId, checkSurroundingCells} from "../../helpers"

import { ItemTypes } from "../constants.js";

export default class Game extends Component {
  state = {
    isYourTurn: true,
    player1ships: "1",
    player1shots: "1",
    player2ships: "1",
    player2shots: "1",
    varToChange: 1
  };

  plusOne = () => {
    this.setState(state => {
      return {
        varToChange: state.varToChange + 1
      };
    });
  };

  endTurn = () => {
    this.setState(state => {
      return {
        isYourTurn: !state.isYourTurn
      };
    });
  };

  generateCellsData = () => {
    const player1ships = [],
      player1shots = [],
      player2ships = [],
      player2shots = [];

    for (let i = 0; i < 10; i++) {
      player1ships[i] = [];
      player1shots[i] = [];
      player2ships[i] = [];
      player2shots[i] = [];
      for (let k = 0; k < 10; k++) {
        player1ships[i][k] = {
          isShip: false,
          isShot: false,
          player: 1,
          id: `${i}-${k}`
        };
        player1shots[i][k] = {
          isShip: false,
          isShot: false,
          player: 1,
          id: `${i}-${k}`
        };
        player2ships[i][k] = {
          isShip: false,
          isShot: false,
          player: 2,
          id: `${i}-${k}`
        };
        player2shots[i][k] = {
          isShip: false,
          isShot: false,
          player: 2,
          id: `${i}-${k}`
        };
      }
    }

    this.setState({
      player1ships,
      player1shots,
      player2ships,
      player2shots
    });
  };

  

  

  canDropShip = (id, player, shipType) => {
    const [firstIndex, secondIndex] = parseId(id);
    const shipLength = parseShipLength(shipType);

    const { player1ships, player2ships } = this.state;

    if (!(player - 1)) {
      if (secondIndex <= 10 - shipLength) {
        for (let i = 0; i < shipLength; i++) {
          if (player1ships[firstIndex][secondIndex + i].isShip === true) {
            // console.log(player1ships[firstIndex][secondIndex + i].isShip);
            return false;
          }
        }

        for (let i = 0; i < shipLength; i++) {
          if (
            checkSurroundingCells(
              firstIndex,
              secondIndex + i,
              player1ships
            )
          ) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    }
  };

  placeShip = (id, player) => {
    console.log("Trying to place");

    const [firstIndex, secondIndex] = parseId(id);

    const { player1ships, player2ships } = this.state;

    if (!(player - 1)) {
      if (player1ships[firstIndex][secondIndex + 3] !== undefined) {
        this.setState(
          produce(draft => {
            for (let i = 0; i < 4; i++) {
              draft.player1ships[firstIndex][secondIndex + i].isShip = true;
            }
          })
        );
      }
    }
  };

  

  onClick = (id, isShip, player) => {
    console.log(id);
    console.log(player);

    const [firstIndex, secondIndex] = parseId(id);

    const makeShotToCoord = this.makeShot(firstIndex, secondIndex);

    if (!(player - 1) && !isShip) {
      console.log("You pressed on the player's 1 field");

      makeShotToCoord("player1shots");
    }

    if (player - 1 && !isShip) {
      console.log("You pressed on the player's 2 field");

      makeShotToCoord("player2shots");
    }
  };

  makeShot = (firstIndex, secondIndex) => {
    return shotsfield => {
      this.setState(
        produce(draft => {
          draft[shotsfield][firstIndex][secondIndex].isShot = true;
        })
      );
    };
  };

  componentDidMount() {
    this.generateCellsData();
  }

  render() {
    const {
      isYourTurn,
      player1ships,
      player1shots,
      player2ships,
      player2shots
    } = this.state;

    const fortStyles = {
      border: "3px solid black",
      width: "250px",
      height: "150px"
    };

    return (
      <div className="game">
        <GameField
          label={"Player 1"}
          endturn={() => this.endTurn()}
          shipsData={isYourTurn ? player1ships : player2ships}
          shotsData={isYourTurn ? player1shots : player2shots}
          onCellClick={(id, isShip, player) => this.onClick(id, isShip, player)}
          onHovering={(id, player, shipType) =>
            this.canDropShip(id, player, shipType)
          }
          placeShip={(id, player) => this.placeShip(id, player)}
        />

        {/* <Checking counter={this.state.varToChange} plusOne={() => this.plusOne}/> */}

        <div style={fortStyles}>
          <h4>Place your ships</h4>
          <Linkor />
        </div>
      </div>
    );
  }
}

const Linkor = () => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.LINKOR },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  // const linkorImage = "http://127.0.0.1:8080/Linkor.png";
  const linkorImage = "http://127.0.0.1:8080/chess_knight.png";
  const ship = [];
  const cellData = {
    isShip: true,
    isShot: false,
    player: -1,
    id: -1
  };

  for (let i = 0; i < 4; i++) {
    ship[i] = (
      <Cell
        value
        cellData={cellData}
        onHovering={() => false}
        placeShip={() => {}}
      />
    );
  }

  return (
    <>
      {/* <DragPreviewImage connect={preview} src={linkorImage} /> */}
      <div style={{ display: "flex", flexDirection: "row" }} ref={drag}>
        {ship}
      </div>
    </>
  );
};

