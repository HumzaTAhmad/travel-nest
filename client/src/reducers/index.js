import { combineReducers } from 'redux';
import user from './user';
import login from './login';
import alert from './alert';
import loading from './loading';
import rooms from './rooms';
import profile from './profile';

export default combineReducers({
    user,
    login,
    alert,
    loading,
    rooms,
    profile
})