//state is the state of the user
export default (state = null, action) => {
    console.log(action.type)
    switch(action.type){
        case 'UPDATE_USER':
            return action.payload
        
        default:
            return state
    }
}