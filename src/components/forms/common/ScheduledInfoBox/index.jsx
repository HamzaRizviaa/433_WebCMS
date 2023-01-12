import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

import { Edit } from '../../../../assets/svg-icons';
import { useScheduledInfoBoxStyles } from './index.style';

const ScheduledInfoBox = ({ openSchedulerModal, isValid, scheduleDate }) => {
	const classes = useScheduledInfoBoxStyles();

	const formattedDate = dayjs(scheduleDate).format('DD-MM-YYYY, HH:mm');

	return (
		<div className={classes.scheduledTime}>
			<h2>
				<span className={classes.scheduleTimeLabel}>Scheduled Time:</span>
				{formattedDate}
			</h2>
			<IconButton
				className={classes.editIconBtn}
				onClick={openSchedulerModal}
				disabled={!isValid}
			>
				<Edit
					className={`${classes.editScheduleIcon} ${
						!isValid ? classes.disabledIcon : ''
					}`}
				/>
			</IconButton>
		</div>
	);
};

ScheduledInfoBox.propTypes = {
	openSchedulerModal: PropTypes.func.isRequired,
	isValid: PropTypes.bool,
	scheduleDate: PropTypes.string
};

export default ScheduledInfoBox;
