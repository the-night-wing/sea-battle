import React, { Component } from 'react'
import "./game.css"

import GameField from "../gamefield"

export default class Game extends Component {
    
    state = {
        isYourTurn : true,
        player1ships : "1",
        player1shots : "1",
        player2ships : "1",
        player2shots : "1"
    }

    endTurn = () => {
        this.setState((state) => {
            
            return({
                isYourTurn : !state.isYourTurn
            })
        }, () => {
            console.log(this.state.isYourTurn)
            console.log(this.state.player1ships);
            console.log(this.state.player1shots);
            console.log(this.state.player2ships);
            console.log(this.state.player2shots);
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

    onClick = () => {}

    // onClick = (id, isShip, player) => {

    //     console.log(id);

    //     const firstIndex = parseInt( String(id).substr(0, 1) );
    //     const secondIndex = parseInt( String(id).substr(1, 2) );
        
    //     console.log(`first : ${firstIndex} second : ${secondIndex}`)
        
    //     if ( !(player - 1) && !isShip){
    //         const { player1shots : oldShots } = this.state;

    //         const newShots = [...oldShots];
    //         newShots[firstIndex][secondIndex]["isShot"] = true

    //         this.setState({
    //             player1shots : newShots
    //         })
    //     }

    //     if ( (player - 1) && !isShip){
    //         const { player2shots : oldShots } = this.state;

    //         const newShots = [...oldShots];
    //         newShots[firstIndex][secondIndex]["isShot"] = true
            
    //         this.setState({
    //             player2shots : newShots
    //         })
    //     }
    // }

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

    
    render() {

        const { isYourTurn,
                player1ships,
                player1shots,
                player2ships,
                player2shots} = this.state;        

        return (
            <div className="game">
                <GameField
                                    endturn={() => this.endTurn()}
                                    shipsData = { isYourTurn ? player1ships : player2ships}
                                    shotsData = { isYourTurn ? player1shots : player2shots}
                                    onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                                />  
            </div>
        )
    }
}
