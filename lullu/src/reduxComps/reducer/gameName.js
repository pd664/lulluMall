let gamename = 'parity';

const gameName = (state = gamename, action) => {
    switch (action.type) {
        case 'GAMENAME' : {
            state = action.payload.gameName
            return state
        }
        default : return state;
    }
}

export default gameName;