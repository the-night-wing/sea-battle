import React, { Component } from 'react'
import "./game.css"

import GameField from "../gamefield"

export default class Game extends Component {
    
    state = {
        isYourTurn : true
    }

    endTurn = () => {
        this.setState((state) => {
            
            return({
                isYourTurn : !state.isYourTurn
            })
        }, () => console.log(this.state.isYourTurn) )
    }
    
    render() {

        const {isYourTurn} = this.state;

        const yourTurn =    <GameField
                                className = {
                                            `${isYourTurn ? "show" : "hide"}` 
                                            } 
                                endturn={() => this.endTurn()}
                            />  

        const opponentsTurn =   <GameField
                                    className = {
                                                `${!isYourTurn ? "show" : "hide"}` 
                                                } 
                                    endturn={() => this.endTurn()}
                                />  

        return (
            <div className="game">
                {yourTurn}
                {opponentsTurn}
            </div>
        )
    }
}
