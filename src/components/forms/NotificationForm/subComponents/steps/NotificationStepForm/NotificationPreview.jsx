import React from 'react';
import { Box } from '@material-ui/core';
import { useFormikContext } from 'formik';

import Android from '../../../../../../assets/Android-Screen.svg';
import Iphone12 from '../../../../../../assets/Iphone-12.svg';
import Iphone14Pro from '../../../../../../assets/Iphone-14-PRO.svg';
import ImagePlaceholder from '../../../../../../assets/Notification_Placeholder.png';
import { useNotificationStyles } from '../../../index.style';

const NotificationPreview = () => {
	const classes = useNotificationStyles();
	const { values } = useFormikContext();

	const notificationTitle =
		values?.notification?.notification_title ||
		values?.notification?.notification_text
			? values?.notification?.notification_title
			: 'Notification Title';

	const notificationText =
		values?.notification?.notification_title ||
		values?.notification?.notification_text
			? values?.notification?.notification_text
			: 'Notification Text';

	const notificationImage = values?.notification?.uploadedFiles[0]
		? values?.notification?.uploadedFiles[0]?.media_url
		: ImagePlaceholder;

	return (
		<Box className={classes.notificationRoot}>
			<h3>Preview</h3>
			<Box mb={2} className={classes.notifTitleContainer}>
				<img src={Android} />
				<div className={classes.notifTitleAndroid}>{notificationTitle}</div>
				<div className={classes.notifTextAndroid}>{notificationText}</div>
				<div className={classes.notifImgAndroid}>
					<img src={notificationImage} />
				</div>
				<h6>ANDROID</h6>
			</Box>
			<Box mb={2} className={classes.notifTitleContainer}>
				<img src={Iphone12} />
				<div className={classes.notifTitleIphone12}>{notificationTitle}</div>
				<div className={classes.notifTextIphone12}>{notificationText}</div>
				<div className={classes.notifImgIphone12}>
					<img src={notificationImage} />
				</div>
				<h6>IPHONE 12</h6>
			</Box>
			<Box className={classes.notifTitleContainer}>
				<img src={Iphone14Pro} />
				<div className={classes.notifTitleIphone14}>{notificationTitle}</div>
				<div className={classes.notifTextIphone14}>{notificationText}</div>
				<div className={classes.notifImgIphone14}>
					<img src={notificationImage} />
				</div>
				<h6>IPHONE 14 PRO</h6>
			</Box>
		</Box>
	);
};

export default NotificationPreview;
