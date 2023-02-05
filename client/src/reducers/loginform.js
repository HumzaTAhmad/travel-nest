//state is the state of the user
export default (state = false, action) => {
    console.log(action.type)
    switch(action.type){
        case 'OPEN_LOGINFORM':
            return {...state, loginform: true}
        
        case 'CLOSE_LOGINFORM':
            return {...state, loginform: false}

        default:
            return state
    }
}