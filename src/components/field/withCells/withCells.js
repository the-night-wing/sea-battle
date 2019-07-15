import React, {Component} from 'react'
import Cell from '../../cell'

const withCells = (Wrapper, amount) => {
    return class extends Component {

        state = {
            cells : [],
            rows : []
        }


        fillWithCells = () => {
            const cells = [];
            const rows = [];

            for(let i = 0; i < 11; i++){
                cells[i] = i === 0 ? [null] : [<Cell value={i}/>];
                for(let k = 1; k < 11; k++){
                    cells[i][k] = i === 0 ? <Cell value={k}/> : <Cell/>;
                }
                rows[i] = <div className="row">{cells[i]}</div>
            }

            this.setState({
                cells,
                rows
            })
        }

        componentDidMount() {
            this.fillWithCells();          
        }

        render(){                        

            const {cells, rows} = this.state;

            return(
                <Wrapper cells={cells} rows={rows} {...this.props} />
            )
        }
    }
}

export default withCells
