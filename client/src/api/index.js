import axios from 'axios';
import {store} from '../index.js';

const url1 = 'http://localhost:5000/room';

export const createRoom = (newRoom) => {
    const state = store.getState()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + state.user.token
        }
    }

    return axios.post(url1, newRoom, config);
}