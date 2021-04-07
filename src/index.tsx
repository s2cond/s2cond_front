import React from 'react';
import ReactDOM from 'react-dom';
import 'scss/main.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'store/index';
import ToastContainer from 'components/ToastContainer';
import configureStore from 'store/configureStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
