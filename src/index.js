import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppRoutes/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
