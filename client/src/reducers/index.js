import { combineReducers } from 'redux';
import user from './user';
import loginform from './loginform';

export default combineReducers({
    user,
    loginform
})