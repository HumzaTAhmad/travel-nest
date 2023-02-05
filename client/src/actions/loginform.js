export function openLogin(boolform) {
    return async function (dispatch) {
        try {
            dispatch({ type:'OPEN_LOGINFORM', payload: boolform });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export function closeLogin(boolform) {
    return async function (dispatch) {
        try {
            dispatch({ type:'CLOSE_LOGINFORM', payload: boolform });
        } catch (error) {
            console.log(error.message);
        }
    }
}




