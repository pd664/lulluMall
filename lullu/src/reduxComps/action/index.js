export const changepopUp = () => {
    return {
        type : 'CHANGEPOPUPSTATE'
    }
}

export const playNumber = (playNum) => {
    return {
        type : 'PLAYNUMBER',
        payload: {
            playNumber: playNum
        }
    }
}

export const playColor = (playCol) => {
    return {
        type : 'PLAYCOLOR',
        payload: {
            playColor: playCol
        }
    }
}

export const gameName = (gamename) => {
    return {
        type :  'GAMENAME',
        payload: {
            gameName: gamename 
        }
    }
}

export const seconds = (second) => {
    return {
        type : 'CHANGESECOND',
        payload: {
            second: second
        }
    }
}