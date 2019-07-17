import React, { Component } from 'react'
import "./game.css"

import update from "immutability-helper"

import GameField from "../gamefield"

export default class Game extends Component {
    
    state = {
        isYourTurn : true,
        isOpponentsTurn : false,
        player1ships : "1",
        player1shots : "1",
        player2ships : "1",
        player2shots : "1",
        varToChange : false
    }

    endTurn = () => {
        this.setState((state) => {
            
            return({
                isYourTurn : !state.isYourTurn,
                isOpponentsTurn : !state.isOpponentsTurn
            })
        }, () => {
            console.log(this.state.isYourTurn)  
            // console.log(this.state.player1ships);
            // console.log(this.state.player1shots);
            // console.log(this.state.player2ships);
            // console.log(this.state.player2shots);
        } )
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
        }, () => {
            console.log(this.state.player1ships);
            console.log(this.state.player1shots);
            console.log(this.state.player2ships);
            console.log(this.state.player2shots);
        })
    }

    // onClick = () => {}

    onClick = (id, isShip, player) => {

        console.log(id);
        console.log(player);

        const firstIndex = parseInt( String(id).substr(0, 1) );
        const secondIndex = parseInt( String(id).substr(1, 2) );
        
        console.log(`first : ${firstIndex} second : ${secondIndex}`)
        
        // this.setState({
        //     varToChange : "varToChange"
        // }, console.log(this.state.varToChange))

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

            // const newShots = [...oldShots];
            // newShots[firstIndex][secondIndex]["isShot"] = true

            this.setState({
                player1shots : newMatrix
            }, () => {
                console.log("AFTER YOU FUNCKING CLICKEDQ(*@$&^$*Q#&%$(Q*$^&*($&*$");
                console.log(this.state.player1shots);
                this.forceUpdate()
                // callbackfunc()
            } )
        }

        if ( (player - 1) && !isShip){
         
            console.log("You pressed on the player's 2 field");
            
            // const { player2shots : oldShots } = this.state;

            // const newShots = [...oldShots];
            // newShots[firstIndex][secondIndex]["isShot"] = true
            
            // this.setState({
            //     player2shots : newShots
            // })
        }
    }

    componentDidMount(){
        // this.generateCellsData()
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
        
        console.log(`RECREATED~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
 
        this.setState({
            player1ships,
            player1shots,
            player2ships,
            player2shots
        }, () => {
            console.log(`GAVNO IZ PISKI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
            console.log(this.state.player1ships);
            console.log(this.state.player1shots);
            console.log(this.state.player2ships);
            console.log(this.state.player2shots);
        })
    }

    
    render() {

        const { isYourTurn,
                isOpponentsTurn,
                player1ships,
                player1shots,
                player2ships,
                player2shots} = this.state;        

        return (
            <div className="game">
                <div className={`${isYourTurn ? "show" : "hide"}`}>
                    {
                        <GameField
                            label={"Player 1"}
                            endturn={() => this.endTurn()}
                            shipsData = { player1ships}
                            shotsData = { player1shots}
                            onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                        />  
                    }
                </div>
                <div className={`${isOpponentsTurn ? "show" : "hide"}`}>
                    {
                        <GameField
                            label={"Player 2"}
                            endturn={() => this.endTurn()}
                            shipsData = { player2ships }
                            shotsData = { player2shots }
                            onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                        />
                    }
                </div>
                
            </div>
        )
    }
}
