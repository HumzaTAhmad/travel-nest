import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {createRoot} from 'react-dom/client';

import App from './App';
import reducers from './reducers';


const store = createStore(reducers);

//create a new "root" for our React application.  "root" refers to the top-level container that holds all of the other components in the application
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App/>
    </Provider>
); 