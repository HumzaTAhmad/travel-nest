export default (state = {lng: 0, lat: 0}, action) => {
    switch(action.type){
        case 'UPDATE_LOCATION':
            return {...state, ...action.payload} //updates the propteries it needs to and leaves the others alone then returns a new state object
        case 'RESET_ROOM':
            return {lng:0, lat:0}
        default:
            return state
    }
}