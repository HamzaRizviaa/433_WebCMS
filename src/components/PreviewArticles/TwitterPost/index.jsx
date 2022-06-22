import React, { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getLocalStorageDetails } from '../../../utils';
// import twitterCall from '../../../globalServices/globalService';

const TwitterPost = ({ data }) => {
	console.log(data, '========= url');
	const [result, setResult] = useState('');
	// const [url, setUrl] = useState('');
	const url = 'https://twitter.com/433/status/1529108545664438276';
	const type = 'twitter';

	process.env.REACT_APP_INSTA_APP_ID = '467967928127124';
	process.env.REACT_APP_INSTA_CLIENT_ID = '65fba6088f5adc04af7c85dff017918b';

	useEffect(() => {
		twitterCall();
	}, [url]);

	const twitterCall = async () => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/social-media/get-embed-data?url=${url}&type=${type}`,

				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			setResult(result);
		} catch (e) {
			console.log(e, 'e');
		}
	};
	console.log(result);

	return (
		<>
			<Markup content="<blockquote class='twitter-tweet'><p lang='en' dir='ltr'>WE ARE 5️⃣0️⃣ MILLION on Instagram! 💛<br><br>The journey continues..🙏 <a href='https://t.co/XoIGUd8vdA'>pic.twitter.com/XoIGUd8vdA</a></p>&mdash; 433 (@433) <a href='https://twitter.com/433/status/1529108545664438276?ref_src=twsrc%5Etfw'>May 24, 2022</a></blockquote>" />

			{/* <div
				dangerouslySetInnerHTML={{
					__html: result?.data?.data?.html
				}}
			/> */}
		</>
	);
};
export default TwitterPost;

TwitterPost.propTypes = {
	data: PropTypes.object.isRequired
};
