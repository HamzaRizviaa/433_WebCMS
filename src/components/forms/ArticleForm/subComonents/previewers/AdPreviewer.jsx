import React from 'react';

import Sponsored from '../../../../../assets/Micro.png';
import { useStyles } from './elementPreviewers.styles';

const AdPreviewer = () => {
	const classes = useStyles();

	return (
		<div className={classes.adDraggableData}>
			<img src={Sponsored} className={classes.images} />
			<p className={classes.adText}>Sponsored</p>
		</div>
	);
};

export default AdPreviewer;
