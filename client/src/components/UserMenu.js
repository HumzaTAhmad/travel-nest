import { Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { updateUser } from '../actions/user';

function UserMenu({anchorUserMenu, setAnchorUserMenu}) {

    const dispatch = useDispatch();

    function handleCloseUserMenu(){
        setAnchorUserMenu(null)
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(updateUser(null))
    }

    return (
        <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        >
            <MenuItem>
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
    )
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(UserMenu);