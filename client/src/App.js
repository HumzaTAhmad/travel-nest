import React from 'react';
import { connect } from 'react-redux';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Notifications from './components/Notifications';
import Login from './components/user/Login';

function App(props) {
    return (
        <>
            <Loading />
            <Notifications />
            <Login />
            <NavBar />
        </>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(App);