import { makeStyles } from '@material-ui/core';

export const unauthorizedStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative'
	},

	gif: {
		height: '100vh'
	},

	modal: {
		position: 'absolute',
		width: '500px',
		height: '120px',
		left: '20px',
		top: '16px',
		background: theme.palette.darkGrey,
		borderRadius: '8px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		padding: '24px',
		gap: '16px',
		fontSize: '16px',
		lineHeight: '24px'
	},

	deniedSpan: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: '8px',
		color: theme.palette.neonYellow,
		fontWeight: '700'
	},

	deniedIcon: {
		height: '24px',
		width: '24px',

		'& path': {
			fill: theme.palette.neonYellow,

			'&:hover': {
				fill: 'red'
			}
		}
	}
}));
