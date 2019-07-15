import React from 'react'
import "./gamefield.css"

import BattleField from "../field"
import withCells from "../field/withCells"

const GameField = () => {

    
    const PlayersBattleField = withCells(BattleField)
    const OpponentsBattleField = withCells(BattleField)


    return (
        <div className="gamefield">
            {/* <div> */}
                <PlayersBattleField/>
            {/* </div> */}
            
            <OpponentsBattleField/>
        </div>
    )
}

export default GameField
