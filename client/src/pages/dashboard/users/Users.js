import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useMemo } from 'react'
import {DataGrid} from '@mui/x-data-grid'
import { getUsers } from '../../../actions/user'
import { connect, useDispatch } from 'react-redux'

function Users({setSelectedLink, link, users}) {

    const dispatch = useDispatch()

    useEffect(()=>{
        setSelectedLink(link)
        getUsers(dispatch)
    }, [])

    const columns = useMemo(()=>[
        {field:'photoURL', headerName:'Avatar', width:60},
        {field:'name', headerName:'Name', width:170},
        {field:'email', headerName:'Email', width:200},
        {field:'role', headerName:'Role', width:100},
        {field:'active', headerName:'Active', width:100},
        {field:'createdAt', headerName:'Created At', width:200},
        {field:'_id', headerName:'Id', width:220}
    ], [])

    return (
        <Box
        sx={{
            height:400,
            width:'100%'
        }}
        >
            <Typography
            variant='h3'
            component='h3'
            sx={{textAlign:'center', mt:3, mb:3}}
            >
                Manage Users
            </Typography>
            <DataGrid 
            columns={columns}
            rows={users}
            getRowId={row=>row._id}
            />
        </Box>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      users: state.users
    };
  }
  
  export default connect(mapStateToProps)(Users);
  
  