import * as api from '../api/index.js'
import { updateAlert } from './alert.js';
import { updateUser } from './user.js';

export const createRoom = (room) => async (dispatch) => {
   
    const response = await api.createRoom(room);
    const data = response.data
    console.log(data)
    dispatch({type: 'CREATE_ROOM', payload: data})
}