import React, {Component} from 'react'
import Cell from '../../cell'

const withCells = (Wrapper, cellsData, onCellClick) => {
    return class extends Component {

        state = {
            cells : [],
            rows : []
        }


        fillWithCells = () => {
            const cells = [];
            const rows = [];

            console.log(`Passed cellsData : ${cellsData}`);

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
