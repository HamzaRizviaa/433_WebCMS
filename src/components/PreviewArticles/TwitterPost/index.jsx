import React, { useEffect } from 'react';
import { getLocalStorageDetails } from '../../../utils';
import axios from 'axios';
// import twitterCall from '../../../globalServices/globalService';

const TwitterPost = () => {
	const url = 'https://twitter.com/433/status/1529108545664438276';

	useEffect(() => {
		twitterCall(url);
	}, []);

	const twitterCall = async (url) => {
		try {
			const abc = await axios.get(
				`https://publish.twitter.com/oembed?url=${url}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`,
						'Access-Control-Allow-Origin': '*'
					}
				}
			);
			console.log(abc, '==============');
		} catch (e) {
			console.log(e, 'e');
		}
	};

	return <>abc</>;
};
export default TwitterPost;

// TwitterPost.propTypes = {
// 	url: PropTypes.string.isRequired
// };
