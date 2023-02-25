export default (state = [], action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_IMAGES':
            return [...state, action.payload];
        default:
            return state
    }
}