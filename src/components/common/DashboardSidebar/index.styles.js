import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => {
	const envToColorMapper = {
		dev: {
			backgroundColor: theme.palette.neonYellow,
			color: theme.palette.black,
			aciveIconColor: theme.palette.black
		},
		staging: {
			backgroundColor: theme.palette.orange,
			color: theme.palette.white,
			aciveIconColor: theme.palette.white
		},
		prod: {
			backgroundColor: theme.palette.black,
			color: theme.palette.white,
			aciveIconColor: theme.palette.neonYellow
		},
		qa: {
			backgroundColor: '#122E1E',
			color: theme.palette.white,
			aciveIconColor: '#2fcd97'
		}
	};

	return {
		sidebarWrapper: ({ env }) => ({
			backgroundColor: envToColorMapper[env].backgroundColor,
			height: ' calc(100vh - 6rem)',
			width: '5rem',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '3rem 1rem',
			borderRight:
				env === 'prod'
					? `1.5px solid ${theme.palette.normalGrey}`
					: `1.5px solid ${theme.palette.black}`,

			'& svg': {
				'& path': {
					fill: envToColorMapper[env].color
				},
				'& circle': {
					stroke: envToColorMapper[env].color
				}
			}
		}),

		navContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},

		iconWrapper: {
			marginTop: '2.5rem',
			padding: '1rem 1.2rem 0.8rem 1.2rem',
			border: '2px solid transparent',
			borderRadius: '8px',
			cursor: 'pointer'
		},

		icon: {
			width: '2.5rem'
		},

		logoContainer: { textAlign: 'center' },

		logo: {
			width: '3.5rem',
			height: 'auto',

			'&:hover': {
				transform: 'translateY(0) scale(1.3)',
				filter:
					'invert(66%) sepia(96%) saturate(799%) hue-rotate(0deg) brightness(111%) contrast(106%)'
			}
		},

		logoutContainer: {
			textAlign: 'center',
			cursor: 'pointer'
		},

		navText: ({ env }) => ({
			fontFamily: 'Poppins',
			fontStyle: 'normal',
			fontWeight: 900,
			fontSize: '12px',
			lineHeight: '18px',
			marginTop: '8px',
			textAlign: 'center',
			textTransform: 'uppercase',
			color: envToColorMapper[env].color
		}),

		activeRoute: ({ env }) => ({
			marginTop: '2.5rem',
			padding: '1rem 1.2rem 0.8rem 1.2rem',
			borderRadius: '8px',
			backgroundColor:
				env === 'prod' ? theme.palette.normalGrey : 'transparent',
			border:
				env === 'prod'
					? `2px solid ${theme.palette.normalGrey}`
					: `2px solid ${envToColorMapper[env].color}`,

			'& svg ': {
				'& path': {
					fill: envToColorMapper[env].aciveIconColor
				},
				'& circle': {
					stroke: envToColorMapper[env].aciveIconColor
				}
			},

			'& > span > svg': {
				'& path': {
					fill: 'none',
					stroke: envToColorMapper[env].aciveIconColor
				},
				'& circle': {
					stroke: envToColorMapper[env].aciveIconColor
				}
			}
		}),

		newsIcon: ({ env }) => ({
			display: 'inline-block',

			'& svg': {
				'& path': {
					fill: 'none',
					stroke: envToColorMapper[env].color
				},
				'& circle': {
					stroke: envToColorMapper[env].color
				}
			}
		}),

		gamesIcon: {
			padding: '6px 0'
		}
	};
});
