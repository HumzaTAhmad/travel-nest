import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Avatar, Badge, Box, IconButton, Tooltip} from '@mui/material';
import { Mail, Message, Notifications } from '@mui/icons-material';
import UserMenu from './UserMenu';
import useCheckToken from '../../hooks/useCheckToken';


function UserIcons(props) {
    
    const {currentUser} = props
    const [anchorUserMenu, setAnchorUserMenu] = useState(null)
    return (
        <Box>
            <IconButton size='large' color='inherit'>
                <Badge color='error' badgeContent={5}>
                    <Message/>
                </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
                <Badge color='error' badgeContent={20}>
                    <Notifications />
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