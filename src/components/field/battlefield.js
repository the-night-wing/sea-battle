import React, { Component } from 'react'
import "./battlefield.css"

import Cell from "../cell"

export default class BattleField extends Component {

    state = {
        cells : [],
        rows : []
    }

    fillWithCells = () => {

        const {cellsData, onCellClick} = this.props;

        // const f = "1"
        // console.log(f.length);
        console.log(cellsData);

        if(cellsData.length > 1)
        {    
            const cells = [];
            const rows = [];
            
            console.log(`Passed cellsData : ${cellsData}`);
            console.log(`Passed cellsData length : ${cellsData.length}`);

            for(let i = 0; i < 11; i++){
                cells[i] = i === 0 ? [null] : [<Cell value={i}/>];
                for(let k = 1; k < 11; k++){
                    cells[i][k] = i === 0 ? <Cell value={k}/> : <Cell cellData={cellsData[i-1]} onClick={onCellClick} />;
                }
                rows[i] = <div className="row">{cells[i]}</div>
            }

            this.setState({
                cells,
                rows
            })
        }
    }

    componentDidMount() {
        this.fillWithCells();          
    }

    render() {

        const {rows} = this.state;
        
        return (
            <div className="battlefield">
                {rows}
            </div>
        )
    }
}
