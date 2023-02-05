import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux';
import { openLogin } from '../../actions/login';

function Login(props) {

    const {login} = props;
    const dispatch = useDispatch();
    const [title, setTitle] = useState('Login');
    const [isRegister, setIsRegiser] = useState(false);
    const nameRef = useRef()
    const emailRef = userRef()
    const passwordRef = userRef()
    const confirmPasswordRef = userRef()
    
    

    function handleClose(){
        dispatch(openLogin(False));
    }

    function handleSubmit(e){
        e.preventDefault();
    }

  return (
    <Dialog 
    open={openLogin}
    onClose={handleClose}
    >
        <DialogTitle>
            {title}
            <IconButton sx={{position: 'absolute', top:8, right:8, color:(theme)=>theme.palette.grey[500]}} onClick={handleClose}>
                <Close />
            </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <DialogContentText dividers>
                    Please fill your information in the fields below:
                </DialogContentText>
                {isRegister && (
                <TextField
                autoFocus
                margin="normal"
                variant="standard"
                id="name"
                label="Name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 2 }}
                required
                />
                )}
            </DialogContent>
        </form>
    </Dialog>
  )
}

function mapStateToProps(state) {
    console.log(state)
  return {
    login: state.login
  };
}

export default connect(mapStateToProps)(Login);