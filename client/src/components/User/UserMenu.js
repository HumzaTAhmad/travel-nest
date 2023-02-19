import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useDispatch, connect } from 'react-redux';
import Profile from './Profile';

function UserMenu({anchorUserMenu, setAnchorUserMenu, user}) {
    const dispatch = useDispatch();

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
                <MenuItem onClick={()=>dispatch({type:'UPDATE_USER', payload: {open:true, file:null, photoURL:user?.photoURL}})}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Profile
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