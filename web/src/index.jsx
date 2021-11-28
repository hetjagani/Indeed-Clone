import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// eslint-disable-next-line import/extensions
import App from './App.jsx';
import { store, persistor } from './app/reducer';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
