export function openLogin(boolform) {
    return async function (dispatch) {
        try {
            dispatch({ type:'OPEN_LOGIN', payload: boolform });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export function closeLogin(boolform) {
    return async function (dispatch) {
        try {
            dispatch({ type:'CLOSE_LOGIN', payload: boolform });
        } catch (error) {
            console.log(error.message);
        }
    }
}




