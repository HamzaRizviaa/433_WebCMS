import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/rootReducer';
import rootRTKQuery from './features/rootRTKQuery';

export const createStore = () =>
	configureStore({
		reducer: {
			rootReducer,
			[rootRTKQuery.reducerPath]: rootRTKQuery.reducer
		},
		// Adding the api middleware enables caching, invalidation, polling,
		// and other useful features of `rtk-query`.
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(rootRTKQuery.middleware)
	});

const store = createStore();

export default store;
