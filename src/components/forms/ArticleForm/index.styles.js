import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	categoryContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'& h6': {
			marginBottom: '0.6rem',
			marginLeft: '1rem'
		}
	},
	mainCategory: {
		width: '48%',
		display: 'inline-block'
	},

	subCategory: {
		width: '48%',
		display: 'inline-block'
	},

	authorContainer: {
		margin: '10px 0px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: '0px',
		gap: '8px',

		'& h6': {
			marginBottom: '0.5rem',
			fontFamily: "'Poppins'",
			fontWeight: '700',
			fontSize: '12px',
			lineHeight: '16px',
			letterSpacing: '0.02em',
			textTransform: 'uppercase'
		}
	},

	authorAvatar: {
		position: 'relative'
	},
	hiddenAvatarBtn: {
		position: 'absolute',
		cursor: 'pointer',
		height: '100%',
		width: '100%',
		top: 0,
		opacity: 0
	},

	authorName: {
		display: 'inline-block',
		width: '100%'
	},
	dropBoxUrlContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		},
		marginBottom: '2rem'
	},
	authorImageError: {
		display: 'inline-block',
		width: '100%',
		color: theme.palette.red,
		height: '1rem',
		textAlign: 'center',
		fontWeight: 'bold',
		marginTop: '-10px',
		marginBottom: '1rem'
	}
}));
