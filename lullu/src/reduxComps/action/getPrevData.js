export const parityPrevData = (arr) => {
    return {
        type: 'PARITYPREVIOUSRESULT',
        payload: {
            parityResult: arr
        }
    }
}

export const parityCurrData = (res) => {
    return {
        type: 'PARITYCURRRESULT',
        payload: {
            parityResult: res
        }
    }
}

export const saprePrevData = (arr) => {
    console.log("arr", arr)
    return {
        type: 'SAPREPREVIOUSRESULT',
        payload: {
            sapreResult: arr
        }
    }
}

export const sapreCurrData = (res) => {
    return {
        type: 'SAPRECURRRESULT',
        payload: {
            sapreResult: res
        }
    }
}

export const emerdPrevData = (arr) => {
    return {
        type: 'EMERDPREVIOUSRESULT',
        payload: {
            emerdResult: arr
        }
    }
}

export const emerdCurrData = (res) => {
    return {
        type: 'EMERDCURRRESULT',
        payload: {
            emerdResult: res
        }
    }
}

export const bconePrevData = (arr) => {
    return {
        type: 'BCONEPREVIOUSRESULT',
        payload: {
            bconeResult: arr
        }
    }
}

export const bconeCurrData = (res) => {
    return {
        type: 'BCONECURRRESULT',
        payload: {
            bconeResult: res
        }
    }
}