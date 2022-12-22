import { makeStyles } from '@material-ui/core/styles';

export const useElementsStyles = makeStyles((theme) => ({
	//article element sidebar
	ArticleElementsSidebar: {
		position: 'sticky',
		top: '100px',
		paddingRight: '10px',
		paddingBottom: '40px'
	},
	elementsDesc: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: '25px'
	},
	elementsText: {
		fontSize: '16px',
		color: theme.palette.white,
		fontWeight: 700,
		marginTop: '5px'
	},
	titleHeading: {
		fontSize: '20px',
		fontWeight: 800,
		color: theme.palette.white
	},
	titleText: { fontSize: '14px', color: theme.palette.white },
	toggleBtn: { height: '25px' },
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
	},
	//article question element
	slideImageLabel: {
		marginBottom: '24px',
		fontFamily: 'Poppins',
		fontWeight: 700,
		fontSize: '16px'
	},
	dropzoneWrapper: {
		marginTop: 15,
		marginBottom: 20
	},
	requiredImage: { color: '#ff355a', fontSize: '16px' },
	matchFieldContainer: {
		marginTop: 6,
	}
}));
