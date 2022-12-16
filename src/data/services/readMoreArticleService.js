import axios from 'axios';
import { aws4Interceptor } from 'aws4-axios';

const instance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Format: 'pandas-split'
	}
});

const interceptor = aws4Interceptor(
	{
		region: 'eu-west-2',
		service: 'sagemaker'
	},
	{
		accessKeyId: process.env.REACT_APP_AWS4INTERCEPTOR_ACCESS_KEY,
		secretAccessKey: process.env.REACT_APP_AWS4INTERCEPTOR_SECRET_KEY
	}
);

const commonbody = {
	columns: ['operation', 'article_id'],
	index: [0]
};

export const publishReadMoreApi = async (id) => {
	const body = {
		...commonbody,
		data: [['add_article', id]]
	};

	instance.interceptors.request.use(interceptor);

	try {
		let initialResponse = instance.post(
			process.env.REACT_APP_INVOCATIONS_ENDPOINT,
			body
		);
		let result = await initialResponse;
		if (result?.data?.status_code === 200) {
			console.log('Success - Read More Api !');
		}
	} catch (e) {
		console.log(e, 'Failed - Read More Api !');
	}
};

export const deleteReadMoreApi = async (id) => {
	const body = {
		...commonbody,
		data: [['delete_article', id]]
	};

	instance.interceptors.request.use(interceptor);

	try {
		let initialResponse = instance.post(
			process.env.REACT_APP_INVOCATIONS_ENDPOINT,
			body
		);
		let result = await initialResponse;
		if (result?.data?.status_code === 200) {
			console.log('Success - Read More Api !');
		}
	} catch (e) {
		console.log(e, 'Failed - Read More Api !');
	}
};
