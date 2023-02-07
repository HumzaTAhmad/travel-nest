import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function PasswordField({passwordRef, id='password', label='Password'}) {

    const [showPassword, setShowPassword] = useState(false)

    function handleClick(){
        setShowPassword(!showPassword);
    }

    function handleMouseDown(e){
        e.preventDefault();
    }

    return (
    <TextField
        margin="normal"
        variant="standard"
        id={id}
        label={label}
        type={showPassword?'text':'password'}
        fullWidth
        inputRef={passwordRef}
        inputProps={{minLength:6}}
        required
        InputProps={{
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                        {showPassword ? <VisibilityOff /> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            )
        }}
    />
    )
}
