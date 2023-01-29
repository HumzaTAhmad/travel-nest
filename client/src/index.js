import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {createRoot} from 'react-dom/client';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';

//Use redux thunk so we can pass functions such as action creators into the disptach function
const store = createStore(reducers, compose(applyMiddleware(thunk)));

//create a new "root" for our React application.  "root" refers to the top-level container that holds all of the other components in the application
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App/>
    </Provider>
); 