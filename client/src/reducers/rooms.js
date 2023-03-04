export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_ROOMS':
            return [...state, ...action.payload];
        default:
            return state;
    }
}