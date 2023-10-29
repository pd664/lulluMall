let sapreResult = {
    result : []
}

const saprePrevResult = (state=sapreResult, action) => {
    switch(action.type) {
        case 'SAPREPREVIOUSRESULT': {
            console.log('SAPREPREVIOUSRESULT', typeof action.payload.sapreResult, action.payload.sapreResult)
            let newData = new Set([...action.payload.sapreResult])
            return { 
                ...state,
                result:[...newData]
           }
        }
        case 'SAPRECURRRESULT': {
            return { 
                ...state,
                result:[action.payload.sapreResult, ...state.result]
           }
        }
        default: return state;
    }
}

export default saprePrevResult;