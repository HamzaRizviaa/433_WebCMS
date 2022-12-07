import { makeStyles } from '@material-ui/core/styles';

export const useElementsStyles = makeStyles((theme) => ({
	ArticleElementsSidebar: {
		position: 'sticky',
		top: '100px',
		paddingRight: '10px'
	},
	elementsDesc: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%'
	},
	elementsText: {
		fontSize: '16px',
		color: theme.palette.white,
		fontWeight: 700
	},
	titleHeading: {
		fontSize: '20px',
		fontWeight: 800,
		color: theme.palette.white
	},
	titleText: { fontSize: '14px', color: theme.palette.white },
	toggleBtn: { marginTop: '15px' },
	elementContainter: {
		width: '100%',
		background: theme.palette.black,
		border: `1px solid ${theme.palette.neonYellow}`,
		borderRadius: '8px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '12px',
		gap: '8px',
		cursor: 'pointer',
		margin: '20px 0px'
	},

	elementText: {
		fontFamily: 'Poppins',
		fontWeight: '400',
		fontSize: '14px',
		lineHeight: '24px',
		display: 'flex',
		alignItems: 'center',
		letterSpacing: '0.02em',
		color: theme.palette.white
	}
}));
