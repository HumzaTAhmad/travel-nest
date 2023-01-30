

export function updateUser(user) {
    return async function (dispatch) {
        try {
            console.log("The user is", user)
            dispatch({ type:'UPDATE_USER', payload: user });
        } catch (error) {
            console.log(error.message);
        }
    }
}