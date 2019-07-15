import React, { Component } from 'react'
import "./cell.css"

export default class Cell extends Component {
    
    static defaultProps = {
        value : null
    }

    state = {
        value : this.props.value,
        isShip : false,
        isShot : false,
        id: 0
    }

    onClick = () => {

        if (!this.state.value){
            this.setState({
                isShot : true
            })
        }        
    }

    

    render() {
        
        const {isShot, isShip, value} = this.state;

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
                onClick = { () => this.onClick()}
            >
            {value}          
            </div>
        )
    }
}
