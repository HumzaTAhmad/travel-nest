import {store} from '../index.js'

//state is the state of the user
export default (state = null, action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_USER':
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            return action.payload
        
        default:
            return state
    }
}

