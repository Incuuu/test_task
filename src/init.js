import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import rootReducer from './reducers/index';
import App from './components/App';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
