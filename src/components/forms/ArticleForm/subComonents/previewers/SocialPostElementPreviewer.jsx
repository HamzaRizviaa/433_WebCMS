import React, { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';
import { useLazyGetPostQuery } from '../../../../../data/features/articleLibrary/articleLibrary.query';
import { ARTICLE_ELEMENTS_TYPES } from '../../../../../data/helpers/articleHelpers';

const SocialPostElementPreviewer = ({ data }) => {
	// extracted urls
	const extractedTwitterUrl = data && data.twitter_post_url;
	const extractedIgUrl = data && data.instagram_post_url;

	// states
	const [markup, setMarkup] = useState('');
	const [thumbnailHeight, setThumbnailHeight] = useState(0);
	const [thumbnailWidth, setThumbnailWidth] = useState(0);

	// query
	const [getPost, { isError, data: postData, isSuccess }] =
		useLazyGetPostQuery();

	// /styles
	const classes = useStyles({ thumbnailHeight, thumbnailWidth });

	// debounce api calls
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (data) getPost(generatePostEndPoint());
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [data]);

	/// set markup to load post
	useEffect(() => {
		if (postData && isSuccess) {
			setMarkup(postData?.html);
		}
	}, [postData, isSuccess]);

	// reset markup on error
	useEffect(() => {
		setMarkup('');
		setThumbnailHeight(0);
		setThumbnailWidth(0);
	}, [isError]);

	// load twitter widget on markup update
	useEffect(() => {
		if (window) {
			loadMarkup();
		}
	}, [markup]);

	// methods
	const generatePostEndPoint = () => {
		const { element_type: type } = data;

		switch (type) {
			case ARTICLE_ELEMENTS_TYPES.TWITTER:
				return `${process.env.REACT_APP_API_ENDPOINT}/social-media/get-embed-data?url=${extractedTwitterUrl}&type=twitter`;
			case ARTICLE_ELEMENTS_TYPES.IG:
				return `${process.env.REACT_APP_API_ENDPOINT}/social-media/get-embed-data?url=${extractedIgUrl}&type=instagram`;
			default:
				return null;
		}
	};

	const loadMarkup = () => {
		const { element_type: type } = data;
		if (type === ARTICLE_ELEMENTS_TYPES.TWITTER) {
			window.twttr.widgets.load();
			return;
		}
		if (type === ARTICLE_ELEMENTS_TYPES.IG) {
			window.instgrm.Embeds.process();
		}
	};

	return (
		<Box pr={3} className={classes.twitterBox}>
			{markup && <Markup content={markup} />}
		</Box>
	);
};
export default SocialPostElementPreviewer;

SocialPostElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired,
	itemIndex: PropTypes.number
};
