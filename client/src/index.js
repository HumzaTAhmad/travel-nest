import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {createRoot} from 'react-dom/client';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import { useRef } from 'react';


//retrieve the user information from local storage
const persistedState = JSON.parse(localStorage.getItem('currentUser')) || null;

const initialState = {
  currentUser: persistedState,
};

//Use redux thunk so we can pass functions such as action creators into the disptach function. {user: persistedState} is saying user in your state is being overwritten by persistedstate. This means that its state will be the only thing saved
const store = createStore(reducers, initialState, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));



//create a new "root" for our React application.  "root" refers to the top-level container that holds all of the other components in the application
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App/>
    </Provider>
); 

export {store};
