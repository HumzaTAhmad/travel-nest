import { AddLocationAlt, Bed, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import ClusterMap from './map/ClusterMap'
import Rooms from './rooms/Rooms'
import AddRoom from './addRoom/AddRoom'
import Protected from './protected/Protected'

export default function BottomNav({mapRef, containerRef}) {
    const[value, setValue] = useState(0)
    const ref = useRef()
    useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0
    }, [value])
  return (
    <Box ref={ref}>
        {{
            0:<ClusterMap mapRef={mapRef} containerRef={containerRef}/>,
            1:<Rooms />,
            2:(
                <Protected>
                    <AddRoom setPage={setValue}/> //passing setValue to add room so when room is created it will take us back
                </Protected>
            ), 
        }[value]}
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
