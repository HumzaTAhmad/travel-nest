//state is the state of alert
//keep in mind that the returned value automatically is assigned to the state(remember reducer is suppposed to return a new state based on the old one and action)
//Also keep in mind that the name in index.js is the name of our state when we call it in other components
export default (state = false, action) => {
    console.log(action.type)
    switch(action.type){
        case 'START_LOADING':
            return true;
        
        case 'END_LOADING':
            return false;

        default:
            return state;
    }
}