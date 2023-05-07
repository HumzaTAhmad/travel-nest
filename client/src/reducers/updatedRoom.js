export default (state = null, action) => {
    switch (action.type){
        case 'UPDATE_UPDATED_ROOM':
            return action.payload
        default:
            return state;
    }
}