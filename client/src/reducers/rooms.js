export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_ROOMs':
            return [...state, action.payload];
        default:
            return state;
    }
}