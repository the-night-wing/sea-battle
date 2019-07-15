import React, { Component } from 'react'
import "./field.css"

export default class BattleField extends Component {

    render() {

        const {rows} = this.props;
        
        return (
            <div className="battlefield">
                {rows}
            </div>
        )
    }
}
