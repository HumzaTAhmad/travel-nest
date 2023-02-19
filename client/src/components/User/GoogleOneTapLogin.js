import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

function GoogleOneTapLogin() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false)

  function handleResponse(response){
    const token = response.credential
    const decodedToken = jwtDecode(token)
    const {sub:id, email, name, picture:photoURL} = decodedToken
    dispatch({type:'UPDATE_USER', payload: {id, email, name, photoURL, token, google:true}})
    dispatch({ type: 'CLOSE_LOGIN' });
  }


  function handleGoogleLogin(){
    setDisabled(true)
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse
      })
      window.google.accounts.id.prompt(function(notification){
        console.log("this runs")
        if(notification.isNotDisplayed()){
          document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
          window.google.accounts.id.prompt()
        }
        if(notification.isSkippedMoment() || notification.isDismissedMoment()){
          setDisabled(false)
        }
      })
    } catch(error) {
      dispatch({type: 'UPDATE_ALERT', payload:{ open: true, severity: 'error', message: error.message }})
      console.log(error)
    }
  }

  return (
    <Button variant="outlined" startIcon={<Google/>} disabled={disabled} onClick={handleGoogleLogin}>
        Login with Google
    </Button>
  )
}

export default GoogleOneTapLogin