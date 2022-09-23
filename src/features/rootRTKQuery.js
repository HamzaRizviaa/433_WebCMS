import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getLocalStorageDetails } from '../utils';
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const accessToken = getLocalStorageDetails()?.access_token;
const rootRtkQuery = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,

		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			headers.set('Authorization', `Bearer ${accessToken}`);
			return headers;
		}
	}),
	endpoints: () => ({})
});

export default rootRtkQuery;
