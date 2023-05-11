import { Group, MapsHomeWork } from '@mui/icons-material'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getRooms } from '../../../actions/rooms'
import { getUsers } from '../../../actions/user'
import moment from 'moment'
import PieRoomsCost from './PieRoomsCost'
import AreaRoomsUsers from './AreaRoomsUsers'

function Main({setSelectedLink, link, users, rooms, currentUser}) {

    const dispatch = useDispatch()

    useEffect(()=>{
        setSelectedLink(link)
        getRooms(dispatch)
        getUsers(dispatch, currentUser)
    }, [])

    return (
        <Box
        sx={{
            display:{xs:'flex', md:'grid'},
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: 'minmax(100px, auto)',
            gap:3,
            textAlign:'center',
            flexDirection:'column'
        }}
        >
            <Paper elevation={3} sx={{p:3}}>
                <Typography variant='h4'>Total Users</Typography>
                <Box
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
                >
                    <Group sx={{height:100, width:100, opacity:0.3, mr:1}} />
                    <Typography variant='h4'>{users.length}</Typography>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p:3}}>
                <Typography variant='h4'>Total Rooms</Typography>
                <Box
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
                >
                    <MapsHomeWork sx={{height:100, width:100, opacity:0.3, mr:1}} />
                    <Typography variant='h4'>{rooms.length}</Typography>
                </Box>
            </Paper>  
            <Paper elevation={3} sx={{p:2, gridColumn:3, gridRow:'1/4'}}>
                <Box>
                    <Typography>Recently added Users</Typography>
                    <List>
                        {users.slice(0,4).map((user,i)=>(
                            <Box key={user._id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt={user?.name} src={user?.photoURL} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={user?.name}
                                    secondary={`Time Created': ${moment(user?.createdAt).format('YYYY-MM-DD H:mm:ss')}`}
                                    />
                                </ListItem>
                                {i !== 3 && <Divider variant='insist' />}
                            </Box>
                        ))}
                    </List>
                </Box>
                <Divider sx={{mt:3, mb:3, opacity:0.7}}/>
                <Box>
                    <Typography>Recently added Rooms</Typography>
                    <List>
                        {rooms.slice(0,4).map((room,i)=>(
                            <Box key={room._id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt={room?.title} src={room?.images[0]} variant='rounded'/>
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={room?.title}
                                    secondary={`Time Created: ${moment(room?.createdAt).fromNow()}`}
                                    />
                                </ListItem>
                                {i !== 3 && <Divider variant='insist' />}
                            </Box>
                        ))}
                    </List>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{p:2, gridColumn:'1/3'}}>
                <PieRoomsCost />
            </Paper>
            <Paper elevation={3} sx={{p:2, gridColumn:'1/3'}}>
                <AreaRoomsUsers />
            </Paper>
        </Box>
    )
}

const mapStateToProps = state => ({
    users: state.users,
    rooms: state.rooms,
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(Main);