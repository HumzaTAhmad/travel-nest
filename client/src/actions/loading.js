export function startLoading() {
    return async function (dispatch) {
        try {
            dispatch({ type:'START_LOADING'});
        } catch (error) {
            console.log(error.message);
        }
    }
}

export function endLoading() {
    return async function (dispatch) {
        try {
            dispatch({ type:'END_LOADING'});
        } catch (error) {
            console.log(error.message);
        }
    }
}



