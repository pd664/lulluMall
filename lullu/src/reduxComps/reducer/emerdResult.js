let emerdResult = {
    result : []
}

const emerdPrevResult = (state=emerdResult, action) => {
    switch(action.type) {
        case 'EMERDPREVIOUSRESULT': {
            // console.log('PREVIOUSRESULT', typeof action.payload.emerdResult, action.payload.emerdResult)
            let newData = new Set([...action.payload.emerdResult])
            return { 
                ...state,
                result:[...newData]
           }
        }
        case 'EMERDCURRRESULT': {
            return { 
                ...state,
                result:[action.payload.emerdResult, ...state.result]
           }
        }
        default: return state;
    }
}

export default emerdPrevResult;