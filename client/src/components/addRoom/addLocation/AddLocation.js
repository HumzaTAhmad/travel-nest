import { Box } from '@mui/system'
import ReactMapGL, { Marker } from 'react-map-gl'
import React from 'react'
import {connect, useDispatch} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'

function AddLocation(props) {
  const {location} = props
  const {lng, lat} = location
  const dispatch = useDispatch()
  console.log(process.env.REACT_APP_MAP_TOKEN)
  return (
    <Box sx={{height:400, position:'relative'}}>
      <ReactMapGL
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom:8,
      }}
      mapStyle='mapbox://style/mapbox/streets-v11'
      >
        <Marker
        latitude={lat}
        longitude={lng}
        draggable
        onDragEnd={(e) => dispatch({type:'UPDATE_LOCATION', payload:{lng:e.lngLat.lng, lat:e.lngLat.lat}})}
        />
      </ReactMapGL>
    </Box>
  )
}

function mapStateToProps(state) {
  console.log(state)
  return {
    location: state.location
  };
}

export default connect(mapStateToProps)(AddLocation);