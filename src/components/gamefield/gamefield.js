import React from 'react'
import "./gamefield.css"

import BattleField from "../field"

const GameField = ({endturn, shipsData, shotsData, onCellClick}) => {

    
    const PlayersBattleField = <BattleField cellsData={shipsData} onCellClick={onCellClick} />
    const OpponentsBattleField = <BattleField cellsData={shotsData} onCellClick={onCellClick} />


    return (
        <div className= {`gamefield`}>
            <div>
                <h1>Opponent's Field</h1>
                {OpponentsBattleField}
            </div>
            <button
                className="endturn"
                onClick={endturn}
            >
                End Turn
            </button>
            <div>
                <h1>Your Field</h1>
            {PlayersBattleField}
            </div>
        </div>
    )
}

export default GameField
