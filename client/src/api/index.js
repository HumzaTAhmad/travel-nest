import axios from 'axios';
import { updateAlert } from '../actions/alert.js';
import { updateUser } from '../actions/user.js';
import {store} from '../index.js';

const url1 = 'http://localhost:5000/room';
const url2 = 'http://localhost:5000/user';


export const createRoom = (newRoom) => {
    const state = store.getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.user.token
        }
    }
    
    return axios.post(url1, newRoom, config)
}
//REMEMBER TO REFACTOR THIS CODE TO RETRIEVE ALL DATA OR FIGURE OUT A WAY NOT TO. REMEMBER TO MOVE AUTH.js into actions
export const createUser = async ({token='', user=null}, dispatch) =>{
    const state = store.getState()
    const config = token
        ?{headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.user.token}}
        :{headers: {'Content-Type': 'application/json'}}
    
    config.body = user ? JSON.stringify(user) : {};
    
    
    try{
        const response = await axios.post(url2 + '/register', user, config)
        const data = await response.data
        if(!data.success){
            if(response.status === 401) dispatch(updateUser(null))
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        dispatch(updateAlert({open:true, severity:'error', message:error.response.data.message}))
        return null
    }
}

export const getUser = async ({token='', user=null}, dispatch) =>{
    const state = store.getState()
    const config = token
        ?{headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.user.token}}
        :{headers: {'Content-Type': 'application/json'}}
    
    config.body = user ? JSON.stringify(user) : {};
    
    const email = user ? user.email : null;
    const password = user ? user.password : null;
    try{
        const response = await axios.get(url2 + `/login?email=${email}&password=${password}`, user, config)
        const data = await response.data
        if(!data.success){
            if(response.status === 401) dispatch(updateUser(null))
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        dispatch(updateAlert({open:true, severity:'error', message:error.response.data.message}))
        return null
    }
}