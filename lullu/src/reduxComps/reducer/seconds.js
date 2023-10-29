let second = 0;

const changeSecond = (state = second, action) => {
    switch (action.type) {
        case 'CHANGESECOND' : {
            state = action.payload.second
            return state
        }
        default : return state;
    }
}

export default changeSecond;