export default (state = [], action) => {
    switch (action.type){
        case 'CREATE_ROOM':
            return [...state, action.payload];
        default:
            return state;
    }
}