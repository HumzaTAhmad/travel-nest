import { Close, Send } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch, connect } from 'react-redux';
import { closeLogin, openLogin } from '../../actions/login';
import PasswordField from './PasswordField';

function Login(props) {

    const {login} = props;
    const dispatch = useDispatch();
    const [title, setTitle] = useState('Login');
    const [isRegister, setIsRegiser] = useState(false);
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    
    

    function handleClose(){
        dispatch(closeLogin());
    }

    function handleSubmit(e){
        e.preventDefault();
    }

  return (
    <Dialog 
    open={login}
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
                <TextField
                autoFocus={!isRegister}
                margin="normal"
                variant="standard"
                id="email"
                label="Email"
                type="email"
                fullWidth
                inputRef={nameRef}
                required
                />
                <PasswordField {...{passwordRef}}/>
                {isRegister &&
                <PasswordField passwordRef={confirmPasswordRef} id='confirmPassword' label='Confirm Password' />
                }
            </DialogContent>
            <DialogActions>
                <Button type='submit' variant='contained' endIcon={<Send />}>
                    Submit
                </Button>
            </DialogActions>
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