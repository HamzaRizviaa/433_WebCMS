import React from 'react';
import PropTypes from 'prop-types';
import SocialPostElementPreviewer from './SocialPostElementPreviewer';

const TiktokElementPreviewer = (props) => {
	return <SocialPostElementPreviewer {...props} />;
};

export default TiktokElementPreviewer;

TiktokElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired,
	itemIndex: PropTypes.number
};
