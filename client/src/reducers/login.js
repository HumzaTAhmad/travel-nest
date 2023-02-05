//state is the state of the user
export default (state = false, action) => {
    console.log(action.type)
    switch(action.type){
        case 'OPEN_LOGIN':
            return state = true;
        
        case 'CLOSE_LOGIN':
            return state = false

        default:
            return state
    }
}