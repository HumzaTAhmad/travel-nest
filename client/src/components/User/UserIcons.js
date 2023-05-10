import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {Avatar, Badge, Box, IconButton, Tooltip} from '@mui/material';
import { Dashboard, Mail, Message, Notifications, Settings } from '@mui/icons-material';
import UserMenu from './UserMenu';
import useCheckToken from '../../hooks/useCheckToken';


function UserIcons(props) {
    
    const dispatch = useDispatch()
    const {currentUser} = props
    const [anchorUserMenu, setAnchorUserMenu] = useState(null)
    return (
        <Box>
            <IconButton size='large' color='inherit' onClick={()=>dispatch({type:'UPDATE_PROFILE', payload: {open:true, file:null, photoURL:currentUser?.photoURL}})}>
                <Badge color='error'>
                    <Settings fontSize="small" />
                </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
                <Badge color='error'>
                    <Dashboard fontSize="small" />
                </Badge>
            </IconButton>
            <Tooltip title='Open User Setttings'>
            <IconButton onClick={(e)=>setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                    {currentUser?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
            </Tooltip>
            <UserMenu {...{ anchorUserMenu, setAnchorUserMenu}}/>
        </Box>
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
}
  
export default connect(mapStateToProps)(UserIcons);