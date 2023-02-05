export function openLogin() {
    return async function (dispatch) {
        try {
            dispatch({ type:'OPEN_LOGIN'});
        } catch (error) {
            console.log(error.message);
        }
    }
}

export function closeLogin() {
    return async function (dispatch) {
        try {
            dispatch({ type:'CLOSE_LOGIN'});
        } catch (error) {
            console.log(error.message);
        }
    }
}




