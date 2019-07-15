import React, { Component } from 'react'
import "./field.css"

export default class Field extends Component {

    render() {

        const {cells, rows} = this.props;
        
        return (
            <div className="field">
                {rows}
            </div>
        )
    }
}
