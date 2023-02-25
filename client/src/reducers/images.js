export default (state = [], action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_IMAGES':
            return [...state, action.payload];
        case 'DELETE_IMAGE':
            return state.filter((image)=>image !== action.payload);
        default:
            return state
    }
}