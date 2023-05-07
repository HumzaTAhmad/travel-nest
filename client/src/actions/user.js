import fetchData from './utils/fetchData';
import {v4 as uuidv4} from 'uuid';
import uploadFile from '../firebase/uploadFile';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData(
    { url: url + '/register', body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'CLOSE_LOGIN' });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'Your account has been created successfully',
      },
    });
  }

  dispatch({ type: 'END_LOADING' });
};

export const login = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  const result = await fetchData({ url: url + '/login', body: user }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_USER', payload: result });
    dispatch({ type: 'CLOSE_LOGIN' });
  }

  dispatch({ type: 'END_LOADING' });
};

export const updateProfile = async(currentUser, updatedFields, dispatch)=>{
  dispatch({type:'START_LOADING'})

  const {name, file} = updatedFields
  let body = {name}

  try{
    if(file){
      const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop()
      const photoURL = await uploadFile(file, `profile/${currentUser?.id}/${imageName}`)
      body = {...body, photoURL}
    }
    const result = await fetchData({url:url+'/updateProfile', method:'PATCH', body, token:currentUser.token}, dispatch)
    if(result){
      dispatch({type:'UPDATE_USER', payload:{...currentUser, ...result}})
      dispatch({type: 'UPDATE_ALERT', payload: { open: true, severity: 'success', message: 'Your profile has been updated successfully'}})
    }
    dispatch({type:'UPDATE_PROFILE', payload:{open:false, file:null, photoURL:result.photoURL}})
  } catch(error){
    dispatch({type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message}})
  }

  dispatch({type:'END_LOADING'})
}

export const getUsers = async(dispatch, currentUser) => {
  const result = await fetchData({url, method:'GET', token:currentUser.token}, dispatch)
  console.log(result)
  if(result){
      dispatch({type:'UPDATE_ALL_USERS', payload:result})
  }
}

export const getUser = async (userId, dispatch)=>{
  console.log(userId)
  const result = await fetchData({
    url:`${url}/${userId}`,
    method:'GET',
  },
  dispatch
  )
  console.log(result)
  if(result){
    dispatch({type:'UPDATE_USER', payload:result})
  }
}


export const updateStatus = (updatedFields, userId, dispatch, currentUser)=>{
  return fetchData({
    url:`${url}/updateStatus/${userId}`,
    method:'PATCH',
    token: currentUser.token,
    body:updatedFields,
  },
  dispatch
  )
}

//this function will add the selected room into the specific user favorites array
export const addToFavorite = async (room, userId, dispatch)=>{
  console.log(userId)
  const result =  await fetchData({
    url:`${url}/addToFavorite/${userId}`,
    method:'PATCH',
    body:room,
  },
  dispatch
  )
  console.log(result)
  if(result){
    dispatch({type:'UPDATE_USER', payload:result})
  }
}

export const removeFromFavorite = async (room, userId, dispatch)=>{
  console.log(userId)
  const result =  await fetchData({
    url:`${url}/removeFromFavorite/${userId}`,
    method:'PATCH',
    body:room,
  },
  dispatch
  )
  console.log(result)
  if(result){
    dispatch({type:'UPDATE_USER', payload:result})
  }
}

export const roomRecommendation = async(dispatch, userId) => {
  const result = await fetchData({url:`${url}/recommendations/${userId}`, method:'GET'}, dispatch)
  console.log("DOES THIS RUN?")
  if(result){
    console.log("This ran")
    dispatch({type:'UPDATE_ROOM', payload:result})
    dispatch({type:'UPDATE_SECTION', payload:0})
  }
}