let playNum = -1;

const playNumber = (state = playNum, action) => {
    switch (action.type) {
        case 'PLAYNUMBER' : {
            state = action.payload.playNumber
            return state
        }
        default : return state;
    }
}

export default playNumber;