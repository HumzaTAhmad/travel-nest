import { Box } from '@mui/system'
import axios from 'axios';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import React, { useEffect, useRef } from 'react'
import {connect, useDispatch} from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocoder from './Geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

function AddLocation(props) {
  const {location} = props
  const {lng, lat} = location
  const dispatch = useDispatch()
 
  const mapRef = useRef()
  useEffect(() =>{
    if(!lng && !lat){
      axios.get('https://ipapi.co/json')
        .then((response) => {
          const data = response.data;
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch({
            type: 'UPDATE_LOCATION',
            payload: { lng: data.longitude, lat: data.latitude },
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [])

  return (
    <Box sx={{height:400, position:'relative'}}>
      <ReactMapGL
      ref={mapRef}
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
        <NavigationControl position='bottom-right' />
        <GeolocateControl 
        position='top-left'
        trackUserLocation
        onGeolocate={(e)=>dispatch({type:'UPDATE_LOCATION', payload:{lng:e.coords.longitude, lat:e.coords.latitude}})}
        />
        <Geocoder />
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