import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Avatar, Badge, Box, IconButton, Tooltip} from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';
import UserMenu from './UserMenu';


function UserIcons(props) {
    const {user} = props
    const [anchorUserMenu, setAnchorUserMenu] = useState(null)
    return (
        <Box>
            <IconButton size='large' color='inherit'>
                <Badge color='error' badgeContent={5}>
                    <Mail/>
                </Badge>
            </IconButton>
            <IconButton size='large' color='inherit'>
                <Badge color='error' badgeContent={20}>
                    <Notifications />
                </Badge>
            </IconButton>
            <Tooltip title='Open User Setttings'>
            <IconButton onClick={(e)=>setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={user?.photoUrl} alt={user?.name}>
                    {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
            </Tooltip>
            <UserMenu {...{ anchorUserMenu, setAnchorUserMenu}}/>
        </Box>
    )
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
}
  
export default connect(mapStateToProps)(UserIcons);