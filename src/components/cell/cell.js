import React, { Component } from 'react'
import "./cell.css"

export default class Cell extends Component {
    
    state = {
        isShip : false,
        isShot : false,
        id: 0
    }

    onClick = () => {
        this.setState({
            isShot : true
        })
    }

    

    render() {
        
        const {isShot, isShip} = this.state;

        const isHit = isShip && isShot;
        const isBlank = !isShip && isShot;

        return (
            <div 
                className = {
                            `cell 
                            ${isHit ? "hit" : null} 
                            ${isBlank ? "blank" : null}`
                            }
                onClick = { () => this.onClick()}
            >
                            
            </div>
        )
    }
}
