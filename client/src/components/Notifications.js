import { Alert, Snackbar } from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import React from 'react'


function Notifications(props) {
  const {alert} = props;
  const dispatch = useDispatch();

  function handleClose(event, reason){
    if (reason === 'clickaway') return
    dispatch({type: 'UPDATE_ALERT', payload:{...alert, open: false}}) //overwriting the open property in the alert object
  }

  return (
    <Snackbar
    open={alert.open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{vertical:'top', horizontal:'center'}}
    >
      <Alert
      onClose={handleClose}
      severity={alert.severity}
      sx={{width:'100%'}}
      variant='filled'
      elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

function mapStateToProps(state) {
  console.log(state)
  return {
    alert: state.alert
  };
}

export default connect(mapStateToProps)(Notifications);


