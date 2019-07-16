import React, { Component } from 'react'
import "./game.css"

import GameField from "../gamefield"

export default class Game extends Component {
    
    state = {
        isYourTurn : true,
        player1ships : [],
        player1shots : [],
        player2ships : [],
        player2shots : []
    }

    endTurn = () => {
        this.setState((state) => {
            
            return({
                isYourTurn : !state.isYourTurn
            })
        }, () => console.log(this.state.isYourTurn) )
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
        
        console.log(player1ships);
        console.log(player1shots);
        console.log(player2ships);
        console.log(player2shots);
 
        this.setState({
            player1ships,
            player1shots,
            player2ships,
            player2shots
        })
    }

    onClick = (id, isShip, player) => {

        console.log(id);

        const firstIndex = parseInt( String(id).substr(0, 1) );
        const secondIndex = parseInt( String(id).substr(1, 2) );
        
        console.log(`first : ${firstIndex} second : ${secondIndex}`)
        
        if ( !(player - 1) && !isShip){
            const { player1shots : oldShots } = this.state;

            const newShots = [...oldShots];
            newShots[firstIndex][secondIndex]["isShot"] = true

            this.setState({
                player1shots : newShots
            })
        }

        if ( (player - 1) && !isShip){
            const { player2shots : oldShots } = this.state;

            const newShots = [...oldShots];
            newShots[firstIndex][secondIndex]["isShot"] = true
            
            this.setState({
                player2shots : newShots
            })
        }
    }

    componentDidMount(){
        this.generateCellsData()
    }

    
    render() {

        const { isYourTurn,
                player1ships,
                player1shots,
                player2ships,
                player2shots} = this.state;

        const yourTurn =    <GameField
                                className = {
                                            `${isYourTurn ? "show" : "hide"}` 
                                            } 
                                endturn={() => this.endTurn()}
                                shipsData = {player1ships}
                                shotsData = {player1shots}
                                onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                            />  

        const opponentsTurn =   <GameField
                                    className = {
                                                `${!isYourTurn ? "show" : "hide"}` 
                                                } 
                                    endturn={() => this.endTurn()}
                                    shipsData = {player2ships}
                                    shotsData = {player2shots}
                                    onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                                />  

        return (
            <div className="game">
                {yourTurn}
                {opponentsTurn}
            </div>
        )
    }
}
