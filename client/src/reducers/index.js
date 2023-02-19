import { combineReducers } from 'redux';
import currentUser from './currentUser';
import openLogin from './openLogin';
import alert from './alert';
import loading from './loading';
import rooms from './rooms';
import profile from './profile';

export default combineReducers({
    currentUser,
    openLogin,
    alert,
    loading,
    rooms,
    profile
})