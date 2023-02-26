
export default (state = {title: 'empty', description: 'empty', price:0}, action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_DETAILS':
            return {...state.details, ...action.payload} //updates the propteries it needs to and leaves the others alone then returns a new state object
        
        default:
            return state
    }
}