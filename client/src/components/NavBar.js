import React from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import { useDispatch, connect } from 'react-redux';
import {Lock, Menu} from '@mui/icons-material';
import photoUrl from '../profile.jpeg';
import UserIcons from './User/UserIcons';
import { updateUser } from '../actions/user';

const testUser = {name:'test', photoUrl}

function NavBar(props) {

    const {user} = props
    const dispatch = useDispatch();

    const login = (e) => {
        e.preventDefault();
        dispatch(updateUser(testUser))
    }

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
                    {user == null || user.user==null? (<Button color='inherit' startIcon={<Lock />} onClick={login}>
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
    user: state.user
  };
}

export default connect(mapStateToProps)(NavBar);