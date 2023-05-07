import { Lock } from '@mui/icons-material'
import { Alert, AlertTitle, Button, Container } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function AccessMessage() {
    const dispatch = useDispatch()
  return (
    <Container sx={{py:10}}>
        <Alert severity='error' variant='outlined'>
            <AlertTitle>Forbidden Access</AlertTitle>
            Please Login or register to access this page
            <Button variant='outlined' sx={{ml:2}} startIcon={<Lock />} onClick={()=>dispatch({type:'OPEN_LOGIN'})}>Login</Button>
        </Alert>
    </Container>
  )
}
