import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from './data/store';
import AppRoutes from './routes';

import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppRoutes />
			<ToastContainer />
		</Router>
	</Provider>,
	document.getElementById('root')
);
