export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_USERS':
            return [...state, ...action.payload];
        default:
            return state;
    }
}