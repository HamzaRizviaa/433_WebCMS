import { makeStyles } from '@material-ui/core';

export const useLayoutStyles = makeStyles((theme) => ({
	settingsLayoutWrapper: {
		backgroundColor: theme.palette.primary.main,
		border: `1px solid ${theme.palette.black80}`,
		borderRadius: '8px',
		padding: '24px 24px 12px 24px',
		marginBottom: '20px',
		gap: '16px'
	},
	title: {
		fontSize: '20px',
		lineHeight: '30px',
		fontWeight: '800',
		marginBottom: '4px'
	},
	textWrapper: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}));
