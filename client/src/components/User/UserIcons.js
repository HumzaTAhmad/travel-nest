import React from 'react';
import { connect } from 'react-redux';
import {Avatar, Badge, Box, IconButton, Tooltip} from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';


function UserIcons(props) {
    const {currentUser} = props
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
            <IconButton>
                <Avatar src={currentUser?.photoUrl} alt={currentUser?.name}>
                    {currentUser?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
            </Tooltip>
        </Box>
    )
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
}
  
export default connect(mapStateToProps)(UserIcons);