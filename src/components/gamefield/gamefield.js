import React, {Component} from 'react'
import "./gamefield.css"

import Cell from "../cell"

export default class GameField extends Component {

    state = {
        cells : [],
        rows : [],
        
    }

    fillWithCells = (cellsData) => {

        const {onCellClick} = this.props;

        const f = [5, false]
        f.splice()
        // console.log(f.1);
        // console.log(cellsData);

        if(cellsData.length > 1)
        {    
            const cells = [];
            const rows = [];
            
            // console.log(`Passed cellsData : ${cellsData}`);
            // console.log(`Passed cellsData length : ${cellsData.length}`);

            for(let i = 0; i < 11; i++){
                cells[i] = i === 0 ? [null] : [<Cell value={i}/>];
                for(let k = 1; k < 11; k++){
                    cells[i][k] = i === 0 ? <Cell value={k}/> : <Cell cellData={cellsData[i-1][k-1]} onClick={onCellClick} />;
                }
                rows[i] = <div className="row">{cells[i]}</div>
            }

            return (
                <div className="battlefield">
                    {rows}
                </div>
            )

            this.setState({
                cells,
                rows
            })
        }
        else return(
            <h1>ZALUPA</h1>
        )
    }

    componentDidMount() {
    }

    render() {
        const {endturn, shipsData, shotsData, label} = this.props; 

        const PlayersBattleField = this.fillWithCells(shipsData);
        const OpponentsBattleField = this.fillWithCells(shotsData);

        return (
            <div className= {`gamefield`}>
                <h1>{label}</h1>
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

}

