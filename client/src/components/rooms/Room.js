import { Close } from '@mui/icons-material'
import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import React, { forwardRef } from 'react'

const Transition = forwardRef((props, ref)=>{
    return <Slide direction='up' {...props} ref={ref} />
})

function Room({room}) {

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({type:'UPDATE_ROOM', payload:null})
    }
        
  return (
    <Dialog
    fullScreen
    open={Boolean(room)}
    onClose={handleClose}
    TransitionComponent={Transition}
    >
        <AppBar position='relative'>
            <Toolbar>
                <Typography
                variant='h6'
                component='h3'
                sx={{ml:2, flex:1}}
                >
                    {room?.title}
                </Typography>
                <IconButton color='inherit' onClick={handleClose}>
                    <Close />
                </IconButton>
            </Toolbar>
        </AppBar>

    </Dialog>
  )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      room: state.room
    };
  }
  
  export default connect(mapStateToProps)(Room);
  
  