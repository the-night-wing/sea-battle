import React, { Component } from 'react'
import "./cell.css"

export default class Cell extends Component {
    
    static defaultProps = {
        value : null,
        cellData : {
            isShip : false,
            isShot : false,
            player : -1,
            id : -1
        }
    }

    state = {
        value : this.props.value,
        isShip : this.props.cellData["isShip"],
        isShot : this.props.cellData["isShot"],
        player : this.props.cellData["player"],
        id: this.props.cellData["id"]
    }

    checkData = () => {

        const { isShip, isShot, player } = this.state;

        console.log(` Is Ship ? ${isShip}`);
        console.log(` Is Shot ? ${isShot}`);
        console.log(` Which player ? ${[player]}`);
    }

    

    render() {
        
        const {isShot, isShip, value, id, player} = this.state;
        // console.log(this.props);
        // console.log(`player in Cell : ${player}`);
        // console.log(`id in Cell : ${id}`);
        const isHit = isShip && isShot;
        const isBlank = !isShip && isShot;

        return (
            <div 
                className = {
                            `cell
                            ${value ? "not-clickable" : "clickable"} 
                            ${isHit ? "hit" : null} 
                            ${isBlank ? "blank" : null}`
                            }
                onClick = { 
                            value 
                            ? 
                            () => {} 
                            : 
                            () => { 
                                    this.props.onClick(id, isShip, player);
                                    this.checkData()

                                }
                        }
            >
            {value}          
            </div>
        )
    }
}
