import { Delete, Edit, Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { clearRoom, deleteRoom } from '../../../actions/rooms'
import { useNavigate } from 'react-router-dom'

function RoomsActions({params, currentUser}) {

    const { _id, lng, lat, price, title, description, images, phone, occupancy, LengthOfStay, roomType, bathroomType, uid } = params.row;

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleEdit = () =>{
        clearRoom(dispatch)
        console.log('HELLLLO')
        dispatch({ type: 'UPDATE_LOCATION', payload: { lng, lat }});
        dispatch({type: 'UPDATE_DETAILS', payload: { price, title, description }});
        dispatch({ type: 'UPDATE_IMAGES', payload: images });
        dispatch({ type: 'UPDATE_UPDATED_ROOM', payload: { _id, uid } });
        dispatch({ type: 'UPDATE_SECTION', payload: 2 });
        dispatch({type:'UPDATE_DETAILS', payload:{occupancy:occupancy, LengthOfStay:LengthOfStay, roomType:roomType, bathroomType:bathroomType, phone:phone}})
        navigate('/');
    }
    
  return (
    <Box>
        <Tooltip title='View room details'>
            <IconButton onClick={()=>dispatch({type:'UPDATE_ROOM', payload:params.row})}>
                <Preview />
            </IconButton>
        </Tooltip>
        <Tooltip title='Edit this room'>
            <IconButton onClick={()=>handleEdit()}>
                <Edit/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Delete this room'>
            <IconButton onClick={()=>deleteRoom(params.row, currentUser, dispatch)}>
                <Delete />
            </IconButton>
        </Tooltip>
    </Box>
  )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      currentUser: state.currentUser
    };
}
  
export default connect(mapStateToProps)(RoomsActions);
