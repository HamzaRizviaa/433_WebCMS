import { makeStyles } from '@material-ui/core';
const fieldHeight = '24px';
export const useStyles = makeStyles((theme) => ({
	continer: {
		padding: '1rem 0'
		// position: 'relative'
	},
	label: {
		color: '#fff',
		fontWeight: '700',
		fontSize: '12px',
		lineHeight: '16px',
		margin: '1.5rem 1rem 0.5rem 1rem'
	},
	separator: {
		display: 'block',
		height: 24,
		width: 1,
		marginTop: 7,

		backgroundColor: theme.palette.normalGrey
	},
	timeFieldContainer: {
		// width: '100%',
		display: 'flex',
		border: '1px solid #333333',
		borderRadius: '40px',

		justifyContent: 'space-between',
		'& .subField': {
			height: fieldHeight, // '40px',
			left: '0px',
			width: 'calc(50% - 33px)',
			top: '20px',
			borderRadius: '40px',
			padding: '8px 16px 8px 16px',
			background: 'black',
			// common
			cursor: 'pointer',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			fontSize: '14px',
			lineHeight: '24px'
		},
		'& .hoursField': {
			borderTopRightRadius: '0px',
			borderBottomRightRadius: '0px',

			'& .greydText': {
				fontSize: '14px',
				fontWeight: 400,
				lineHeight: '24px',
				letterSpacing: '0em',
				color: '#666666'
			},
			'& .arrowCon': {
				position: 'relative',
				'& .arrow': {
					marginTop: '8px'
				},
				'& .anchorEle': {
					position: 'absolute',
					top: '45px',
					right: '-16px'
				}
			}
			// dropdown popper
		},
		'& .minsField': {
			borderTopLeftRadius: '0px',
			borderBottomLeftRadius: '0px',

			'& .greydText': {
				fontSize: '14px',
				fontWeight: 400,
				lineHeight: '24px',
				letterSpacing: '0em',
				color: '#666666'
			},
			'& .minsInput': {
				width: '20px',
				border: 'none',
				outline: 'none',
				background: 'transparent',
				fontFamily: 'Poppins',
				cursor: 'pointer',

				color: '#fff',
				'&:focus': {
					border: 'none',
					outline: 'none'
				},
				'&[type=number]': {
					'-moz-appearance': 'textfield'
				},
				'&::-webkit-outer-spin-button': {
					'-webkit-appearance': 'none',
					margin: 0
				},
				'&::-webkit-inner-spin-button': {
					'-webkit-appearance': 'none',
					margin: 0
				}
			}
		}
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
			borderRadius: '4px',
			padding: '5px',
			cursor: 'pointer',
			transition: '.2s background ease-in-out',
			'&:hover:not(.selectedHour)': {
				background: '#ffff00a6'
			}
		},
		'& .selectedHour': {
			backgroundColor: 'rgb(255, 255, 0)',
			color: theme.palette.primary.dark,
			fontWeight: 'bold'
		}
	}
}));
