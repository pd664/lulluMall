let playCol = '';

const playColor = (state = playCol, action) => {
    switch (action.type) {
        case 'PLAYCOLOR' : {
            state = action.payload.playColor
            return state
        }
        default : return state;
    }
}

export default playColor;