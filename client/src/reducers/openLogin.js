//state is the state of the user
export default (state = false, action) => {
    console.log(action.type)
    switch(action.type){
        case 'OPEN_LOGIN':
            return true;
        
        case 'CLOSE_LOGIN':
            return false

        default:
            return state
    }
}