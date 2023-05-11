import { Close, Favorite, FavoriteBorder, StarBorder, ThumbsUpDown } from '@mui/icons-material'
import { AppBar, Avatar, Button, Dialog, IconButton, Rating, Slide, Toolbar, Tooltip, Typography } from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import React, { forwardRef, useEffect, useState } from 'react'
import { Box, Container, Stack } from '@mui/system';
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, EffectCoverflow, Lazy, Zoom} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/zoom'
import './swiper.css'
import { addToFavorite, getUser, removeFromFavorite } from '../../actions/user';
import logo from '../../images/logo.jpg'

const Transition = forwardRef((props, ref)=>{
    return <Slide direction='up' {...props} ref={ref} />
})

const Room = ({room, currentUser}) => {
    console.log(currentUser)
    const dispatch = useDispatch()
    const [place, setPlace] = useState(null);
  
    useEffect(() => {
      if (room) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.lng},${room.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => setPlace(data.features[0]));
      }
    }, [room]);
  
    const handleClose = () => {
      dispatch({ type: 'UPDATE_ROOM', payload: null });
    };

    const handleClick = () =>{
      if(isRoomFavorited){
        removeFromFavorite(room, currentUser.id, dispatch)
      }else{
        addToFavorite(room, currentUser.id, dispatch)
      }
    }
    
    const isRoomFavorited = currentUser?.favoriteRooms?.some((favRoom) => favRoom?._id === room?._id);
    console.log(isRoomFavorited)

    return (
      <Dialog
        fullScreen
        open={Boolean(room)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="relative"  sx={{ backgroundColor: '#00539CFF', color:'#EEA47FFF'}}>
          <Toolbar>
            <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
              {room?.title}
            </Typography>
            <img src={logo} alt="Logo" style={{marginLeft: 'auto', height: '100px', width: '100px', marginRight:'800px'}} />
            <IconButton color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ pt: 5 }}>
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
            centeredSlides
            slidesPerView={2}
            grabCursor
            navigation
            autoplay
            lazy
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {room?.images?.map((url) => (
              <SwiperSlide key={url}>
                <div className="swiper-zoom-container">
                  <img src={url} alt="room" />
                </div>
              </SwiperSlide>
            ))}
            
            <Tooltip
              title={room?.uName || ''}
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                zIndex: 2,
              }}
            >
              <Avatar src={room?.uPhoto} />
            </Tooltip>
          </Swiper>
          <Stack sx={{ p: 3 }} spacing={2}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Price Per Night: '}
                </Typography>
                <Typography component="span">
                  {room?.price === 0 ? 'Free Stay' : '$' + room?.price}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="span">
                  {'Ratings: '}
                </Typography>
                <Rating
                  name="room-ratings"
                  defaultValue={3.5}
                  precision={0.5}
                  emptyIcon={<StarBorder />}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Place Name: '}
                </Typography>
                <Typography component="span">{place?.text}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="span">
                  {'Address: '}
                </Typography>
                <Typography component="span">{place?.place_name}</Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Room Type: '}
                </Typography>
                <Typography component="span">{room?.roomType}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="span">
                  {'Phone Number: '}
                </Typography>
                <Typography component="span">
                  {room?.phone}
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Bathroom Type: '}
                </Typography>
                <Typography component="span">{room?.bathroomType}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="span">
                  {'Duration of Stay: '}
                </Typography>
                <Typography component="span">
                  {room?.LengthOfStay} days
                </Typography>
              </Box>
            </Stack>
            <Box>
              <Typography variant="h6" component="span">
                {'Occupancy: '}
              </Typography>
              <Typography component="span">{room?.occupancy} people</Typography>
            </Box>
            <Stack>
              <Typography variant="h6" component="span">
                {'Details: '}
              </Typography>
              <Typography component="span">{room?.description}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h6" component="span">
                {'Favorite this Room: '} <Button onClick={handleClick}>{isRoomFavorited ? <Favorite color="error"/> : <FavoriteBorder />}</Button>
            </Typography> 
            </Stack>
          </Stack>
        </Container>
      </Dialog>
    );
  };

function mapStateToProps(state) {
    console.log(state)
    return {
      room: state.room,
      currentUser: state.currentUser
    };
  }
  
export default connect(mapStateToProps)(Room);
  
  