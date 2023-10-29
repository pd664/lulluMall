let popUp = false

const changePopState = (state = popUp, action) => {
    // console.log("state isassssss", state)
    switch(action.type) {
        case 'CHANGEPOPUPSTATE' : {
            // state = !state
            return !state
        }
        default: return state
    }
}

export default changePopState