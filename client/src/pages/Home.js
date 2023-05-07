import React, { useRef } from 'react';
import { connect } from 'react-redux';
import BottomNav from '../components/BottomNav';
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import Notifications from '../components/Notifications';
import Room from '../components/rooms/Room';
import Login from '../components/user/Login';

function Home(props) {

    const mapRef = useRef()
    const containerRef = useRef()
    return (
        <>
            <Login />
            <NavBar containerRef={containerRef}/>
            <BottomNav mapRef={mapRef} containerRef={containerRef}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(Home);