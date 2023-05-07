import React, { useRef } from 'react';
import { connect } from 'react-redux';
import BottomNav from './components/BottomNav';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Notifications from './components/Notifications';
import Room from './components/rooms/Room';
import Login from './components/user/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home';

function App(props) {

    const mapRef = useRef()
    const containerRef = useRef()
    return (
        <>
         <Loading />
         <Notifications />
         <BrowserRouter>
         <Routes>
            <Route path='dashboard/*' element={<Dashboard />}/>
            <Route path='*' element={<Home />}/>
         </Routes>
         </BrowserRouter>
         <Room />
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(App);