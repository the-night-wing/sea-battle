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

            for(let i = 0; i < 10; i++){
                cells[i] = [];
                for(let k = 0; k < 10; k++){
                    cells[i][k] = <Cell/>;
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
