
export default (state = {open: false, file: null, photoURL:''}, action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_PROFILE':
            return {...state, ...action.payload} //updates the propteries it needs to and leaves the others alone then returns a new state object
        
        default:
            return state
    }
}