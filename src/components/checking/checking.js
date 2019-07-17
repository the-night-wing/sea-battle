import React from 'react'
import _ from "lodash"

const Checking = () => {

    
    const f = [[{"x": 4}, {"Z" : "hush"}], [{"x": 4}, {"Z" : "her"}]]
    const fraka = [[{"x": 4}, {"Z" : "hush"}], [{"x": 4}, {"Z" : "her"}]]
    
    const areEqual = _(f).differenceWith(fraka, _.isEqual).isEmpty()

    console.log('Checking arrays');
    console.log(areEqual);

    return (
        <div>
            {`Arrays are equal : ${areEqual}`}
        </div>
    )
}

export default Checking
