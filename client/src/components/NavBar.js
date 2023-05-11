import React, { useState } from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import { useDispatch, connect } from 'react-redux';
import {Lock, Menu, Start} from '@mui/icons-material';
import UserIcons from './user/UserIcons';
import Sidebar from './sidebar/Sidebar'
import logo from '../images/logo.jpg'

function NavBar({currentUser, containerRef}) {

    const dispatch = useDispatch();


    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <AppBar sx={{ backgroundColor: '#00539CFF' }}>
                <Container maxWidth='lg'>
                    <Toolbar disableGutters>
                        <Box sx={{mr:1}}>
                            <IconButton size='large' color='inherit' onClick={()=>setIsOpen(true)}>
                                <Start />
                            </IconButton>
                        </Box>
                        <Typography variant='h6' component='h1' noWrap sx={{flexGrow:1, display:{xs:'none', md:'flex'}, color:'#EEA47FFF'}}>
                            Host a Nest Now!
                        </Typography>
                        <Typography variant='h6' component='h1' noWrap sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}>
                            Host a Nest Now!
                        </Typography>
                        <img src={logo} alt="Logo" style={{marginLeft: 'auto', height: '100px', width: '100px', marginRight:'400px'}} />
                        {currentUser == null? (<Button color='inherit' startIcon={<Lock />} onClick={() => dispatch({type:'OPEN_LOGIN'})}>
                            Login
                        </Button>): (
                            <UserIcons/>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Sidebar {...{isOpen, setIsOpen, containerRef}}/>
        </>
    )
}

function mapStateToProps(state) {
    console.log(state)
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(NavBar);