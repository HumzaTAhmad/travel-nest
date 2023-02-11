import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { updateUser } from '../actions/user';
//this needs to be changed from a component to a func
function useCheckToken(props) {
  const {user} = props.user
  const {dispatch} = useDispatch()
  
  useEffect(function(){
    if(user){
        const decodedToken = jwtDecode(user.token)
        if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(updateUser(null))
    }

  }, [])
}

function mapStateToProps(state) {
    console.log(state)
    return {
        user: state.user
    };
}
  
export default connect(mapStateToProps)(useCheckToken);