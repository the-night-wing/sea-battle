import React from 'react'
import "./gamefield.css"

import BattleField from "../field"
import withCells from "../field/withCells"

const GameField = ({endturn, className, shipsData, shotsData, onCellClick}) => {

    
    const PlayersBattleField = withCells(BattleField, shipsData, onCellClick)
    const OpponentsBattleField = withCells(BattleField, shotsData, onCellClick)


    return (
        <div className= {`gamefield ${className}`}>
            <div>
                <h1>Opponent's Field</h1>
                <OpponentsBattleField/>
            </div>
            <button
                className="endturn"
                onClick={endturn}
            >
                End Turn
            </button>
            <div>
                <h1>Your Field</h1>
                <PlayersBattleField/>
            </div>
        </div>
    )
}

export default GameField
