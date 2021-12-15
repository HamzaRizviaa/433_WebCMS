import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppRoutes />
			<ToastContainer />
		</Router>
	</Provider>,
	document.getElementById('root')
);
