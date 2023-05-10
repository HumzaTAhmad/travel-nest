import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

const ctrl = new MapboxGeocoder({
    marker:false,
    accessToken: process.env.REACT_APP_MAP_TOKEN,
})

function GeocoderInput({mapRef, containerRef, all}) {

    const dispatch = useDispatch()
    
    useEffect(() => {
        if(containerRef?.current?.children[0]){
            containerRef.current.removeChild(containerRef.current.children[0])
        }
        containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()))

        ctrl.on('result', (e)=>{
            const coords = e.result.geometry.coordinates
            dispatch({
                type:'FILTER_ADDRESS',
                payload:{address:{lng:coords[0], lat:coords[1]}, all}
            })
        })

        ctrl.on('clear', ()=> dispatch({type:'CLEAR_ADDRESS'}))
    }, [])
  return (
    null
  )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      all: state
    };
  }
  
export default connect(mapStateToProps)(GeocoderInput);
  