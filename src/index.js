import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollMemory />

      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
