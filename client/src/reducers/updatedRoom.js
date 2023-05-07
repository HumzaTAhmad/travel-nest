export default (state = null, action) => {
    switch (action.type){
        case 'UPDATE_UPDATED_ROOM':
            return action.payload
        case 'RESET_ROOM':
            return null
        default:
            return state;
    }
}