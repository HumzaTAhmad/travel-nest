import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { roomRecommendation } from '../../actions/user';

function Recommendation({rooms, currentUser}) {
    console.log(currentUser)
    const dispatch = useDispatch();
    roomRecommendation(dispatch, currentUser.id)
  return (
    <div>Hi</div>
  )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      rooms: state.rooms,
      currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(Recommendation);