import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../../slider';

const UploadOrEditPost = ({ open }) => {
	return (
		<Slider open={open}>
			<div>Abcd</div>;
		</Slider>
	);
};

UploadOrEditPost.propTypes = {
	open: PropTypes.bool.isRequired
	// handleClose: PropTypes.func.isRequired
};

export default UploadOrEditPost;
