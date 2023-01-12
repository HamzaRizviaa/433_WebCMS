import { makeStyles } from '@material-ui/core';

export const useScheduledInfoBoxStyles = makeStyles((theme) => ({
	scheduledTime: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: theme.palette.white,
		marginBottom: 20
	},

	scheduleTimeLabel: {
		marginRight: 15
	},

	editScheduleIcon: {
		cursor: 'pointer'
	},

	disabledIcon: {
		color: theme.palette.disabled,
		fill: theme.palette.disabled,

		'& path': {
			fill: theme.palette.disabled
		}
	},

	editIconBtn: {
		padding: 0
	}
}));
