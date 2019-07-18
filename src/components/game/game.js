import React, { Component } from 'react'
import "./game.css"
import Checking from "../checking/checking.js"

import update from "immutability-helper"

import GameField from "../gamefield"

export default class Game extends Component {
    
    state = {
        isYourTurn : true,
        player1ships : "1",
        player1shots : "1",
        player2ships : "1",
        player2shots : "1",
        varToChange : 1
    }

    plusOne = () => {
        this.setState((state) => {
            return({
                varToChange : state.varToChange + 1
            })
        })
    }

    endTurn = () => {
        this.setState((state) => {
            
            return({
                isYourTurn : !state.isYourTurn,
            })
        })
    }

    generateCellsData = () => {
        const player1ships = [],
              player1shots = [],
              player2ships = [],
              player2shots = [];

        for(let i = 0; i < 10; i++){
            player1ships[i] = [];
            player1shots[i] = [];
            player2ships[i] = [];
            player2shots[i] = [];
            for(let k = 0; k < 10; k++){
                player1ships[i][k] = {
                    isShip : false,
                    isShot : false,
                    player : 1,
                    id: `${i}${k}`
                }
                player1shots[i][k] = {
                    isShip : false,
                    isShot : false,
                    player : 1,
                    id: `${i}${k}`
                }
                player2ships[i][k] = {
                    isShip : false,
                    isShot : false,
                    player : 2,
                    id: `${i}${k}`
                }
                player2shots[i][k] = {
                    isShip : false,
                    isShot : false,
                    player : 2,
                    id: `${i}${k}`
                }
            }
        }
        
        this.setState({
            player1ships,
            player1shots,
            player2ships,
            player2shots
        })
    }

    // onClick = () => {}

    onClick = (id, isShip, player) => {

        console.log(id);
        console.log(player);

        const firstIndex = parseInt( String(id).substr(0, 1) );
        const secondIndex = parseInt( String(id).substr(1, 2) );
        
        // console.log(`first : ${firstIndex} second : ${secondIndex}`)

        if ( !(player - 1) && !isShip ) {
         
            console.log("You pressed on the player's 1 field");
         
            const { player1shots : oldShots } = this.state;

            const newCell = update(oldShots[firstIndex][secondIndex], {
                isShot : {$set : true}
            })


            const newRow = update(oldShots[firstIndex], {
                $splice : [[secondIndex, 1, newCell]]
            })

            const newMatrix = update(oldShots, {
                $splice : [[firstIndex, 1, newRow]]
            })

            console.log(`newCell : ${newCell}`);
            console.log(`newRow : ${newRow}`);
            console.log(`newMatrix : ${newMatrix}`);

            this.setState({
                player1shots : newMatrix
            })
        }

        if ( (player - 1) && !isShip){
         
            console.log("You pressed on the player's 2 field");
            
            const { player2shots : oldShots } = this.state;

            const newCell = update(oldShots[firstIndex][secondIndex], {
                isShot : {$set : true}
            })


            const newRow = update(oldShots[firstIndex], {
                $splice : [[secondIndex, 1, newCell]]
            })

            const newMatrix = update(oldShots, {
                $splice : [[firstIndex, 1, newRow]]
            })

            this.setState({
                player2shots : newMatrix
            })

            // const { player2shots : oldShots } = this.state;

            // const newShots = [...oldShots];
            // newShots[firstIndex][secondIndex]["isShot"] = true
            
            // this.setState({
            //     player2shots : newShots
            // })
        }
    }

    componentDidMount(){
        this.generateCellsData()
        // const player1ships = [],
        //       player1shots = [],
        //       player2ships = [],
        //       player2shots = [];

        // for(let i = 0; i < 10; i++){
        //     player1ships[i] = [];
        //     player1shots[i] = [];
        //     player2ships[i] = [];
        //     player2shots[i] = [];
        //     for(let k = 0; k < 10; k++){
        //         player1ships[i][k] = {
        //             isShip : false,
        //             isShot : false,
        //             player : 1,
        //             id: `${i}${k}`
        //         }
        //         player1shots[i][k] = {
        //             isShip : false,
        //             isShot : false,
        //             player : 1,
        //             id: `${i}${k}`
        //         }
        //         player2ships[i][k] = {
        //             isShip : false,
        //             isShot : false,
        //             player : 2,
        //             id: `${i}${k}`
        //         }
        //         player2shots[i][k] = {
        //             isShip : false,
        //             isShot : false,
        //             player : 2,
        //             id: `${i}${k}`
        //         }
        //     }
        // }
        // this.setState({
        //     player1ships,
        //     player1shots,
        //     player2ships,
        //     player2shots
        // })
    }

    
    render() {

        const { isYourTurn,
                player1ships,
                player1shots,
                player2ships,
                player2shots} = this.state;        

        return (
            <div className="game">
                    
                    <GameField
                        // className={`${isYourTurn ? "show" : "hide"}`}
                        label={"Player 1"}
                        endturn={() => this.endTurn()}
                        shipsData = { isYourTurn ? player1ships : player2ships }
                        shotsData = { isYourTurn ? player1shots : player2shots}
                        onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                    />  
                
                    {/* <GameField
                        className={`${!isYourTurn ? "show" : "hide"}`}
                        label={"Player 2"}
                        endturn={() => this.endTurn()}
                        shipsData = { player2ships }
                        shotsData = { player2shots }
                        onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                    /> */}
                    
                <Checking counter={this.state.varToChange} plusOne={() => this.plusOne}/>
            </div>
        )
    }
}
