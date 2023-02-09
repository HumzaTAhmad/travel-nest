import * as api from '../api/index.js'

export const createRoom = (room) => async (dispatch) => {
    try{
        const { data } = await api.createRoom(room);
        console.log(data)
        dispatch({type: 'CREATE_ROOM', payload: data})
    }catch(error){
        console.log(error);
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'error', message:error.message}})
    }
}