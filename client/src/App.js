import React from 'react';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';

function App(props) {
    return <NavBar />
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(App);