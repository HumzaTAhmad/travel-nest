
export function updateProfile(profile) {
    return async function (dispatch) {
        try {
            dispatch({ type:'UPDATE_PROFILE', payload: profile});
        } catch (error) {
            console.log(error.message);
        }
    }
}