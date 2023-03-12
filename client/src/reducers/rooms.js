export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_ROOMS': //this case will add the newly created room to the rooms array
            return [...state, ...action.payload];
        case 'UPDATE_ALL_ROOMS': //this case will get all the rooms in the database
            return action.payload
        default:
            return state;
    }
}