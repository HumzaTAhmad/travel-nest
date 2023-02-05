import { Backdrop, CircularProgress } from '@mui/material'
import { useDispatch, connect } from 'react-redux';
import React from 'react'

function Loading(props) {
    const {loading} = props;
    const dispatch = useDispatch();
    return (
        <Backdrop
        open={loading}
        sx={{zIndex: (theme) => theme.zIndex.modal+1}}
        >
            <CircularProgress sx={{color: 'white'}}/>
        </Backdrop>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      loading: state.loading
    };
  }
  
  export default connect(mapStateToProps)(Loading);
  
  