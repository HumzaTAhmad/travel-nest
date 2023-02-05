import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

function GoogleOneTapLogin() {
  return (
    <Button
    variant="outlined"
    startIcon={<Google/>}
    >
        Login with Google
    </Button>
  )
}

export default GoogleOneTapLogin