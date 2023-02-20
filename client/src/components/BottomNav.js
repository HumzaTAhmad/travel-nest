import { AddLocationAlt, Bed, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

export default function BottomNav() {
    const[value, setValue] = useState(0)
  return (
    <Box>
        <Paper elevation={3} sx={{position:'fixed', bottom:0, left:0, right:0, zIndex:2}}>
            <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction label='Map' icon={<LocationOn />} />
                <BottomNavigationAction label='Rooms' icon={<Bed />} />
                <BottomNavigationAction label='Add' icon={<AddLocationAlt />} />

            </BottomNavigation>
        </Paper>
    </Box>
  )
}
