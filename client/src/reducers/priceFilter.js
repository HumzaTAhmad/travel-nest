export default (state = 50, action) => {
    switch(action.type){
        case 'FILTER_PRICE':
            return action.payload
        case 'CLEAR_ADDRESS':
            return 50
        default:
            return state
    }
}