/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getLocalStorageDetails } from '../../../utils';
import useDebounce from '../../../utils/useDebounce';
// import twitterCall from '../../../globalServices/globalService';

const TwitterPost = ({ data }) => {
	// const [result, setResult] = useState(null);
	const [markup, setMarkup] = useState('');
	// const [url, setUrl] = useState('');
	// const url = 'https://twitter.com/433/status/1529108545664438276';
	// const type = 'twitter';

	const debouceApiCall = (twitterApiCall, delay) => {
		let timeout;
		return () => {
			timeout = setTimeout(() => {
				clearTimeout(timeout);
				twitterApiCall();
			}, delay);
		};
	};

	const twitterCall = async () => {
		try {
			const result = await axios.get(
				`${
					process.env.REACT_APP_API_ENDPOINT
				}/social-media/get-embed-data?url=${
					(data.data && data.data[0].twitter_post_url) ||
					data.data[0].ig_post_url
				}&type=${data.element_type === 'IG' ? 'instagram' : 'twitter'}`,

				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			console.log('result tweet', result);
			if (result.status === 200) {
				if (result.data.status_code === 200) {
					setMarkup(result.data?.data?.html);
				} else {
					setMarkup('');
				}
			}
			// if (result.data?.status_code === 200) ;
			// else setMarkup('');
		} catch (e) {
			setMarkup('');
			console.log(e, 'e');
		}
	};

	// const debouncedValue = useDebounce(twitterCall, 500);

	// useEffect(() => {
	// 	// Do fetch here...
	// 	// Triggers when "debouncedValue" changes
	// }, [debouncedValue]);

	useEffect(() => {
		if (data?.data) debouceApiCall(twitterCall(), 1000);
	}, [data.data]);

	useEffect(() => {
		setTimeout(() => {
			if (window) {
				if (data.element_type === 'TWITTER') {
					window.twttr.widgets.load();
				} else {
					window.instgrm.Embeds.process();
				}
			}
		}, 500);
	}, [markup]);

	return (
		<>
			<Box px={3}>{markup && <Markup content={markup} />}</Box>
		</>
	);
};
export default TwitterPost;

TwitterPost.propTypes = {
	data: PropTypes.object.isRequired
};
