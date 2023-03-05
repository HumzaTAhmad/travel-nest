import { combineReducers } from 'redux';
import currentUser from './currentUser';
import openLogin from './openLogin';
import alert from './alert';
import loading from './loading';
import rooms from './rooms';
import profile from './profile';
import images from './images';
import details from './details';
import location from './location';
import priceFilter from './priceFilter'

export default combineReducers({
    currentUser,
    openLogin,
    alert,
    loading,
    rooms,
    profile,
    images,
    details,
    location,
    priceFilter
})