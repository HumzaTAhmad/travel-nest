export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_USERS': //this case will add the newly created user to the users array
            return [...state, ...action.payload];
            case 'UPDATE_ALL_USERS': //this case will get all the users in the database
            return action.payload
        default:
            return state;
    }
}