import React from 'react';
import PropTypes from 'prop-types';
import TextTooltip from '../../TextTooltip';
import { BellFilled, BellOutlined, Edit } from '../../../../assets/svg-icons';
import { useStyles } from './index.style';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
	getSpecificNotification,
	openNotificationSlider,
	setLibraryData
} from '../../../../data/features/notification/notificationSlice';

const OptionsFormatter = ({
	title,
	notificationTitle,
	contentType = '',
	contentId = '',
	notificationId = '',
	notificationStatus = ''
}) => {
	const dispatch = useDispatch();

	const handleClick = (event) => {
		event.stopPropagation();

		if (notificationId) dispatch(getSpecificNotification(notificationId));

		dispatch(openNotificationSlider());
		dispatch(setLibraryData({ contentType, contentId }));
	};

	const classes = useStyles({ notificationStatus });

	return (
		<div className={classes.optionsWrapper}>
			<TextTooltip title={title} placement='bottom'>
				<Edit className={classes.editIcon} />
			</TextTooltip>
			{!!notificationTitle && (
				<IconButton onClick={handleClick}>
					<TextTooltip
						title={`${notificationStatus} ${notificationTitle}`}
						placement='bottom'
					>
						{notificationId ? (
							<>
								<BellFilled className={classes.notificationIcon} />
							</>
						) : (
							<BellOutlined className={classes.notificationIcon} />
						)}
					</TextTooltip>
				</IconButton>
			)}
		</div>
	);
};

OptionsFormatter.propTypes = {
	title: PropTypes.string.isRequired,
	notificationTitle: PropTypes.string,
	contentType: PropTypes.string,
	contentId: PropTypes.string,
	notificationId: PropTypes.string,
	notificationStatus: PropTypes.string
};

export default OptionsFormatter;
