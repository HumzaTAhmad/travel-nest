import React from 'react'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import {connect, useDispatch} from 'react-redux'
import { useControl } from 'react-map-gl';

export default function Geocoder() {
    const dispatch = useDispatch();
    const ctrl = new MapBoxGeocoder({
        accessToken:process.env.REACT_APP_MAP_TOKEN,
        marker:false,
        collapsed:true
    })
    useControl(()=>ctrl)
    ctrl.on('result', (e)=>{
        const coords = e.result.geometry.coordinates
        dispatch({type:'UPDATE_LOCATION', payload:{lng:coords[0], lat:coords[1]}})
    })
  return (
    null
  )
}

