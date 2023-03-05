import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const ctrl = new MapboxGeocoder({
    marker:false,
    accessToken: process.env.REACT_APP_MAP_TOKEN,
})

export default function GeocoderInput({mapRef, containerRef}) {

    const dispatch = useDispatch()
    
    useEffect(() => {
        if(containerRef?.current?.children[0]){
            containerRef.current.removeChild(containerRef.current.children[0])
        }
        containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()))

        ctrl.on('result', (e)=>{
            const coords = e.result.geometry.coordinates
            dispatchEvent({
                type:'FILTER_ADDRESS',
                payload:{lng:coords[0], lat:coords[1]}
            })
        })

        ctrl.on('clear', ()=> dispatch({type:'CLEAR_ADDRESS'}))
    }, [])
  return (
    null
  )
}
