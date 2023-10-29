let bconeResult = {
    result : []
}

const bconePrevResult = (state=bconeResult, action) => {
    switch(action.type) {
        case 'BCONEPREVIOUSRESULT': {
            // console.log('bconePREVIOUSRESULT', typeof action.payload.bconeResult, action.payload.bconeResult)
            let newData = new Set([...action.payload.bconeResult])
            return { 
                ...state,
                result: [...newData]
           }
        }
        case 'BCONECURRRESULT': {
            return { 
                ...state,
                result:[action.payload.bconeResult, ...state.result]
           }
        }
        default: return state;
    }
}

export default bconePrevResult;