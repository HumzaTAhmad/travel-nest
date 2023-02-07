import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import React, { useState } from 'react'
import { updateAlert } from '../../actions/alert';

function GoogleOneTapLogin() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false)

  function handleResponse(response){
    console.log(response)
  }


  function handleGoogleLogin(){
    setDisabled(true)
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse
      })
      window.google.accounts.id.prompt(function(notification){
        if(notification.isNotDisplayed){
          throw new Error('Try to clear the cookies or try again later!')
        }
        if(notification.isSkippedMoment() || notification.isDismissedMoment()){
          setDisabled(false)
        }
      })
    } catch(error) {
      dispatch(updateAlert({open:true, severity: 'error', message: error.message}))
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