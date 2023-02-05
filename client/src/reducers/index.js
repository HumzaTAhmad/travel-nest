import { combineReducers } from 'redux';
import user from './user';
import login from './login';
import alert from './alert'

export default combineReducers({
    user,
    login,
    alert
})