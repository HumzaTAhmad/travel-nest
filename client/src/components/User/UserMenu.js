import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { updateProfile } from '../../actions/profile';
import { updateUser } from '../../actions/user';
import Profile from './Profile';

function UserMenu({anchorUserMenu, setAnchorUserMenu, user}) {
    const dispatch = useDispatch();

    function handleCloseUserMenu(){
        setAnchorUserMenu(null)
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(updateUser(null))
    }


    return (
        <>
            <Menu
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            >
                <MenuItem onClick={()=>dispatch(updateProfile({open:true, file:null, photoURL:user?.photoURL}))}>
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
    user: state.user,
});

export default connect(mapStateToProps)(UserMenu);