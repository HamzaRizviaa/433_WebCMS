import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';

const AdPreviewer = ({ data }) => {
	const classes = useStyles();

	return (
		<div className={classes.adDraggableData}>
			<img src={data?.image} className={classes.images} />
			<p className={classes.adText}>{data.text}</p>
		</div>
	);
};

export default AdPreviewer;

AdPreviewer.propTypes = {
	data: PropTypes.any.isRequired
};
