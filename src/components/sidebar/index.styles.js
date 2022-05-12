import { makeStyles } from '@material-ui/core';
import theme from '../../assets/theme';

export const useStyles = makeStyles(() => ({
	// ------------- local host
	main: {
		backgroundColor: theme.palette.blackColor,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px solid ${theme.palette.grey}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem'
	},
	navContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	iconWrapper: {
		marginTop: '2.5rem',
		padding: '1rem 1.2rem 0.8rem 1.2rem',

		borderRadius: '8px',
		cursor: 'pointer'
	},

	icon: {
		width: ' 2.5rem'
	},
	logoContainer: {},
	logo: {
		width: '3.5rem',
		height: 'auto'
	},
	text: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 900,
		fontSize: '12px',
		lineHeight: '18px',
		marginTop: '8px',
		textAlign: 'center'
	},

	logoutContainer: {
		textAlign: 'center',
		cursor: 'pointer'
	},

	// ------------- dev
	dev: {
		backgroundColor: theme.palette.neonYellow,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px solid ${theme.palette.grey}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem',

		'& .iconWrapper': {
			backgroundColor: theme.palette.neonYellow,
			border: `2px solid ${theme.palette.neonYellow}`,
			marginTop: '2.5rem',
			padding: '1rem 1.2rem 0.8rem 1.2rem',
			borderRadius: '8px',
			cursor: 'pointer'
		},

		'& svg': {
			'& path': {
				fill: 'black'
			},
			'& circle': {
				stroke: 'black'
			}
		},
		'& .icon': {
			width: ' 2.5rem'
		}
	},
	devArticle: {
		'& svg': {
			'& path': {
				fill: 'none !important',
				stroke: 'black'
			},
			'& circle': {
				stroke: 'black'
			}
		}
	},

	// ------------- staging
	staging: {
		backgroundColor: theme.palette.red,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px dashed ${theme.palette.grey}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem',
		'& .iconWrapperDev': {
			backgroundColor: theme.palette.orange,
			marginTop: '2.5rem',
			padding: '1rem 1.2rem 0.8rem 1.2rem',
			borderRadius: '8px',
			cursor: 'pointer'
		},
		'& svg': {
			'& path': {
				fill: 'white'
			},
			'& circle': {
				stroke: 'white'
			}
		},
		'& .icon': {
			width: ' 2.5rem'
		}
	},
	stagingMainArticle: {
		'& svg': {
			'& path': {
				fill: 'none !important',
				stroke: 'white'
			},
			'& circle': {
				stroke: 'white'
			}
		}
	},

	prod: {}
}));
