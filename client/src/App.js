import React from 'react';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import Login from './components/User/Login';

function App(props) {
    return (
        <>
            <Login />
            <NavBar />
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);