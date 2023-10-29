let parityResult = {
    result : []
}
const parityPrevResult = (state=parityResult, action) => {
   
    switch(action.type) {
        case 'PARITYPREVIOUSRESULT': {
            // console.log('PARITYPREVIOUSRESULT', typeof action.payload.parityResult, action.payload.parityResult)
            let newData = new Set([...action.payload.parityResult])
            return { 
                ...state,
                result:[...newData]
           }
        }
        case 'PARITYCURRRESULT': {
            // console.log("action.payload.parityResult", action.payload.parityResult)
            return { 
                ...state,
                result:[action.payload.parityResult, ...state.result]
           }
        }
        default: return state;
    }
}

export default parityPrevResult;