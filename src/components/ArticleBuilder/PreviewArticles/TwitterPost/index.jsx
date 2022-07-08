import React, { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getLocalStorageDetails } from '../../../../utils';
import { useStyles } from '../index.style';
const TwitterPost = ({ data }) => {
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
			if (result.status === 200) {
				if (result.data.status_code === 200) {
					setMarkup(result.data?.data?.html);
					if (data.element_type === 'IG') {
						setThumbnailHeight(result.data?.data?.thumbnail_height);
						setThumbnailWidth(result.data?.data?.thumbnail_width);
					}
				} else {
					setMarkup('');
					setThumbnailHeight(0);
					setThumbnailWidth(0);
				}
			}
		} catch (e) {
			setMarkup('');
			setThumbnailHeight(0);
			setThumbnailWidth(0);
			console.log(e, 'e');
		}
	};
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
			<Box
				pr={3}
				className={
					data.element_type === 'TWITTER'
						? classes.twitterBox
						: classes.instaBox
				}
			>
				{markup && <Markup content={markup} />}
			</Box>
		</>
	);
};
export default TwitterPost;
TwitterPost.propTypes = {
	data: PropTypes.object.isRequired
};
