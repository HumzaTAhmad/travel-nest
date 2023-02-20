import { Close, Send } from '@mui/icons-material';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import React, {useRef} from 'react'
import { useDispatch, connect } from 'react-redux';
import { updateProfile } from '../../actions/user';

function Profile(props) {
    const {profile, currentUser} = props;
    const dispatch = useDispatch();

    const nameRef = useRef()


    const handleClose = () =>{
        dispatch({type:'UPDATE_PROFILE', payload: {...profile, open:false}})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const name = nameRef.current.value
        //pass user name and photo file to new function in user actions
        updateProfile(currentUser, {name, file:profile.file}, dispatch)
    }

    const handleChange = (e) =>{
        const file = e.target.files[0]
        if(file){
            const photoURL = URL.createObjectURL(file)
            dispatch({type:'UPDATE_PROFILE', payload: {...profile, file, photoURL}})
        }
    }
  return (
    <Dialog open={profile.open} onClose={handleClose}>
    <DialogTitle>
        Profile
        <IconButton sx={{position: 'absolute', top:8, right:8, color:(theme)=>theme.palette.grey[500]}} onClick={handleClose}>
            <Close />
        </IconButton>
    </DialogTitle>
    <form onSubmit={handleSubmit}>
        <DialogContent dividers>
            <DialogContentText>
                You can update your profile by updating these fields:
            </DialogContentText>
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
            defaultValue={currentUser?.name}
            />
        <label htmlFor='profilePhoto'>
            <input accept='image/*' id='profilePhoto' type='file' style={{display:'none'}} onChange={handleChange} />
            <Avatar src={profile.photoURL} sx={{width:75, height:75, cursor:'pointer'}}/>
        </label>

        </DialogContent>
        <DialogActions sx={{px: '19px'}}>
            <Button type='submit' variant='contained' endIcon={<Send />}>
                Update
            </Button>
        </DialogActions>
    </form>
</Dialog>
  )
}

function mapStateToProps(state) {
    console.log(state)
  return {
    profile: state.profile,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Profile);