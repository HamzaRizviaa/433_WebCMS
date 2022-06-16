import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
const ImagePreview = ({ data }) => {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.imageDraggableData}>
				{data?.data ? <img src={data?.data[0].media_url} /> : ''}
			</div>
		</div>
	);
};

export default ImagePreview;
ImagePreview.propTypes = {
	data: PropTypes.string.isRequired
};
