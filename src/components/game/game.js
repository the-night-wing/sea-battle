import React, { Component } from "react";

import produce from "immer";

import "./game.css";

import GameField from "../gamefield";
import Checking from "../checking/checking.js";
import { Battleship, Cruiser, Destroyer, PatrolBoat } from "../ships"

import CustomDragLayer from "../custom-drag-layer"

import { parseShipLength, parseId, checkSurroundingCells } from "../../helpers";


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
    
    const oldShips = !(player - 1) ? player1ships : player2ships

    // if (!(player - 1)) {
      if (secondIndex <= oldShips[firstIndex].length - shipLength) {
        for (let i = 0; i < shipLength; i++) {
          if (oldShips[firstIndex][secondIndex + i].isShip === true) {
            return false;
          }
        }

        for (let i = 0; i < shipLength; i++) {
          if (
            checkSurroundingCells(firstIndex, secondIndex + i, oldShips)
          ) {
            return false;
          }
        }
        return true;
      } else {
        const displacement = 10 - secondIndex - shipLength;
        for (let i = displacement; i < shipLength + displacement; i++) {
          if (oldShips[firstIndex][secondIndex + i].isShip === true) {
            return false;
          }
        }

        for (let i = displacement; i < shipLength + displacement; i++) {
          if (
            checkSurroundingCells(firstIndex, secondIndex + i, oldShips)
          ) {
            return false;
          }
        }
        return true;
      }
    // }
  };

  placeShip = (id, player, shipType) => {
    const [firstIndex, secondIndex] = parseId(id);
    const shipLength = parseShipLength(shipType);

    const { player1ships, player2ships } = this.state;

    const oldShips = !(player - 1) ? player1ships : player2ships,
          shipsName = !(player - 1) ? "player1ships" : "player2ships"

    // if (!(player - 1)) {
      // console.log(
      //   secondIndex,
      //   player1ships[firstIndex].length,
      //   shipLength,
      //   shipType
      // );
      // if (player1ships[firstIndex][secondIndex + (shipLength - 1)] !== undefined) {
      if (secondIndex <= oldShips[firstIndex].length - shipLength) {
        console.log("Trying to place deeper");
        this.setState(
          produce(draft => {
            for (let i = 0; i < shipLength; i++) {
              draft[shipsName][firstIndex][secondIndex + i].isShip = true;
            }
          })
        );
      } else {
        console.log("Trying to place in proh");
        this.setState(
          produce(draft => {
            const displacement = 10 - secondIndex - shipLength;
            console.log(displacement)
            for (let i = displacement; i < shipLength + displacement; i++) {
              draft[shipsName][firstIndex][secondIndex + i].isShip = true;
            }
          })
        );
      }
    // }
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
      <>
      <div className="game">
        <GameField
          label={"Player 1"}
          endturn={() => this.endTurn()}
          shipsData={isYourTurn ? player1ships : player2ships}
          shotsData={isYourTurn ? player1shots : player2shots}
          onCellClick={(id, isShip, player) => this.onClick(id, isShip, player)}
          canDropShip={(id, player, shipType) =>
            this.canDropShip(id, player, shipType)
          }
          placeShip={(id, player, shipType) => this.placeShip(id, player, shipType)}
        />

        {/* <Checking counter={this.state.varToChange} plusOne={() => this.plusOne}/> */}

        <div style={fortStyles}>
          <h4>Place your ships</h4>
          {/* <Battleship />
          <Cruiser />
          <Destroyer />
          <PatrolBoat /> */}
          {Battleship} 
          {Cruiser }
          {Destroyer }
          {PatrolBoat} 
        </div>
      <CustomDragLayer/>
      </div>
      </>
    );
  }
}


