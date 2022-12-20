import React from 'react';
import PropTypes from 'prop-types';
import SocialPostElementPreviewer from './SocialPostElementPreviewer';

const TwitterElementPreviewer = (props) => {
	return <SocialPostElementPreviewer {...props} />;
};
export default TwitterElementPreviewer;

TwitterElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired,
	itemIndex: PropTypes.number
};
