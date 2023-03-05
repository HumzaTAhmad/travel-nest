import {store} from '../index.js'

//state is the state of the user
export default (state = null, action) => {
    console.log(action.type)
    switch(action.type){
        case 'FILTER_ADDRESS':
            return action.payload
        case 'CLEAR_ADDRESS':
            return null
    
        default:
            return state
    }
}

