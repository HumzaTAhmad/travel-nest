import {store} from '../index.js'

//state is the state of the user
export default (state = null, action) => {
    console.log(action.payload)
    switch(action.type){
        case 'FILTER_ADDRESS':
            return action.payload.address
        case 'UPDATE_ROOMS':
            return null
        case 'CLEAR_ADDRESS':
            return null
    
        default:
            return state
    }
}

