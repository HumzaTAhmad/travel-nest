export default (state = 50, action) => {
    switch(action.type){
        case 'FILTER_PRICE':
            return action.payload
        default:
            return state
    }
}