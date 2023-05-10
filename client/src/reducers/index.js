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
import addressFilter from './addressFilter';
import room from './room';
import users from './users';
import section from './section';
import updatedRoom from './updatedRoom';
import filteredRooms from './filteredRooms';

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
    updatedRoom,
    priceFilter,
    addressFilter,
    room,
    users,
    section,
    filteredRooms
})