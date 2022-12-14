import React from 'react';
import PropTypes from 'prop-types';
import SocialPostElementPreviewer from './SocialPostElementPreviewer';

const IgElementPreviewer = (props) => {
	return <SocialPostElementPreviewer {...props} />;
};

export default IgElementPreviewer;

IgElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired,
	itemIndex: PropTypes.number
};
