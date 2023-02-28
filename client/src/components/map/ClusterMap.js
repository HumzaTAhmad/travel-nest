import React, { useEffect } from 'react'
import {connect, useDispatch} from 'react-redux'
import { getRooms } from '../../actions/rooms'
import ReactMapGL from 'react-map-gl'

function ClusterMap(props) {
  const rooms = props.rooms
  const dispatch = useDispatch()

  useEffect(() => {
    getRooms(dispatch)
  }, [])

  useEffect(() => {
    console.log(rooms)
  }, [rooms])

  return (
    <ReactMapGL
    initialViewState={{latitude:51.5072, longitude:0.1276}}
    mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
    mapStyle='mapbox://styles/mapbox/streets-v11'
    >
    </ReactMapGL>
  )
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms
  };
}

export default connect(mapStateToProps)(ClusterMap);
