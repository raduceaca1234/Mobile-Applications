import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import VolunteersNavigator from './navigation/VolunteersNavigator';
import volunteersReducer from './store/volunteers-reducer';
import { init, init2 } from './helpers/db';


init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });
init2()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  volunteers: volunteersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const client = new WebSocket('ws://10.0.2.2:2501');
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    alert("Details "+dataFromServer.title);
  };
  return (
    <Provider store={store}>
      <VolunteersNavigator />
    </Provider>
  );
}
