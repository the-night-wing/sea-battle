import React, {Component} from 'react'
import "./gamefield.css"

import Cell from "../cell"

import _ from "lodash"

// const f = [{"x": 4}, {"Z" : "hush"}]
// const fraka = [{"x": 4}, {"Z" : "hush"}]
// console.log('Checking arrays');
// console.log(_(f).differenceWith(fraka, _.isEqual).isEmpty());

const fillWithCells = (cellsData, onCellClick) => {

    // const {onCellClick} = this.props;

    // const f = [{"x": 4}, {"Z" : "hush"}]
    // const fraka = [{"x": 4}, {"Z" : "hush"}]
    // console.log(_(f).differenceWith(fraka, _.isEqual).isEmpty());
    // console.log(f.1);
    // console.log(cellsData);

    if(cellsData.length > 1)
    {    
        const cells = [];
        const rows = [];
        
        console.log(`Passed cellsData : ${cellsData}`);
        // console.log(`Passed cellsData length : ${cellsData.length}`);

        for(let i = 0; i < 11; i++){
            cells[i] = i === 0 ? [null] : [<Cell value={i}/>];
            for(let k = 1; k < 11; k++){
                cells[i][k] = i === 0 ? <Cell value={k}/> : <Cell cellData={cellsData[i-1][k-1]} onClick={onCellClick} />;
            }
            rows[i] = <div className="row">{cells[i]}</div>
        }
        console.log("rowsAS?D?ASD?A?D?SD??AD?A?SD?AS?D?ASD??D?");
        console.log(cells);
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

// export default class GameField extends Component {
    const GameField = ({shipsData, shotsData, endturn, label, onCellClick}) => {

    // state = {
    //     shipsData : this.props.shipsData,
    //     shotsData : this.props.shotsData,

        
    // }



    // updateBattleField = () => {

    //     const {shipsData, shotsData} = this.state; 

    //     const PlayersBattleField = this.fillWithCells(shipsData);
    //     const OpponentsBattleField = this.fillWithCells(shotsData);

    //     this.setState({
    //         PlayersBattleField,
    //         OpponentsBattleField
    //     })

    // }

    // componentDidMount() {
    //     this.updateBattleField()
    // }

    // componentDidUpdate(prevProps){

        
    //     // const f = [{"x": 4}, {"Z" : "hush"}]
    //     // const fraka = [{"x": 4}, {"Z" : "hush"}]
    //     console.log(`props`);
    //     console.log(this.props);
    //     console.log(`prevProps`);
    //     console.log(prevProps);
    //     console.log('Checking arrays');
    //     const areShipsEqual = _(this.props.shipsData).differenceWith(prevProps.shipsData, _.isEqual).isEmpty()
    //     console.log(areShipsEqual);
    //     const areShotsEqual = _(this.props.shotsData).differenceWith(prevProps.shotsData, _.isEqual).isEmpty()
    //     console.log(areShotsEqual);

    //     if ( !(areShipsEqual && areShotsEqual) ){
    //         console.log(`updatin BattleField`);
    //         // this.updateBattleField()
    //         this.setState({
    //             shipsData : this.props.shipsData,
    //             shotsData : this.props.shotsData
    //         }, () => {
    //             console.log('State after update')
    //             console.log(this.state.shipsData);
    //             console.log(this.state.shotsData);
    //         })
    //     }
    // }

    // render() {
        // const { endturn, label } = this.props; 
        // const { PlayersBattleField, OpponentsBattleField } = this.state;
        // const { shipsData, shotsData } = this.state;

        const PlayersBattleField = fillWithCells(shipsData, onCellClick);
        const OpponentsBattleField = fillWithCells(shotsData, onCellClick);

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
    // }

}

export default GameField

