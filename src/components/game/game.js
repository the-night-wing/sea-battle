import React, { Component } from 'react'

import { useDrag } from 'react-dnd';
import update from "immutability-helper"
import produce from "immer"

import "./game.css"

import GameField from "../gamefield"
import Cell from "../cell"
import Checking from "../checking/checking.js"

import {ItemTypes} from "../constants.js"

export default class Game extends Component {
    
    state = {
        isYourTurn : true,
        player1ships : "1",
        player1shots : "1",
        player2ships : "1",
        player2shots : "1",
        varToChange : 1
    }

    plusOne = () => {
        this.setState((state) => {
            return({
                varToChange : state.varToChange + 1
            })
        })
    }

    endTurn = () => {
        this.setState((state) => {
            
            return({
                isYourTurn : !state.isYourTurn,
            })
        })
    }

    generateCellsData = () => {
        const player1ships = [],
              player1shots = [],
              player2ships = [],
              player2shots = [];

        for(let i = 0; i < 10; i++){
            player1ships[i] = [];
            player1shots[i] = [];
            player2ships[i] = [];
            player2shots[i] = [];
            for(let k = 0; k < 10; k++){
                player1ships[i][k] = {
                    isShip : false,
                    isShot : false,
                    canDrop : false,
                    player : 1,
                    id: `${i}-${k}`
                }
                player1shots[i][k] = {
                    isShip : false,
                    isShot : false,
                    canDrop : false,
                    player : 1,
                    id: `${i}-${k}`
                }
                player2ships[i][k] = {
                    isShip : false,
                    isShot : false,
                    canDrop : false,
                    player : 2,
                    id: `${i}-${k}`
                }
                player2shots[i][k] = {
                    isShip : false,
                    isShot : false,
                    canDrop : false,
                    player : 2,
                    id: `${i}-${k}`
                }
            }
        }
        
        this.setState({
            player1ships,
            player1shots,
            player2ships,
            player2shots
        })
    }

    canDropShip = (id, player) => {
        
        // console.log("Hovering")
        // return true

        const [firstIndex, secondIndex] = this.parseId(id);
        // console.log(`firstIndex : ${firstIndex}, secondIndex : ${secondIndex}`)


        const {player1ships, player2ships} = this.state;

        // const shipCells = [];

        if( !(player - 1) ){

            // const oldShots = player1ships;

            if ( typeof player1ships[firstIndex][secondIndex + 3 ] !== "undefined" ){
                // for(let i = 0; i < 4; i++ ){
                //     shipCells[i] = update(oldShots[firstIndex][secondIndex + i], {
                //         canDrop : {$set : true}
                //     })
                // }

                // const newRow = update(oldShots[firstIndex], {
                //     $splice : [[secondIndex, 4, ...shipCells]]
                // })

                // const newMatrix = update(oldShots, {
                //     $splice : [[firstIndex, 1, newRow]]
                // })

                // this.setState({
                //     player1ships : newMatrix
                // })

                this.setState(
                    produce(draft => {
                        for( let i = 0; i < 4; i++){
                            draft.player1ships[firstIndex][secondIndex + i].canDrop = true;
                        }
                    })
                )

            }

            
        }

    }

    placeShip = (id, player) => {
        
        console.log("Trying to place")

        const [firstIndex, secondIndex] = this.parseId(id);

        const {player1ships, player2ships} = this.state;

        // const shipCells = [];

        if( !(player - 1) ){


            // const oldShots = player1ships;
            if ( typeof player1ships[firstIndex][secondIndex + 3 ] !== "undefined" ){
                // for(let i = 0; i < 4; i++ ){
                //     shipCells[i] = update(oldShots[firstIndex][secondIndex + i], {
                //         isShip : {$set : true}
                //     })
                // }

                // const newRow = update(oldShots[firstIndex], {
                //     $splice : [[secondIndex, 4, ...shipCells]]
                // })

                // const newMatrix = update(oldShots, {
                //     $splice : [[firstIndex, 1, newRow]]
                // })

                // this.setState({
                //     player1ships : newMatrix
                // })

                

                // const nextState = produce(this.state, draftState => {
                //     for( let i = 0; i < 4; i++){
                //         draftState.player1ships[firstIndex][secondIndex + i].isShip = true;
                //     }
                //     console.log(draftState)
                // })
                // this.setState({
                //     player1ships : nextState
                // })
                this.setState(
                    produce(draft => {
                        for( let i = 0; i < 4; i++){
                            draft.player1ships[firstIndex][secondIndex + i].isShip = true;
                        }
                    })
                )


            }


        }

    }

    parseId = (id) => {
        
        // const firstIndex = parseInt( String(id).substr(0, 1) );
        // const secondIndex = parseInt( String(id).substr(1, 2) );
        // const id = "5-5"
        const [firstIndex, secondIndex] = id.split("-")
        return [Number(firstIndex), Number(secondIndex)]
    }

    // onClick = () => {}

    onClick = (id, isShip, player) => {

        console.log(id);
        console.log(player);

        const [firstIndex, secondIndex] = this.parseId(id)
        
        const makeShotToCoord = this.makeShot(firstIndex, secondIndex)


        if ( !(player - 1) && !isShip ) {
         
            console.log("You pressed on the player's 1 field");
         
            makeShotToCoord("player1shots")
        }

        if ( (player - 1) && !isShip){
         
            console.log("You pressed on the player's 2 field");
            
            makeShotToCoord("player2shots")
    
        }
    }

    makeShot = ( firstIndex, secondIndex ) => {
        return (
            (shotsfield) => {
                
                const oldShots  = this.state[shotsfield]

                const newCell = update(oldShots[firstIndex][secondIndex], {
                    isShot : {$set : true}
                })


                const newRow = update(oldShots[firstIndex], {
                    $splice : [[secondIndex, 1, newCell]]
                })

                const newMatrix = update(oldShots, {
                    $splice : [[firstIndex, 1, newRow]]
                })

                this.setState({
                    [shotsfield] : newMatrix
                })
            }
        )        
    }

    componentDidMount(){
        this.generateCellsData()
    }

    
    render() {

        const { isYourTurn,
                player1ships,
                player1shots,
                player2ships,
                player2shots} = this.state;  
                
        const fortStyles = {
            border : "3px solid black",
            width : "250px",
            height : "150px"
        }

        return (
            <div className="game">
                    
                    <GameField
                        label={"Player 1"}
                        endturn={() => this.endTurn()}
                        shipsData = { isYourTurn ? player1ships : player2ships }
                        shotsData = { isYourTurn ? player1shots : player2shots}
                        onCellClick = {(id, isShip, player) => this.onClick(id, isShip, player)}
                        onHovering = {(id, player) => this.canDropShip(id, player)}
                        placeShip={(id, player) => this.placeShip(id, player)}
                    />  
                    
                {/* <Checking counter={this.state.varToChange} plusOne={() => this.plusOne}/> */}
                
                
                <div style={fortStyles}>
                    <h4>Place your ships</h4>
                    <Linkor/>
                </div>
            </div>
        )
    }
}

const Linkor = () => {

    const [ {isDragging}, drag] = useDrag({
        item : {type : ItemTypes.LINKOR},
        collect : monitor => ({
            isDragging : !!monitor.isDragging()
        })
    })

    const ship = []
    const cellData = {
        isShip : true,
        isShot : false,
        canDrop : false,
        player : -1,
        id : -1
    }

    for(let i = 0; i < 4; i++){
        ship[i] = <Cell value cellData={cellData} onHovering={() => false} placeShip={() => {}} />
    }

    return(
        <div
            style={{display:"flex", flexDirection:"row"}}
            ref={drag}
        >
            {ship}
        </div>
    )
}

// class DragTutorial extends Component {

//     state = {
//         items : [
//             {id :1, name : "Item 1"},
//             {id :2, name : "Item 2"},
//             {id :3, name : "Item 3"},
//             {id :4, name : "Item 4"}
//         ]
//     }

//     render(){

//         const style = {
//             width : "500px",
//             height : "700px",
//             display:"flex",
//             flexDirection:"collumn",
//             border:"3px solid black",
//             justifyContent : "space-around"
//         }

        

//         return(
//             <div style={style}>
//                 {this.state.items.map(item => <Item item={item} key={item.id} />)}
//                 <Bucket/>
//             </div>
//         )
//     }

// }

// const Item = ({item}) => {

//     const style = {
//         width : "100px",
//         height : "100px",
//         margin : "15px",
//         border:"1px solid black"
//     }

//     return(
//         <div style={style}>
//             {item.name}
//         </div>
//     )
// }

// const Bucket = () =>{

//     const style1 = {
//             width : "300px",
//             height : "200px",
//             border:"1px solid red",
//             margin: "20px"
//         }

//     return(
//         <div style={style1}></div>
//     )


// }
