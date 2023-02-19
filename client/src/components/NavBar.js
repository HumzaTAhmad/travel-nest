import React from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import { useDispatch, connect } from 'react-redux';
import {Lock, Menu} from '@mui/icons-material';
import UserIcons from './user/UserIcons';
import { openLogin } from '../actions/login';


function NavBar(props) {

    const {currentUser} = props
    const dispatch = useDispatch();


    return (
        <AppBar>
            <Container maxWidth='lg'>
                <Toolbar disableGutters>
                    <Box sx={{mr:1}}>
                        <IconButton size='large' color='inherit'>
                            <Menu />
                        </IconButton>
                    </Box>
                    <Typography variant='h6' component='h1' noWrap sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}>
                        Host a Nest Now!
                    </Typography>
                    <Typography variant='h6' component='h1' noWrap sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}>
                        Host a Nest Now!
                    </Typography>
                    {currentUser == null? (<Button color='inherit' startIcon={<Lock />} onClick={() => dispatch({type:'OPEN_LOGIN'})}>
                        Login
                    </Button>): (
                        <UserIcons/>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
        
    )
}

function mapStateToProps(state) {
    console.log(state)
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(NavBar);