import { Box } from '@material-ui/core';
import React from 'react';
import { useNotificationStyles } from '../../index.style';
import Android from '../../../../../assets/Android.svg';
import Iphone12 from '../../../../../assets/Iphone-12.svg';
import Iphone14Pro from '../../../../../assets/Iphone-14-PRO.svg';

const NotificationPreview = () => {
	const classes = useNotificationStyles();
	return (
		<Box className={classes.accordionRoot}>
			<h3>Preview</h3>
			<Box mb={2}>
				<img src={Android} />
				<h6>ANDROID</h6>
			</Box>
			<Box mb={2}>
				<img src={Iphone12} />
				<h6>IPHONE 12</h6>
			</Box>
			<Box>
				<img src={Iphone14Pro} />
				<h6>IPHONE 14 PRO</h6>
			</Box>
		</Box>
	);
};

export default NotificationPreview;
