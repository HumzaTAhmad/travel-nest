import { updateAlert } from "./alert";
import { endLoading, startLoading } from "./loading";
import { closeLogin } from "./login";
import * as api from '../api';


export function updateUser(user) {
    return async function (dispatch) {
        try {
            console.log("In user it is", user)
            dispatch({ type:'UPDATE_USER', payload: user });
        } catch (error) {
            console.log(error.message);
        }
    }
}

export function createUser(user){
    return async function(dispatch){
        dispatch(startLoading())
        //SEND REQUEST WITH FETCH
        const result = await api.createUser({user:user}, dispatch)
        console.log(result)
        if(result){
            dispatch(updateUser(result.result))
            dispatch(closeLogin())
            dispatch(updateAlert({open:true, severity:'success', message:'Your account has been created successfully'}))
        }
        dispatch(endLoading())
    }
}

export function getUser(user){
    return async function(dispatch){
        dispatch(startLoading())
        //SEND REQUEST WITH FETCH
        const result = await api.getUser({user:user}, dispatch)
        console.log(result)
        if(result){
            dispatch(updateUser(result.result))
            dispatch(closeLogin())
        }
        dispatch(endLoading())
    }
}