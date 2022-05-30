import { makeStyles } from '@material-ui/core';
import theme from '../../assets/theme';

export const useStyles = makeStyles(() => ({
	// ------------- local host
	main: {
		backgroundColor: theme.palette.blackColor,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px solid ${theme.palette.black}`,
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
		border:'2px solid transparent',
		borderRadius: '8px',
		cursor: 'pointer'
	},

	icon: {
		width: ' 2.5rem'
	},
	logoContainer: { textAlign: 'center' },

	logo: {
		width: '3.5rem',
		height: 'auto'
	},

	logoutContainer: {
		textAlign: 'center',
		cursor: 'pointer'
	},

	mainText: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 900,
		fontSize: '12px',
		lineHeight: '18px',
		marginTop: '8px',
		textAlign: 'center',
		textTransform: 'uppercase',
		color: `${theme.palette.black} !important`
	},
	mainActiveRoute: {
		border: `2px solid ${theme.palette.black}`,
		backgroundColor: theme.palette.grey,
		marginTop: '2.5rem',
		padding: '1rem 1.2rem 0.8rem 1.2rem',
		borderRadius: '8px',
		cursor: 'pointer',
		'& svg': {
			'& path': {
				fill: theme.palette.neonYellow
			},
			'& circle': {
				stroke: theme.palette.neonYellow
			}
		},
		'& .icon': {
			width: ' 2.5rem'
		}
	},
	gamesIcon: {
		padding: '6px 0'
	},
	// ------------- dev
	dev: {
		backgroundColor: theme.palette.neonYellow,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px solid ${theme.palette.black}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem',

		'& .iconWrapper': {
			backgroundColor: theme.palette.neonYellow,
			border:'2px solid transparent',
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
	devPost: {
		'& svg': {
			'& path': {
				fill: 'none !important',
				stroke: 'black'
			}
		}
	},
	devText: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 900,
		fontSize: '12px',
		lineHeight: '18px',
		marginTop: '8px',
		textAlign: 'center',
		textTransform: 'uppercase',
		color: `${theme.palette.black} !important`
	},
	devActiveRoute: {
		border: `2px solid ${theme.palette.black}`,
		marginTop: '2.5rem',
		padding: '1rem 1.2rem 0.8rem 1.2rem',
		borderRadius: '8px',
		cursor: 'pointer'
	},

	// ------------- staging
	staging: {
		backgroundColor: theme.palette.orange,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px solid ${theme.palette.black}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem',
		'& .iconWrapperDev': {
			border:'2px solid transparent',
			marginTop: '2.5rem',
			padding: '1rem 1.2rem 0.8rem 1.2rem',
			borderRadius: '8px',
			cursor: 'pointer'
		},
		'& .activeRoute': {
			border: `2px solid ${theme.palette.white}`
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
	stagingArticle: {
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
	stagingText: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 900,
		fontSize: '12px',
		lineHeight: '18px',
		marginTop: '8px',
		textAlign: 'center',
		textTransform: 'uppercase',
		color: `${theme.palette.white} !important`
	},
	stagingActiveRoute: {
		border: `2px solid ${theme.palette.white}`,
		marginTop: '2.5rem',
		padding: '1rem 1.2rem 0.8rem 1.2rem',
		borderRadius: '8px',
		cursor: 'pointer'
	},

	// ------------- production
	prod: {
		backgroundColor: theme.palette.black,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px solid ${theme.palette.grey}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem',
		'& .iconWrapperDev': {
			border:'2px solid transparent',
			marginTop: '2.5rem',
			padding: '1rem 1.2rem 0.8rem 1.2rem',
			borderRadius: '8px',
			cursor: 'pointer'
		},
		'& > svg': {
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
	// prodArticle: {
	// 	'& svg': {
	// 		'& path': {
	// 			fill: 'none !important',
	// 			stroke: ({ mainClass }) =>
	// 				mainClass === 'prod' ? theme.palette.neonYellow : theme.palette.white
	// 		},
	// 		'& circle': {
	// 			stroke: 'white'
	// 		}
	// 	}
	// },
	prodText: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 900,
		fontSize: '12px',
		lineHeight: '18px',
		marginTop: '8px',
		textAlign: 'center',
		textTransform: 'uppercase',
		color: `${theme.palette.white} !important`
	},
	prodActiveRoute: {
		backgroundColor: theme.palette.grey,
		marginTop: '2.5rem',
		padding: '1rem 1.2rem 0.8rem 1.2rem',
		borderRadius: '8px',
		cursor: 'pointer',
		'& svg ': {
			'& path': {
				fill: theme.palette.neonYellow,
				stroke: theme.palette.neonYellow
			},
			'& circle': {
				stroke: theme.palette.neonYellow
			}
		},
		'& > span > svg ': {
			'& path': {
				fill: 'none !important'
			}
		},
		'& .icon': {
			width: ' 2.5rem'
		}
	}
}));
