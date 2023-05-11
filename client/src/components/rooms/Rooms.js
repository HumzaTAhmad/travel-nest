import React from 'react'
import {Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Rating, Tooltip} from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import { StarBorder } from '@mui/icons-material';

function Rooms(props) {

  const dispatch = useDispatch();
  const rooms = props.rooms
  console.log(rooms)

  return (
    <Container style={{ paddingTop: '64px' }}>
      <ImageList gap={12} sx={{mb:8, gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))!important'}}>
        {
          rooms.map(room=>(
            <Card key={room._id}>
              <ImageListItem sx={{height:'100% !important'}}>
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={room.price===0 ? 'Free Stay' : '$' + room.price}
                  actionIcon={
                    <Tooltip title={room.uName} sx={{mr:'5px'}}>
                      <Avatar src={room.uPhoto} />
                    </Tooltip>
                  }
                  position='top'
                />
                <img src={room.images[0]} alt={room.title} loading='lazy' style={{cursor:'pointer'}} onClick={()=>dispatch({type:'UPDATE_ROOM', payload:room})}/>
                <ImageListItemBar
                title={room.title}
                actionIcon={
                  <Rating
                  sx={{color:'rgba(255,255,255,0.8)', mr:'5px'}}
                  name='room-rating'
                  defaultValue={3.5}
                  precision={0.5}
                  emptyIcon={
                    <StarBorder sx={{color:'rgba(255,255,255,0.8)'}}/>
                  }
                  />
                }

                />
              </ImageListItem>
            </Card>
          ))
        }
      </ImageList>
    </Container>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return {
    rooms: state.rooms
  };
}

export default connect(mapStateToProps)(Rooms);

