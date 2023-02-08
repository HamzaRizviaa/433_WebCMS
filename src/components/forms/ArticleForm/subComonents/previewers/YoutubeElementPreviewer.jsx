import React from 'react';
import PropTypes from 'prop-types';
import SocialPostElementPreviewer from './SocialPostElementPreviewer';

const YoutubeElementPreviewer = (props) => {
	return <SocialPostElementPreviewer {...props} />;
};

export default YoutubeElementPreviewer;

YoutubeElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired,
	itemIndex: PropTypes.number
};
