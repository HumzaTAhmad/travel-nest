import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { updateUser } from '../actions/user';
//this needs to be changed from a component to a func
function useCheckToken(props) {
  const {currentUser} = props.user
  const {dispatch} = useDispatch()
  
  useEffect(function(){
    if(currentUser){
        const decodedToken = jwtDecode(currentUser.token)
        if(decodedToken.exp * 1000 < new Date().getTime()) dispatch({type:'UPDATE_USER', payload:null})
    }

  }, [])
}

function mapStateToProps(state) {
    console.log(state)
    return {
        currentUser: state.currentUser
    };
}
  
export default connect(mapStateToProps)(useCheckToken);