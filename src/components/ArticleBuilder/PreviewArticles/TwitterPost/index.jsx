import React, { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getLocalStorageDetails } from '../../../../data/utils/dateTimeUtils';
import { useStyles } from '../index.style';
const TwitterPost = ({ data, itemIndex }) => {
	const [markup, setMarkup] = useState('');
	const [thumbnailHeight, setThumbnailHeight] = useState(0);
	const [thumbnailWidth, setThumbnailWidth] = useState(0);
	const classes = useStyles({ thumbnailHeight, thumbnailWidth });
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
		setMarkup('');
		try {
			const result = await axios.get(
				`${
					process.env.REACT_APP_API_ENDPOINT
				}/social-media/get-embed-data?url=${
					data.data && data.data[0].twitter_post_url
				}&type=twitter`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result.status === 200) {
				if (result.data.status_code === 200) {
					setMarkup(result.data?.data?.html);
				} else {
					setMarkup('');
					setThumbnailHeight(0);
					setThumbnailWidth(0);
				}
			}
		} catch (error) {
			setMarkup('');
			setThumbnailHeight(0);
			setThumbnailWidth(0);
			console.log(error, 'error');
		}
	};
	useEffect(() => {
		if (data?.data) debouceApiCall(twitterCall(), 1000);
	}, [data.data]);

	useEffect(() => {
		twitterCall();

		return () => {
			setMarkup('');
			setThumbnailHeight(0);
			setThumbnailWidth(0);
		};
	}, [itemIndex]);

	useEffect(() => {
		setTimeout(() => {
			if (window) {
				window.twttr.widgets.load();
			}
		}, 500);
	}, [markup]);
	return (
		<>
			<Box pr={3} className={classes.twitterBox}>
				{markup && <Markup content={markup} />}
			</Box>
		</>
	);
};
export default TwitterPost;
TwitterPost.propTypes = {
	data: PropTypes.object.isRequired,
	itemIndex: PropTypes.number
};
