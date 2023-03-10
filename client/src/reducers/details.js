
export default (state = {title: "", description: "", price:0}, action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_DETAILS':
            return {...state, ...action.payload} //updates the propteries it needs to and leaves the others alone then returns a new state object
        case 'RESET_ROOM':
            return {title: "", description: "", price:0}
        default:
            return state
    }
}