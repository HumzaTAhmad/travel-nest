import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import Profile from './Profile';

function UserMenu({anchorUserMenu, setAnchorUserMenu, currentUser}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function handleCloseUserMenu(){
        setAnchorUserMenu(null)
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch({type:'UPDATE_USER', payload:null})
    }

 
    return (
        <>
            <Menu
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            >
                {!currentUser?.google && (
                    <MenuItem onClick={()=>dispatch({type:'UPDATE_PROFILE', payload: {open:true, file:null, photoURL:currentUser?.photoURL}})}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Profile
                    </MenuItem>
                )}
                <MenuItem onClick={() => navigate('dashboard')}>
                    <ListItemIcon>
                        <Dashboard fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
                
            </Menu>
            <Profile />
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(UserMenu);