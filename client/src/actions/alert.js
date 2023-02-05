
export function updateAlert(alert) {
    return async function (dispatch) {
        try {
            dispatch({ type:'UPDATE_ALERT', payload: alert });
        } catch (error) {
            console.log(error.message);
        }
    }
}