import React from 'react'
import _ from "lodash"

const Checking = ({counter, plusOne}) => {

    
    // const f = [[{"x": 4}, {"Z" : "hush"}], [{"x": 4}, {"Z" : "her"}]]
    // const fraka = [[{"x": 4}, {"Z" : "hush"}], [{"x": 4}, {"Z" : "her"}]]
    
    // const areEqual = _(f).differenceWith(fraka, _.isEqual).isEmpty()

    // console.log('Checking arrays');
    // console.log(areEqual);

    return (
        <div>
            {/* {`Arrays are equal : ${areEqual}`} */}
            {counter}
            <button onClick={plusOne()}>
                Plus one
            </button>
        </div>
    )
}

export default Checking
