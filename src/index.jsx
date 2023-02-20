import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './data/store';
import AppRoutes from './routes';

import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('root'));

root.render(
	<GoogleOAuthProvider clientId='761006834675-0717aiakfe9at8d7jahf10hdgevu7acg.apps.googleusercontent.com'>
		<Provider store={store}>
			<Router>
				<AppRoutes />
				<ToastContainer />
			</Router>
		</Provider>
	</GoogleOAuthProvider>
);

if (module.hot) {
	module.hot.accept();
}
