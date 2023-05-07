import { Delete, Edit, Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { deleteRoom } from '../../../actions/rooms'

function RoomsActions({params, currentUser}) {
    const dispatch = useDispatch()

    const handleEdit = () =>{

    }
    
  return (
    <Box>
        <Tooltip title='View room details'>
            <IconButton onClick={()=>dispatch({type:'UPDATE_ROOM', payload:params.row})}>
                <Preview />
            </IconButton>
        </Tooltip>
        <Tooltip title='Edit this room'>
            <IconButton onClick={()=>handleEdit}>
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
