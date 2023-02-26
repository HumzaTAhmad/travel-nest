import { connect } from 'react-redux';
import React from 'react'
import AccessMessage from './AccessMessage';

function Protected({children, currentUser}) {
  return (
    currentUser ? children : <AccessMessage />
  )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      currentUser: state.currentUser
    };
  }
  
export default connect(mapStateToProps)(Protected);
  
  