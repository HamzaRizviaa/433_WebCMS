import { makeStyles } from '@material-ui/core';
const fieldHeight = '24px';

export const useStyles = makeStyles((theme) => ({
	continer: {
		padding: '1rem 0'
	},
	label: {
		color: '#fff',
		fontWeight: '700',
		fontSize: '12px',
		lineHeight: '16px',
		margin: '0 1rem 0.5rem 1rem'
	},
	dateField: {
		height: fieldHeight, // '40px',
		left: '0px',
		top: '20px',
		borderRadius: '40px',
		padding: '8px 16px 8px 16px',
		background: 'black',
		// common
		fontSize: '14px',
		lineHeight: '24px',
		color: ({ disabled }) =>
			disabled ? theme.palette.lightGrey : theme.palette.white,
		backgroundColor: ({ disabled }) =>
			disabled ? theme.palette.normalGrey : theme.palette.black
	},
	arrowIcon: {
		height: '20px',
		width: '20px',
		color: 'yellow'
	},

	hoursPopover: {
		backgroundColor: '#191919',
		borderRadius: '8px',
		filter: 'drop-shadow(0 3px 8px 0 #A1A1A1 50%)',
		boxShadow: '0px 2px 8px 0 #A1A1A1 50%',
		top: '5px',
		right: 'calc(50% + 2px)',
		width: '210px' //'185px'
	},

	hoursCon: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '3px',
		padding: '8px 16px',

		'& .hourNumber': {
			//styleName: Body/Small;
			fontFamily: 'Poppins',
			fontSize: '14px',
			fontWeight: '400',
			lineHeight: '24px',
			letterSpacing: '0em',
			// textAlign: 'center',
			color: '#fff',
			width: '20px',
			height: '20px',
			textAlign: 'center',
			margin: '0px 6px',
			borderRadius: '50%',
			padding: '5px',
			cursor: 'pointer',
			transition: '.2s background ease-in-out',
			'&:hover:not(.selectedHour)': {
				background: '#ffff00a6'
			}
		},
		'& .selectedHour': {
			backgroundColor: 'rgb(255, 255, 0)',
			color: theme.palette.primary.dark
		}
	}
}));
