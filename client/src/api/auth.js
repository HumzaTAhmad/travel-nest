import { updateAlert } from '../actions/alert.js';
import { updateUser } from '../actions/user.js';
import * as api from '../api/index.js'


export const authenticateUser = () => async (dispatch) => {
    try {
        console.log("DOES THIS RUN")
        const response = await api.createRoom(); //temp api call
        const data = response.data
        console.log(data);
      } catch (error) {
        console.log(error)
        if (!error.response.data.success) {
            if (error.response.status === 401)
              dispatch({ type: 'UPDATE_USER', payload: null });
        dispatch({type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message }});
        console.log(error);
      }
    };
}
