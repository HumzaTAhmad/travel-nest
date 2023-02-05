import React from 'react';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import Notifications from './components/Notifications';
import Login from './components/user/Login';

function App(props) {
    return (
        <>
            <Notifications />
            <Login />
            <NavBar />
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);