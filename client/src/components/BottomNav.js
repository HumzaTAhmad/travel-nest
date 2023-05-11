import { AddLocationAlt, Bed, BedroomParent, LocationOn, Map, Star } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import ClusterMap from './map/ClusterMap'
import Rooms from './rooms/Rooms'
import AddRoom from './addRoom/AddRoom'
import Protected from './protected/Protected'
import Recommendation from './rooms/Recommendation'
import { connect, useDispatch } from 'react-redux'

function BottomNav({mapRef, containerRef, section}) {
    const dispatch  = useDispatch()
    //const[value, setValue] = useState(0)
    const ref = useRef()
    useEffect(()=>{
        ref.current.ownerDocument.body.scrollTop = 0
    }, [section])
  return (
    <Box ref={ref}>
        {{
            0:<ClusterMap mapRef={mapRef} containerRef={containerRef}/>,
            1:<Rooms />,
            2:(
                <Protected>
                    <AddRoom/> {/*passing setValue to add room so when room is created it will take us back*/}
                </Protected>
            ),
            3:<Recommendation/>
        }[section]}
        <Paper elevation={3} sx={{position:'fixed', bottom:0, left:0, right:0, zIndex:2}}>
            <BottomNavigation
            showLabels
            value={section}
            sx={{ backgroundColor: '#EEA47FFF' }}
            onChange={(e, newValue) => dispatch({type:'UPDATE_SECTION', payload:newValue})}
            >
                <BottomNavigationAction label='Map' icon={<Map />} sx={{ color: '#00539CFF' }}/>
                <BottomNavigationAction label='Rooms' icon={<BedroomParent sx={{ color: '#00539CFF' }}/>} />
                <BottomNavigationAction label='Add' icon={<AddLocationAlt sx={{ color: '#00539CFF' }}/>} />
                <BottomNavigationAction label='Suggestion' icon={<Star sx={{ color: '#00539CFF' }}/>} />

            </BottomNavigation>
        </Paper>
    </Box>
  )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      section: state.section
    };
}
  
export default connect(mapStateToProps)(BottomNav);
